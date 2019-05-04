//#region Interfaces
import { ICircleService, ICommentService, INotificationService, IStorageService, IVoteService } from 'core/services';
import {
  CircleService,
  CommentService,
  NotificationService,
  StorageService,
  VoteService,
} from 'data/firestoreClient/services';
import { injectable } from 'inversify';

import { IServiceProvider } from './IServiceProvider';


//#endregion

//#region Service implemented classes

// - Firebase services
//#endregion
@injectable()
export class ServiceProvide implements IServiceProvider {

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
