import { PostAPI } from 'api/PostAPI';
import { List, Map } from 'immutable';
import { createSelector } from 'reselect';


/****************************
 * Get from store
 ***************************/
const getPost = (state: Map<string, any>, props: {userId: string, postId: string}) => {
    return state.getIn(['post', 'entities', props.postId], Map({}))
}

const hasMorePostStream = (state: Map<string, any>) => {
    return state.getIn(['post', 'stream', 'hasMoreData'], true)
}

const hasMorePostSearch = (state: Map<string, any>) => {
    return state.getIn(['post', 'search', 'hasMoreData'], true)
}

const getPostStream = (state: Map<string, any>) => {
    const posts: Map<string, boolean> = state.getIn(['post', 'stream', 'list'], Map({}))
    return posts
}

const searchPosts = (state: Map<string, any>) => {
    const posts: Map<string, boolean> = state.getIn(['post', 'search', 'list'], Map({}))
    return posts
}

const getProfilePosts = (state: Map<string, any>, props: { userId: string }) => {
    const posts: Map<string, boolean> = state.getIn(['user', 'post', props.userId, 'list'], Map({}))
    return posts
}

const getPosts = (state: Map<string, any>) => {
    return state.getIn(['post', 'entities'], Map({})) as Map<string, any>
}

const getInstagramPosts = (state: Map<string, any>) => {
    return state.getIn(['post', 'instagram'], Map({}))
}

const getStreamPage = (state: Map<string, any>) => {
    return state.getIn(['post', 'stream', 'lastPageRequest'], 0)
}

const getStreamLastPostId = (state: Map<string, any>) => {
    return state.getIn(['post', 'stream', 'lastPostId'], '')
}

const getSearchLastPostId = (state: Map<string, any>) => {
    return state.getIn(['post', 'search', 'lastPostId'], '')
}

const getProfileLastPostRequest = (state: Map<string, any>, props: { userId: string }) => {
    return state.getIn(['user', 'post', props.userId, 'lastPageRequest'], 0)
}

const getProfileLatPostId = (state: Map<string, any>, props: { userId: string }) => {
    return state.getIn(['user', 'post', props.userId, 'lastPostId'], '')
}

const getSearchKey = (state: Map<string, any>) => {
    return state.getIn(['post', 'searchKey'])
}

/****************************
 * Selectors
 ***************************/
const selectPost = () => {
    return createSelector(
        [getPost],
        (post) => post
    )
}
const selectStreamPage = () => {
    return createSelector(
        [getStreamPage],
        (page) => page
    )
}
const selectHasMorePostStream = () => {
    return createSelector(
        [hasMorePostStream],
        (hasMorePost) => hasMorePost
    )
}
const selectHasMorePostSeach = () => {
    return createSelector(
        [hasMorePostSearch],
        (hasMorePost) => hasMorePost
    )
}

const selectStreamPosts = () => {
    return createSelector(
        [getPostStream, getPosts],
        (postStream, posts) => {
            let mappedPosts: List<Map<string, any>> = List([])
            postStream.forEach((exist, postId) => {
                if (exist) {
                    const existPost = posts.get(postId!)
                    if (existPost) {
                        mappedPosts = mappedPosts.push(existPost)
                    }
                }
            })
            if (mappedPosts.isEmpty()) {
                return List([])
            }
            return PostAPI.sortImuObjectsDate(mappedPosts)
        }
    )
}

const selectSearchPosts = () => {
    return createSelector(
        [searchPosts, getPosts],
        (searchPosts, posts) => {
            let mappedPosts: List<Map<string, any>> = List([])
            searchPosts.forEach((exist, postId) => {
                if (exist) {
                    const existPost = posts.get(postId!)
                    if (existPost) {
                        mappedPosts = mappedPosts.push(existPost)
                    }
                }
            })
            if (mappedPosts.isEmpty()) {
                return List([])
            }
            return PostAPI.sortImuObjectsDate(mappedPosts)
        }
    )
}

const selectProfilePosts = () => {
    return createSelector(
        [getProfilePosts, getPosts],
        (profilePosts, posts) => {
            let mappedPosts: List<Map<string, any>> = List([])
            profilePosts.forEach((exist, postId) => {
                if (exist) {
                    const existPost = posts.get(postId!)
                    if (existPost) {
                        mappedPosts = mappedPosts.push(existPost)
                    }
                }
            })
            if (mappedPosts.isEmpty()) {
                return List([])
            }
            
            return PostAPI.sortImuObjectsDate(mappedPosts)
        }
    )
}

export const postSelector = {
    getPost,
    getStreamPage,
    getStreamLastPostId,
    getSearchKey,
    getProfileLastPostRequest,
    getSearchLastPostId,
    getProfileLatPostId,
    getInstagramPosts,
    selectPost,
    selectHasMorePostStream,
    selectHasMorePostSeach,
    selectSearchPosts,
    selectStreamPosts,
    selectProfilePosts,
    selectStreamPage
}