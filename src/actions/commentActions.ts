// - Import react components
import moment from 'moment'

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

import { IServiceProvider, ServiceProvide } from 'core/factories'
import { ICommentService } from 'core/services/comments'

const serviceProvider: IServiceProvider = new ServiceProvide()
const commentService: ICommentService = serviceProvider.createCommentService()

/* _____________ CRUD DB _____________ */

/**
 *  Add comment to database
 * @param  {object} ownerPostUserId the identifier of the user who is the owner of the post which comment belong to
 * @param  {object} newComment user comment
 * @param  {function} callBack  will be fired when server responsed
 */
export const dbAddComment = (ownerPostUserId: string | null,newComment: Comment, callBack: Function) => {
  return (dispatch: any, getState: Function) => {

    dispatch(globalActions.showTopLoading())

    let uid: string = getState().authorize.uid

    let comment: Comment = {
      score : 0,
      creationDate : moment().unix(),
      userDisplayName : getState().user.info[uid].fullName,
      userAvatar : getState().user.info[uid].avatar,
      userId : uid,
      postId: newComment.postId,
      text: newComment.text
    }

    return commentService.addComment(comment)
      .then((commentKey: string) => {
        dispatch(addComment({id: commentKey! ,...comment}))
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
        dispatch(globalActions.showErrorMessage(error.message))
        dispatch(globalActions.hideTopLoading())

      })
  }
}

/**
 * Get all comments from database
 */
export const dbGetComments = (ownerUserId: string, postId: string) => {
  return (dispatch: any, getState: Function) => {
    let uid: string = getState().authorize.uid
    if (uid) {
      return commentService.getComments(postId, (comments: {[postId: string]: {[commentId: string]: Comment}}) => {

        /**
         * Workout getting the number of post's comment and getting three last comments
         */
        dispatch(addCommentList(comments))
        let commentsCount: number
        const state = getState()
        const post: Post = state.post.userPosts[ownerUserId][postId]
        if (!post) {
          return
        }

        if (comments && Object.keys(comments).length > 0) {
          commentsCount = Object.keys(comments).length
          let sortedObjects = comments as any
          // Sort posts with creation date
          sortedObjects.sort((a: any, b: any) => {
            return parseInt(b.creationDate, 10) - parseInt(a.creationDate, 10)
          })
          if (!post.comments) {
            post.comments = {}
          }
          Object.keys(sortedObjects).slice(0, 3).forEach((commentId) => {
            post.comments![commentId] = {
              id: commentId,
              ...sortedObjects[commentId]
            }
          })

          dispatch(postActions.updatePost(post.ownerUserId!,post))
        }
      })
    }
  }
}

/**
 * Update a comment from database
 * @param  {string} id of comment
 * @param {string} postId is the identifier of the post which comment belong to
 * @param {string} text is the text of comment
 */
export const dbUpdateComment = (id: string, postId: string, text: string) => {
  return (dispatch: any, getState: Function) => {

    dispatch(globalActions.showTopLoading())

    // Get current user id
    let uid: string = getState().authorize.uid

    // Write the new data simultaneously in the list
    let comment: Comment = getState().comment.postComments[postId][id]
    let updatedComment: Comment = {
      postId: postId,
      score: comment.score,
      text: text,
      creationDate: comment.creationDate,
      userDisplayName: comment.userDisplayName,
      userAvatar: comment.userAvatar,
      userId: uid
    }

    return commentService.updateComment(updatedComment)
      .then(() => {
        dispatch(updateComment( id, postId, text))
        dispatch(globalActions.hideTopLoading())

      }, (error: SocialError) => {
        dispatch(globalActions.showErrorMessage(error.message))
        dispatch(globalActions.hideTopLoading())

      })
  }
}

/**
 * Delete a comment from database
 * @param  {string} id of comment
 * @param {string} postId is the identifier of the post which comment belong to
 */
export const dbDeleteComment = (id?: string | null, postId?: string) => {
  return (dispatch: any, getState: Function) => {

    if (id === undefined || id === null) {
      dispatch(globalActions.showErrorMessage('comment id can not be null or undefined'))
    }
    dispatch(globalActions.showTopLoading())

    // Get current user id
    let uid: string = getState().authorize.uid

    return commentService.deleteComment(id!,postId!)
      .then(() => {
        dispatch(deleteComment(id!, postId!))
        dispatch(globalActions.hideTopLoading())

      }, (error: SocialError) => {
        dispatch(globalActions.showErrorMessage(error.message))
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
 *
 * @param id comment identifier
 * @param postId post identefier which comment belong to
 * @param text the new text for comment
 */
export const updateComment = ( id: string, postId: string, text: string) => {

  return {
    type: CommentActionType.UPDATE_COMMENT,
    payload: {id, postId, text}
  }
}

/**
 * Add comment list
 * @param {[postId: string]: {[commentId: string] : Comment}} postComments an array of comments
 */
export const addCommentList = (postComments: {[postId: string]: {[commentId: string]: Comment}}) => {

  return {
    type: CommentActionType.ADD_COMMENT_LIST,
    payload: postComments
  }
}

/**
 * Delete a comment
 * @param  {string} id of comment
 * @param {string} postId is the identifier of the post which comment belong to
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
