// - Import react components
import { Action } from 'redux'

// - Import domain
import { Post } from 'core/domain/posts'
import { SocialError } from 'core/domain/common'

// - Import utility components
import moment from 'moment'

// - Import action types
import { PostActionType } from 'constants/postActionType'

// - Import actions
import * as globalActions from 'actions/globalActions'

import { IServiceProvider, ServiceProvide } from 'core/factories'
import { IPostService } from 'core/services/posts'

const serviceProvider: IServiceProvider = new ServiceProvide()
const postService: IPostService = serviceProvider.createPostService()

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

    return postService.addPost(uid,post).then((postKey: string) => {
      dispatch(addPost(uid, {
        ...post,
        id: postKey
      }))
      callBack()
    })
    .catch((error: SocialError) => dispatch(globalActions.showErrorMessage(error.message)))
  }
}

/**
 * Add a post with image
 * @param {object} newPost
 * @param {function} callBack
 */
export const dbAddImagePost = (newPost: Post, callBack: Function) => {
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
      ownerDisplayName: newPost.ownerDisplayName,
      ownerAvatar: newPost.ownerAvatar,
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

    return postService.addPost(uid,post).then((postKey: string) => {
      dispatch(addPost(uid, {
        ...post,
        id: postKey
      }))
      callBack()
      dispatch(globalActions.hideTopLoading())

    })
    .catch((error: SocialError) => dispatch(globalActions.showErrorMessage(error.message)))

  }

}

/**
 * Update a post from database
 * @param  {object} newPost
 * @param {func} callBack //TODO: anti pattern should change to parent state or move state to redux
 */
export const dbUpdatePost = (newPost: Post, callBack: Function) => {
  console.log(newPost)
  return (dispatch: any, getState: Function) => {

    dispatch(globalActions.showTopLoading())

    // Get current user id
    let uid: string = getState().authorize.uid

    // Write the new data simultaneously in the list
    let updates: any = {}
    let post: Post = getState().post.userPosts[uid][newPost.id!]
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

    return postService.updatePost(uid,newPost.id,updatedPost).then(() => {

      dispatch(updatePost(uid, { id: newPost.id, ...updatedPost }))
      callBack()
      dispatch(globalActions.hideTopLoading())

    })
    .catch((error: SocialError) => {
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

    return postService.deletePost(uid,id).then(() => {
      dispatch(deletePost(uid, id))
      dispatch(globalActions.hideTopLoading())

    })
    .catch((error: SocialError) => {
      dispatch(globalActions.showErrorMessage(error.message))
      dispatch(globalActions.hideTopLoading())
    })
  }

}

/**
 * Get all user posts from data base
 */
export const dbGetPosts = () => {
  return (dispatch: any, getState: Function) => {
    let uid: string = getState().authorize.uid
    if (uid) {

      return postService.getPosts(uid).then((posts: { [postId: string]: Post }) => {
        dispatch(addPosts(uid, posts))
      })
      .catch((error: SocialError) => {
        dispatch(globalActions.showErrorMessage(error.message))
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

      return postService.getPostById(uid,postId).then((post: Post) => {
        dispatch(addPost(uid, post))
      })
      .catch((error: SocialError) => {
        dispatch(globalActions.showErrorMessage(error.message))
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
      return postService.getPosts(uid).then((posts: { [postId: string]: Post }) => {
        dispatch(addPosts(uid, posts))
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
