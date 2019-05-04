import { Map, List } from 'immutable'
import { createSelector } from 'reselect'
import { PostAPI } from 'api/PostAPI'

const getUserProfileById: (state: Map<string, any>, {userId}: {userId: string}) => Map<string, any> = (state: Map<string, any>, {userId}: {userId: string}) => {
    let userProfile: Map<string, any> = state.getIn(['user', 'entities', userId], Map({}))
    const id = userProfile.get('id')
    if (id) {
        userProfile = userProfile.set('userId', id) 
    }
    return userProfile
}

const getUsers = (state: Map<string, any>) => {
    return state.getIn(['user', 'entities'], Map({})) as Map<string, any>
}

const getFindPeople = (state: Map<string, any>) => {
    const posts: Map<string, boolean> = state.getIn(['user', 'findPeople', 'list'], Map({}))
    return posts
}

const getSearchPeople = (state: Map<string, any>) => {
    const posts: Map<string, boolean> = state.getIn(['user', 'search', 'list'], Map({}))
    return posts
}

const hasMoreFindPeople = (state: Map<string, any>) => {
    return state.getIn(['user', 'findPeople', 'hasMoreData'], true)
}

const getFindPeoplePage = (state: Map<string, any>) => {
    return state.getIn(['user', 'findPeople', 'page'], 0)
}

const hasMoreSearchPeople = (state: Map<string, any>) => {
    return state.getIn(['user', 'search', 'hasMoreData'], true)
}

const getAlbumPosts = (state: Map<string, any>, props: { userId: string }) => {
    const posts: Map<string, boolean> = state.getIn(['user', 'album', props.userId, 'list'], Map({}))
    return posts
}

const getPosts = (state: Map<string, any>) => {
    return state.getIn(['post', 'entities'], Map({})) as Map<string, any>
}

const hasMoreAlbum = (state: Map<string, any>, props: {userId: string}) => {
    return state.getIn(['user', 'album', props.userId,  'hasMoreData'], true)
}

const getAlbumLastPageRequest = (state: Map<string, any>, props: { userId: string }) => {
    return state.getIn(['user', 'album', props.userId, 'lastPageRequest'], 0)
}

const getAlbumLatPostId = (state: Map<string, any>, props: { userId: string }) => {
    return state.getIn(['user', 'album', props.userId, 'lastPostId'], '')
}

const getSearchKey = (state: Map<string, any>) => {
    return state.getIn(['user', 'searchKey'])
}

/****************************
 * Selectors
 ***************************/
const selectFindPeoplePage = () => {
    return createSelector(
        [getFindPeoplePage],
        (page) => page
    )
}
const selectLastAlbumPage = () => {
    return createSelector(
        [getAlbumLastPageRequest],
        (page) => page
    )
}

const selectMoreAlbum = () => {
    return createSelector(
        [hasMoreAlbum],
        (moreAlbum) => moreAlbum
    )
}

const selectMoreFindPeople = () => {
    return createSelector(
        [hasMoreFindPeople],
        (hasMoreFindPeople) => hasMoreFindPeople
    )
}

const selectMoreSearchPeople = () => {
    return createSelector(
        [hasMoreSearchPeople],
        (hasMoreSearchPeople) => hasMoreSearchPeople
    )
}

const selectAlbumPosts = () => {
    return createSelector(
        [getAlbumPosts, getPosts],
        (albumPosts, posts) => {
            let mappedPosts: List<Map<string, any>> = List([])
            albumPosts.forEach((exist, postId) => {
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

const selectFindPeople = () => {
    return createSelector(
        [getFindPeople, getUsers],
        (people, entities) => {
            let mappedPeople: List<Map<string, any>> = List([])
            people.forEach((exist, postId) => {
                if (exist) {
                    mappedPeople = mappedPeople.push(entities.get(postId!))
                }
            })
            if (mappedPeople.isEmpty()) {
                return List([])
            }
            return PostAPI.sortImuObjectsDate(mappedPeople)
        }
    )
}

const selectSearchPeople = () => {
    return createSelector(
        [getSearchPeople, getUsers],
        (people, entities) => {
            let mappedPeople: List<Map<string, any>> = List([])
            people.forEach((exist, postId) => {
                if (exist) {
                    mappedPeople = mappedPeople.push(entities.get(postId!))
                }
            })
            if (mappedPeople.isEmpty()) {
                return List([])
            }
            return PostAPI.sortImuObjectsDate(mappedPeople)
        }
    )
}

const selectUserProfileById = () => {
    return createSelector(
        [getUserProfileById],
        (userProfile) => userProfile
    )
}

export const userSelector = {
    getUserProfileById,
    getSearchKey,
    getAlbumLastPageRequest,
    getAlbumLatPostId,
    selectAlbumPosts,
    selectLastAlbumPage,
    selectMoreAlbum,
    selectUserProfileById,
    selectMoreFindPeople,
    selectFindPeople,
    selectMoreSearchPeople,
    selectSearchPeople,
    getFindPeoplePage,
    selectFindPeoplePage
}