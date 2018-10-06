// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Map } from 'immutable'
import config from 'src/config'
import { translate, Trans } from 'react-i18next'

// - Material-UI
import withStyles from '@material-ui/core/styles/withStyles'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import RaisedButton from '@material-ui/core/Button'

// - Import app components
import StreamComponent from 'containers/stream'
import UserActivity from 'components/userActivity'
import ImgCover from 'components/imgCover'

// - Import actions
import * as postActions from 'src/store/actions/postActions'
import * as userActions from 'src/store/actions/userActions'
import * as globalActions from 'src/store/actions/globalActions'
import { IProfileComponentProps } from './IProfileComponentProps'
import { IProfileComponentState } from './IProfileComponentState'
import { User } from 'core/domain/users'
import { profileStyles } from './profileStyles'
import { userSelector } from 'store/reducers/users/userSelector'
import PostStreamComponent from '../postStream'
import { PostAPI } from 'api/PostAPI'
import { ServerRequestType } from 'constants/serverRequestType'
import StringAPI from 'api/StringAPI'
import { postSelector } from 'store/reducers/posts'
import ProfileAlbumComponent from 'components/ProfileAlbum'

/**
 * Create component class
 */
export class ProfileComponent extends Component<IProfileComponentProps, IProfileComponentState> {

  static propTypes = {

  }

  /**
   * Component constructor
   *
   */
  constructor(props: IProfileComponentProps) {
    super(props)

    // Defaul state
    this.state = {

    }

    // Binding functions to `this`

  }

  componentWillMount() {
    this.props.loadUserInfo()

  }

  /**
   * Reneder component DOM
   * 
   */
  render() {

    const { loadPosts, hasMorePosts, t, classes, profile, isCurrentUser, posts, postRequestId, userId } = this.props

    return (
      <>
        <div className={classes.bannerContainer}>

          <ImgCover height={'384px'} width={'100%'} className={classes.banner}
            src={(profile && profile.banner) ? profile.banner : config.settings.defaultProfileCover} />
        </div>
        <UserActivity profile={profile!} isCurrentUser={isCurrentUser} />
        <div style={{ height: '24px' }}></div>
          <ProfileAlbumComponent userId={userId} isOwner={isCurrentUser}/>
        <div>
          {
            !posts.isEmpty()
              ? (
                <div className='profile__title'>
                  {t!('profile.headPostsLabel', { userName: this.props.name })}
                </div>
              )
              : ''
          }
          <div style={{ height: '24px' }}></div>

          <PostStreamComponent
            posts={posts}
            requestId={postRequestId}
            loadStream={loadPosts}
            hasMorePosts={hasMorePosts}
            displayWriting={false} />
        </div>

      </>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IProfileComponentProps) => {
  const { userId } = ownProps.match.params
  return {
    loadPosts: (page: number) => dispatch(postActions.dbGetPostsByUserId(userId, page)),
    loadUserInfo: () => dispatch(userActions.dbGetUserInfoByUserId(userId, 'header'))

  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IProfileComponentProps) => {
  const { userId } = ownProps.match.params
  const postRequestId = StringAPI.createServerRequestId(ServerRequestType.ProfileGetPosts, userId)
  const uid = state.getIn(['authorize', 'uid'], 0)
  const hasMorePosts = state.getIn(['user', 'post', userId, 'hasMoreData'], true)
  const selectProfilePosts = postSelector.selectProfilePosts()
  const posts = selectProfilePosts(state, { userId })
  const userProfile = userSelector.getUserProfileById(state, { userId: userId }).toJS() as User
  return {
    
    avatar: userProfile.avatar,
    name: userProfile.fullName,
    banner: userProfile.banner,
    tagLine: userProfile.tagLine,
    userId,
    posts,
    hasMorePosts,
    postRequestId,
    profile: userProfile,
    isCurrentUser: userId === uid

  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(ProfileComponent as any)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(profileStyles as any)(translateWrraper as any))