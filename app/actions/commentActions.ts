// - Import react components
import moment from 'moment'
import { firebaseRef } from 'app/firebase/'

// - Import domain
import { Comment } from 'domain/comments'

// - Import action types
import { CommentActionType } from 'constants/commentActionType'

// - Import actions
import * as globalActions from 'actions/globalActions'
import * as notifyActions from 'actions/notifyActions'

/* _____________ CRUD DB _____________ */

/**
 *  Add comment to database
 * @param  {object} ownerPostUserId the identifier of the user who is the owner of the post which comment belong to
 * @param  {object} newComment user comment
 * @param  {function} callBack  will be fired when server responsed
 */
export const dbAddComment = (ownerPostUserId: string,newComment: Comment, callBack: Function) => {
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

    let commentRef: any = firebaseRef.child(`postComments/${newComment.postId}`).push(comment)
    return commentRef.then(() => {
      dispatch(addComment(newComment))
      callBack()
      dispatch(globalActions.hideTopLoading())

      if (ownerPostUserId && ownerPostUserId !== uid) {
        dispatch(notifyActions.dbAddNotify(
          {
            description: 'Add comment on your post.',
            url: `/${ownerPostUserId}/posts/${newComment.postId}`,
            notifyRecieverUserId: ownerPostUserId, notifierUserId: uid,
            isSeen: false
          }))
      }

    }, (error: any) => {
      dispatch(globalActions.showErrorMessage(error.message))
      dispatch(globalActions.hideTopLoading())

    })

  }
}

/**
 * Get all comments from database
 */
export const dbGetComments = () => {
  return (dispatch: any, getState: Function) => {
    let uid: string = getState().authorize.uid
    if (uid) {
      let commentsRef: any = firebaseRef.child(`postComments`)

      return commentsRef.on('value', (snapshot: any) => {
        let comments: {[postId: string]: {[commentId: string]: Comment}} = snapshot!.val() || {}
        dispatch(addCommentList(comments))

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
    let updates: any = {}
    let comment: Comment = getState().comment.postComments[postId][id]
    updates[`postComments/${postId}/${id}`] = {
      postId: postId,
      score: comment.score,
      text: text,
      creationDate: comment.creationDate,
      userDisplayName: comment.userDisplayName,
      userAvatar: comment.userAvatar,
      userId: uid
    }
    return firebaseRef.update(updates).then((result) => {
      dispatch(updateComment( id, postId, text))
      dispatch(globalActions.hideTopLoading())

    }, (error) => {
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
export const dbDeleteComment = (id: string, postId: string) => {
  return (dispatch: any, getState: Function) => {

    dispatch(globalActions.showTopLoading())

    // Get current user id
    let uid: string = getState().authorize.uid

    // Write the new data simultaneously in the list
    let updates: any = {}
    updates[`postComments/${postId}/${id}`] = null

    return firebaseRef.update(updates).then((result) => {
      dispatch(deleteComment(id, postId))
      dispatch(globalActions.hideTopLoading())

    }, (error) => {
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
