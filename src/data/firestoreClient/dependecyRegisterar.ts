import { GraphService } from './services/graphs/GraphService'
import { IGraphService } from './services/graphs/IGraphService'
import { VoteService } from './services/votes/VoteService'
import { PostService } from './services/posts/PostService'
import { StorageService } from './services/files/StorageService'
import { CommonService } from './services/common/CommonService'
import { CommentService } from './services/comments/CommentService'
import { ICircleService } from 'core/services/circles/ICircleService'
import { Container } from 'inversify'
import { IUserService } from 'core/services/users'
import { SocialProviderTypes } from 'core/socialProviderTypes'
import { UserService } from './services/users/UserService'
import { IAuthorizeService } from 'core/services/authorize'
import { AuthorizeService } from './services/authorize/AuthorizeService'
import { CircleService } from './services/circles/CircleService'
import { ICommentService } from 'core/services/comments'
import { ICommonService } from 'core/services/common'
import { IStorageService } from 'core/services/files'
import { IImageGalleryService } from 'core/services/imageGallery'
import { INotificationService } from 'core/services/notifications'
import { IPostService } from 'core/services/posts'
import { IVoteService } from 'core/services/votes'
import { ImageGalleryService } from './services/imageGallery/ImageGalleryService'
import { NotificationService } from './services/notifications'
import { FirestoreClientTypes } from './firestoreClientTypes'
import { IUserTieService } from 'core/services/circles'
import { UserTieService } from './services/circles/UserTieService'

/**
 * Register firestore client dependecies
 * @param container DI container
 */
export const useFirestore = (container: Container) => {
  container.bind<IAuthorizeService>(SocialProviderTypes.AuthorizeService).to(AuthorizeService)
  container.bind<ICircleService>(SocialProviderTypes.CircleService).to(CircleService)
  container.bind<ICommentService>(SocialProviderTypes.CommentService).to(CommentService)
  container.bind<ICommonService>(SocialProviderTypes.CommonService).to(CommonService)
  container.bind<IStorageService>(SocialProviderTypes.StorageService).to(StorageService)
  container.bind<IImageGalleryService>(SocialProviderTypes.ImageGalleryService).to(ImageGalleryService)
  container.bind<INotificationService>(SocialProviderTypes.NotificationService).to(NotificationService)
  container.bind<IPostService>(SocialProviderTypes.PostService).to(PostService)
  container.bind<IUserService>(SocialProviderTypes.UserService).to(UserService)
  container.bind<IVoteService>(SocialProviderTypes.VoteService).to(VoteService)
  container.bind<IGraphService>(FirestoreClientTypes.GraphService).to(GraphService)
  container.bind<IUserTieService>(SocialProviderTypes.UserTieService).to(UserTieService)

}
