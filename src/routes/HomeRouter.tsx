// - Import react components
import PrivateRoute from './PrivateRoute'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect, NavLink } from 'react-router-dom'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'

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
    const { enabled, match, data, translate } = this.props
    const St = StreamComponent as any
    return (
          enabled ? (
          <Switch>
            <PrivateRoute path='/people/:tab?' component={<People />} />

            <PrivateRoute path='/tag/:tag' component={(
            <div><St displayWriting={false} homeTitle={`#${match.params.tag}`} posts={data.mergedPosts} /></div>
            )} />
            <Route path='/:userId/posts/:postId/:tag?' component={PostPage} />
            <Route path='/:userId' component={Profile} />
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
const mapStateToProps = (state: any, ownProps: IRouterProps) => {
  return {
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeRouter as any) as any) as typeof HomeRouter
