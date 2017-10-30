// - Import react components
import moment from 'moment'
import _ from 'lodash'

// - Import domain
import { User } from 'core/domain/users'
import { Comment } from 'core/domain/comments'

// - Import action types
import { CommentActionType } from 'constants/commentActionType'

import { CommentState } from './CommentState'
import { ICommentAction } from './ICommentAction'

/**
 * Comment reducer
 * @param state
 * @param action
 */
export let commentReducer = (state: CommentState = new CommentState(), action: ICommentAction) => {
  let { payload } = action
  switch (action.type) {

    /* _____________ CRUD _____________ */
    case CommentActionType.ADD_COMMENT:
      return {
        ...state,
        postComments: {
          ...state.postComments,
          [payload.postId]: {
            ...state.postComments![payload.postId],
            [payload.id]: {
              ...payload,
              editorStatus: false
            }
          }

        }
      }
    case CommentActionType.ADD_COMMENT_LIST:
      return {
        ...state,
        postComments: {
          ...payload
        },
        loaded: true
      }
    case CommentActionType.UPDATE_COMMENT:
      return {
        ...state,
        postComments: {
          ...state.postComments,
          [payload.postId]: {
            ...state.postComments![payload.postId],
            [payload.id]: {
              ...state.postComments![payload.postId][payload.id],
              text: payload.text,
              editorStatus: false
            }
          }
        }
      }
    case CommentActionType.DELETE_COMMENT:
      let parsedComments = {}
      if (!state.postComments![payload.postId]) {
        return state
      }
      Object.keys(state.postComments![payload.postId]).map((id) => {
        if (id !== payload.id) {
          _.merge(parsedComments, { [id]: { ...state.postComments![payload.postId][id] } })
        }

      })
      return {
        ...state,
        postComments: {
          ...state.postComments,
          [payload.postId]: {
            ...parsedComments
          }
        }
      }
    case CommentActionType.CLOSE_COMMENT_EDITOR:
      return {
        ...state,
        postComments: {
          ...state.postComments,
          [payload.postId]: {
            ...state.postComments![payload.postId],
            [payload.id]: {
              ...state.postComments![payload.postId][payload.id],
              editorStatus: false
            }
          }
        }
      }
    case CommentActionType.OPEN_COMMENT_EDITOR:
      return {
        ...state,
        postComments: {
          ...state.postComments,
          [payload.postId]: {
            ...state.postComments![payload.postId],
            [payload.id]: {
              ...state.postComments![payload.postId][payload.id],
              editorStatus: true
            }
          }
        }
      }

    case CommentActionType.CLEAR_ALL_DATA_COMMENT:
      return new CommentState()
    default:
      return state

  }

}
