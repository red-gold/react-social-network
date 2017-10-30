import { Circle, UserFollower } from 'core/domain/circles'

/**
 * Get the circles' id which the specify users is in that circle
 * @param {object} circles
 * @param {string} followingId
 */
export const getUserBelongCircles = (circles: {[circleId: string]: Circle},followingId: string) => {
  let userBelongCircles: string[] = []
  Object.keys(circles).forEach((cid) => {
    if (cid.trim() !== '-Followers' && circles[cid].users) {
      let isExist = Object.keys(circles[cid].users).indexOf(followingId) > -1
      if (isExist) {
        userBelongCircles.push(cid)
      }
    }
  })

  return userBelongCircles
}

/**
 * Get the following users
 * @param {object} circles
 */
export const getFollowingUsers = (circles: {[circleId: string]: Circle}) => {
  let followingUsers: {[userId: string]: UserFollower} = {}
  Object.keys(circles).forEach((cid) => {
    if (cid.trim() !== '-Followers' && circles[cid].users) {
      Object.keys(circles[cid].users).forEach((userId) => {
        let isExist = Object.keys(followingUsers).indexOf(userId) > -1
        if (!isExist) {
          followingUsers[userId] = {
            ...circles[cid].users[userId]
          }
        }
      })

    }
  })
  return followingUsers
}

export default {
  getUserBelongCircles,
  getFollowingUsers
}
