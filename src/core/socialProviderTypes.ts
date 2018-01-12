/**
 * InversifyJS need to use the type as identifiers at runtime.
 * We use symbols as identifiers but you can also use classes and or string literals.
 */
export const SocialProviderTypes = {
  AuthorizeService: Symbol('AuthorizeService'),
  UserTieService: Symbol('UserTieService'),
  CircleService: Symbol('CircleService'),
  CommentService: Symbol('CommentService'),
  CommonService: Symbol('CommonService'),
  StorageService: Symbol('StorageService'),
  ImageGalleryService: Symbol('ImageGalleryService'),
  NotificationService: Symbol('NotificationService'),
  PostService: Symbol('PostService'),
  UserService: Symbol('UserService'),
  VoteService: Symbol('VoteService')
}
