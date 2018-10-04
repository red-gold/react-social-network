
import {Map} from 'immutable'
import { UserSearchState } from 'models/users/userSearchState'
import { FindPeopleState } from 'models/users/findPeopleState'

export class UserState {
    constructor(
       public findPeople: FindPeopleState,
       public search: UserSearchState,
       public post: Map<string, Map<string,boolean>>,
       public openEditProfile: boolean,
       public entities: Map<string, Map<string, any>> // {[userId: string]: {post data}}
    ) {}
}