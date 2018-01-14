// - Import domain
import { User, Profile } from 'core/domain/users'
import { Circle, UserTie } from 'core/domain/circles'
import { SocialError } from 'core/domain/common'

// - Import utility components
import moment from 'moment'

// - Import action types
import { CircleActionType } from 'constants/circleActionType'

// - Import actions
import * as globalActions from 'actions/globalActions'
import * as postActions from 'actions/postActions'
import * as userActions from 'actions/userActions'
import * as notifyActions from 'actions/notifyActions'
import * as serverActions from 'actions/serverActions'

import { IServiceProvider, ServiceProvide } from 'core/factories'
import { ICircleService } from 'core/services/circles'
import { SocialProviderTypes } from 'core/socialProviderTypes'
import { provider } from '../socialEngine'
import { IUserTieService } from 'core/services/circles'
import StringAPI from 'api/StringAPI'
import { ServerRequestStatusType } from 'actions/serverRequestStatusType'
import { ServerRequestType } from 'constants/serverRequestType'
import { ServerRequestModel } from 'models/server/serverRequestModel'

/**
 * Get service providers
 */
const circleService: ICircleService = provider.get<ICircleService>(SocialProviderTypes.CircleService)
const userTieService: IUserTieService = provider.get<IUserTieService>(SocialProviderTypes.UserTieService)

/* _____________ CRUD DB _____________ */

/**
 * Add a circle
 * @param {string} circleName
 */
export let dbAddCircle = (circleName: string) => {
  return (dispatch: any, getState: Function) => {

    let uid: string = getState().authorize.uid
    let circle: Circle = {
      creationDate: moment().unix(),
      name: circleName,
      isSystem : false,
      ownerId: uid
    }
    return circleService.addCircle(uid, circle).then((circleKey: string) => {
      circle.id = circleKey
      circle.ownerId = uid
      dispatch(addCircle(circle))

    }, (error: SocialError) => dispatch(globalActions.showErrorMessage(error.message)))

  }
}

/**
 * Add referer user to the `Following` circle of current user
 */
export const dbFollowUser = (followingCircleId: string, userFollowing: UserTie) => {
  return (dispatch: Function, getState: Function) => {
    const state = getState()
    let uid: string = state.authorize.uid
    let user: User = { ...state.user.info[uid], userId: uid }

    // Set server request status to {Sent} for following user
    const followReqestModel = createFollowRequest(userFollowing.userId!)
    dispatch(serverActions.sendRequest(followReqestModel))

    // Call server API
    return userTieService.tieUseres(
      { userId: user.userId!, fullName: user.fullName, avatar: user.avatar, approved: false },
      { userId: userFollowing.userId!, fullName: userFollowing.fullName, avatar: userFollowing.avatar, approved: false },
      [followingCircleId]
    )
      .then(() => {
        dispatch(addFollowingUser(
          new UserTie(
            userFollowing.userId!,
            moment().unix(),
            userFollowing.fullName,
            userFollowing.avatar,
            false,
            [followingCircleId]
        )))

        // Set server request status to {OK} for following user
        followReqestModel.status = ServerRequestStatusType.OK
        dispatch(serverActions.sendRequest(followReqestModel))

        // Send notification
        dispatch(notifyActions.dbAddNotification(
          {
            description: `${user.fullName} follow you.`,
            url: `/${uid}`,
            notifyRecieverUserId: userFollowing.userId as string,
            notifierUserId: uid,
            isSeen: false
          }))

      }, (error: SocialError) => {
        dispatch(globalActions.showErrorMessage(error.message))

        // Set server request status to {Error} for following user
        followReqestModel.status = ServerRequestStatusType.Error
        dispatch(serverActions.sendRequest(followReqestModel))
      })
  }
}

/**
 * Update user in circle/circles
 */
