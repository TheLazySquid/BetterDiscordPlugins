export interface IImg {
    name: string;
    lastModified: number;
    lastSent: number;
}

export interface IImgFolder {
    folders: string[];
    images: IImg[];
    path: string;
}

export type sortType = "lastSent" | "lastModified" | "name";