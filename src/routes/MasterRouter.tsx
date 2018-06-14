// - Import react components
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect, NavLink } from 'react-router-dom'
import Loadable from 'react-loadable'

import { IRouterProps } from './IRouterProps'
import MasterLoadingComponent from 'components/masterLoading/MasterLoadingComponent'

// - Async Components
const AsyncHome: any = Loadable({
  loader: () => import('containers/home'),
  loading: MasterLoadingComponent,
})
const AsyncSignup = Loadable({
  loader: () => import('containers/signup'),
  loading: MasterLoadingComponent,
})
const AsyncEmailVerification = Loadable({
  loader: () => import('containers/emailVerification'),
  loading: MasterLoadingComponent,
})
const AsyncResetPassword = Loadable({
  loader: () => import('containers/resetPassword'),
  loading: MasterLoadingComponent,
})
const AsyncLogin = Loadable({
  loader: () => import('containers/login'),
  loading: MasterLoadingComponent,
})
const AsyncSetting = Loadable({
  loader: () => import('containers/setting'),
  loading: MasterLoadingComponent,
})

/**
 * Master router
 */
export class MasterRouter extends Component<IRouterProps, any> {
  render () {
    const { enabled, match, data } = this.props
    return (
        enabled ? (
        <Switch>
          <Route path='/signup' component={AsyncSignup} />
          <Route path='/emailVerification' component={AsyncEmailVerification} />
          <Route path='/settings' component={AsyncSetting} />
          <Route path='/resetPassword' component={AsyncResetPassword} />
          <PublicRoute path='/login' component={<AsyncLogin />} />
          <Route render={() => <AsyncHome uid={data.uid} />} />
        </Switch>)
          : ''

    )
  }
}
export default withRouter<any>(connect(null, null)(MasterRouter as any)) as typeof MasterRouter
