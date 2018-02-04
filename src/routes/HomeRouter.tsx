// - Import react components
import PrivateRoute from './PrivateRoute'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect, NavLink } from 'react-router-dom'

// - Import app components
import StreamComponent from 'components/stream'
import Profile from 'components/profile'
import PostPage from 'components/postPage'
import People from 'components/people'

import { IRouterProps } from './IRouterProps'

/**
 * Home Router
 */
export class HomeRouter extends Component<IRouterProps, any> {
  render () {
    const { enabled, match, data } = this.props
    const St = StreamComponent as any
    return (
          enabled ? (
          <Switch>
            <PrivateRoute path='/people/:tab?' component={<People />} />

            <PrivateRoute path='/tag/:tag' component={(
            <div className='blog'><St displayWriting={false} homeTitle={`#${match.params.tag}`} posts={data.mergedPosts} /></div>
            )} />
            <Route path='/:userId/posts/:postId/:tag?' component={PostPage} />
            <Route path='/:userId' component={Profile} />
            <PrivateRoute path='/' component={(
            <div className='blog'>
            <St
            homeTitle='Home'
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
export default withRouter(connect(null, null)(HomeRouter as any) as any)
