// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

// - Import app components
import ProfileHead from 'ProfileHead'
import Blog from 'Blog'



// - Import API


// - Import actions
import * as postActions from 'postActions'
import * as userActions from 'userActions'
import * as globalActions from 'globalActions'

/**
* Create component class
 */
export class Profile extends Component {

  static propTypes = {

  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props) {
    super(props)

    //Defaul state
    this.state = {

    }


    // Binding functions to `this`


  }

  componentWillMount() {
    this.props.loadPosts()
    this.props.loadUserInfo()

  }



  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {

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
    /**
     * Actions for material ui dialog
     */
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />
    ]

    return (
      <div style={styles.profile}>
        <div style={styles.header}>

          <ProfileHead avatar={this.props.avatar} isAuthedUser={this.props.isAuthedUser} banner={this.props.banner} fullName={this.props.name} followerCount={0} userId={this.props.userId}/>
        </div>
        {this.props.posts && Object.keys(this.props.posts).length !==0 
        ? (<div style={styles.content}>
          <div className='profile__title'>
            {this.props.name}'s posts
               </div>
          <div style={{ height: '24px' }}></div>

          <Blog posts={this.props.posts} displayWriting={false} />
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
const mapDispatchToProps = (dispatch, ownProps) => {
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
const mapStateToProps = (state, ownProps) => {
  const { userId } = ownProps.match.params
  const {uid} = state.authorize
  return {
    avatar: state.user.info && state.user.info[userId] ? state.user.info[userId].avatar || '' : '',
    name: state.user.info && state.user.info[userId] ? state.user.info[userId].fullName || '' : '',
    banner: state.user.info && state.user.info[userId] ? state.user.info[userId].banner || '' : '',
    posts: state.post.userPosts ? state.post.userPosts[userId] : {},
    isAuthedUser: userId === uid,
    userId

  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(Profile)  