import { UserPermissionType } from '../common/userPermissionType'

export class Photo {
    constructor(
        public id: string,
        public fileName: string,
        public caption: string,
        public url: string,
        public thumbnail: string,
        public ownerUserId: string,
        public creationDate: number,
        public albumName: string,
        public albumId: string,
        public width: number,
        public height: number,
        public meta: any,
        public permission: UserPermissionType,
        public accessUserList?: string[]
    ) {
        
    }
}