export let dbUpdateUserInCircles = (circleIdList: string[], userFollowing: UserTie) => {
  return (dispatch: any, getState: Function) => {
    const state = getState()
    let uid: string = state.authorize.uid
    let user: User = { ...state.user.info[uid], userId: uid }

    // Set server request status to {Sent}
    const addToCircleRequest = createAddToCircleRequest(userFollowing.userId!)
    dispatch(serverActions.sendRequest(addToCircleRequest))

    dispatch(globalActions.showMasterLoading())

    // Call server API
    return userTieService.updateUsersTie(
      { userId: user.userId!, fullName: user.fullName, avatar: user.avatar, approved: false },
      { userId: userFollowing.userId!, fullName: userFollowing.fullName, avatar: userFollowing.avatar, approved: false },
      circleIdList
    )
      .then(() => {
        dispatch(addFollowingUser(
          new UserTie(
            userFollowing.userId!,
            moment().unix(),
            userFollowing.fullName,
            userFollowing.avatar,
            false,
            circleIdList
        )))

        // Set server request status to {OK}
        addToCircleRequest.status = ServerRequestStatusType.OK
        dispatch(serverActions.sendRequest(addToCircleRequest))

        dispatch(globalActions.hideMasterLoading())

        // Close select circle box
        dispatch(closeSelectCircleBox(userFollowing.userId!))

      }, (error: SocialError) => {
        dispatch(globalActions.showErrorMessage(error.message))

        dispatch(globalActions.hideMasterLoading())

        // Set server request status to {Error}
        addToCircleRequest.status = ServerRequestStatusType.Error
        dispatch(serverActions.sendRequest(addToCircleRequest))
      })
  }
}

/**
 * Delete following user
 */
export let dbDeleteFollowingUser = (userFollowingId: string) => {
  return (dispatch: any, getState: Function) => {

    let uid: string = getState().authorize.uid

    // Set server request status to {Sent}
    const deleteFollowingUserRequest = createdeleteFollowingUserRequest(userFollowingId)
    dispatch(serverActions.sendRequest(deleteFollowingUserRequest))

    dispatch(globalActions.showMasterLoading())

    // Call server API
    return userTieService.removeUsersTie(uid, userFollowingId)
      .then(() => {
        dispatch(deleteFollowingUser(userFollowingId))

        dispatch(globalActions.hideMasterLoading())

        // Close select circle box
        dispatch(closeSelectCircleBox(userFollowingId))

        // Set server request status to {OK}
        deleteFollowingUserRequest.status = ServerRequestStatusType.OK
        dispatch(serverActions.sendRequest(deleteFollowingUserRequest))
      }, (error: SocialError) => {
        dispatch(globalActions.showErrorMessage(error.message))

        dispatch(globalActions.hideMasterLoading())

        // Close select circle box
        dispatch(closeSelectCircleBox(userFollowingId))

        // Set server request status to {Error}
        deleteFollowingUserRequest.status = ServerRequestStatusType.Error
        dispatch(serverActions.sendRequest(deleteFollowingUserRequest))
      })
  }
}

/**
 * Update a circle from database
 */
export const dbUpdateCircle = (newCircle: Circle) => {
  return (dispatch: any, getState: Function) => {

    // Get current user id
    let uid: string = getState().authorize.uid

    // Write the new data simultaneously in the list
    let circle: Circle = getState().circle.userTies[uid][newCircle.id!]
    let updatedCircle: Circle = {
      name: newCircle.name || circle.name,
      isSystem : false
    }
    return circleService.updateCircle(uid, newCircle.id!, circle)
      .then(() => {
        dispatch(updateCircle({ id: newCircle.id, ...updatedCircle }))
      }, (error: SocialError) => {
        dispatch(globalActions.showErrorMessage(error.message))
      })
  }

}

/**
 * Delete a circle from database
 */
export const dbDeleteCircle = (circleId: string) => {
  return (dispatch: any, getState: Function) => {

    // Get current user id
    let uid: string = getState().authorize.uid

    return circleService.deleteCircle(uid, circleId)
      .then(() => {
        dispatch(deleteCircle(circleId))
      }, (error: SocialError) => {
        dispatch(globalActions.showErrorMessage(error.message))
      })
  }

}

