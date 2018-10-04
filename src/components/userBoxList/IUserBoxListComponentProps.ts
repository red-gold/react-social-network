import { User } from 'core/domain/users'
import { UserTie } from 'core/domain/circles'
import {Map, List} from 'immutable'

export interface IUserBoxListComponentProps {

    /**
     * Users in the circle
     */
  users: List<Map<string, any>>

    /**
     * User identifier
     */
  uid?: string
}
