import { Component, connect } from 'react-redux'

import { authorizeSelector } from 'store/reducers/authorize/authorizeSelector'
import { Map } from 'immutable'

// - Import actions
import * as userActions from 'src/store/actions/userActions'
import StringAPI from 'api/StringAPI'
import { ServerRequestType } from 'constants/serverRequestType'
import { User } from 'core/domain/users'
import { IFunProps } from './IFunProps'
import { userSelector } from 'store/reducers/users/userSelector'

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IFunProps) => {
  return {
  }
}

const makeMapStateToProps = () => {
  const selectCurrentUser = authorizeSelector.selectCurrentUser()

  const mapStateToProps = (state: Map<string, any>, ownProps: IFunProps) => {
    const currentUser = selectCurrentUser(state).toJS() as User
    return {
      
    }
  }
  return mapStateToProps
}

export const connectFun =
  (component: Component<IFunProps>) => connect(makeMapStateToProps, mapDispatchToProps)(component as any)