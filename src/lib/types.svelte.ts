type ConstructorType<T = any> = (new (...args: any) => T);

// declare global {
//     interface Object {
//         isOfClass(a: ConstructorType): boolean;
//     }
// }
// Object.prototype.isOfClass = function(a: ConstructorType): boolean { return this instanceof a; };
/* causes error:
TypeError [ERR_INVALID_ARG_TYPE]: The "paths[1]" argument must be of type string. Received function 
at Object.resolve (node:path:214:9) 
at...
/**/

function isAOfClassB(a: ConstructorType|Object, b: ConstructorType): boolean {
    return ((a instanceof Function) ? a.prototype : a) instanceof b;
};

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

// export const getClassNameSymbol = Symbol();

// would be abstract, but that breaks the type check in fileCollection.getGroups
export class File {
    readonly propertyMap = $state(new PropertyMap());

    // static [getClassNameSymbol]() {
    //     // return "File"
    //     this.name;
    // }

    // [getClassNameSymbol]() {
    //     return "File"
    //     // this.name;
    // }

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
    #files                  = $state<Array<File>>([]);
    #fileCollectionLayout   = $state(new FileCollectionLayout());

    detailLayout            = $state(DetailLayout.Beside);
    inRows                  = $state(false);

    constructor(name: string, files: File[] = []) {
        super(name);
        this.propertyMap.set(PropertyType.fileFormat, Format.usualFormats.fileSectorFormat);
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
}

export class FileCollectionLayout {
    #files              = $state<Array<File>>([]);
    #orderedProperty    = $state(PropertyType.fileName);
    
    groupedProperty = $state<PropertyType|null>(null);
    previewSize     = $state(21);
    maxProperties   = $state(1);

    constructor(files: File[] = []) {
        this.#files = files;
        this.#orderedProperty = PropertyType.fileName;
        this.groupedProperty = PropertyType.fileType; //TEMP
    }

    get orderedProperty(): PropertyType {
        return this.#orderedProperty;
    }
    set orderedProperty(newProperty: PropertyType) {
        this.#orderedProperty = newProperty;

        if (newProperty != null) {
            this.#files.sort((fileA: File, fileB: File): number => {
                let orderedProperty = newProperty;
                let propertyA = fileA.propertyMap.get(newProperty);
                let propertyB = fileB.propertyMap.get(newProperty);
                
                if (orderedProperty === PropertyType.fileFormat) {
                    propertyA = propertyA.name;
                    propertyB = propertyB.name;
                }

                return propertyA < propertyB ? -1 : (propertyA > propertyB ? 1 : 0);
            });
        }
    }

    getFiles(fileClass: ConstructorType<File> = File) {
        return this.#files.filter(
            file => { 
                // return true;
                // return (file.constructor).isOfClass(fileClass);
                return isAOfClassB(file, fileClass);
            }
        );
    }

    getGroups(propertyType: PropertyType|null, fileClass: ConstructorType<File> = File) {
        let files = this.getFiles(fileClass);

        let newFileGroups: FileGroup[] = [];
        
        if (propertyType == null) {
            newFileGroups.push({
                propertyType: propertyType,
                legiblePropertyValue: null, 
                files: files
            } as FileGroup);
        }
        else {
            files.forEach(file => {
                let file_legiblePropValue = this.#toLegible(file.propertyMap.get(propertyType));
                let fileGroup = newFileGroups.find(it => it.legiblePropertyValue === file_legiblePropValue);

                if (fileGroup != null) {
                    fileGroup.files.push(file);
                }
                else {
                    newFileGroups.push({
                        propertyType: propertyType,
                        legiblePropertyValue: file_legiblePropValue, 
                        files: [file]
                    });
                }
            });
        }

        newFileGroups.sort((a, b) => {
            let aVal = a.legiblePropertyValue;
            let bVal = b.legiblePropertyValue;
            return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        });
        
        return newFileGroups;
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