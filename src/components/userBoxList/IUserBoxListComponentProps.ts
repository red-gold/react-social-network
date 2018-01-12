import { User } from 'core/domain/users'
import { UserTie } from 'core/domain/circles'

export interface IUserBoxListComponentProps {

    /**
     * Users in the circle
     *
     * @type {{[userId: string]: User}}
     * @memberof IUserBoxListComponentProps
     */
  users: {[userId: string]: UserTie}

    /**
     * User identifier
     *
     * @type {string}
     * @memberof IUserBoxListComponentProps
     */
  uid?: string
}
