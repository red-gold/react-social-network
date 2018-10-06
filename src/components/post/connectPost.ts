import {Map} from 'immutable'
import { IPostComponentProps } from './IPostComponentProps'
import * as voteActions from 'store/actions/voteActions'
import * as postActions from 'store/actions/postActions'
import * as globalActions from 'store/actions/globalActions'
import * as commentActions from 'store/actions/commentActions'
import { push } from 'react-router-redux'
import { userSelector } from 'store/reducers/users/userSelector'

import {connect } from 'react-redux'
import { Component } from 'react'

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IPostComponentProps) => {
    const { post } = ownProps
    return {
      vote: () => dispatch(voteActions.dbAddVote(post.get('id'), post.get('ownerUserId'))),
      unvote: () => dispatch(voteActions.dbDeleteVote(post.get('id'), post.get('ownerUserId'))),
      delete: (id: string) => dispatch(postActions.dbDeletePost(id)),
      toggleDisableComments: (status: boolean) => {
        dispatch(postActions.dbUpdatePost(post.set('disableComments', status), (x: any) => x))
      },
      toggleSharingComments: (status: boolean) => {
        dispatch(postActions.dbUpdatePost(post.set('disableSharing', status), (x: any) => x))
      },
      goTo: (url: string) => dispatch(push(url)),
      setHomeTitle: (title: string) => dispatch(globalActions.setHeaderTitle(title || '')),
      getPostComments: (ownerUserId: string, postId: string) => dispatch(commentActions.dbFetchComments(ownerUserId, postId))
    }
  }
  /**
   * Map state to props
   */
  const mapStateToProps = (state: Map<string, any>, ownProps: IPostComponentProps) => {
    const uid = state.getIn(['authorize', 'uid'])
    let currentUserVote = ownProps.post.getIn(['votes', uid], false)
  
    const voteCount = ownProps.post.get('score', 0)
    const commentList: { [commentId: string]: Comment } = state.getIn(['comment', 'postComments', ownProps.post.get('id')], Map({}))
    const user = userSelector.getUserProfileById(state, { userId: ownProps.post.get('ownerUserId') }).toJS()
  
    return {
      
      commentList,
      avatar: ownProps.post.get('ownerAvatar', ''),
      fullName: ownProps.post.get('ownerDisplayName', ''),
      voteCount,
      currentUserVote,
      isPostOwner: uid === ownProps.post.get('ownerUserId')
    }
  }

  export const connectPost =
  (component: Component<IPostComponentProps>) => connect(mapStateToProps, mapDispatchToProps)(component as any)