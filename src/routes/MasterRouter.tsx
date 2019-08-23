// - Import react components
import MasterLoadingComponent from 'components/masterLoading/MasterLoadingComponent';
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { RouteType } from 'routes/routeType';

import { IRouterProps } from './IRouterProps';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// - Async Components
const AsyncHome: any = Loadable({
  loader: () => import('containers/home'),
  loading: MasterLoadingComponent
})
const AsyncSignup = Loadable({
  loader: () => import('containers/signupWrapper'),
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
  loader: () => import('containers/loginWrapper'),
  loading: MasterLoadingComponent,
})
const AsyncSetting = Loadable({
  loader: () => import('containers/config'),
  loading: MasterLoadingComponent,
})
const AsyncTerms = Loadable({
  loader: () => import('containers/terms'),
  loading: MasterLoadingComponent,
})
const AsyncSmsVerification = Loadable({
  loader: () => import('containers/smsVerification'),
  loading: MasterLoadingComponent,
})
const AsyncNewPassword = Loadable({
  loader: () => import('containers/newPassword'),
  loading: MasterLoadingComponent,
})

/**
 * Routes
 */
const routes = [
  {
    path: '/signup',
    component: AsyncSignup
  },
  {
    path: '/emailVerification',
    component: AsyncEmailVerification,
  },
  {
    path: '/smsVerification',
    component: AsyncSmsVerification,
    privateAuth: true
  },
  {
    path: '/settings',
    component: AsyncSetting,
    privateAuth: true
  },
  {
    path: '/resetPassword',
    component: AsyncResetPassword
  },
  {
    path: '/terms',
    component: AsyncTerms
  },
  {
    path: '/login',
    component: AsyncLogin,
    publicAuth: true
  },
  {
    path: '/newPassword',
    component: AsyncNewPassword,
    privateAuth: true
  },
  {
    component: AsyncHome,
    defaultPath: true
  }
]

/**
 * Master router
 */
export class MasterRouter extends Component<IRouterProps, any> {
  render() {
    return (
      <Switch>
        {routes.map((route: RouteType, index) => {
          if (route.privateAuth) {
            return <PrivateRoute key={`master-route-private-${index}`} path={route.path} component={route.component} />
          } else if (route.publicAuth) {
            return <PublicRoute key={`master-route-public-${index}`} path={route.path} component={route.component} />
          } else if (route.defaultPath) {
            return <Route key={`master-route-default-${index}`}  component={route.component} />
          } else {
            return <Route key={`master-route-${index}`} path={route.path} component={route.component} />
          }
        })}
      </Switch>

    )
  }
}
export default withRouter<any, any>(connect(null, null)(MasterRouter as any))
