export interface INotifyItemComponentProps {

  /**
   * Notification description
   *
   * @type {string}
   * @memberof INotifyItemComponentProps
   */
  description: string

  /**
   * User full name
   *
   * @type {string}
   * @memberof INotifyItemComponentProps
   */
  fullName: string

  /**
   * User avatar
   *
   * @type {string}
   * @memberof INotifyItemComponentProps
   */
  avatar: string

  /**
   * Notification has seen {true} or not {false}
   *
   * @type {boolean}
   * @memberof INotifyItemComponentProps
   */
  isSeen: boolean

  /**
   * Notification identifier
   *
   * @type {string}
   * @memberof INotifyItemComponentProps
   */
  id: string

  /**
   * Rediret to {url} route
   *
   * @memberof INotifyItemComponentProps
   */
  goTo?: (url: string) => any

  /**
   * Close a notification
   *
   * @memberof INotifyItemComponentProps
   */
  closeNotify?: () => void

  /**
   * Notifier identifier
   *
   * @type {string}
   * @memberof INotifyItemComponentProps
   */
  notifierUserId: string

  /**
   * The URL which notification mention
   *
   * @type {string}
   * @memberof INotifyItemComponentProps
   */
  url: string

  /**
   * Delete a notification
   *
   * @memberof INotifyItemComponentProps
   */
  deleteNotiy?: (notificationId: string) => any

  /**
   * Change notification status to has seen
   *
   * @memberof INotifyItemComponentProps
   */
  seenNotify?: (notificationId: string) => any

  /**
   * Material ui styles
   */
  classes?: any
}
