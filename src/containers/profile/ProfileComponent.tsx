// - Import react components
import withStyles from '@material-ui/core/styles/withStyles';
import StringAPI from 'api/StringAPI';
import ImgCover from 'components/imgCover';
import ProfileAlbumComponent from 'components/ProfileAlbum';
import UserActivity from 'components/userActivity';
import { ServerRequestType } from 'constants/serverRequestType';
import { User } from 'core/domain/users';
import { Map } from 'immutable';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import config from 'src/config';
import * as postActions from 'src/store/actions/postActions';
import * as userActions from 'src/store/actions/userActions';
import { postSelector } from 'store/reducers/posts';
import { userSelector } from 'store/reducers/users/userSelector';

import PostStreamComponent from '../postStream';
import { IProfileComponentProps } from './IProfileComponentProps';
import { IProfileComponentState } from './IProfileComponentState';
import { profileStyles } from './profileStyles';

// - Material-UI
// - Import app components
// - Import actions
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
const translateWrraper = withTranslation('translations')(ProfileComponent as any)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(profileStyles as any)(translateWrraper as any))