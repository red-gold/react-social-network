// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import RaisedButton from 'material-ui/Button'

// - Import app components
import ProfileHeader from 'components/profileHeader'
import StreamComponent from 'components/stream'

// - Import API

// - Import actions
import * as postActions from 'actions/postActions'
import * as userActions from 'actions/userActions'
import * as globalActions from 'actions/globalActions'
import { IProfileComponentProps } from './IProfileComponentProps'
import { IProfileComponentState } from './IProfileComponentState'

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
        margin: '0 auto',
        width: '90%'
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
    const {loadPosts, hasMorePosts} = this.props

    return (
      <div style={styles.profile}>
        <div style={styles.header}>

          <ProfileHeader tagLine={this.props.tagLine} avatar={this.props.avatar} isAuthedUser={this.props.isAuthedUser} banner={this.props.banner} fullName={this.props.name} followerCount={0} userId={this.props.userId}/>
        </div>
        {this.props.posts && Object.keys(this.props.posts).length !== 0
        ? (<div style={styles.content}>
          <div className='profile__title'>
            {this.props.name}'s posts
               </div>
          <div style={{ height: '24px' }}></div>

          <StreamComponent
          posts={this.props.posts}
          loadStream={loadPosts}
          hasMorePosts={hasMorePosts}
          displayWriting={false} />
        </div>)
        : (<div className='profile__title'>
                Nothing shared
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
const mapStateToProps = (state: any, ownProps: IProfileComponentProps) => {
  const { userId } = ownProps.match.params
  const {uid} = state.authorize
  const hasMorePosts = state.post.profile.hasMoreData
  const posts = state.post.userPosts ? state.post.userPosts[userId] : {}
  return {
    avatar: state.user.info && state.user.info[userId] ? state.user.info[userId].avatar || '' : '',
    name: state.user.info && state.user.info[userId] ? state.user.info[userId].fullName || '' : '',
    banner: state.user.info && state.user.info[userId] ? state.user.info[userId].banner || '' : '',
    tagLine: state.user.info && state.user.info[userId] ? state.user.info[userId].tagLine || '' : '',
    isAuthedUser: userId === uid,
    userId,
    posts,
    hasMorePosts

  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent as any)
