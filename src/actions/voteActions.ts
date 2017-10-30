import moment from 'moment'

// - Import action types
import { VoteActionType } from 'constants/voteActionType'

// - Import domain
import { Vote } from 'core/domain/votes'

// - Import actions
import * as globalActions from 'actions/globalActions'
import * as notifyActions from 'actions/notifyActions'

import { IServiceProvider, ServiceProvide } from 'core/factories'
import { IVoteService } from 'core/services/votes'

const serviceProvider: IServiceProvider = new ServiceProvide()
const voteService: IVoteService = serviceProvider.createVoteService()

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

    return voteService.addVote(vote).then((voteKey: string) => {
      dispatch(addVote(
        {
          ...vote,
          id: voteKey
        }))
      if (uid !== ownerPostUserId) {
        dispatch(notifyActions.dbAddNotification(
          {
            description: 'Vote on your post.',
            url: `/${ownerPostUserId}/posts/${postId}`,
            notifyRecieverUserId: ownerPostUserId,notifierUserId:uid,
            isSeen: false
          }))
      }

    })
    .catch((error) => dispatch(globalActions.showErrorMessage(error.message)))

  }
}

/**
 * Get all votes from database
 */
export const dbGetVotes = () => {
  return (dispatch: any, getState: Function) => {
    let uid: string = getState().authorize.uid
    if (uid) {

      return voteService
      .getVotes()
      .then((postVotes: { [postId: string]: { [voteId: string]: Vote } }) => {
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

    let votes: {[voteId: string]: Vote} = getState().vote.postVotes[postId]
    let id: string = Object.keys(votes).filter((key) => votes[key].userId === uid)[0]

    return voteService.deleteVote(id,postId).then(() => {
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
export const addVoteList = (votes: {[postId: string]: {[voteId: string]: Vote}}) => {
  return { type: VoteActionType.ADD_VOTE_LIST, payload: votes }

}

/**
 * Clear all data
 */
export const clearAllvotes = () => {
  return { type: VoteActionType.CLEAR_ALL_DATA_VOTE }
}