/**
 *  Get all circles from data base belong to current user
 */
export const dbGetCircles = () => {
  return (dispatch: any, getState: Function) => {
    let uid: string = getState().authorize.uid
    if (uid) {

      return circleService.getCircles(uid)
        .then((circles: { [circleId: string]: Circle }) => {
          dispatch(addCircles(circles))
        })
        .catch((error: SocialError) => {
          dispatch(globalActions.showErrorMessage(error.message))
        })

    }
  }
}

/**
 *  Get all user ties from data base
 */
export const dbGetUserTies = () => {
  return (dispatch: any, getState: Function) => {
    let uid: string = getState().authorize.uid
    if (uid) {
      userTieService.getUserTies(uid).then((result) => {

        dispatch(userActions.addPeopleInfo(result as any))
        dispatch(addUserTies(result))

      })
        .catch((error: SocialError) => {
          dispatch(globalActions.showErrorMessage(error.message))
        })
    }
  }
}

/**
 *  Get all followers
 */
export const dbGetFollowers = () => {
  return (dispatch: any, getState: Function) => {
    let uid: string = getState().authorize.uid
    if (uid) {
      userTieService.getUserTieSender(uid).then((result) => {

        dispatch(userActions.addPeopleInfo(result as any))
        dispatch(addUserTieds(result))

      })
        .catch((error: SocialError) => {
          dispatch(globalActions.showErrorMessage(error.message))
        })
    }
  }
}

/**
 * Get all user circles from data base by user id
 * @param uid user identifier
 */
export const dbGetCirclesByUserId = (uid: string) => {
  return (dispatch: any, getState: Function) => {

    if (uid) {
      return circleService.getCircles(uid)
        .then((circles: { [circleId: string]: Circle }) => {
          dispatch(addCircles(circles))
        })
        .catch((error: SocialError) => {
          dispatch(globalActions.showErrorMessage(error.message))
        })
    }
  }
}

/**
 * Create follow user serevr request model
 */
const createFollowRequest = (userFollowingId: string) => {
  const requestId = StringAPI.createServerRequestId(ServerRequestType.CircleFollowUser, userFollowingId)
  return new ServerRequestModel(
    ServerRequestType.CircleFollowUser,
    requestId,
    '',
    ServerRequestStatusType.Sent
    )
}

/**
 * Create add referer user to circle serevr request model
 */
const createAddToCircleRequest = (userFollowingId: string) => {
  const requestId = StringAPI.createServerRequestId(ServerRequestType.CircleAddToCircle, userFollowingId)
  return new ServerRequestModel(
    ServerRequestType.CircleAddToCircle,
    requestId,
    '',
    ServerRequestStatusType.Sent
    )
}

/**
 * Create delete referer user serevr request model
 */
const createdeleteFollowingUserRequest = (userFollowingId: string) => {
  const requestId = StringAPI.createServerRequestId(ServerRequestType.CircleDeleteFollowingUser, userFollowingId)
  return new ServerRequestModel(
    ServerRequestType.CircleDeleteFollowingUser,
    requestId,
    '',
    ServerRequestStatusType.Sent
    )
}

/* _____________ CRUD State _____________ */

/**
 * Add a circle
 */
export const addCircle = (circle: Circle) => {
  return {
    type: CircleActionType.ADD_CIRCLE,
    payload: { circle }
  }
}

/**
 * Update a circle
 */
export const updateCircle = (circle: Circle) => {
  return {
    type: CircleActionType.UPDATE_CIRCLE,
    payload: { circle }
  }
}

/**
 * Delete a circle
 */
export const deleteCircle = (circleId: string) => {
  return {
    type: CircleActionType.DELETE_CIRCLE,
    payload: { circleId }
  }
}

/**
 * Add a list of circle
 */
