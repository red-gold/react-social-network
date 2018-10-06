import { connect } from 'react-redux'

import { authorizeSelector } from 'store/reducers/authorize/authorizeSelector'
import { Map } from 'immutable'

// - Import actions
import * as userActions from 'src/store/actions/userActions'
import StringAPI from 'api/StringAPI'
import { ServerRequestType } from 'constants/serverRequestType'
import { User } from 'core/domain/users'
import { IFindPeopleComponentProps } from './IFindPeopleComponentProps'
import { userSelector } from 'store/reducers/users/userSelector'
import { Component } from 'react'

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IFindPeopleComponentProps) => {
  return {
    loadPeople: (page: number, limit: number) => dispatch(userActions.dbFetchFindPeople(page, limit)),
    increasePage: () => dispatch(userActions.increaseFindPagePeoplePage())
  }
}

const makeMapStateToProps = () => {
  const selectCurrentUser = authorizeSelector.selectCurrentUser()
  const selectHasMorePeople = userSelector.selectMoreFindPeople()
  const selectFindPeople = userSelector.selectFindPeople()
  const selectPage = userSelector.selectFindPeoplePage()

  const mapStateToProps = (state: Map<string, any>, ownProps: IFindPeopleComponentProps) => {
    const currentUser = selectCurrentUser(state).toJS() as User
    const hasMorePeople = selectHasMorePeople(state)
    const info = selectFindPeople(state)
    const page = selectPage(state)
    return {
      
      peopleInfo: info,
      hasMorePeople,
      page
    }
  }
  return mapStateToProps
}

export const connectFindPeople =
  (component: Component<IFindPeopleComponentProps>) => connect(makeMapStateToProps, mapDispatchToProps)(component as any)