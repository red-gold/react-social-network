// - Import react components
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect, NavLink } from 'react-router-dom'

import asyncComponent from 'hoc/asyncComponent/asyncComponent'
import { IRouterProps } from './IRouterProps'

// - Async Components
const AsyncHome: any = asyncComponent(() => {
  return import('containers/home')
})

const AsyncSignup = asyncComponent(() => {
  return import('containers/signup')
})

const AsyncEmailVerification = asyncComponent(() => {
  return import('containers/emailVerification')
})

const AsyncResetPassword = asyncComponent(() => {
  return import('containers/resetPassword')
})

const AsyncLogin = asyncComponent(() => {
  return import('containers/login')
})

const AsyncSetting = asyncComponent(() => {
  return import('containers/setting')
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
