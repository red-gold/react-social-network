import { LocaleState } from 'models/locale/localeState'
import { UserState } from 'models/users/userState'
import { ChatState } from 'models/chat/chatState'
import { GalleryState } from 'models/gallery/galleryState'
import { NotifyState } from 'models/notifications/notifyState'
import { RouterState } from 'models/routerState'
import { CommonState } from 'models/common/commonState'
import { PostState } from 'models/posts/postState'
import { AuthorizeState } from 'models/authorize/authorizeState'
import { VoteState } from 'models/votes/voteState'
import { CircleState } from 'models/circles/circleState'
import { CommentState } from 'models/comments/commentState'

export class AppState {
    constructor(
        post: PostState,
        server: any,
        global: CommonState,
        userSetting: any,
        notify: NotifyState,
        router: RouterState,
        authorize: AuthorizeState,
        vote: VoteState,
        user: UserState,
        circle: CircleState,
        imageGallery: GalleryState,
        chat: ChatState,
        locale: LocaleState,
        comment: CommentState,
    ) {}
}
