// - Import react components
import { Action } from 'redux'

// - Import firebase component
import firebase, { firebaseRef } from '../firebase'

// - Import domain
import { Post } from 'domain/posts'

// - Import utility components
import moment from 'moment'

// - Import action types
import { PostActionType } from 'constants/postActionType'

// - Import actions
import * as globalActions from 'actions/globalActions'

/* _____________ CRUD DB _____________ */

/**
 * Add a normal post
 * @param {any} newPost
 * @param {Function} callBack
 */
export let dbAddPost = (newPost: any, callBack: Function) => {
  return (dispatch: any, getState: Function) => {

    let uid: string = getState().authorize.uid
    let post: Post = {
      postTypeId: 0,
      creationDate: moment().unix(),
      deleteDate: 0,
      score: 0,
      viewCount: 0,
      body: newPost.body,
      ownerUserId: uid,
      ownerDisplayName: newPost.name,
      ownerAvatar: newPost.avatar,
      lastEditDate: 0,
      tags: newPost.tags || [],
      commentCounter: 0,
      image: '',
      imageFullPath: '',
      video: '',
      disableComments: newPost.disableComments,
      disableSharing: newPost.disableSharing,
      deleted: false
    }

    let postRef: any = firebaseRef.child(`userPosts/${uid}/posts`).push(post)
    return postRef.then(() => {
      dispatch(addPost(uid, {
        ...post,
        id: postRef.key
      }))
      callBack()
    }, (error: any) => dispatch(globalActions.showErrorMessage(error.message)))
  }
}

/**
 * Add a post with image
 * @param {object} newPost
 * @param {function} callBack
 */
export const dbAddImagePost = (newPost: any, callBack: Function) => {
  return (dispatch: any, getState: Function) => {

    dispatch(globalActions.showTopLoading())

    let uid: string = getState().authorize.uid
    let post: Post = {
      postTypeId: 1,
      creationDate: moment().unix(),
      deleteDate: 0,
      score: 0,
      viewCount: 0,
      body: newPost.body,
      ownerUserId: uid,
      ownerDisplayName: newPost.name,
      ownerAvatar: newPost.avatar,
      lastEditDate: 0,
      tags: newPost.tags || [],
      commentCounter: 0,
      image: newPost.image || '',
      imageFullPath: newPost.imageFullPath || '',
      video: '',
      disableComments: newPost.disableComments ? newPost.disableComments : false,
      disableSharing: newPost.disableSharing ? newPost.disableSharing : false,
      deleted: false
    }

    let postRef: any = firebaseRef.child(`userPosts/${uid}/posts`).push(post)
    return postRef.then(() => {
      dispatch(addPost(uid, {
        ...post,
        id: postRef.key
      }))
      callBack()
      dispatch(globalActions.hideTopLoading())

    })
  }

}

/**
 * Update a post from database
 * @param  {object} newPost
 * @param {func} callBack //TODO: anti pattern should change to parent state or move state to redux
 */
export const dbUpdatePost = (newPost: any, callBack: Function) => {
  console.log(newPost)
  return (dispatch: any, getState: Function) => {

    dispatch(globalActions.showTopLoading())

    // Get current user id
    let uid: string = getState().authorize.uid

    // Write the new data simultaneously in the list
    let updates: any = {}
    let post: Post = getState().post.userPosts[uid][newPost.id]
    let updatedPost: Post = {
      postTypeId: post.postTypeId,
      creationDate: post.creationDate,
      deleteDate: 0,
      score: post.score,
      viewCount: post.viewCount,
      body: newPost.body ? newPost.body : post.body || '',
      ownerUserId: uid,
      ownerDisplayName: post.ownerDisplayName,
      ownerAvatar: post.ownerAvatar,
      lastEditDate: moment().unix(),
      tags: newPost.tags ? newPost.tags : (post.tags || []),
      commentCounter: post.commentCounter,
      image: newPost.image ? newPost.image : post.image,
      imageFullPath: newPost.imageFullPath!,
      video: '',
      disableComments: newPost.disableComments !== undefined ? newPost.disableComments : (post.disableComments ? post.disableComments : false),
      disableSharing: newPost.disableSharing !== undefined ? newPost.disableSharing : (post.disableSharing ? post.disableSharing : false),
      deleted: false
    }
    updates[`userPosts/${uid}/posts/${newPost.id}`] = updatedPost
    return firebaseRef.update(updates).then((result) => {

      dispatch(updatePost(uid, { id: newPost.id, ...updatedPost }))
      callBack()
      dispatch(globalActions.hideTopLoading())

    }, (error) => {
      dispatch(globalActions.showErrorMessage(error.message))
      dispatch(globalActions.hideTopLoading())

    })
  }

}

