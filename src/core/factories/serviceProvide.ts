//#region Interfaces

import { IServiceProvider } from 'core/factories'
import { injectable } from 'inversify'
import {
  IAuthorizeService,
  ICircleService,
  ICommentService,
  ICommonService,
  INotificationService,
  IPostService,
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
  NotificationService,
  VoteService,
  StorageService
} from 'data/firestoreClient/services'

//#endregion
@injectable()
export class ServiceProvide implements IServiceProvider {

  /**
   * Create instant for Authorize Service
   */
  createAuthorizeService: () => IAuthorizeService = () => {
    return new AuthorizeService()
  }

  /**
   * Create instant for Circle Service
   */
  createCircleService: () => ICircleService = () => {
    return new CircleService()
  }

  /**
   * Create instant for Comment Service
   */
  createCommentService: () => ICommentService = () => {
    return new CommentService()
  }

  /**
   * Create instant for Notification Service
   */
  createNotificationService: () => INotificationService = () => {
    return new NotificationService()
  }

  /**
   * Create instant for Vote Service
   */
  createVoteService: () => IVoteService = () => {
    return new VoteService()
  }

  /**
   * Create instant for Vote Service
   */
  createStorageService: () => IStorageService = () => {
    return new StorageService()
  }

}
