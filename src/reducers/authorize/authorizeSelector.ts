const getCurrentUser = (state: any) => (state.user.info && state.authorize.uid) ? state.user.info[state.authorize.uid] : null

export const authorizeSelector = {
    getCurrentUser
}