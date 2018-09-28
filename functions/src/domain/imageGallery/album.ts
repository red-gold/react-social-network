
import { AlbumType } from './albumType'
import { UserPermissionType } from '../common/userPermissionType'

export class Album {
    constructor(
        public id: string,
        public name: string,
        public type: AlbumType,
        public caption: string,
        public ownerUserId: string,
        public creationDate: number,
        public counter: number,
        public permsion: UserPermissionType,
        public accessUserList?: string[]
    ) {
        
    }
}