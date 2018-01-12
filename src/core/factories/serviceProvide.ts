//#region Interfaces

import { IServiceProvider } from 'core/factories'
import { injectable } from 'inversify'
import {
  IAuthorizeService,
  ICircleService,
  ICommentService,
  ICommonService,
  IImageGalleryService,
  INotificationService,
  IPostService,
  IUserService,
  IVoteService,
  IStorageService
} from 'core/services'

//#endregion

//#region Service implemented classes

// - Firebase services
import {
  AuthorizeService,
  CircleService,
  CommentService,
  CommonService,
  ImageGalleryService,
  NotificationService,
  PostService,
  UserService,
  VoteService,
  StorageService
} from 'data/firestoreClient/services'

//#endregion
@injectable()
export class ServiceProvide implements IServiceProvider {

  /**
   * Create instant for Authorize Service
   *
   * @memberof ServiceProvide
   */
  createAuthorizeService: () => IAuthorizeService = () => {
    return new AuthorizeService()
  }

  /**
   * Create instant for Circle Service
   *
   * @memberof ServiceProvide
   */
  createCircleService: () => ICircleService = () => {
    return new CircleService()
  }

  /**
   * Create instant for Comment Service
   *
   * @memberof ServiceProvide
   */
  createCommentService: () => ICommentService = () => {
    return new CommentService()
  }

  /**
   * Create instant for Common Service
   *
   * @memberof ServiceProvide
   */
  createCommonService: () => ICommonService = () => {
    return new CommonService()
  }

  /**
   * Create instant for ImageGallery Service
   *
   * @memberof ServiceProvide
   */
  createImageGalleryService: () => IImageGalleryService = () => {
    return new ImageGalleryService()
  }

  /**
   * Create instant for Notification Service
   *
   * @memberof ServiceProvide
   */
  createNotificationService: () => INotificationService = () => {
    return new NotificationService()
  }

  /**
   * Create instant for Post Service
   *
   * @memberof ServiceProvide
   */
  createPostService: () => IPostService = () => {
    return new PostService()
  }

  /**
   * Create instant for User Service
   *
   * @memberof ServiceProvide
   */
  createUserService: () => IUserService = () => {
    return new UserService()
  }

  /**
   * Create instant for Vote Service
   *
   * @memberof ServiceProvide
   */
  createVoteService: () => IVoteService = () => {
    return new VoteService()
  }

  /**
   * Create instant for Vote Service
   *
   * @memberof ServiceProvide
   */
  createStorageService: () => IStorageService = () => {
    return new StorageService()
  }

}
