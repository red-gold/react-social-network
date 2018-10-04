import { BaseDomain } from '../common'
import { User } from './user'
import { UserPermissionType } from 'core/domain/common/userPermissionType'

export class UserIndex extends BaseDomain {

    static map(user: User) {
        const userIndex = {objectID: (user.userId || (user as any).id), ...user}
        return userIndex
    }
    static mapToUser(userIndex: UserIndex) {
        const user = new User(
            userIndex.avatar,
            userIndex.fullName,
            userIndex.banner,
            userIndex.tagLine,
            userIndex.creationDate,
            userIndex.email,
            userIndex.birthday,
            userIndex.webUrl,
            userIndex.companyName,
            userIndex.twitterId,
            userIndex.voteCount,
            userIndex.shareCount,
            userIndex.followCount,
            userIndex.followerCount,
            userIndex.postCount,
            userIndex.userId,
            userIndex.facebookId,
            userIndex.instagramId,
            userIndex.accessUserList,
            userIndex.permission
        )
       
        return user
    }

    constructor(
        public objectID: string,
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