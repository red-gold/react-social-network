// - Import react components
import moment from 'moment/moment'
import _ from 'lodash'

// - Import domain
import { Comment } from 'core/domain/comments'
import { Post } from 'core/domain/posts'
import { SocialError } from 'core/domain/common'

// - Import action types
import { CommentActionType } from 'constants/commentActionType'

// - Import actions
import * as globalActions from 'actions/globalActions'
import * as notifyActions from 'actions/notifyActions'
import * as postActions from 'actions/postActions'
import * as serverActions from 'actions/serverActions'

import { ICommentService } from 'core/services/comments'
import { SocialProviderTypes } from 'core/socialProviderTypes'
import { provider } from '../socialEngine'
import StringAPI from 'api/StringAPI'
import { ServerRequestType } from 'constants/serverRequestType'
import { ServerRequestModel } from 'models/server'
import { ServerRequestStatusType } from 'actions/serverRequestStatusType'
import CommentAPI from 'api/CommentAPI'

/**
 * Get service providers
 */
const commentService: ICommentService = provider.get<ICommentService>(SocialProviderTypes.CommentService)

/* _____________ CRUD DB _____________ */

/**
 *  Add comment to database
 */
export const dbAddComment = (ownerPostUserId: string, newComment: Comment, callBack: Function) => {
  return (dispatch: any, getState: Function) => {

    dispatch(globalActions.showTopLoading())

    const state = getState()
    let uid: string = state.authorize.uid

    let comment: Comment = {
      score: 0,
      creationDate: moment().unix(),
      userDisplayName: state.user.info[uid].fullName,
      userAvatar: state.user.info[uid].avatar,
      userId: uid,
      postId: newComment.postId,
      text: newComment.text
    }

    return commentService.addComment(comment)
      .then((commentKey: string) => {
        dispatch(addComment({ id: commentKey!, ...comment }))
        callBack()
        dispatch(globalActions.hideTopLoading())

        if (ownerPostUserId && ownerPostUserId !== uid) {
          dispatch(notifyActions.dbAddNotification(
            {
              description: 'Add comment on your post.',
              url: `/${ownerPostUserId}/posts/${comment.postId}`,
              notifyRecieverUserId: ownerPostUserId, notifierUserId: uid,
              isSeen: false
            }))
        }

      }, (error: SocialError) => {
        dispatch(globalActions.showMessage(error.message))
        dispatch(globalActions.hideTopLoading())

      })
  }
}

/**
 * Get all comments from database
 */
export const dbFetchComments = (ownerUserId: string, postId: string) => {
  return {
    type: CommentActionType.DB_FETCH_COMMENTS,
    payload: {postId, ownerUserId}
  }
}

/**
 * Update a comment from database
 */
export const dbUpdateComment = (comment: Comment) => {
  return (dispatch: any, getState: Function) => {
    dispatch(globalActions.showTopLoading())

    return commentService.updateComment(comment)
      .then(() => {
        dispatch(updateComment(comment))
        dispatch(closeCommentEditor(comment))
        dispatch(globalActions.hideTopLoading())

      }, (error: SocialError) => {
        dispatch(globalActions.showMessage(error.message))
        dispatch(globalActions.hideTopLoading())

      })
  }
}

/**
 * Delete a comment from database
 */
export const dbDeleteComment = (id?: string | null, postId?: string) => {
  return (dispatch: any, getState: Function) => {

    if (id === undefined || id === null) {
      dispatch(globalActions.showMessage('comment id can not be null or undefined'))
    }
    dispatch(globalActions.showTopLoading())

    return commentService.deleteComment(id!)
      .then(() => {
        dispatch(deleteComment(id!, postId!))
        dispatch(globalActions.hideTopLoading())

      }, (error: SocialError) => {
        dispatch(globalActions.showMessage(error.message))
        dispatch(globalActions.hideTopLoading())

      })
  }

}

/* _____________ CRUD State _____________ */

/**
 * Add comment
 * @param {Comment} data
 */
export const addComment = (comment: Comment) => {

  return {
    type: CommentActionType.ADD_COMMENT,
    payload: comment
  }
}

/**
 * Update comment
 */
export const updateComment = (comment: Comment) => {

  return {
    type: CommentActionType.UPDATE_COMMENT,
    payload: { comment }
  }
}

/**
 * Add comment list
 * @param {[postId: string]: {[commentId: string] : Comment}} postComments an array of comments
 */
export const addCommentList = (postComments: { [postId: string]: { [commentId: string]: Comment } }) => {

  return {
    type: CommentActionType.ADD_COMMENT_LIST,
    payload: postComments
  }
}

/**
 * Delete a comment
 */
export const deleteComment = (id: string, postId: string) => {
  return { type: CommentActionType.DELETE_COMMENT, payload: { id, postId } }

}

/**
 * Clear all data
 */
export const clearAllData = () => {
  return {
    type: CommentActionType.CLEAR_ALL_DATA_COMMENT
  }
}

export const openCommentEditor = (comment: Comment) => {

  return {
    type: CommentActionType.OPEN_COMMENT_EDITOR,
    payload: comment
  }
}

export const closeCommentEditor = (comment: Comment) => {

  return {
    type: CommentActionType.CLOSE_COMMENT_EDITOR,
    payload: comment
  }
}
