// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {Map} from 'immutable'

// - Import app components
import Stream from 'containers/stream'

// - Import API

// - Import actions
import * as postActions from 'src/store/actions/postActions'
import * as userActions from 'src/store/actions/userActions'

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
const mapStateToProps = (state: Map<string, any>,ownProps: IPostPageComponentProps) => {
  const {userId,postId} = ownProps.match.params
  const userInfo = state.getIn(['state', 'user', 'info', userId])
  let posts: Map<string, Map<string, any>> = Map({})
  posts = posts.set(postId, state.getIn(['post', 'userPosts', userId, postId], Map({})))
  return{
    avatar:  userInfo ? userInfo.avatar : '',
    name:  userInfo ? userInfo.fullName : '',
    posts
  }
}

  // - Connect component to redux store
export default connect(mapStateToProps,mapDispatchToProps)(PostPageComponent as any)
