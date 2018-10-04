import {
  IAuthorizeService,
  ICircleService,
  ICommentService,
  ICommonService,
  IImageGalleryService,
  INotificationService,
  IUserService,
  IVoteService,
  IStorageService
} from 'core/services'

export interface IServiceProvider {

   /**
    * Create authorize service
    */
  createAuthorizeService: () => IAuthorizeService

  /**
   * Create instant for Circle Service
   */
  createCircleService: () => ICircleService

  /**
   * Create instant for Comment Service
   */
  createCommentService: () => ICommentService

  /**
   * Create instant for Notification Service
   */
  createNotificationService: () => INotificationService

  /**
   * Create instant for Vote Service
   */
  createVoteService: () => IVoteService

  /**
   * Create instant for Vote Service
   */
  createStorageService: () => IStorageService

}
