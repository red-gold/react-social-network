//#region Interfaces

import { IServiceProvider } from 'factories'
import { IAuthorizeService } from 'services/authorize'
import { ICircleService } from 'services/circles'
import { ICommentService } from 'services/comments'
import { ICommonService } from 'services/common'
import { IImageGalleryService } from 'services/imageGallery'
import { INotificationService } from 'services/notifications'
import { IPostService } from 'services/posts'
import { IUserService } from 'services/users'
import { IVoteService } from 'services/votes'

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
  VoteService
} from 'firebaseClient/services'

//#endregion

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

}
