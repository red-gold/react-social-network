import { User } from 'core/domain/users'
import { UserFollower } from 'core/domain/circles'

export interface IUserBoxListComponentProps {

    /**
     * Users in the circle
     *
     * @type {{[userId: string]: User}}
     * @memberof IUserBoxListComponentProps
     */
  users: {[userId: string]: UserFollower}

    /**
     * User identifier
     *
     * @type {string}
     * @memberof IUserBoxListComponentProps
     */
  uid?: string
}
