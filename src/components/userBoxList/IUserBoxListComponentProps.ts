import { User } from 'core/domain/users'
import { UserTie } from 'core/domain/circles'
import {Map} from 'immutable'

export interface IUserBoxListComponentProps {

    /**
     * Users in the circle
     *
     * @type {{[userId: string]: User}}
     * @memberof IUserBoxListComponentProps
     */
  users: Map<string, UserTie>

    /**
     * User identifier
     *
     * @type {string}
     * @memberof IUserBoxListComponentProps
     */
  uid?: string
}
