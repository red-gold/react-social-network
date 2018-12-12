// - Import domain
import { Post } from 'src/core/domain/posts'
import { SocialError } from 'src/core/domain/common'
import { Map, fromJS, List } from 'immutable'
import config from 'src/config'
// - Import utility components
import moment from 'moment/moment'

// - Import action types
import { PostActionType } from 'constants/postActionType'

// - Import actions
import * as globalActions from 'store/actions/globalActions'

import { IPostService } from 'src/core/services/posts'
import { SocialProviderTypes } from 'src/core/socialProviderTypes'
import { provider } from 'src/socialEngine'
import * as userActions from 'store/actions/userActions'
import { userSelector } from 'store/reducers/users/userSelector'
import { UserPermissionType } from 'core/domain/common/userPermissionType'
import { UserActionType } from 'constants/userActionType'
import { User } from 'core/domain/users'

/**
 * Get service providers
 */
const postService: IPostService = provider.get<IPostService>(SocialProviderTypes.PostService)

/* _____________ CRUD DB _____________ */

/**
 * Add a normal post
 */
export let dbAddPost = (newPost: Post, callBack: Function) => {
  return (dispatch: any, getState: Function) => {
    
    const state: Map<string, any>  = getState()
    let uid: string = state.getIn(['authorize', 'uid'])
    const currentUser = userSelector.getUserProfileById(state, {userId: uid}).toJS() as User
    let post: Post = {
      postTypeId: newPost.postTypeId || 0,
      creationDate: moment().utc().valueOf(),
      deleteDate: 0,
      score: 0,
      viewCount: 0,
      body: newPost.body,
      ownerUserId: uid,
      ownerDisplayName: currentUser.fullName,
      ownerAvatar: currentUser.avatar,
      lastEditDate: 0,
      album: newPost.album && newPost.album ,
      tags: newPost.tags || [],
      commentCounter: 0,
      image: newPost.image || '',
      imageFullPath: newPost.imageFullPath || '',
      video: newPost.video || '',
      videoThumbnails: newPost.videoThumbnails || '',
      disableComments: newPost.disableComments ? newPost.disableComments : false,
      disableSharing: newPost.disableSharing ? newPost.disableSharing : false,
      accessUserList: newPost.accessUserList ? newPost.accessUserList : [],
      permission:  newPost.permission ? newPost.permission : UserPermissionType.Public,
      deleted: false,
      version: config.dataFormat.postVersion
    }

    return postService.addPost(post).then((postKey: string) => {
      dispatch(addPost(fromJS({
        ...post,
        id: postKey
      })))
      dispatch(addStreamPosts(Map({[postKey]: true})))
      dispatch(userActions.increasePostCountUser(uid))
      callBack()
    })
      .catch((error: SocialError) => dispatch(globalActions.showMessage(error.message)))
  }
}

/**
 * Update a post from database
 */
export const dbUpdatePost = (updatedPost: Map<string, any>, callBack: Function) => {
  return (dispatch: any, getState: Function) => {

    dispatch(globalActions.showTopLoading())

    return postService.updatePost(updatedPost.toJS() as Post).then(() => {

      dispatch(updatePost(updatedPost))
      callBack()
      dispatch(globalActions.hideTopLoading())

    })
      .catch((error: SocialError) => {
        dispatch(globalActions.showMessage(error.message))
        dispatch(globalActions.hideTopLoading())

      })
  }

}

/**
 * Delete a post from database
 */
export const dbDeletePost = (id: string) => {
  return (dispatch: any, getState: Function) => {

    dispatch(globalActions.showTopLoading())

    const state: Map<string, any>  = getState()
    // Get current user id
    let uid: string = state.getIn(['authorize', 'uid'])

    return postService.deletePost(id).then(() => {
      dispatch(deletePost(uid, id))
      dispatch(globalActions.hideTopLoading())
      dispatch(userActions.decreasePostCountUser(uid))

    })
      .catch((error: SocialError) => {
        dispatch(globalActions.showMessage(error.message))
        dispatch(globalActions.hideTopLoading())
      })
  }

}

/**
 * Get all user posts from data base
 */
export const dbGetPosts = (page: number = 0, limit: number = 10) => {
  return {
    type: PostActionType.DB_GET_POST,
    payload: {page, limit}
  }
}

/**
 * Search posts
 */
export const dbSearchPosts = (query: string = '', page: number = 0, limit: number = 10) => {
  return {
    type: PostActionType.DB_SEARCH_POST,
    payload: {query, page, limit}
  }
}

/**
 * Get all user posts from data base
 */
export const dbGetPostsByUserId = (userId: string, page: number = 0, limit: number = 10) => {
 return {
   type: PostActionType.DB_GET_POST_BY_USER_ID,
   payload: {userId, page, limit}
 }
}

/**
 * Get all user posts from data base
 */