/**
 * Delete a post from database
 * @param  {string} id is post identifier
 */
export const dbDeletePost = (id: string) => {
  return (dispatch: any, getState: Function) => {

    dispatch(globalActions.showTopLoading())

    // Get current user id
    let uid: string = getState().authorize.uid

    // Write the new data simultaneously in the list
    let updates: any = {}
    updates[`userPosts/${uid}/posts/${id}`] = null

    return firebaseRef.update(updates).then((result) => {
      dispatch(deletePost(uid, id))
      dispatch(globalActions.hideTopLoading())

    }, (error) => {
      dispatch(globalActions.showErrorMessage(error.message))
      dispatch(globalActions.hideTopLoading())
    })
  }

}

/**
 * Get all user posts from data base
 */
export const dbGetPosts = () => {
  return (dispatch: any, getState: any) => {
    let uid: string = getState().authorize.uid
    if (uid) {
      let postsRef: any = firebaseRef.child(`userPosts/${uid}/posts`)

      return postsRef.once('value').then((snapshot: any) => {
        let posts: any = snapshot.val() || {}
        let parsedPosts: { [postId: string]: Post } = {}
        Object.keys(posts).forEach((postId) => {
          parsedPosts[postId] = {
            id: postId,
            ...posts[postId]
          }
        })

        dispatch(addPosts(uid, parsedPosts))
      })

    }
  }
}

/**
 * Get all user posts from data base
 * @param uid post owner identifier
 * @param postId post identifier
 */
export const dbGetPostById = (uid: string, postId: string) => {
  return (dispatch: any, getState: Function) => {
    if (uid) {
      let postsRef: any = firebaseRef.child(`userPosts/${uid}/posts/${postId}`)

      return postsRef.once('value').then((snapshot: any) => {
        const newPost = snapshot.val() || {}
        const post = {
          id: postId,
          ...newPost
        }
        dispatch(addPost(uid, post))
      })

    }
  }
}


/**
 * Get all user posts from data base by user id
 * @param uid posts owner identifier
 */
export const dbGetPostsByUserId = (uid: string) => {
  return (dispatch: any, getState: Function) => {

    if (uid) {
      let postsRef: any = firebaseRef.child(`userPosts/${uid}/posts`)

      return postsRef.once('value').then((snapshot: any) => {
        let posts: any = snapshot.val() || {}
        let parsedPosts: { [postId: string]: Post } = {}
        Object.keys(posts).forEach((postId) => {
          parsedPosts[postId] = {
            id: postId,
            ...posts[postId]
          }
        })

        dispatch(addPosts(uid, parsedPosts))
      })

    }
  }
}

/* _____________ CRUD State _____________ */

/**
 * Add a normal post
 * @param {string} uid is user identifier
 * @param {Post} post 
 */
export const addPost = (uid: string, post: Post) => {
  return {
    type: PostActionType.ADD_POST,
    payload: { uid, post }
  }
}

/**
 * Update a post
 * @param {string} uid is user identifier
 * @param {Post} post
 */
export const updatePost = (uid: string, post: Post) => {
  return {
    type: PostActionType.UPDATE_POST,
    payload: { uid, post }
  }
}

/**
 * Delete a post
 * @param {string} uid is user identifier
 * @param {string} id is post identifier
 */
export const deletePost = (uid: string, id: string) => {
  return {
    type: PostActionType.DELETE_POST,
    payload: { uid, id }
  }
}

/**
 * Add a list of post
 * @param {string} uid 
 * @param {[object]} posts 
 */
export const addPosts = (uid: string, posts: { [postId: string]: Post }) => {
  return {
    type: PostActionType.ADD_LIST_POST,
    payload: { uid, posts }
  }
}

/**
 * Clea all data in post store
 */
export const clearAllData = () => {
  return {
    type: PostActionType.CLEAR_ALL_DATA_POST
  }
}

/**
 * Add a post with image
 * @param {object} post
 */
export const addImagePost = (uid: string, post: any) => {
  return {
    type: PostActionType.ADD_IMAGE_POST,
    payload: { uid, post }
  }

}
