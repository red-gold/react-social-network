// - Import react components
import moment from 'moment'
import _ from 'lodash'

// - Import domain
import { User } from 'core/domain/users'
import { Circle, UserTie } from 'core/domain/circles'

// - Import action types
import { CircleActionType } from 'constants/circleActionType'

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
        circleList: {
          ...state.circleList,
          [payload.circle.id]: {
            ...payload.circle
          }
        }
      }

    case CircleActionType.UPDATE_CIRCLE:
      return {
        ...state,
        openSetting: {
          ...state.openSetting,
          [payload.circle.id]: false
        },
        circleList: {
          ...state.circleList,
          [payload.circle.id]: {
            ...payload.circle
          }
        }
      }

    case CircleActionType.DELETE_CIRCLE:
      let filteredDeleteCircles = {}
      Object.keys(state.circleList).map((key) => {
        if (key !== payload.circleId) {
          return _.merge(filteredDeleteCircles, { [key]: { ...state.circleList![key] } })
        }
      })
      return {
        ...state,
        circleList: {
          ...state.circleList,
          ...filteredDeleteCircles
        }
      }
    case CircleActionType.ADD_LIST_CIRCLE:
      return {
        ...state,
        circleList: {
          ...state.circleList,
          ...payload.circleList
        },
        loaded: true
      }

    case CircleActionType.ADD_FOLLOWING_USER:
      return {
        ...state,
        userTies: {
          ...state.userTies,
          [payload.userTie.userId]: {
            ...payload.userTie
          }
        },
        selectedCircles: {
          ...state.selectedCircles,
          [payload.userTie.userId]: payload.userTie.circleIdList
        }
      }

    case CircleActionType.UPDATE_USER_TIE:
      return {
        ...state,
        userTies: {
          ...state.userTies,
          [payload.userTie.user.userId]: {
            ...payload.userTie
          }
        }
      }

    case CircleActionType.ADD_USER_TIE_LIST:
      return {
        ...state,
        userTies: {
          ...state.userTies,
          ...payload.userTies
        },
        selectedCircles : getSelectedCircles(payload.userTies)
      }

    case CircleActionType.ADD_USER_TIED_LIST:
      return {
        ...state,
        userTieds: {
          ...state.userTieds,
          ...payload.userTieds
        }
      }

    case CircleActionType.DELETE_USER_FROM_CIRCLE:
      let filteredCircles: string[] = []
      Object.keys(state.userTies[payload.userId].circleIdList!).forEach((circleId) => {
        if (circleId !== payload.circleId) {
          filteredCircles.push(circleId)
        }
      })
      return {
        ...state,
        userTies: {
          ...state.userTies,
          [payload.userTie.user.userId]: {
            ...payload.userTie,
            circleIdList: filteredCircles
          }
        }
      }

    case CircleActionType.DELETE_FOLLOWING_USER:
      let filteredUserTies: {[userId: string]: UserTie } = {}

      Object.keys(state.userTies).forEach((userId) => {
        if (userId !== payload.userId) {
          return _.merge(filteredUserTies, { [userId]: { ...state.userTies[userId] } })
        }
      })
      return {
        ...state,
        userTies: {
          ...filteredUserTies
        },
        selectedCircles : getSelectedCircles(filteredUserTies)
      }

/**
 * User interface stuffs
 */

    case CircleActionType.CLOSE_CIRCLE_SETTINGS:
      return {
        ...state,
        openSetting: {
          ...state.openSetting,
          [payload.circleId]: false
        }
      }

    case CircleActionType.OPEN_CIRCLE_SETTINGS:
      return {
        ...state,
        openSetting: {
          ...state.openSetting,
          [payload.circleId]: true
        }
      }

    case CircleActionType.SHOW_SELECT_CIRCLE_BOX:
      return {
        ...state,
        selectCircleStatus: {
          ...state.selectCircleStatus,
          [payload.userId]: true
        }
      }

    case CircleActionType.HIDE_SELECT_CIRCLE_BOX:
      return {
        ...state,
        selectCircleStatus: {
          ...state.selectCircleStatus,
          [payload.userId]: false
        }
      }

    case CircleActionType.SHOW_FOLLOWING_USER_LOADING:
      return {
        ...state,
        followingLoadingStatus: {
          ...state.followingLoadingStatus,
          [payload.userId]: true
        }
      }

    case CircleActionType.HIDE_FOLLOWING_USER_LOADING:
      return {
        ...state,
        followingLoadingStatus: {
          ...state.followingLoadingStatus,
          [payload.userId]: false
        }
      }

      /**
       * User box component
       */
    case CircleActionType.SET_SELECTED_CIRCLES_USER_BOX_COMPONENT:
      return {
        ...state,
        selectedCircles: {
          ...state.selectedCircles,
          [payload.userId]: payload.circleList
        }
      }
      /**
       * User box component
       */
    case CircleActionType.REMOVE_SELECTED_CIRCLES_USER_BOX_COMPONENT:
      return {
        ...state,
        selectedCircles: {
          ...state.selectedCircles,
          [payload.userId]: []
        }
      }
      /**
       * User box component
       */
    case CircleActionType.OPEN_SELECT_CIRCLES_USER_BOX_COMPONENT:
      return {
        ...state,
        openSelecteCircles: {
          ...state.openSelecteCircles,
          [payload.userId]: true
        }
      }
    case CircleActionType.CLOSE_SELECT_CIRCLES_USER_BOX_COMPONENT:
      return {
        ...state,
        openSelecteCircles: {
          ...state.openSelecteCircles,
          [payload.userId]: false
        }
      }
    default:
      return state

  }
}

/**
 * Map user ties selected to selected circles
 */
const getSelectedCircles = (userTies: {[userId: string]: UserTie }) => {
  let selectedCircles: {[userId: string]: string[]} = {}
  Object.keys(userTies).forEach((userId: string) => {
    const userTie = (userTies as {[userId: string]: UserTie })[userId]
    selectedCircles = {
      ...selectedCircles,
      [userTie.userId!]: userTie.circleIdList!
    }
  })

  return selectedCircles
}