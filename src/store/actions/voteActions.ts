import moment from 'moment/moment'
import {Map} from 'immutable'

// - Import action types
import { VoteActionType } from 'constants/voteActionType'

// - Import domain
import { Vote } from 'src/core/domain/votes'

// - Import actions
import * as globalActions from 'store/actions/globalActions'
import * as notifyActions from 'store/actions/notifyActions'
import * as postActions from 'store/actions/postActions'

import { IVoteService } from 'src/core/services/votes'
import { Post } from 'src/core/domain/posts'
import { SocialProviderTypes } from 'src/core/socialProviderTypes'
import { provider } from 'src/socialEngine'

/**
 * Get service providers
 */
const voteService: IVoteService = provider.get<IVoteService>(SocialProviderTypes.VoteService)

/* _____________ CRUD DB _____________ */

/**
 *  Add vote to database
 * @param  {string} postId is the identifier of the post which user vote
 * @param  {string} ownerPostUserId is the identifier of the post owner which user vote
 */
export const dbAddVote = (postId: string,ownerPostUserId: string) => {
  return (dispatch: any, getState: Function) => {

    const state: Map<string, any> = getState()
    let uid: string = state.getIn(['authorize', 'uid'])
    const currentUser = state.getIn(['user', 'info', uid])
    let vote: Vote = {
      postId: postId,
      creationDate: moment().unix(),
      userDisplayName: currentUser.fullName,
      userAvatar: currentUser.avatar,
      userId: uid
    }
    const post: Map<string, any> = state.getIn(['post', 'userPosts', ownerPostUserId, postId])
    const score = Number(post.get('score', 0)) + 1
     const votedPost = post
     .set('score', score)
     .setIn(['votes',uid], true)
    dispatch(postActions.updatePost(votedPost))

    return voteService.addVote(vote).then((voteKey: string) => {
      if (uid !== ownerPostUserId) {
        dispatch(notifyActions.dbAddNotification(
          {
            description: 'Vote on your post.',
            url: `/${ownerPostUserId}/posts/${postId}`,
            notifyRecieverUserId: ownerPostUserId,notifierUserId: uid,
            isSeen: false
          }))
      }

    })
    .catch((error) => {
      const score = post.get('score', 0) - 1
      const votedPost = post
     .set('score', score)
     .setIn(['votes',uid], false)
      dispatch(postActions.updatePost(votedPost))
      dispatch(globalActions.showMessage(error.message))
    })
  }
}

/**
 * Get all votes from database
 */
export const dbGetVotes = (userId: string, postId: string) => {
  return (dispatch: any, getState: Function) => {
    const state: Map<string, any> = getState()
    let uid: string = state.getIn(['authorize', 'uid'])
    if (uid) {

      return voteService
      .getVotes(postId)
      .then((postVotes: { [postId: string]: { [voteId: string]: Vote } }) => {
        dispatch(addVoteList(postVotes))
        const post: Post = state.getIn(['post', 'userPosts', userId, postId])
        if (!post) {
          return
        }
        const votes = postVotes[postId]
        if (votes && Object.keys(votes).length > 0) {
          post.score = Object.keys(votes).length
        }
      })

    }
  }
}

/**
 * Delete a vote from database
 * @param  {string} id of vote
 * @param {string} postId is the identifier of the post which vote belong to
 */
export const dbDeleteVote = (postId: string, ownerPostUserId: string) => {
  return (dispatch: any, getState: Function) => {
    const state: Map<string, any> = getState()
    let uid: string = state.getIn(['authorize', 'uid'])
    const post: Map<string, any> = state.getIn(['post', 'userPosts', ownerPostUserId, postId])
    const score = post.get('score', 0) - 1
    const votedPost = post
     .set('score', score)
     .setIn(['votes',uid], false)
    dispatch(postActions.updatePost(votedPost))
    return voteService.deleteVote(uid, postId).then(x => x)
    .catch((error: any) => {
      const score = post.get('score', 0) + 1
      const votedPost = post
     .set('score', score)
     .setIn(['votes',uid], true)
      dispatch(postActions.updatePost(votedPost))
      dispatch(globalActions.showMessage(error.message))
    })
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
export const deleteVote = (userId: string, postId: string) => {
  return { type: VoteActionType.DELETE_VOTE, payload: {userId, postId} }

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
