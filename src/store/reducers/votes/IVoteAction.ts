import { VoteActionType } from 'constants/voteActionType'

/**
 *  Vote action interface
 *
 * @export
 * @interface IVoteAction
 */
export interface IVoteAction  {
  payload: any,
  type: VoteActionType

}
