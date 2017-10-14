// - Import react components
import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'


// - Import app components
import Blog from 'Blog'


// - Import API


// - Import actions
import * as postActions from 'postActions'
import * as userActions from 'userActions'

/**
* Create component class
 */
export class PostPage extends Component {

static propTypes = {

    }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props){
    super(props)

    //Defaul state
    this.state = {

    }

    // Binding functions to `this`

  }
    componentWillMount() {
    this.props.loadPost()
    this.props.loadUserInfo()
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {
        return (
          <Blog posts={this.props.posts} displayWriting={false} />
        )
      }
    }


  /**
   * Map dispatch to props
   * @param  {func} dispatch is the function to dispatch action to reducers
   * @param  {object} ownProps is the props belong to component
   * @return {object}          props of component
   */
  const mapDispatchToProps = (dispatch,ownProps) => {
      const {userId,postId} = ownProps.match.params
    return{
    loadPost: () => dispatch(postActions.dbGetPostById(userId,postId)),
    loadUserInfo: () => dispatch(userActions.dbGetUserInfoByUserId(userId,'header'))
    }
  }

  /**
   * Map state to props
   * @param  {object} state is the obeject from redux store
   * @param  {object} ownProps is the props belong to component
   * @return {object}          props of component
   */
  const mapStateToProps = (state,ownProps) => {
       const {userId,postId} = ownProps.match.params
    return{
    avatar: state.user.info && state.user.info[userId] ? state.user.info[userId].avatar : '',
    name: state.user.info && state.user.info[userId] ? state.user.info[userId].fullName : '',
    posts: state.post.userPosts && state.post.userPosts[userId] ? {[postId] : { ...state.post.userPosts[userId][postId]}} : {}
    }
  }

  // - Connect component to redux store
  export default connect(mapStateToProps,mapDispatchToProps)(PostPage)