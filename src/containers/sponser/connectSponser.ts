import { connect } from 'react-redux'

import { authorizeSelector } from 'store/reducers/authorize/authorizeSelector'
import { Map } from 'immutable'

// - Import actions
import * as userActions from 'src/store/actions/userActions'
import StringAPI from 'api/StringAPI'
import { ServerRequestType } from 'constants/serverRequestType'
import { User } from 'core/domain/users'
import { ISponserProps } from './ISponserProps'
import { userSelector } from 'store/reducers/users/userSelector'
import { Component } from 'react'

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: ISponserProps) => {
  return {
  }
}

const makeMapStateToProps = () => {
  const selectCurrentUser = authorizeSelector.selectCurrentUser()

  const mapStateToProps = (state: Map<string, any>, ownProps: ISponserProps) => {
    const currentUser = selectCurrentUser(state).toJS() as User
    return {
      
    }
  }
  return mapStateToProps
}

export const connectSponser =
  (component: Component<ISponserProps>) => connect(makeMapStateToProps, mapDispatchToProps)(component as any)