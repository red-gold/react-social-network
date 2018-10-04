// - Import react components
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect, NavLink } from 'react-router-dom'

import Loadable from 'react-loadable'
import { Map } from 'immutable'

import { IRouterProps } from './IRouterProps'
import MasterLoadingComponent from 'components/masterLoading/MasterLoadingComponent'
import { RouteType } from 'routes/routeType'

/**
 * Loadable components
 */
// - Async Components
const AsyncStream = Loadable({
  loader: () => import('containers/stream'),
  loading: MasterLoadingComponent,
})
const AsyncProfile = Loadable({
  loader: () => import('containers/profile'),
  loading: MasterLoadingComponent,
})
const AsyncPostPage = Loadable({
  loader: () => import('containers/postPage'),
  loading: MasterLoadingComponent,
})
const AsyncPeople = Loadable({
  loader: () => import('containers/people'),
  loading: MasterLoadingComponent,
})
const AsyncExternalSocial = Loadable({
  loader: () => import('containers/externalSocial'),
  loading: MasterLoadingComponent,
})
const AsyncSearchUser = Loadable({
  loader: () => import('containers/searchUser'),
  loading: MasterLoadingComponent,
})
const AsyncSearchPost = Loadable({
  loader: () => import('containers/searchPost'),
  loading: MasterLoadingComponent,
})
const AsyncSearch = Loadable({
  loader: () => import('containers/search'),
  loading: MasterLoadingComponent,
})
const AsyncPhotoMaster = Loadable({
  loader: () => import('containers/photoMaster'),
  loading: MasterLoadingComponent,
})
const AsyncCompany = Loadable({
  loader: () => import('containers/company'),
  loading: MasterLoadingComponent,
})
const AsyncHelp = Loadable({
  loader: () => import('containers/help'),
  loading: MasterLoadingComponent,
})
const AsyncSponser = Loadable({
  loader: () => import('containers/sponser'),
  loading: MasterLoadingComponent,
})
const AsyncFun = Loadable({
  loader: () => import('containers/fun'),
  loading: MasterLoadingComponent,
})

/**
 * Routes
 */
const routes = [
  {
    path: '/people/:tab?',
    component: AsyncPeople,
    privateAuth: true
  },
  {
    path: '/tag/:tag',
    component: AsyncStream,
    privateAuth: true
  },
  {
    path: '/:userId/posts/:postId/:tag?',
    component: AsyncPostPage
  },
  {
    path: '/search/post',
    component: AsyncSearchPost
  },
  {
    path: '/company',
    component: AsyncCompany
  },
  {
    path: '/help',
    component: AsyncHelp
  },
  {
    path: '/u/:userId/album/:albumId',
    component: AsyncPhotoMaster
  },
  {
    path: '/search/user',
    component: AsyncSearchUser
  },
  {
    path: '/search',
    component: AsyncSearch
  },
  {
    path: '/:userId',
    component: AsyncProfile
  },
  {
    path: '/',
    component: AsyncStream,
    privateAuth: true
  }
]

/**
 * Home Router
 */
export class HomeRouter extends Component<IRouterProps, any> {
  render() {
    const { match, data, t } = this.props
    return (
      <Switch>
        {routes.map((route: RouteType, index) => {
          if (route.privateAuth) {
            return <PrivateRoute key={`home-route-private-${index}`} path={route.path} component={route.component} />
          } else if (route.publicAuth) {
            return <PublicRoute key={`home-route-public-${index}`} path={route.path} component={route.component} />
          } else if (route.defaultPath) {
            return <Route key={`home-route-default-${index}`}  component={route.component} />
          } else {
            return <Route key={`home-route-${index}`} path={route.path} component={route.component} />
          }
        })}
      </Switch>

    )
  }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch: any, ownProps: IRouterProps) => {

  return {}

}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IRouterProps) => {
  return {
     
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeRouter as any) as any) as typeof HomeRouter
