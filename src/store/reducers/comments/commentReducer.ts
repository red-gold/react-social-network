// - Import react components
import { CommentActionType } from 'constants/commentActionType';
import { Map } from 'immutable';

import { CommentState } from './CommentState';
import { ICommentAction } from './ICommentAction';

// - Import domain
// - Import action types
/**
 * Comment reducer
 * @param state
 * @param action
 */
export let commentReducer = (state = Map(new CommentState() as any), action: ICommentAction) => {
  let { payload } = action
  switch (action.type) {

    /* _____________ CRUD _____________ */
    case CommentActionType.ADD_COMMENT:
      return state
        .setIn(['postComments', payload.postId, payload.id], payload)

    case CommentActionType.ADD_COMMENT_LIST:
      return state
        .mergeIn(['postComments'], payload)
        .set('loaded', true)

    case CommentActionType.UPDATE_COMMENT:
      const { comment } = payload
      return state
        .updateIn(['postComments', comment.postId, comment.id, 'text'], (text: string) => comment.text)

    case CommentActionType.DELETE_COMMENT:
      return state.deleteIn(['postComments', payload.postId, payload.id])

    case CommentActionType.CLOSE_COMMENT_EDITOR:
      return state
        .setIn(['editorStatus', payload.postId, payload.id], false)

    case CommentActionType.OPEN_COMMENT_EDITOR:
      return state
        .setIn(['editorStatus', payload.postId, payload.id], true)

    case CommentActionType.CLEAR_ALL_DATA_COMMENT:
      return Map(new CommentState() as any)
    default:
      return state

  }

}
