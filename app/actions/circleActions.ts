// - Import firebase component
import firebase, { firebaseRef } from 'app/firebase/'

// - Import domain
import { User } from "domain/users";
import { Circle, UserFollower } from "domain/circles";

// - Import utility components
import moment from 'moment'

// - Import action types
import { CircleActionType } from 'constants/circleActionType'


// - Import actions
import * as globalActions from 'actions/globalActions'
import * as postActions from 'actions/postActions'
import * as userActions from 'actions/userActions'
import * as notifyActions from 'actions/notifyActions'





/* _____________ CRUD DB _____________ */


/**
 * Add a circle
 * @param {string} circleName 
 */
export var dbAddCircle = (circleName: string) => {
  return (dispatch: any, getState: Function) => {

    let uid: string = getState().authorize.uid
    let circle: Circle = {
      creationDate: moment().unix(),
      name: circleName,
      users: {}
    }

    let circleRef = firebaseRef.child(`userCircles/${uid}/circles`).push(circle)
    return circleRef.then(() => {
      circle.id = circleRef.key;
      circle.ownerId = uid
      dispatch(addCircle(circle))

    }, (error) => dispatch(globalActions.showErrorMessage(error.message)))

  }
}

/**
 * Add a user in a circle
 * @param {string} cid is circle identifier 
 * @param {User} userFollowing is the user for following
 */
export var dbAddFollowingUser = (cid: string, userFollowing: User) => {
  return (dispatch: any, getState: Function) => {

    let uid: string = getState().authorize.uid;
    let user: User = getState().user.info[uid];

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
    let updates: any = {}
    updates[`userCircles/${uid}/circles/${cid}/users/${userFollowing.userId}`] = userCircle
    updates[`userCircles/${userFollowing.userId}/circles/-Followers/users/${uid}`] = userFollower
    return firebaseRef.update(updates).then((result) => {
      dispatch(addFollowingUser(uid, cid, userFollowing.userId as string, { ...userCircle } as User))

      dispatch(notifyActions.dbAddNotify(
        {
          description: `${user.fullName} follow you.`,
          url: `/${uid}`,
          notifyRecieverUserId: userFollowing.userId as string,
           notifierUserId: uid,
          isSeen:false
        }))

    }, (error) => {
      dispatch(globalActions.showErrorMessage(error.message))
    })
  }
}


/**
 * Delete a user from a circle
 * @param {string} cid is circle identifier 
 * @param {string} followingId following user identifier
 */
export var dbDeleteFollowingUser = (cid: string, followingId: string) => {
  return (dispatch: any, getState:Function) => {

    let uid: string = getState().authorize.uid

    let updates: any = {}
    updates[`userCircles/${uid}/circles/${cid}/users/${followingId}`] = null
    updates[`userCircles/${followingId}/circles/-Followers/users/${uid}`] = null
    return firebaseRef.update(updates).then((result) => {
      dispatch(deleteFollowingUser(uid, cid, followingId))
    }, (error) => {
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
    let updates: any = {}
    let circle: Circle = getState().circle.userCircles[uid][newCircle.id!]
    let updatedCircle : Circle = {
      name: newCircle.name || circle.name,
      users: newCircle.users ? newCircle.users : (circle.users || [])
    }
    updates[`userCircles/${uid}/circles/${newCircle.id}`] = updatedCircle
    return firebaseRef.update(updates).then(() => {
      dispatch(updateCircle(uid,{ id: newCircle.id, ...updatedCircle }))
    }, (error) => {
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

    // Write the new data simultaneously in the list
    let updates: any = {};
    updates[`userCircles/${uid}/circles/${id}`] = null;

    return firebaseRef.update(updates).then((result) => {
      dispatch(deleteCircle(uid, id))
    }, (error) => {
      dispatch(globalActions.showErrorMessage(error.message))
    });
  }

}

/**
 *  Get all user circles from data base
 */
export const dbGetCircles = () => {
  return (dispatch: any, getState: Function) => {
    let uid: string = getState().authorize.uid
    if (uid) {
      let circlesRef: any = firebaseRef.child(`userCircles/${uid}/circles`);

      return circlesRef.once('value').then((snapshot: any) => {
        var circles: any = snapshot.val() || {};
        var parsedCircles: { [circleId: string]: Circle } = {};
        Object.keys(circles).forEach((circleId) => {
          if (circleId !== '-Followers' && circles[circleId].users) {
            Object.keys(circles[circleId].users).filter((v, i, a) => a.indexOf(v) === i).forEach((userId) => {
              dispatch(postActions.dbGetPostsByUserId(userId))
              dispatch(userActions.dbGetUserInfoByUserId(userId, ""))
            })
          }
          parsedCircles[circleId] = {
            id: circleId,
            ...circles[circleId]
          }
        })

        dispatch(addCircles(uid, parsedCircles));
      });

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
      let circlesRef = firebaseRef.child(`userCircles/${uid}/circles`);

      return circlesRef.once('value').then((snapshot) => {
        var circles = snapshot.val() || {};
        var parsedCircles: { [circleId: string]: Circle } = {};
        Object.keys(circles).forEach((circleId) => {
          parsedCircles[circleId] = {
            id: circleId,
            ...circles[circleId]
          }
        })
        dispatch(addCircles(uid, parsedCircles));
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
