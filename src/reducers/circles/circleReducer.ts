// - Import react components
import moment from 'moment'
import _ from 'lodash'

// - Import domain
import { User } from 'core/domain/users'
import { Circle } from 'core/domain/circles'

// - Import action types
import {CircleActionType} from 'constants/circleActionType'

import { CircleState } from './CircleState'
import { ICircleAction } from './ICircleAction'



/**
 * Circle reducer
 * @param state 
 * @param action 
 */
export let circleReducer = (state: CircleState = new CircleState(), action: ICircleAction) => {
  const { payload } = action
  switch (action.type) {
    case CircleActionType.CLEAR_ALL_CIRCLES:
      return new CircleState()

    case CircleActionType.ADD_CIRCLE:
      return {
        ...state,
        userCircles: {
          ...state.userCircles,
          [payload.circle.ownerId]: {
            ...state.userCircles![payload.circle.ownerId],
            [payload.circle.id]: { ...payload.circle }
          }
        }
      }

    case CircleActionType.UPDATE_CIRCLE:
      return {
        ...state,
        userCircles: {
          ...state.userCircles,
          [payload.uid]: {
            ...state.userCircles![payload.uid],
            [payload.circle.id]: { 
              ...state.userCircles![payload.uid][payload.circle.id],
              ...payload.circle,
              openCircleSettings:false }
          }
        }
      }

    case CircleActionType.DELETE_CIRCLE:
      let filteredCircles = {}
      Object.keys(state.userCircles![payload.uid]).map((key) => {
        if (key !== payload.id) {
          return _.merge(filteredCircles, { [key]: { ...state.userCircles![payload.uid][key] } })
        }
      })
      return {
        ...state,
        userCircles: {
          ...state.userCircles,
          [payload.uid]: {
            ...filteredCircles
          }
        }
      }
    case CircleActionType.ADD_LIST_CIRCLE:
      return {
        ...state,
        userCircles: {
          ...state.userCircles,
          [payload.uid]: {
            ...state.userCircles![payload.uid],
            ...payload.circles
          }
        },
        loaded:true

      }

      case CircleActionType.ADD_FOLLOWING_USER:
       return {
        ...state,
        userCircles: {
          ...state.userCircles,
          [payload.uid]: {
            ...state.userCircles![payload.uid],
            [payload.cid]: {
               ...state.userCircles![payload.uid][payload.cid],
               users:{
                 ...state.userCircles![payload.uid][payload.cid].users,
                [payload.followingId]: {
                  ...payload.userCircle
                }
               }
             }
          }
        }
      }

       case CircleActionType.DELETE_FOLLOWING_USER:
        let filteredUserCircle = {}
      Object.keys(state.userCircles![payload.uid][payload.cid].users).map((key) => {
        if (key !== payload.followingId) {
          return _.merge(filteredUserCircle, { [key]: { ...state.userCircles![payload.uid][payload.cid].users[key] } })
        }
      })
       return {
        ...state,
        userCircles: {
          ...state.userCircles,
          [payload.uid]: {
            ...state.userCircles![payload.uid],
            [payload.cid]: {
               ...state.userCircles![payload.uid][payload.cid],
               users:{
                ...filteredUserCircle
               }
             }
          }
        }
      }
    
        case CircleActionType.CLOSE_CIRCLE_SETTINGS:
         return {
        ...state,
        userCircles: {
          ...state.userCircles,
          [payload.uid]: {
            ...state.userCircles![payload.uid],
            [payload.id]: {
               ...state.userCircles![payload.uid][payload.id],
               openCircleSettings: false
             }
          }
        }
      }

    case CircleActionType.OPEN_CIRCLE_SETTINGS:
      return {
        ...state,
        userCircles: {
          ...state.userCircles,
          [payload.uid]: {
            ...state.userCircles![payload.uid],
            [payload.id]: {
               ...state.userCircles![payload.uid][payload.id],
               openCircleSettings: true
             }
          }
        }
      }

    default:
      return state

  }
}