export const addCircles = (circleList: {[circleId: string]: Circle}) => {
  return {
    type: CircleActionType.ADD_LIST_CIRCLE,
    payload: { circleList }
  }
}

/**
 * Clea all data in circle store
 */
export const clearAllCircles = () => {
  return {
    type: CircleActionType.CLEAR_ALL_CIRCLES
  }
}

/**
 * Open circle settings
 */
export const openCircleSettings = (circleId: string) => {
  return {
    type: CircleActionType.OPEN_CIRCLE_SETTINGS,
    payload: { circleId }
  }

}

/**
 * Close open circle settings
 */
export const closeCircleSettings = (circleId: string) => {
  return {
    type: CircleActionType.CLOSE_CIRCLE_SETTINGS,
    payload: { circleId }
  }

}

/**
 * Add following user
 */
export const addFollowingUser = (userTie: UserTie) => {
  return {
    type: CircleActionType.ADD_FOLLOWING_USER,
    payload: { userTie }
  }
}

/**
 * Update the user tie
 */
export const updateUserTie = (userTie: UserTie) => {
  return {
    type: CircleActionType.UPDATE_USER_TIE,
    payload: { userTie }
  }
}

/**
 * Add user ties
 */
export const addUserTies = (userTies: {[userId: string]: UserTie }) => {
  return {
    type: CircleActionType.ADD_USER_TIE_LIST,
    payload: { userTies }
  }
}

/**
 * Add users who send tie request for current user
 */
export const addUserTieds = (userTieds: {[userId: string]: UserTie }) => {
  return {
    type: CircleActionType.ADD_USER_TIED_LIST,
    payload: { userTieds }
  }
}

/**
 * Delete the user from a circle
 */
export const deleteUserFromCircle = (userId: string, circleId: string) => {
  return {
    type: CircleActionType.DELETE_USER_FROM_CIRCLE,
    payload: { userId, circleId }
  }
}

/**
 * Delete following user
 */
export const deleteFollowingUser = (userId: string) => {
  return {
    type: CircleActionType.DELETE_FOLLOWING_USER,
    payload: { userId }
  }
}

/**
 * Show the box to select circle
 */
export const showSelectCircleBox = (userId: string) => {
  return {
    type: CircleActionType.SHOW_SELECT_CIRCLE_BOX,
    payload: { userId }
  }

}

/**
 * Hide the box to select circle
 */
export const hideSelectCircleBox = (userId: string) => {
  return {
    type: CircleActionType.HIDE_SELECT_CIRCLE_BOX,
    payload: { userId }
  }

}

/**
 * Show loading on following user
 */
export const showFollowingUserLoading = (userId: string) => {
  return {
    type: CircleActionType.SHOW_FOLLOWING_USER_LOADING,
    payload: { userId }
  }

}

/**
 * Set current user selected circles for referer user
 */
export const setSelectedCircles = (userId: string, circleList: string[]) => {
  return {
    type: CircleActionType.SET_SELECTED_CIRCLES_USER_BOX_COMPONENT,
    payload: { userId, circleList }
  }

}

/**
 * Remove current user selected circles for referer user
 */
export const removeSelectedCircles = (userId: string) => {
  return {
    type: CircleActionType.REMOVE_SELECTED_CIRCLES_USER_BOX_COMPONENT,
    payload: { userId }
  }
}

/**
 * Open select circle box
 */
export const openSelectCircleBox = (userId: string) => {
  return {
    type: CircleActionType.OPEN_SELECT_CIRCLES_USER_BOX_COMPONENT,
    payload: { userId}
  }

}

/**
 * Close select circle box
 */
export const closeSelectCircleBox = (userId: string) => {
  return {
    type: CircleActionType.CLOSE_SELECT_CIRCLES_USER_BOX_COMPONENT,
    payload: { userId}
  }

}

/**
 * Hide loading on following user
 */
export const hideFollowingUserLoading = (userId: string) => {
  return {
    type: CircleActionType.HIDE_FOLLOWING_USER_LOADING,
    payload: { userId }
  }

}
