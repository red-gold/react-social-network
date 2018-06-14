// - Import react components
import PrivateRoute from './PrivateRoute'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect, NavLink } from 'react-router-dom'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import Loadable from 'react-loadable'
import { Map } from 'immutable'

import { IRouterProps } from './IRouterProps'
import MasterLoadingComponent from 'components/masterLoading/MasterLoadingComponent'

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

/**
 * Home Router
 */
export class HomeRouter extends Component<IRouterProps, any> {
  render () {
    const { enabled, match, data, translate } = this.props
    const St = AsyncStream
    return (
          enabled ? (
          <Switch>
            <PrivateRoute path='/people/:tab?' component={<AsyncPeople />} />

            <PrivateRoute path='/tag/:tag' component={(
            <div><St displayWriting={false} homeTitle={`#${match.params.tag}`} posts={data.mergedPosts} /></div>
            )} />
            <Route path='/:userId/posts/:postId/:tag?' component={AsyncPostPage} />
            <Route path='/:userId' component={AsyncProfile} />
            <PrivateRoute path='/' component={(
            <div>
            <St
            homeTitle={translate!('header.home')}
            posts={data.mergedPosts}
            loadStream={data.loadDataStream}
            hasMorePosts={data.hasMorePosts}
            displayWriting={true} />
            </div>
            )} />
          </Switch>
          )
          : ''

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
    translate: getTranslate(state.get('locale')),
    currentLanguage: getActiveLanguage(state.get('locale')).code,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeRouter as any) as any) as typeof HomeRouter
