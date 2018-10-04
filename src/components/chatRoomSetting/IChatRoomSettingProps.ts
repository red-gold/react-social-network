import { ChatRoom } from 'core/domain/chat/chatRoom'
import { User } from 'core/domain/users'

export interface IChatRoomSettingProps {

  /**
   * Whether add video modal is open
   */
  open: boolean

  /**
   * Handle close add video modal
   */
  onClose: any

  /**
   * Wether left side chat is close
   */
  leftSideClose: boolean

  /**
   * Wether right side chat is close
   */
  rightSideDisabled: boolean

  /**
   * Current chat room
   */
  room: ChatRoom

  /**
   * Set chat room language
   */
  setLanguage?: (input: string, output: string, roomId: string) => any

  /**
   * Current user profile
   */
  currentUser: User

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  t?: (state: any) => any

}
