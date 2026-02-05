export enum FileType {
    Uncategorized   = "Uncategorized",
    Application     = "Application",
    Audio           = "Audio",
    Directory       = "Directory",
    Image           = "Image",
    TextDocument    = "Text Document",
    Video           = "Video",
}

export enum PropertyType {
    fileExtension   = "Extension",
    fileFormat      = "Format",
    fileMass        = "Mass",
    fileName        = "Name",
    fileType        = "Type",
    heightPixels    = "Height (px)",
    widthPixels     = "Width (px)",
}

export class Format {
    name        = $state("");
    icon        = $state("");
    fileType    = $state(FileType.Uncategorized);
    extensions  = $state<Array<string>>([]);

    static #fileTypePerFormat   = new Map<Format, FileType>();
    
    static perExtension         = new Map<string, Format>();
    static formats              = new Set<Format>();
    
    static usualFormats = {
        defaultFormat: new Format(
            "Unformatted File", 
            FileType.Uncategorized
        ),
        
        fileSectorFormat: new Format(
            "File Sector", 
            FileType.Directory
        ),
        
        pngFormat: new Format(
            "Portable Network Graphics", 
            FileType.Uncategorized, 
            [ "png" ], 
            ""
        ),

        exeFormat: new Format(
            "Executable", 
            FileType.Application, 
            [ "exe" ], 
            ""
        ),

        docFormat: new Format(
            "Word Document", 
            FileType.TextDocument, 
            [ "doc", "docx" ], 
            ""
        ),

        txtFormat: new Format(
            "Text", 
            FileType.TextDocument, 
            [ "txt" ],
            ""
        ),

        pdfFormat: new Format(
            "Adobe Portable Document Format", 
            FileType.Uncategorized, 
            [ "pdf" ], 
            ""
        )
    }

    constructor(name: string, category: FileType, extensions: string[] = [], icon: string = "") {
        this.name = name;
        this.icon = icon;
        this.fileType = category;
        this.extensions = extensions;
        extensions.forEach(extension => Format.perExtension.set(extension, this));
        Format.formats.add(this);
    }

    static getFileTypePerFormat(format: Format): FileType | undefined {
        return Format.#fileTypePerFormat.get(format);
    }
    
    static getFormatByName(formatName: string): Format | undefined {
        return Format.formats.values().find(it => it.name === formatName);
    }

    static getFormatByExtension(extension: string): Format | undefined {
        return Format.perExtension.get(extension);
    }

    toString(): string {
        return this.name;
    }
}

export class PropertyMap extends Map<PropertyType, any> {
    static readonly #defaultValues 
    = new Map<PropertyType, any>([
        [PropertyType.fileExtension, ""],
        [PropertyType.fileFormat, Format.usualFormats.defaultFormat],
        [PropertyType.fileMass, 0],
        [PropertyType.fileName, ""],
        [PropertyType.fileType, FileType.Uncategorized],
        [PropertyType.heightPixels, 0],
        [PropertyType.widthPixels, 0]
    ]);

    static readonly #commonProperties: Array<PropertyType> 
    = [
        PropertyType.fileName,
        PropertyType.fileExtension,
        PropertyType.fileFormat,
        PropertyType.fileType,
        PropertyType.fileMass,
    ];

    static readonly propertiesPerFileType
    = new Map<FileType, Array<PropertyType>>([
        [FileType.Uncategorized, []],
        [FileType.Application, []],
        [FileType.Audio, []],
        [FileType.Directory, []],
        [FileType.Image, [
            PropertyType.heightPixels,
            PropertyType.widthPixels
        ]],
        [FileType.TextDocument, []],
        [FileType.Video, []]
    ]);

