import { IAuthorizeService } from 'services/authorize/IAuthorizeService'
import { ICircleService } from 'services/circles'
import { ICommentService } from 'services/comments'
import { ICommonService } from 'services/common'
import { IImageGalleryService } from 'services/imageGallery'
import { INotificationService } from 'services/notifications'
import { IPostService } from 'services/posts'
import { IUserService } from 'services/users'
import { IVoteService } from 'services/votes'

export interface IServiceProvider {

   /**
    * Create authorize service
    *
    * @memberof IServiceProvider
    */
  createAuthorizeService: () => IAuthorizeService

  /**
   * Create instant for Circle Service
   *
   * @memberof ServiceProvide
   */
  createCircleService: () => ICircleService

  /**
   * Create instant for Comment Service
   *
   * @memberof ServiceProvide
   */
  createCommentService: () => ICommentService

  /**
   * Create instant for Common Service
   *
   * @memberof ServiceProvide
   */
  createCommonService: () => ICommonService

  /**
   * Create instant for ImageGallery Service
   *
   * @memberof ServiceProvide
   */
  createImageGalleryService: () => IImageGalleryService

  /**
   * Create instant for Notification Service
   *
   * @memberof ServiceProvide
   */
  createNotificationService: () => INotificationService

  /**
   * Create instant for Post Service
   *
   * @memberof ServiceProvide
   */
  createPostService: () => IPostService

  /**
   * Create instant for User Service
   *
   * @memberof ServiceProvide
   */
  createUserService: () => IUserService

  /**
   * Create instant for Vote Service
   *
   * @memberof ServiceProvide
   */
  createVoteService: () => IVoteService

}
