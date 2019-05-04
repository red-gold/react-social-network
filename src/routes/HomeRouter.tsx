// - Import react components
import MasterLoadingComponent from 'components/masterLoading/MasterLoadingComponent';
import { Map } from 'immutable';
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { RouteType } from 'routes/routeType';

import { IRouterProps } from './IRouterProps';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeRouter as any) as any)
