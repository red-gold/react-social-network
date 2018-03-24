const getPost = (state: any, userId: string, postId: string) => {
    return (state.post.userPosts && state.post.userPosts[userId] && state.post.userPosts[userId][postId])
            ? state.post.userPosts[userId][postId]
            : null
}

export const postSelector = {
    getPost
}