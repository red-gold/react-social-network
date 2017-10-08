// - Import react components
import { Action } from "redux";

// - Import firebase component
import firebase, { firebaseRef } from '../firebase';

// - Import utility components
import moment from 'moment';

// - Import action types
import { PostActionType } from 'constants/postActionType';

// - Import actions
import * as globalActions from 'actions/globalActions';







/* _____________ CRUD DB _____________ */

/**
 * Add a normal post
 * @param {object} newPost 
 * @param {function} callBack 
 */
export var dbAddPost = (newPost: any, callBack: any) => {
  return (dispatch: any, getState: any) => {

    var uid = getState().authorize.uid
    var post = {
      postTypeId: 0,
      creationDate: moment().unix(),
      deletationDate: '',
      score: 0,
      viewCount: 0,
      body: newPost.body,
      ownerUserId: uid,
      ownerDisplayName: newPost.name,
      ownerAvatar: newPost.avatar,
      lastEditDate: '',
      tags: newPost.tags || [],
      commentCounter: 0,
      image: '',
      video: '',
      disableComments: newPost.disableComments,
      disableSharing: newPost.disableSharing,
      deleted: false
    }


    var postRef = firebaseRef.child(`userPosts/${uid}/posts`).push(post)
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
export const dbAddImagePost = (newPost: any, callBack: any) => {
  return (dispatch: any, getState: any) => {

    dispatch(globalActions.showTopLoading())

    var uid = getState().authorize.uid
    var post = {
      postTypeId: 1,
      creationDate: moment().unix(),
      deletationDate: '',
      score: 0,
      viewCount: 0,
      body: newPost.body,
      ownerUserId: uid,
      ownerDisplayName: newPost.name,
      ownerAvatar: newPost.avatar,
      lastEditDate: '',
      tags: newPost.tags || [],
      commentCounter: 0,
      image: newPost.image || '',
      imageFullPath: newPost.imageFullPath || '',
      video: '',
      disableComments: newPost.disableComments ? newPost.disableComments : false,
      disableSharing: newPost.disableSharing ? newPost.disableSharing : false,
      deleted: false
    }


    let postRef : any = firebaseRef.child(`userPosts/${uid}/posts`).push(post)
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
export const dbUpdatePost = (newPost: any, callBack: any) => {
  console.log(newPost)
  return (dispatch : any, getState: any) => {

    dispatch(globalActions.showTopLoading())

    // Get current user id
    let uid: string = getState().authorize.uid

    // Write the new data simultaneously in the list
    let updates: any = {};
    let post = getState().post.userPosts[uid][newPost.id]
    let updatedPost = {
      postTypeId: post.postTypeId,
      creationDate: post.creationDate,
      deletationDate: '',
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
  return (dispatch:any, getState:any) => {

    dispatch(globalActions.showTopLoading())

    // Get current user id
    let uid : string = getState().authorize.uid

    // Write the new data simultaneously in the list
    var updates : any= {};
    updates[`userPosts/${uid}/posts/${id}`] = null;

    return firebaseRef.update(updates).then((result) => {
      dispatch(deletePost(uid, id))
      dispatch(globalActions.hideTopLoading())

    }, (error) => {
      dispatch(globalActions.showErrorMessage(error.message))
      dispatch(globalActions.hideTopLoading())
    });
  }

}

/**
 *  Get all user posts from data base
 */
export const dbGetPosts = () => {
  return (dispatch:any, getState:any) => {
    var uid = getState().authorize.uid
    if (uid) {
      var postsRef = firebaseRef.child(`userPosts/${uid}/posts`);

      return postsRef.once('value').then((snapshot) => {
        var posts = snapshot.val() || {};
        var parsedPosts : any = {};
        Object.keys(posts).forEach((postId) => {
          parsedPosts[postId] = {
            id: postId,
            ...posts[postId]
          };
        });

        dispatch(addPosts(uid, parsedPosts));
      });

    }
  }
}

/**
*  Get all user posts from data base
*/
export const dbGetPostById = (uid:string, postId:string) => {
  return (dispatch: any, getState: any) => {
    if (uid) {
      var postsRef = firebaseRef.child(`userPosts/${uid}/posts/${postId}`);

      return postsRef.once('value').then((snapshot) => {
        const newPost = snapshot.val() || {};
        const post = {
          id: postId,
          ...newPost
        }
        dispatch(addPost(uid, post));
      });

    }
  }
}


/**
 *  Get all user posts from data base by user id
 */
export const dbGetPostsByUserId = (uid: string) => {
  return (dispatch: any, getState: any) => {

    if (uid) {
      let postsRef = firebaseRef.child(`userPosts/${uid}/posts`);

      return postsRef.once('value').then((snapshot) => {
        let posts = snapshot.val() || {};
        let parsedPosts: any = {};
        Object.keys(posts).forEach((postId) => {
          parsedPosts[postId] = {
            id: postId,
            ...posts[postId]
          };
        });

        dispatch(addPosts(uid, parsedPosts));
      });

    }
  }
}






/* _____________ CRUD State _____________ */

/**
 * Add a normal post
 * @param {string} uid is user identifier
 * @param {object} post 
 */
export const addPost = (uid: string, post: any) => {
  return {
    type: PostActionType.ADD_POST,
    payload: { uid, post }
  }
}

/**
 * Update a post
 * @param {string} uid is user identifier
 * @param {object} post 
 */
export const updatePost = (uid: string, post: any) => {
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
export const addPosts = (uid: string, posts: any) => {
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

