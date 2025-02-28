export class FileType {
    static #categoryPerType: Map<FileType, string> = new Map<FileType, string>();

    static defaultProperties: string[] = [ "File Name", "File Type", "File Size"];
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
        ["File Name", ""],
        ["File Type", FileType.unspecifiedFileType],
        ["File Size", 0],
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
    valuesPerProperty: Map<string, any> = new Map<string, any>();

    constructor(name: string) {
        this.trySetProperty("File Name", name); 
        this.fileType.properties.forEach(property => {
            this.trySetProperty(property, FileType.defaultsPerProperty.get(property)); 
        });
        this.trySetProperty("File Name", name); 
    }

    get extension(): string {
        let ext = this.fileName.split(".").reverse()[0];
        return ext;
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
        if (propertyName === "File Name") {
            this.trySetProperty("File Type", FileType.getFileTypeByExtension(this.extension));
        }
        return true;
    }
    
    get fileName(): string {
        return this.tryGetProperty("File Name");
    }
    set fileName(newName: string) {
        this.trySetProperty("File Name", newName);
    }
    
    get fileType(): FileType {
        return this.tryGetProperty("File Type");
    }
    set fileType(newFileType: FileType) {
        this.trySetProperty("File Type", newFileType);
    }
    
    get fileSize(): number {
        return this.tryGetProperty("File Size");
    }
    set fileSize(newFileSize: number) {
        this.trySetProperty("File Size", newFileSize);
    }
}

export class FileSector extends AFile {
    viewConfig: FileSectorViewConfig = new FileSectorViewConfig();
    files: AFile[] = [];

    constructor(name: string, files: AFile[] = []) {
        super(name);
        this.trySetProperty("File Type", FileType.fileSectorFileType);
        this.files = files;
    }
}

export class File extends AFile {
    #preview: string = "";

    //properties: <FileProperty, string>

    constructor(name: string, preview: string = "") {
        super(name);
        this.#preview = preview;
    }

    // get preview(): string {
    //     return this.#preview === "" ? super.preview : this.#preview;
    // }
}

export class FileSectorViewConfig {
    previewSize: number = 21;
    fileNameSize: number = 13;
    orderedProperty: string = "File Name";
}