// - Import react components
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { translate, Trans } from 'react-i18next'

// - Material-UI
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import { grey, teal } from '@material-ui/core/colors'
import SvgCamera from '@material-ui/icons/PhotoCamera'
import Paper from '@material-ui/core/Paper'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'

import { Map, List as ImuList } from 'immutable'

// - Import app components
import PostComponent from 'src/components/post'
import PostWriteComponent from 'src/components/postWrite'
import UserAvatarComponent from 'src/components/userAvatar'
import PostStreamComponent from 'src/containers/postStream'
import LoadMoreProgressComponent from 'src/layouts/loadMoreProgress'

// - Import API
import * as PostAPI from 'src/api/PostAPI'

// - Import actions
import * as globalActions from 'src/store/actions/globalActions'

import { IStreamComponentProps } from './IStreamComponentProps'
import { IStreamComponentState } from './IStreamComponentState'
import { Post } from 'src/core/domain/posts'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'
import StringAPI from 'api/StringAPI'
import { ServerRequestType } from 'constants/serverRequestType'
import { streamStyles } from './streamStyles'
import { userSelector } from 'store/reducers/users/userSelector'
import { connectStream } from './connectStream'

// - Create StreamComponent component class
export class StreamComponent extends Component<IStreamComponentProps, IStreamComponentState> {

  static propTypes = {
    /**
     * A list of post
     */
    posts: PropTypes.object,

    /**
     * The title of home header
     */
    homeTitle: PropTypes.string

  }

  styles = {
    postWritePrimaryText: {
      color: grey[400],
      cursor: 'text'
    },
    postWtireItem: {
      fontWeight: '200'
    }
  }

  /**
   * Component constructor
   *
   */
  constructor(props: IStreamComponentProps) {
    super(props)

    this.state = {
    }

    // Binding functions to `this`
    this.loadPosts = this.loadPosts.bind(this)

  }
  componentWillMount() {
    const { setHomeTitle, t } = this.props
    setHomeTitle!(t!('header.home'))
  }

  /**
   * Load posts
   */
  loadPosts(entryPage: number) {
    const {loadStream, page, increasePage} = this.props
    if (loadStream && page !== undefined && increasePage) {
      loadStream!(page)
      increasePage()
    }
  }
  /**
   * Reneder component DOM
   * 
   */
  render() {

    const { hasMorePosts, t, classes, posts, loadStream , requestId, currentUser} = this.props

    return (
      <div className='stream-root'>
        <PostStreamComponent homeTitle={currentUser ? currentUser.fullName : ''} requestId={requestId} posts={posts} loadStream={this.loadPosts} hasMorePosts={hasMorePosts} displayWriting />
      </div>
    )
  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(StreamComponent as any)

export default withRouter<any>(connectStream(withStyles(streamStyles)(translateWrraper as any) as any)) as typeof StreamComponent