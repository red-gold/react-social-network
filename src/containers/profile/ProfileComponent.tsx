// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import RaisedButton from 'material-ui/Button'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import {Map} from 'immutable'

// - Import app components
import ProfileHeader from 'src/components/profileHeader'
import StreamComponent from 'containers/stream'

// - Import API

// - Import actions
import * as postActions from 'src/store/actions/postActions'
import * as userActions from 'src/store/actions/userActions'
import * as globalActions from 'src/store/actions/globalActions'
import { IProfileComponentProps } from './IProfileComponentProps'
import { IProfileComponentState } from './IProfileComponentState'
import { Profile } from 'core/domain/users'

/**
 * Create component class
 */
export class ProfileComponent extends Component<IProfileComponentProps,IProfileComponentState> {

  static propTypes = {

  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IProfileComponentProps) {
    super(props)

    // Defaul state
    this.state = {

    }

    // Binding functions to `this`

  }

  componentWillMount () {
    this.props.loadPosts()
    this.props.loadUserInfo()

  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {

    /**
     * Component styles
     */
    const styles = {
      profile: {
      },
      header: {

      },
      content: {

      },
      showcover: {
        height: '450px'
      },
      avatar: {
        border: '2px solid rgb(255, 255, 255)'
      }
    }
    const {loadPosts, hasMorePosts, translate} = this.props
    const St = StreamComponent as any
    const posts = Map(this.props.posts)
    return (
      <div style={styles.profile}>
        <div style={styles.header}>
          <ProfileHeader tagLine={this.props.tagLine} avatar={this.props.avatar} isAuthedUser={this.props.isAuthedUser} banner={this.props.banner} fullName={this.props.name} followerCount={0} userId={this.props.userId}/>
        </div>
        {posts
        ? (<div style={styles.content}>
          <div className='profile__title'>
            {translate!('profile.headPostsLabel', {userName: this.props.name})}
               </div>
          <div style={{ height: '24px' }}></div>

          <St
          posts={posts}
          loadStream={loadPosts}
          hasMorePosts={hasMorePosts}
          displayWriting={false} />
        </div>)
        : (<div className='profile__title'>
                {translate!('profile.nothingSharedLabel')}
               </div>)
        }

      </div>
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: any, ownProps: IProfileComponentProps) => {
  const { userId } = ownProps.match.params
  return {
    loadPosts: () => dispatch(postActions.dbGetPostsByUserId(userId)),
    loadUserInfo: () => dispatch(userActions.dbGetUserInfoByUserId(userId, 'header'))

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IProfileComponentProps) => {
  const { userId } = ownProps.match.params
  const uid = state.getIn(['authorize', 'uid'], 0)
  const hasMorePosts = state.getIn(['post', 'profile', 'hasMoreData'])
  const posts = state.getIn(['post', 'userPosts', userId])
  const userProfile = state.getIn(['user', 'info', userId], {}) as Profile
  return {
    translate: getTranslate(state.get('locale')),
    avatar: userProfile.avatar,
    name: userProfile.fullName, 
    banner: userProfile.banner,
    tagLine: userProfile.tagLine,
    isAuthedUser: userId === uid,
    userId,
    posts,
    hasMorePosts

  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent as any)
