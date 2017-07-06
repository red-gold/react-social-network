// - Import react components
import moment from 'moment'
import { firebaseRef } from 'app/firebase/'

// - Import action types
import * as types from 'actionTypes'

// - Import actions
import * as globalActions from 'globalActions'
import * as notifyActions from 'notifyActions'



/* _____________ CRUD DB _____________ */

/**
 *  Add comment to database
 * @param  {object} newComment user comment
 * @param  {function} callBack  will be fired when server responsed
 */
export const dbAddComment = (newComment, callBack) => {
  return (dispatch, getState) => {

    dispatch(globalActions.showTopLoading())


    var uid = getState().authorize.uid
    var comment = {
      postId: newComment.postId,
      score: 0,
      text: newComment.text,
      creationDate: moment().unix(),
      userDisplayName: getState().user.info[uid].fullName,
      userAvatar: getState().user.info[uid].avatar,
      userId: uid
    }

    var commentRef = firebaseRef.child(`postComments/${newComment.postId}`).push(comment)
    return commentRef.then(() => {
      dispatch(addComment(
        {
          comment,
          postId: newComment.postId,
          id: commentRef.key,
          editorStatus: false
        }))
      callBack()
      dispatch(globalActions.hideTopLoading())

      if (newComment.ownerPostUserId !== uid)
        dispatch(notifyActions.dbAddNotify(
          {
            description: 'Add comment on your post.',
            url: `/${newComment.ownerPostUserId}/posts/${newComment.postId}`,
            notifyRecieverUserId: newComment.ownerPostUserId, notifierUserId: uid
          }))

    }, (error) => {
      dispatch(globalActions.showErrorMessage(error.message))
      dispatch(globalActions.hideTopLoading())

    })

  }
}

/**
 * Get all comments from database
 */
export const dbGetComments = () => {
  return (dispatch, getState) => {
    var uid = getState().authorize.uid
    if (uid) {
      var commentsRef = firebaseRef.child(`postComments`);

      return commentsRef.on('value', (snapshot) => {
        var comments = snapshot.val() || {};
        dispatch(addCommentList(comments))

      })

    }
  }
}

/**
 * Update a comment from database
 * @param  {string} id of comment
 * @param {string} postId is the identifier of the post which comment belong to
 */
export const dbUpdateComment = (id, postId, text) => {
  return (dispatch, getState) => {

    dispatch(globalActions.showTopLoading())


    // Get current user id
    var uid = getState().authorize.uid

    // Write the new data simultaneously in the list
    var updates = {};
    let comment = getState().comment.postComments[postId][id]
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
      dispatch(updateComment({ id, postId, text, editorStatus: false }))
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
export const dbDeleteComment = (id, postId) => {
  return (dispatch, getState) => {

    dispatch(globalActions.showTopLoading())


    // Get current user id
    var uid = getState().authorize.uid

    // Write the new data simultaneously in the list
    var updates = {};
    updates[`postComments/${postId}/${id}`] = null;

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
 * @param {object} data  
 */
export const addComment = (data) => {

  return {
    type: types.ADD_COMMENT,
    payload: data
  }
}

/**
 * Update comment 
 * @param {object} data  
 */
export const updateComment = (data) => {

  return {
    type: types.UPDATE_COMMENT,
    payload: data
  }
}

/**
 * Add comment list
 * @param {[object]} postComments an array of comments
 */
export const addCommentList = (postComments) => {

  return {
    type: types.ADD_COMMENT_LIST,
    payload: postComments
  }
}



/**
 * Delete a comment
 * @param  {string} id of comment
 * @param {string} postId is the identifier of the post which comment belong to
 */
export const deleteComment = (id, postId) => {
  return { type: types.DELETE_COMMENT, payload: { id, postId } }

}

/**
 * Clear all data
 */
export const clearAllData = () => {
  return {
    type: types.CLEAR_ALL_DATA_COMMENT
  }
}

export const openCommentEditor = (comment) => {

  return {
    type: types.OPEN_COMMENT_EDITOR,
    payload: comment
  }
}

export const closeCommentEditor = (comment) => {

  return {
    type: types.CLOSE_COMMENT_EDITOR,
    payload: comment
  }
}

