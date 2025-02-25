export type FileProperty = {
    name: string
}

export class FileType {
    static unspecifiedFileType: FileType = new FileType("Unspecified");
    
    static #categoryPerType: Map<FileType, string> = new Map<FileType, string>();
    static #perExtension: Map<string, FileType> = new Map<string, FileType>();

    name: string = "";
    icon: string = "";
    properties: FileProperty[] = [];

    constructor(name: string, icon: string = "", properties: FileProperty[] = []) {
        this.name = name;
    }

    static getCategoryPerType(filetype: FileType): string {
        let category = FileType.#categoryPerType.get(filetype);
        return typeof category === "string" ? category : "Unspecified";
    }

    static getPerExtension(extension: string): FileType {
        let filetype = FileType.#perExtension.get(extension);
        return filetype instanceof FileType ? filetype : FileType.unspecifiedFileType;
    }
}

export abstract class AFile {
    name: string = "";

    constructor(name: string) {
        this.name = name;
    }

    abstract get fileType(): FileType;

    get preview(): string {
        return "/images/icon-generic.png";//this.fileType.icon;
    }
}

export class FileSector extends AFile {
    static sectorFileType = new FileType("File Sector");

    viewConfig: FileSectorViewConfig = new FileSectorViewConfig();
    files: AFile[] = [];

    constructor(name: string, files: AFile[] = []) {
        super(name);
        this.files = files;
    }

    get fileType(): FileType {
        return FileSector.sectorFileType;
    }
}

export class File extends AFile {
    #preview: string = "";

    //properties: <FileProperty, string>

    constructor(name: string, preview: string = "") {
        super(name);
        this.#preview = preview;
    }

    get fileType(): FileType {
        return FileType.getPerExtension(this.extension);
    }

    get extension(): string {
        return ""; //ToDo: real functionality
    }

    // get preview(): string {
    //     return this.#preview === "" ? super.preview : this.#preview;
    // }
}

export class FileSectorViewConfig {
    previewSize: number = 34;
    filenameSize: number = 21;
}