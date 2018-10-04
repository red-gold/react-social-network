export class GalleryState {
    constructor(
       public status: boolean,
       public images: any[],
       public selectImage: string,
       public selectURL: string,
       public loaded: boolean,
       public imageURLList: any,
       public imageRequests: any,
    ) {}
}