export const dbGetPostById = (uid: string, postId: string) => {
  return (dispatch: any, getState: Function) => {
    if (uid) {

      return postService.getPostById(postId).then((post: Post) => {
        dispatch(addPost(fromJS(post)))
      })
        .catch((error: SocialError) => {
          dispatch(globalActions.showMessage(error.message))
        })

    }
  }
}

/**
 * Get post key
 */
export const dbGetPostSearchKey = () => {
  return {
    type: PostActionType.DB_GET_POST_SEARCH_KEY
  }
}

/* _____________ CRUD State _____________ */

/**
 * Set post search key
 */
export const setPostSearchKey = (searchKey: string) => {
  return {
    type: PostActionType.SET_POST_SEARCH_KEY,
    payload: { searchKey }
  }
}

/**
 * Add a normal post
 */
export const addPost = ( post: Map<string, any>) => {
  return {
    type: PostActionType.ADD_POST,
    payload: { post }
  }
}

/**
 * Update a post
 */
export const updatePost = (post: Map<string, any>) => {
  return {
    type: PostActionType.UPDATE_POST,
    payload: { post }
  }
}

/**
 * Update the comments of post
 */
export const updatePostComments = (post: Map<string, any>) => {
  return {
    type: PostActionType.UPDATE_POST_COMMENTS,
    payload: {post}
  }
}

/**
 * Update the votes of post
 */
export const updatePostVotes = (post: Map<string, any>) => {
  return {
    type: PostActionType.UPDATE_POST_VOTES,
    payload: {post}
  }
}

/**
 * Delete a post
 */
export const deletePost = (uid: string, id: string) => {
  return {
    type: PostActionType.DELETE_POST,
    payload: { uid, id }
  }
}

/**
 * Add a list of post
 */
export const addPosts = (entities: Map<string, boolean>) => {
  return {
    type: PostActionType.ADD_LIST_POST,
    payload: { entities }
  }
}

/**
 * Add a list of post for stream
 */
export const addStreamPosts = (postIds: Map<string, boolean>) => {
  return {
    type: PostActionType.ADD_LIST_STREAM_POST,
    payload: { postIds }
  }
}

/**
 * Add a list of post for search
 */
export const addSearchPosts = (postIds: Map<string, any>, overwrite: boolean) => {
  return {
    type: PostActionType.ADD_LIST_SEARCH_POST,
    payload: { postIds },
    meta: {
      overwrite
    }
  }
}

/**
 * Add a list of instagram post
 */
export const addInstagramPosts = (posts: Map<string, any>) => {
  return {
    type: PostActionType.ADD_LIST_POST_INSTAGRAM,
    payload: { posts }
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
 */
export const addImagePost = (uid: string, post: Map<string, any>) => {
  return {
    type: PostActionType.ADD_IMAGE_POST,
    payload: { uid, post }
  }

}

/**
 * Set stream has more data to show
 */
export const hasMoreDataStream = () => {
  return {
    type: PostActionType.HAS_MORE_DATA_STREAM
  }
}

/**
 * Set stream has no data any more to show
 */
export const notMoreDataStream = () => {
  return {
    type: PostActionType.NOT_MORE_DATA_STREAM
  }
}

/**
 * Set search posts has more data to show
 */
export const hasMorePostSearch = () => {
  return {
    type: PostActionType.HAS_MORE_POST_SEARCH
  }
}

/**
 * Set search has no data any more to show
 */
export const notMorePostSearch = () => {
  return {
    type: PostActionType.NO_MORE_POST_SEARCH
  }
}

/**
 * Set last page request of stream
 */
export const setPageStream = (page: number) => {
  return {
    type: PostActionType.SET_PAGE_STREAM,
    payload: { page}
  }
}

/**
 * Increase page count of stream
 */
export const increasePageStream = () => {
  return {
    type: PostActionType.INCREASE_PAGE_STREAM
  }
}

/**
 * Set last post identification of stream
 */
export const lastPostStream = (lastPostId: string) => {
  return {
    type: PostActionType.LAST_POST_STREAM,
    payload: { lastPostId}
  }
}

/**
 * Set last post identification of search
 */
export const lastPostSearch = (lastPostId: string) => {
  return {
    type: PostActionType.LAST_POST_SEARCH,
    payload: { lastPostId}
  }
}

/**
 * Set profile posts has more data to show
 */
export const hasMoreDataProfile = () => {
  return {
    type: PostActionType.HAS_MORE_DATA_PROFILE
  }

}

/**
 * Set profile posts has not data any more to show
 */
export const notMoreDataProfile = (userId: string) => {
  return {
    type: PostActionType.NOT_MORE_DATA_PROFILE,
    payload: {userId}
  }

}

/**
 * Set last page request of profile posts
 */
export const requestPageProfile = (userId: string, page: number) => {
  return {
    type: PostActionType.REQUEST_PAGE_PROFILE,
    payload: {userId, page}
  }

}

/**
 * Set last post identification of profile posts
 */
export const lastPostProfile = (userId: string, lastPostId: string) => {
  return {
    type: PostActionType.LAST_POST_PROFILE,
    payload: { userId, lastPostId}
  }

}
