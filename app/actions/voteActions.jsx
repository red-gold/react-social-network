// - Import react components
import {createAction as action} from 'redux-actions'
import moment from 'moment'
import { firebaseRef } from 'app/firebase/'

// - Import action types
import * as types from 'actionTypes'

// - Import actions
import * as globalActions from 'globalActions'
import * as notifyActions from 'notifyActions'


/* _____________ CRUD DB _____________ */

/**
 *  Add vote to database
 * @param  {string} postId is the identifier of the post which user vote
 */
export const dbAddVote = (postId,ownerPostUserId) => {
  return (dispatch, getState) => {

    var uid = getState().authorize.uid
    var vote = {
      postId: postId,
      creationDate: moment().unix(),
      userDisplayName: getState().user.info[uid].fullName,
      userAvatar: getState().user.info[uid].avatar,
      userId: uid
    }

    var voteRef = firebaseRef.child(`postVotes/${postId}`).push(vote)
    return voteRef.then(() => {
      dispatch(addVote(
        {
          vote,
          postId: postId,
          id: voteRef.key
        }))
        if(uid !== ownerPostUserId)
        dispatch(notifyActions.dbAddNotify(
        {
        description:'Vote on your post.',
        url:`/${ownerPostUserId}/posts/${postId}`,
        notifyRecieverUserId:ownerPostUserId,notifierUserId:uid
      }))
     
    }, (error) =>  dispatch(globalActions.showErrorMessage(error.message)))

  }
}

/**
 * Get all votes from database
 */
export const dbGetVotes = () => {
  return (dispatch, getState) => {
    var uid = getState().authorize.uid
    if (uid) {
      var votesRef = firebaseRef.child(`postVotes`);

      return votesRef.on('value',(snapshot) => {
        var votes = snapshot.val() || {};
        dispatch(addVoteList(votes))
      })
      
    }
  }
}


/**
 * Delete a vote from database
 * @param  {string} id of vote
 * @param {string} postId is the identifier of the post which vote belong to
 */
export const dbDeleteVote = (postId) => {
  return (dispatch, getState) => {

    // Get current user id
    var uid = getState().authorize.uid

    // Write the new data simultaneously in the list
    var updates = {};
    let votes = getState().vote.postVotes[postId]
    let id = Object.keys(votes).filter((key)=> votes[key].userId === uid)[0]
    console.log(' Id :  ',id)
  
    updates[`postVotes/${postId}/${id}`] = null;

    return firebaseRef.update(updates).then((result) => {
      dispatch(deleteVote({id, postId}))
    }, (error) => dispatch(globalActions.showErrorMessage(error.message)))
  }

}

/**
 * Add a vote
 * @param {object} data 
 */
export const addVote = (data) => {
  return { type: types.ADD_VOTE, payload: data }

}

/**
 * delete a vote
 * @param {object} data 
 */
export const deleteVote = (data) => {
  return { type: types.DELETE_VOTE, payload: data }

}

/**
 * Ad a list of vote
 * @param {object} data 
 */
export const addVoteList = (data) => {
  return { type: types.ADD_VOTE_LIST, payload: data }

}

/**
 * Clear all data
 */
export const clearAllvotes = () => {
  return { type: types.CLEAR_ALL_DATA_VOTE }
}
