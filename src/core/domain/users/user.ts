import { BaseDomain } from 'core/domain/common'
import { UserPermissionType } from 'core/domain/common/userPermissionType'

export class User extends BaseDomain {

    constructor (
        public avatar: string,
        public fullName: string,
        public banner: string,
        public tagLine: string,
        public creationDate: number,
        public email?: string | null,
        public birthday?: number,
        public webUrl?: string,
        public companyName?: string,
        public twitterId?: string,
        public voteCount?: number,
        public shareCount?: number,
        public followCount?: number,
        public followerCount?: number,
        public postCount?: number,
        public userId?: string,
        public facebookId?: string,
        public instagramId?: string,
        public accessUserList?: Array<string>,
        public permission: UserPermissionType = UserPermissionType.Public
        
      ) {
        super()
    
      }

}