    constructor(types: Array<PropertyType> = []) {
        let typeSet: Set<PropertyType> 
        = new Set(PropertyMap.#commonProperties).union(new Set(types));

        let initialEntries: Array<[PropertyType, any]> 
        = typeSet.values().toArray().map(type => [type, PropertyMap.#defaultValues.get(type)]);

        super();
        initialEntries.forEach(entry => super.set(entry[0], entry[1]));
    }

    override get(key: PropertyType) {
        return super.get(key) ?? PropertyMap.#defaultValues.get(key);
    }

    override set(key: PropertyType, value: any): this {
        super.set(key, value);

        if (key === PropertyType.fileExtension) {
            this.set(PropertyType.fileFormat, Format.getFormatByExtension(value));
        }
        else if (key === PropertyType.fileFormat) {
            let format = value as Format;
            if (!(format instanceof Format)) { console.error("value not instanceof Format"); }
            this.set(PropertyType.fileType, format.fileType);
        }
        else if (key === PropertyType.fileType) {
            let oldFileType: FileType = this.get(PropertyType.fileType);
            let newFileType: FileType = value as FileType;

            if (PropertyMap.propertiesPerFileType == undefined) {
                console.error("PropertyMap.perFileType == undefined");
            }
            
            let oldPropTypes = new Set<PropertyType>(PropertyMap.propertiesPerFileType.get(oldFileType));
            let reqPropTypes = new Set<PropertyType>(PropertyMap.propertiesPerFileType.get(newFileType));
            
            let obsoletePropTypes = oldPropTypes.difference(reqPropTypes);
            let missingPropTypes = reqPropTypes.difference(oldPropTypes);

            obsoletePropTypes.forEach(propType => this.delete(propType));
            missingPropTypes.forEach(propType => this.set(propType, PropertyMap.#defaultValues.get(propType)));
        }

        return this;
    }
}

// would be abstract, but that breaks the type check in fileCollection.getGroups
export class File {
    readonly propertyMap = $state(new PropertyMap());

    constructor(nameWithExtension: string) {
        if (nameWithExtension.includes(".")) {
            let nameParts = nameWithExtension.split(".");
            let extension = nameParts.pop() as string;
            this.propertyMap.set(PropertyType.fileName, nameParts.join("."));
            this.propertyMap.set(PropertyType.fileExtension, extension);
        }
        else {
            this.propertyMap.set(PropertyType.fileName, nameWithExtension);
        }
    }
    
    get preview(): string {
        return "/images/icon-generic.png";//this.fileType.icon;
    }

    isAsset(): this is Asset {
        return this instanceof Asset;
    }

    isSector(): this is FileSector {
        return this instanceof FileSector;
    }

    toString(): string {
        return this.propertyMap.get(PropertyType.fileName);
    }
}

// possibly "Artifact"
export class Asset extends File {
    #preview = $state<string>("");

    // override [getClassNameSymbol]() {
    //     return "Asset";
    // }

    constructor(name: string, preview: string = "") {
        super(name);
        this.#preview = preview;
    }

    // get preview(): string {
    //     return this.#preview === "" ? super.preview : this.#preview;
    // }
}

export class FileSector extends File {
    #files = $state<Array<File>>([]);

    fileCollectionLayout = $state(new FileCollectionLayout());

    constructor(name: string, files: Array<File> = []) {
        super(name);
        this.propertyMap.set(PropertyType.fileFormat, Format.usualFormats.fileSectorFormat);
        this.#files = files;
        this.fileCollectionLayout = new FileCollectionLayout();
    }

    getFiles(
        fileClass: typeof File = File, 
        orderProperty: PropertyType = this.fileCollectionLayout.orderProperty, 
        orderReversal: boolean = this.fileCollectionLayout.orderReversal
    ): Array<File> {
        let files = [...this.#files]
        .filter(file => file instanceof fileClass)
        .sort((fileA: File, fileB: File): number => {
            let valueA = fileA.propertyMap.get(orderProperty);
            let valueB = fileB.propertyMap.get(orderProperty);

            if (orderProperty === PropertyType.fileFormat) {
                valueA = valueA.name;
                valueB = valueB.name;
            }

            return valueA < valueB ? -1 : (valueA > valueB ? 1 : 0);
        });

        return orderReversal ? files.reverse() : files;
    }

    getFileGroups(
        fileClass:      typeof File = File,
        groupProperty:  PropertyType|null = this.fileCollectionLayout.groupProperty, 
        groupReversal:  boolean = this.fileCollectionLayout.groupReversal, 
        orderProperty:  PropertyType = this.fileCollectionLayout.orderProperty, 
        orderReversal:  boolean = this.fileCollectionLayout.orderReversal
    ): Array<FileGroup> {
        let files = this.getFiles(fileClass, orderProperty, orderReversal);

        let newFileGroups: FileGroup[] = [];
        
        if (groupProperty == null) {
            newFileGroups.push({
                propertyType: groupProperty,
                legiblePropertyValue: null, 
                files: files
            } as FileGroup);
        }
        else {
            files.forEach(file => {
                let file_legiblePropValue = this.#toLegible(file.propertyMap.get(groupProperty));
                let fileGroup = newFileGroups.find(it => it.legiblePropertyValue === file_legiblePropValue);

                if (fileGroup != null) {
                    fileGroup.files.push(file);
                }
                else {
                    newFileGroups.push({
                        propertyType: groupProperty,
                        legiblePropertyValue: file_legiblePropValue, 
                        files: [file]
                    });
                }
            });
        }

        newFileGroups.sort((a, b) => {
            let aValue = a.legiblePropertyValue;
            let bValue = b.legiblePropertyValue;
            return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        });
        
        return groupReversal ? newFileGroups.reverse() : newFileGroups;
    }

    #toLegible(val: any) {
        if (typeof val === 'object') {
            if (val instanceof File) {
                return val.propertyMap.get(PropertyType.fileName);
            }
            
            if (val instanceof Format) {
                return val.name;
            }

            return val.constructor.name;
        }

        return val;
    }
}

export class FileCollectionLayout {
    orderProperty   = $state<PropertyType>(PropertyType.fileName);
    orderReversal   = $state<boolean>(false);
    groupProperty   = $state<PropertyType|null>(null);
    groupReversal   = $state<boolean>(false);
    previewSize     = $state<number>(19);
    maxProperties   = $state<number>(1);
    detailLayout    = $state<DetailLayout>(DetailLayout.Beside);
    stackFiles      = $state<boolean>(true);
    showExtensions  = $state<boolean>(true);
};

// Detail Info Properties
export enum DetailLayout {
    Below = "Below",
    Beside = "Beside",
    Tabular = "Tabular",
}

export type FileGroup = {
    propertyType: PropertyType|null,
    legiblePropertyValue: any, 
    files: File[]
}

export class PropertyVisibilities {
    #visibilitiesPerPropertyKey: Map<string, VisibilityLevel> = new Map<string, VisibilityLevel>();
    
    get(level: VisibilityLevel): Array<string> {
        return this.#visibilitiesPerPropertyKey
        .entries()
        .filter(entry => entry[1] == level)
        .map(entry => entry[0])
        .toArray();
    }
}

export enum VisibilityLevel {
    Show    = "Show",
    Allow   = "Allow",
    Hide    = "Hide",
}