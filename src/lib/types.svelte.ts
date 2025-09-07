export class Format {
    // Property Strings
    static propertyKeyForName: string = "Name";
    static propertyKeyForExtension: string = "Extension";
    static propertyKeyForFormat: string = "Format";
    static propertyKeyForSize: string = "Size";
    static propertyKeyForImageWidth: string = "Image Width (px)";
    static propertyKeyForImageHeight: string = "Image Height (px)";
    //

    static #categoryPerFormat: Map<Format, string> = new Map<Format, string>();

    static defaultProperties: string[] = [
        Format.propertyKeyForName, 
        Format.propertyKeyForExtension, 
        Format.propertyKeyForFormat, 
        Format.propertyKeyForSize
    ];

    static perExtension: Map<string, Format> = new Map<string, Format>();
    static formats: Set<Format> = new Set<Format>();

    static unspecifiedFormat: Format = new Format("Unspecified");
    static fileSectorFormat: Format = new Format("File Sector");
    static pngFormat: Format = new Format(
        "Portable Network Graphics", 
        "", 
        [ "png" ], 
        [
            Format.propertyKeyForImageWidth,
            Format.propertyKeyForImageHeight
        ]
    );
    static exeFormat: Format = new Format(
        "Executable", 
        "", 
        [ "exe" ]
    );
    static docFormat: Format = new Format(
        "Word Document", 
        "", 
        [ "doc", "docx" ]
    );
    static txtFormat: Format = new Format(
        "Text", 
        "", 
        [ "txt" ]
    );
    static pdfFormat: Format = new Format(
        "Adobe Portable Document Format", 
        "", 
        [ "pdf" ]
    );

    static defaultsPerProperty: Map<string, any> = new Map<string, any>([
        [Format.propertyKeyForName, ""],
        [Format.propertyKeyForExtension, ""],
        [Format.propertyKeyForFormat, Format.unspecifiedFormat],
        [Format.propertyKeyForSize, 0],
        [Format.propertyKeyForImageWidth, 0],
        [Format.propertyKeyForImageHeight, 0]
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

    toString(): string {
        return this.name;
    }
}

export abstract class File {
    valuesPerProperty: Map<string, any> = $state(new Map<string, any>());

    constructor(nameWithExtension: string) {
        if (nameWithExtension.includes(".") && !nameWithExtension.endsWith(".")) {
            let nameParts = nameWithExtension.split(".");
            let extension = nameParts.pop() as string;
            this.trySetProperty(Format.propertyKeyForExtension, extension);
            this.trySetProperty(Format.propertyKeyForName, nameParts.join("."));
        }
        else {
            this.trySetProperty(Format.propertyKeyForName, nameWithExtension);
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

        if (propertyName === Format.propertyKeyForExtension) {
            this.trySetProperty(Format.propertyKeyForFormat, Format.getFileTypeByExtension(value));
        }
        else if (propertyName === Format.propertyKeyForFormat) {
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
    
    getProperties(): Array<{key: string, value: any}> {
        return this.valuesPerProperty.entries().toArray().map(entry => ({
            key: entry[0],
            value: entry[1]
        }));
    }

    getPropertiesByKeys(keys: Array<string>): Array<{key: string, value: any}> {
        return keys.map(key => ({
            key: key,
            value: this.tryGetProperty(key)
        }));
    }

    get name(): string {
        return this.tryGetProperty(Format.propertyKeyForName);
    }
    set name(newName: string) {
        this.trySetProperty(Format.propertyKeyForName, newName);
    }

    get extension(): string {
        return this.tryGetProperty(Format.propertyKeyForExtension);
    }
    set extension(newExtension: string) {
        this.trySetProperty(Format.propertyKeyForExtension, newExtension);
    }
    
    get format(): Format {
        return this.tryGetProperty(Format.propertyKeyForFormat);
    }
    set format(newFormat: Format) {
        this.trySetProperty(Format.propertyKeyForFormat, newFormat);
    }
    
    get fileSize(): number {
        return this.tryGetProperty(Format.propertyKeyForSize);
    }
    set fileSize(newFileSize: number) {
        this.trySetProperty(Format.propertyKeyForSize, newFileSize);
    }

    toString(): string {
        return this.name;
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
    #fileCollectionLayout: FileCollectionLayout = $state(new FileCollectionLayout());

    detailLayout: DetailLayout = $state(DetailLayout.Beside);
    inRows: boolean = $state(false);

    fileGroups: FileGroup[] = $derived(this.#groupFilesByProperty(this.files, this.#fileCollectionLayout.groupedProperty));
    assetGroups: FileGroup[] = $derived(this.#groupFilesByProperty(this.assets, this.#fileCollectionLayout.groupedProperty));
    sectorGroups: FileGroup[] = $derived(this.#groupFilesByProperty(this.sectors, this.#fileCollectionLayout.groupedProperty));

    constructor(name: string, files: File[] = []) {
        super(name);
        this.trySetProperty(Format.propertyKeyForFormat, Format.fileSectorFormat);
        this.#files = files;
        this.#fileCollectionLayout = new FileCollectionLayout(files);
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

    get fileCollectionLayout(): FileCollectionLayout {
        return this.#fileCollectionLayout;
    }

    #groupFilesByProperty<T extends File>(files: T[], property: any) {
        if (property === "") {
            return [{legiblePropertyValue: "", files: this.files} as FileGroup];
        }

        let newFileSorts: FileGroup[] = [];
        
        files.forEach(file => {
            let file_legiblePropValue = this.#toLegible(file.tryGetProperty(property));
            let fileSort = newFileSorts.find(it => it.legiblePropertyValue === file_legiblePropValue);
            if (fileSort != null) {
                fileSort.files.push(file);
            }
            else {
                newFileSorts.push({legiblePropertyValue: file_legiblePropValue, files: [file]});
            }
        });

        newFileSorts.sort((a, b) => {
            let aVal = a.legiblePropertyValue;
            let bVal = b.legiblePropertyValue;
            return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        })
        
        return newFileSorts;
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

    toString(): string {
        return this.name;
    }
}

export class FileCollectionLayout {
    #files: File[] = $state([]);
    
    previewSize: number = $state(21);
    groupedProperty: string = $state("");
    #orderedProperty: string = $state("");

    constructor(files: File[] = []) {
        this.#orderedProperty = Format.propertyKeyForName;
        this.groupedProperty = Format.propertyKeyForFormat; //TEMP
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
            if (orderedProperty === Format.propertyKeyForFormat) {
                propertyA = propertyA.name;
                propertyB = propertyB.name;
            }
            return propertyA < propertyB ? -1 : (propertyA > propertyB ? 1 : 0);
        });
    }
} // detailFlow, inRows

// Detail Info Properties
export enum DetailLayout {
    Below = "Below",
    Beside = "Beside",
    Tabular = "Tabular",
}

export type FileGroup = {
    legiblePropertyValue: any, 
    files: File[]
}