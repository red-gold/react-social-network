import { UserPermissionType } from 'core/domain/common/userPermissionType'
import { AlbumType } from './albumType'

export class Album {
    constructor(
        public photos: {url: string, fileName: string, fileId: string}[],
        public cover: string,
        public coverId: string,
        public count: number,
        public title: string
    ) {
        
    }
}