export interface GoogleBooksResponse {
    items: BookItem[]
}

export interface BookItem {
    id: string;
    volumeInfo: VolumeInfo;
}

export interface VolumeInfo {
    title: string;
    imageLinks: ImageLinks;
}

export interface ImageLinks {
    smallThumbnail: string;
}
