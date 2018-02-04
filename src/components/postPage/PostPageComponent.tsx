// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// - Import app components
import Stream from 'components/stream'

// - Import API

// - Import actions
import * as postActions from 'actions/postActions'
import * as userActions from 'actions/userActions'

import { IPostPageComponentProps } from './IPostPageComponentProps'
import { IPostPageComponentState } from './IPostPageComponentState'

/**
 * Create component class
 */
export class PostPageComponent extends Component<IPostPageComponentProps,IPostPageComponentState> {

  static propTypes = {

  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IPostPageComponentProps) {
    super(props)

    // Defaul state
    this.state = {

    }

    // Binding functions to `this`

  }
  componentWillMount () {
    this.props.loadPost!()
    this.props.loadUserInfo!()
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {
    const St = Stream as any
    return (
          <St posts={this.props.posts} displayWriting={false} />
    )
  }
}

  /**
   * Map dispatch to props
   * @param  {func} dispatch is the function to dispatch action to reducers
   * @param  {object} ownProps is the props belong to component
   * @return {object}          props of component
   */
const mapDispatchToProps = (dispatch: any,ownProps: IPostPageComponentProps) => {
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
const mapStateToProps = (state: any,ownProps: IPostPageComponentProps) => {
  const {userId,postId} = ownProps.match.params
  return{
    avatar: state.user.info && state.user.info[userId] ? state.user.info[userId].avatar : '',
    name: state.user.info && state.user.info[userId] ? state.user.info[userId].fullName : '',
    posts: state.post.userPosts && state.post.userPosts[userId] ? {[postId] : { ...state.post.userPosts[userId][postId]}} : {}
  }
}

  // - Connect component to redux store
export default connect(mapStateToProps,mapDispatchToProps)(PostPageComponent as any)
