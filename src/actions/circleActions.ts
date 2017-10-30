// - Import domain
import { User } from 'core/domain/users'
import { Circle, UserFollower } from 'core/domain/circles'
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

import { IServiceProvider,ServiceProvide } from 'core/factories'
import { ICircleService } from 'core/services/circles'

const serviceProvider: IServiceProvider = new ServiceProvide()
const circleService: ICircleService = serviceProvider.createCircleService()

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
      users: {}
    }
    return circleService.addCircle(uid,circle).then((circleKey: string) => {
      circle.id = circleKey
      circle.ownerId = uid
      dispatch(addCircle(circle))

    }, (error: SocialError) => dispatch(globalActions.showErrorMessage(error.message)))

  }
}

/**
 * Add a user in a circle
 * @param {string} cid is circle identifier
 * @param {User} userFollowing is the user for following
 */
export let dbAddFollowingUser = (cid: string, userFollowing: UserFollower) => {
  return (dispatch: any, getState: Function) => {

    let uid: string = getState().authorize.uid
    let user: User = getState().user.info[uid]

    let userCircle: User = {
      creationDate: moment().unix(),
      fullName: userFollowing.fullName,
      avatar: userFollowing.avatar || ''
    }
    let userFollower: UserFollower = {
      creationDate: moment().unix(),
      fullName: user.fullName,
      avatar: user.avatar || '',
      approved: false
    }

    return circleService.addFollowingUser(uid,cid,userCircle,userFollower,userFollowing.userId as string)
      .then(() => {
        dispatch(addFollowingUser(uid, cid, userFollowing.userId as string, { ...userCircle } as User))

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
      })
  }
}

/**
 * Delete a user from a circle
 * @param {string} cid is circle identifier
 * @param {string} userFollowingId following user identifier
 */
export let dbDeleteFollowingUser = (cid: string, userFollowingId: string) => {
  return (dispatch: any, getState: Function) => {

    let uid: string = getState().authorize.uid

    return circleService.deleteFollowingUser(uid,cid,userFollowingId)
      .then(() => {
        dispatch(deleteFollowingUser(uid, cid, userFollowingId))
      }, (error: SocialError) => {
        dispatch(globalActions.showErrorMessage(error.message))
      })
  }
}

/**
 * Update a circle from database
 * @param  {Circle} newCircle
 */
export const dbUpdateCircle = (newCircle: Circle) => {
  return (dispatch: any, getState: Function) => {

    // Get current user id
    let uid: string = getState().authorize.uid

    // Write the new data simultaneously in the list
    let circle: Circle = getState().circle.userCircles[uid][newCircle.id!]
    let updatedCircle: Circle = {
      name: newCircle.name || circle.name,
      users: newCircle.users ? newCircle.users : (circle.users || [])
    }
    return circleService.updateCircle(uid,newCircle.id!,circle)
      .then(() => {
        dispatch(updateCircle(uid,{ id: newCircle.id, ...updatedCircle }))
      }, (error: SocialError) => {
        dispatch(globalActions.showErrorMessage(error.message))
      })
  }

}

/**
 * Delete a circle from database
 * @param  {string} id is circle identifier
 */
export const dbDeleteCircle = (id: string) => {
  return (dispatch: any, getState: Function) => {

    // Get current user id
    let uid: string = getState().authorize.uid

    return circleService.deleteCircle(uid,id)
      .then(() => {
        dispatch(deleteCircle(uid, id))
      }, (error: SocialError) => {
        dispatch(globalActions.showErrorMessage(error.message))
      })
  }

}

/**
 *  Get all user circles from data base
 */
export const dbGetCircles = () => {
  return (dispatch: any, getState: Function) => {
    let uid: string = getState().authorize.uid
    if (uid) {

      return circleService.getCircles(uid)
        .then((circles: { [circleId: string]: Circle }) => {
          Object.keys(circles).forEach((circleId) => {
            if (circleId !== '-Followers' && circles[circleId].users) {
              Object.keys(circles[circleId].users).filter((v, i, a) => a.indexOf(v) === i).forEach((userId) => {
                dispatch(postActions.dbGetPostsByUserId(userId))
                dispatch(userActions.dbGetUserInfoByUserId(userId, ''))
              })
            }
          })

          dispatch(addCircles(uid, circles))
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
            dispatch(addCircles(uid, circles))
          })
          .catch((error: SocialError) => {
            dispatch(globalActions.showErrorMessage(error.message))
          })
    }
  }
}

/* _____________ CRUD State _____________ */

/**
 * Add a normal circle
 * @param {string} uid is user identifier
 * @param {Circle} circle
 */
export const addCircle = (circle: Circle) => {
  return {
    type: CircleActionType.ADD_CIRCLE,
    payload: { circle }
  }
}

/**
 * Update a circle
 * @param {string} uid is user identifier
 * @param {Circle} circle
 */
export const updateCircle = (uid: string, circle: Circle) => {
  return {
    type: CircleActionType.UPDATE_CIRCLE,
    payload: { uid, circle }
  }
}

/**
 * Delete a circle
 * @param {string} uid is user identifier
 * @param {string} id is circle identifier
 */
export const deleteCircle = (uid: string, id: string) => {
  return {
    type: CircleActionType.DELETE_CIRCLE,
    payload: { uid, id }
  }
}

/**
 * Add a list of circle
 * @param {string} uid
 * @param {circleId: string]: Circle} circles
 */
export const addCircles = (uid: string, circles: { [circleId: string]: Circle }) => {
  return {
    type: CircleActionType.ADD_LIST_CIRCLE,
    payload: { uid, circles }
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
 * @param uid user idenifier
 * @param id circle identifier
 */
export const openCircleSettings = (uid: string, id: string) => {
  return {
    type: CircleActionType.OPEN_CIRCLE_SETTINGS,
    payload: { uid, id }
  }

}

/**
 * Close open circle settings
 * @param uid user identifier
 * @param id circle identifier
 */
export const closeCircleSettings = (uid: string, id: string) => {
  return {
    type: CircleActionType.CLOSE_CIRCLE_SETTINGS,
    payload: { uid, id }
  }

}

/**
 * Add following user in a circle
 * @param {string} uid user identifire who want to follow the following user
 * @param {string} cid circle identifier that following user should be added in
 * @param {string} followingId following user identifier
 * @param {User} userCircle information about following user
 */
export const addFollowingUser = (uid: string, cid: string, followingId: string, userCircle: User) => {
  return {
    type: CircleActionType.ADD_FOLLOWING_USER,
    payload: { uid, cid, followingId, userCircle }
  }

}

/**
 * Delete following user from a circle
 * @param {string} uid user identifire who want to follow the following user
 * @param {string} cid circle identifier that following user should be added in
 * @param {string} followingId following user identifier
 */
export const deleteFollowingUser = (uid: string, cid: string, followingId: string) => {
  return {
    type: CircleActionType.DELETE_FOLLOWING_USER,
    payload: { uid, cid, followingId }
  }

}
