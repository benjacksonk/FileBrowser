export class Format {
    static #categoryPerFormat: Map<Format, string> = new Map<Format, string>();

    static defaultProperties: string[] = [ "Name", "Extension", "Format", "Size"];
    static perExtension: Map<string, Format> = new Map<string, Format>();
    static formats: Set<Format> = new Set<Format>();

    static unspecifiedFormat: Format = new Format("Unspecified");
    static fileSectorFormat: Format = new Format("File Sector");
    static pngFormat: Format = new Format("Portable Network Graphics", "", 
        [ "png" ], [
        "Image Width (px)",
        "Image Height (px)"
    ]);
    static exeFormat: Format = new Format("Executable", "", 
        [ "exe" ]
    );
    static docFormat: Format = new Format("Word Document", "", 
        [ "doc", "docx" ]
    );
    static txtFormat: Format = new Format("Text", "", 
        [ "txt" ]
    );
    static pdfFormat: Format = new Format("Adobe Portable Document Format", "", 
        [ "pdf" ]
    );

    static defaultsPerProperty: Map<string, any> = new Map<string, any>([
        ["Name", ""],
        ["Extension", ""],
        ["Format", Format.unspecifiedFormat],
        ["Size", 0],
        ["Image Width (px)", 0],
        ["Image Height (px)", 0]
    ]);

    static getFileTypeByName(formatName: string): Format {
        return Format.formats.values().find(it => it.name === formatName) || Format.unspecifiedFormat;
    }

    static getFileTypeByExtension(extension: string): Format {
        return Format.perExtension.get(extension) || Format.unspecifiedFormat;
    }

    name: string = $state("");
    icon: string = $state("");
    extensions: string[] = $state([]);
    properties: string[] = $state([]);

    constructor(name: string, icon: string = "", extensions: string[] = [], properties: string[] = []) {
        this.name = name;
        this.icon = icon;
        this.properties = [...Format.defaultProperties, ...properties];
        this.extensions = extensions;
        extensions.forEach((extension: string) => Format.perExtension.set(extension, this));
        Format.formats.add(this);
    }

    static getCategoryPerType(format: Format): string {
        return Format.#categoryPerFormat.get(format) || "Unspecified";
    }

    static getFileTypePerExtension(extension: string): Format {
        return Format.perExtension.get(extension) || Format.unspecifiedFormat;
    }
}

export abstract class File {
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
        return this.valuesPerProperty.get(propertyName) || Format.defaultsPerProperty.get(propertyName);
    }

    trySetProperty(propertyName: string, value: any): boolean {
        if (!this.format.properties.includes(propertyName)
            || typeof value !== typeof Format.defaultsPerProperty.get(propertyName)) {
            return false;
        }

        this.valuesPerProperty.set(propertyName, value);

        if (propertyName === "Extension") {
            this.trySetProperty("Format", Format.getFileTypeByExtension(value));
        }
        else if (propertyName === "Format") {
            let newFormat = value as Format;
            let mandatedProperties = newFormat.properties;
            let oldProperties = [...this.valuesPerProperty.keys()];
            let obsoleteProperties = oldProperties.filter(it => !mandatedProperties.includes(it));
            let missingProperties = mandatedProperties.filter(it => !oldProperties.includes(it));
            
            obsoleteProperties.forEach(it => this.valuesPerProperty.delete(it));
            missingProperties.forEach(it => this.valuesPerProperty.set(it, Format.defaultsPerProperty.get(it)));
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
    
    get format(): Format {
        return this.tryGetProperty("Format");
    }
    set format(newFormat: Format) {
        this.trySetProperty("Format", newFormat);
    }
    
    get fileSize(): number {
        return this.tryGetProperty("Size");
    }
    set fileSize(newFileSize: number) {
        this.trySetProperty("Size", newFileSize);
    }
}

export class Asset /* or "Artifact" ? */ extends File {
    #preview: string = $state("");

    constructor(name: string, preview: string = "") {
        super(name);
        this.#preview = preview;
    }

    // get preview(): string {
    //     return this.#preview === "" ? super.preview : this.#preview;
    // }
}

export class FileSector extends File {
    #files: File[] = $state([]);
    #orderedProperty: string = $state("");

    groupedProperty: string = $state("");
    previewSize: number = 21;
    nameSize: number = 13;
    flow: Layout = $state(Layout.LandscapeColumns);

    fileGroups: FileGroup[] = $derived(this.#groupFilesByProperty(this.files, this.groupedProperty));
    assetGroups: FileGroup[] = $derived(this.#groupFilesByProperty(this.assets, this.groupedProperty));
    sectorGroups: FileGroup[] = $derived(this.#groupFilesByProperty(this.sectors, this.groupedProperty));

    constructor(name: string, files: File[] = []) {
        super(name);
        this.trySetProperty("Format", Format.fileSectorFormat);
        this.#files = files;
        this.orderedProperty = "Name";
        this.groupedProperty = "Format"; //TEMP
    }

    get files(): File[] {
        return [...this.#files];
    }

    get assets(): Asset[] {
        return this.#files.filter(it => it instanceof Asset);
    }

    get sectors(): FileSector[] {
        return this.#files.filter(it => it instanceof FileSector);
    }

    get orderedProperty(): string {
        return this.#orderedProperty;
    }
    set orderedProperty(newProperty: string) {
        this.#orderedProperty = newProperty;

        this.#files.sort((fileA: File, fileB: File): number => {
            let orderedProperty = newProperty;
            let propertyA = fileA.tryGetProperty(orderedProperty);
            let propertyB = fileB.tryGetProperty(orderedProperty);
            if (orderedProperty === "Format") {
                propertyA = propertyA.name;
                propertyB = propertyB.name;
            }
            return propertyA < propertyB ? -1 : (propertyA > propertyB ? 1 : 0);
        });
    }

    #groupFilesByProperty<T extends File>(files: T[], property: any) {
        if (property === "") {
            return [{legiblePropertyValue: "", files: this.files} as FileGroup];
        }

        let newFileGroups: FileGroup[] = [];
        
        files.forEach(file => {
            let file_legiblePropValue = this.#toLegible(file.tryGetProperty(property));
            let fileGroup = newFileGroups.find(it => it.legiblePropertyValue === file_legiblePropValue);
            if (fileGroup != null) {
                fileGroup.files.push(file);
            }
            else {
                newFileGroups.push({legiblePropertyValue: file_legiblePropValue, files: [file]});
            }
        });

        newFileGroups.sort((a, b) => {
            let aVal = a.legiblePropertyValue;
            let bVal = b.legiblePropertyValue;
            return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        })
        
        return newFileGroups;
    }

    #toLegible(val: any) {
        if (typeof val === 'object') {
            if (val instanceof Format || val instanceof FileCategory || val instanceof File) {
                return val.name;
            }

            return val.constructor.name;
        }

        return val;
    }
}

export class FileCategory {
    name: string = "";
}

export enum Layout {
    List ="List",
    PortraitColumns = "Portrait Columns",
    LandscapeColumns = "Landscape Columns",
    PortraitRows = "Portrait Rows",
    LandscapeRows = "Landscape Rows"
}

export type FileGroup = {
    legiblePropertyValue: any, 
    files: File[]
}