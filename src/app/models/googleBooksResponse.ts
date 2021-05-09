export interface GoogleBooksResponse {
    items: BookItem[]
}

export interface BookItem{
    volumeInfo:VolumeInfo;
}

export interface VolumeInfo {
    title: string;
}

