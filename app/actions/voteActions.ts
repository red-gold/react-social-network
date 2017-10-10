import moment from 'moment'
import { firebaseRef } from 'app/firebase/'

// - Import action types
import {VoteActionType} from 'constants/voteActionType'

// - Import domain
import { Vote } from 'domain/votes'

// - Import actions
import * as globalActions from 'actions/globalActions'
import * as notifyActions from 'actions/notifyActions'

declare const console: any
/* _____________ CRUD DB _____________ */

/**
 *  Add vote to database
 * @param  {string} postId is the identifier of the post which user vote
 * @param  {string} ownerPostUserId is the identifier of the post owner which user vote
 */
export const dbAddVote = (postId: string,ownerPostUserId: string) => {
  return (dispatch: any, getState: Function) => {

    let uid: string = getState().authorize.uid
    let vote: Vote = {
      postId: postId,
      creationDate: moment().unix(),
      userDisplayName: getState().user.info[uid].fullName,
      userAvatar: getState().user.info[uid].avatar,
      userId: uid
    }

    let voteRef = firebaseRef.child(`postVotes/${postId}`).push(vote)
    return voteRef.then(() => {
      dispatch(addVote(
        {
          ...vote,
          postId: postId,
          id: voteRef.key
        }))
        if(uid !== ownerPostUserId)
        dispatch(notifyActions.dbAddNotify(
        {
        description:'Vote on your post.',
        url:`/${ownerPostUserId}/posts/${postId}`,
        notifyRecieverUserId:ownerPostUserId,notifierUserId:uid,
        isSeen:false
      }))
     
    }, (error) =>  dispatch(globalActions.showErrorMessage(error.message)))

  }
}

/**
 * Get all votes from database
 */
export const dbGetVotes = () => {
  return (dispatch: any, getState: Function) => {
    let uid: string = getState().authorize.uid
    if (uid) {
      let votesRef: any = firebaseRef.child(`postVotes`)

      return votesRef.on('value',(snapshot: any) => {
        let postVotes: {[postId:string]: {[voteId: string]: Vote}} = snapshot.val() || {}
        dispatch(addVoteList(postVotes))
      })
      
    }
  }
}


/**
 * Delete a vote from database
 * @param  {string} id of vote
 * @param {string} postId is the identifier of the post which vote belong to
 */
export const dbDeleteVote = (postId: string) => {
  return (dispatch: any, getState: Function) => {

    // Get current user id
    let uid: string = getState().authorize.uid

    // Write the new data simultaneously in the list
    let updates: any = {}
    let votes: {[voteId: string]: Vote} = getState().vote.postVotes[postId]
    let id: string = Object.keys(votes).filter((key)=> votes[key].userId === uid)[0]

  
    updates[`postVotes/${postId}/${id}`] = null

    return firebaseRef.update(updates).then((result) => {
      dispatch(deleteVote(id, postId))
    })
    .catch((error: any) => dispatch(globalActions.showErrorMessage(error.message)))
  }

}

/**
 * Add a vote
 * @param {Vote} vote 
 */
export const addVote = (vote: Vote) => {
  return { type: VoteActionType.ADD_VOTE, payload: vote }

}

/**
 * delete a vote
 * @param {string} id vote identifier
 * @param {string} postId post identifier which vote on
 */
export const deleteVote = (id: string, postId: string) => {
  return { type: VoteActionType.DELETE_VOTE, payload: {id, postId} }

}

/**
 * Ad a list of vote
 * @param {[postId:string]: {[voteId: string]: Vote}} votes a list of vote 
 */
export const addVoteList = (votes: {[postId:string]: {[voteId: string]: Vote}}) => {
  return { type: VoteActionType.ADD_VOTE_LIST, payload: votes }

}

/**
 * Clear all data
 */
export const clearAllvotes = () => {
  return { type: VoteActionType.CLEAR_ALL_DATA_VOTE }
}
