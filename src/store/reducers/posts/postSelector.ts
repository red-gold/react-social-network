import {Map} from 'immutable'

const getPost = (state: Map<string, any>, userId: string, postId: string) => {
    return state.getIn(['post', 'userPosts', userId, postId])
}

export const postSelector = {
    getPost
}