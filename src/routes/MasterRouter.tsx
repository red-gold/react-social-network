// - Import react components
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect, NavLink } from 'react-router-dom'

// - Import app components
import Home from 'components/home'
import Signup from 'components/signup'
import EmailVerification from 'components/emailVerification'
import Login from 'components/login'
import ResetPassword from 'components/resetPassword'
import Setting from 'components/setting'

import { IRouterProps } from './IRouterProps'

/**
 * Master router
 */
export class MasterRouter extends Component<IRouterProps, any> {
  render () {
    const { enabled, match, data } = this.props
    return (
        enabled ? (
        <Switch>
          <Route path='/signup' component={Signup} />
          <Route path='/emailVerification' component={EmailVerification} />
          <Route path='/settings' component={Setting} />
          <Route path='/resetPassword' component={ResetPassword} />
          <PublicRoute path='/login' component={<Login />} />
          <Route render={() => <Home uid={data.uid} />} />
        </Switch>)
          : ''

    )
  }
}
export default withRouter<any>(connect(null, null)(MasterRouter as any)) as typeof MasterRouter
