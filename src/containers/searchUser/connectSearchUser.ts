import { Component, connect } from 'react-redux'

import { authorizeSelector } from 'store/reducers/authorize/authorizeSelector'
import { Map } from 'immutable'

// - Import actions
import * as userActions from 'src/store/actions/userActions'
import StringAPI from 'api/StringAPI'
import { ServerRequestType } from 'constants/serverRequestType'
import { User } from 'core/domain/users'
import { ISearchUserProps } from './ISearchUserProps'
import { userSelector } from 'store/reducers/users/userSelector'

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: ISearchUserProps) => {
  return {
    search: (query: string, page: number, limit: number) => dispatch(userActions.fetchUserSearch(query,page, limit))
  }
}

const makeMapStateToProps = () => {
  const selectCurrentUser = authorizeSelector.selectCurrentUser()
  const selectHasMorePeople = userSelector.selectMoreSearchPeople()
  const selectFindPeople = userSelector.selectSearchPeople()

  const mapStateToProps = (state: Map<string, any>, ownProps: ISearchUserProps) => {
    const currentUser = selectCurrentUser(state).toJS() as User
    const hasMorePeople = selectHasMorePeople(state)
    const info = selectFindPeople(state)
    return {
      
      peopleInfo: info,
      hasMorePeople
    }
  }
  return mapStateToProps
}

export const connectSearchUser =
  (component: Component<ISearchUserProps>) => connect(makeMapStateToProps, mapDispatchToProps)(component as any)