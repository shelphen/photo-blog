export interface GalleryItem {
    id:string;
    absolute_url:string;
    description?:string;
    thumbnails:Array<{absolute_url:string}>;
}
