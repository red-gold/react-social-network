


/**
 * Get the circles which the specify users is in that circle 
 * @param {object} circles 
 * @param {string} followingId 
 */
export const getUserBelongCircles = (circles,followingId) => {
    let userBelongCircles = []
    Object.keys(circles).forEach((cid) => {
        if(cid.trim() !== '-Followers' && circles[cid].users){
            let isExist =  Object.keys(circles[cid].users).indexOf(followingId) > -1
            if(isExist){
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
export const getFollowingUsers = (circles) => {
    let followingUsers = {}
    Object.keys(circles).forEach((cid) => {
        if(cid.trim() !== '-Followers' && circles[cid].users){
            Object.keys(circles[cid].users).forEach((userId)=>{
                let isExist = Object.keys(followingUsers).indexOf(userId) > -1
                if(!isExist){
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