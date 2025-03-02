export class FileType {
    static #categoryPerType: Map<FileType, string> = new Map<FileType, string>();

    static defaultProperties: string[] = [ "Name", "Extension", "Type", "Size"];
    static perExtension: Map<string, FileType> = new Map<string, FileType>();
    static fileTypes: Set<FileType> = new Set<FileType>();

    static unspecifiedFileType: FileType = new FileType("Unspecified");
    static fileSectorFileType: FileType = new FileType("File Sector");
    static pngFileType: FileType = new FileType("Portable Network Graphics", "", 
        [ "png" ], [
        "Image Width (px)",
        "Image Height (px)"
    ]);
    static exeFileType: FileType = new FileType("Executable", "", 
        [ "exe" ]
    );
    static docFileType: FileType = new FileType("Word Document", "", 
        [ "doc" ]
    );
    static txtFileType: FileType = new FileType("Text", "", 
        [ "txt" ]
    );
    static pdfFileType: FileType = new FileType("Adobe Portable Document Format", "", 
        [ "pdf" ]
    );

    static defaultsPerProperty: Map<string, any> = new Map<string, any>([
        ["Name", ""],
        ["Extension", ""],
        ["Type", FileType.unspecifiedFileType],
        ["Size", 0],
        ["Image Width (px)", 0],
        ["Image Height (px)", 0]
    ]);

    static getFileTypeByName(fileTypeName: string): FileType {
        return FileType.fileTypes.values().find(it => it.name === fileTypeName) || FileType.unspecifiedFileType;
    }

    static getFileTypeByExtension(extension: string): FileType {
        return FileType.perExtension.get(extension) || FileType.unspecifiedFileType;
    }

    name: string = "";
    icon: string = "";
    extensions: string[] = [];
    properties: string[] = [];

    constructor(name: string, icon: string = "", extensions: string[] = [], properties: string[] = []) {
        this.name = name;
        this.icon = icon;
        this.properties = [...FileType.defaultProperties, ...properties];
        this.extensions = extensions;
        extensions.forEach((extension: string) => FileType.perExtension.set(extension, this));
        FileType.fileTypes.add(this);
    }

    static getCategoryPerType(filetype: FileType): string {
        return FileType.#categoryPerType.get(filetype) || "Unspecified";
    }

    static getFileTypePerExtension(extension: string): FileType {
        return FileType.perExtension.get(extension) || FileType.unspecifiedFileType;
    }
}

export abstract class AFile {
    valuesPerProperty: Map<string, any> = $state(new Map<string, any>());

    constructor(nameWithExtension: string) {
        if (nameWithExtension.includes(".") && !nameWithExtension.endsWith(".")) {
            let nameParts = nameWithExtension.split(".");
            let extension = nameParts.pop() as string;
            this.trySetProperty("Extension", extension);
            this.trySetProperty("Name", nameParts.join("."));
        }
        else {
            this.trySetProperty("Name", nameWithExtension);
        }
    }
    
    get preview(): string {
        return "/images/icon-generic.png";//this.fileType.icon;
    }

    tryGetProperty(propertyName: string): any {
        return this.valuesPerProperty.get(propertyName) || FileType.defaultsPerProperty.get(propertyName);
    }

    trySetProperty(propertyName: string, value: any): boolean {
        if (!this.fileType.properties.includes(propertyName)
            || typeof value !== typeof FileType.defaultsPerProperty.get(propertyName)) {
            return false;
        }

        this.valuesPerProperty.set(propertyName, value);

        if (propertyName === "Extension") {
            this.trySetProperty("Type", FileType.getFileTypeByExtension(value));
        }
        else if (propertyName === "Type") {
            let newType = value as FileType;
            let mandatedProperties = newType.properties;
            let oldProperties = [...this.valuesPerProperty.keys()];
            let obsoleteProperties = oldProperties.filter(it => !mandatedProperties.includes(it));
            let missingProperties = mandatedProperties.filter(it => !oldProperties.includes(it));
            
            obsoleteProperties.forEach(it => this.valuesPerProperty.delete(it));
            missingProperties.forEach(it => this.valuesPerProperty.set(it, FileType.defaultsPerProperty.get(it)));
        }

        return true;
    }
    
    get name(): string {
        return this.tryGetProperty("Name");
    }
    set name(newName: string) {
        this.trySetProperty("Name", newName);
    }

    get extension(): string {
        return this.tryGetProperty("Extension");
    }
    set extension(newExtension: string) {
        this.trySetProperty("Extension", newExtension);
    }
    
    get fileType(): FileType {
        return this.tryGetProperty("Type");
    }
    set fileType(newFileType: FileType) {
        this.trySetProperty("Type", newFileType);
    }
    
    get fileSize(): number {
        return this.tryGetProperty("Size");
    }
    set fileSize(newFileSize: number) {
        this.trySetProperty("Size", newFileSize);
    }
}

export class FileSector extends AFile {
    afiles: AFile[] = $state([]);
    previewSize: number = 21;
    nameSize: number = 13;
    
    #orderedProperty: string = "Name";

    constructor(name: string, files: AFile[] = []) {
        super(name);
        this.trySetProperty("Type", FileType.fileSectorFileType);
        this.afiles = files;
    }
    
    get sectors(): FileSector[] {
        return this.afiles.filter(it => it instanceof FileSector);
    }
    
    get files(): File[] {
        return this.afiles.filter(it => it instanceof File);
    }

    get orderedProperty(): string {
        return this.#orderedProperty;
    }
    set orderedProperty(newProperty: string) {
        this.#orderedProperty = newProperty;
        this.#sort(this.orderedProperty);
    }
    
    #sort(propertyName: string) {
        this.afiles.sort((a: AFile, b: AFile): number => {
            let orderedProperty = this.orderedProperty;
            let propertyA = a.tryGetProperty(orderedProperty);
            let propertyB = b.tryGetProperty(orderedProperty);
            if (orderedProperty === "Type") {
                propertyA = propertyA.name;
                propertyB = propertyB.name;
            }
            return propertyA < propertyB ? -1 : (propertyA > propertyB ? 1 : 0);
        });
    }
}

export class File extends AFile {
    #preview: string = $state("");

    constructor(name: string, preview: string = "") {
        super(name);
        this.#preview = preview;
    }

    // get preview(): string {
    //     return this.#preview === "" ? super.preview : this.#preview;
    // }
}