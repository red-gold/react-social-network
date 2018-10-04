
import { ICircleService } from 'core/services/circles/ICircleService'
import { Container } from 'inversify'
import { IUserService, IUserSettingService } from 'core/services/users'
import { SocialProviderTypes } from 'core/socialProviderTypes'
import { IAuthorizeService } from 'core/services/authorize'
import { ICommentService } from 'core/services/comments'
import { ICommonService } from 'core/services/common'
import { IStorageService } from 'core/services/files'
import { IImageGalleryService } from 'core/services/imageGallery'
import { INotificationService } from 'core/services/notifications'
import { IPostService } from 'core/services/posts'
import { IVoteService } from 'core/services/votes'
import { IUserTieService } from 'core/services/circles'
import { UserSettingService } from 'data/firestoreClient/services/users/UserSettingService'
import { IChatService } from 'core/services/chat'
import { ChatService } from 'data/firestoreClient/services/chat'

/**
 * Register algolia client dependecies
 */
export const useAlgolia = (container: Container) => {
  container.bind<IChatService>(SocialProviderTypes.ChatService).to(ChatService)

}
