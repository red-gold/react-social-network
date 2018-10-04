import { Component, connect } from 'react-redux'
import { postSelector } from 'store/reducers/posts'

import { authorizeSelector } from 'store/reducers/authorize/authorizeSelector'
import { Map } from 'immutable'
import { ISearchPostProps } from './ISearchPostProps'

// - Import actions
import {
  authorizeActions,
  postActions,
  userActions,
  globalActions,
} from 'src/store/actions'
import StringAPI from 'api/StringAPI'
import { ServerRequestType } from 'constants/serverRequestType'
import { User } from 'core/domain/users'
import { serverSelector } from 'store/reducers/server/serverSelector'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: ISearchPostProps) => {
  return {
    search:
      (query: string, page: number, limit: number) => dispatch(postActions.dbSearchPosts(query, page, limit)),
    setHomeTitle: (homeTitle: string) => dispatch(globalActions.setHeaderTitle(homeTitle || '')),
    showTopLoading: () => dispatch(globalActions.showTopLoading()),
    hideTopLoading: () => dispatch(globalActions.hideTopLoading())

  }
}

const makeMapStateToProps = () => {
  const selectCurrentUser = authorizeSelector.selectCurrentUser()
  const selectHasMorePost = postSelector.selectHasMorePostSeach()
  const selectRequest = serverSelector.selectRequest()
  const selectStreamPosts = postSelector.selectSearchPosts()

  const mapStateToProps = (state: Map<string, any>, ownProps: ISearchPostProps) => {
    const currentUser = selectCurrentUser(state).toJS() as User
    const requestId = StringAPI.createServerRequestId(ServerRequestType.SearchPosts, currentUser.userId!)
    const searchRequestStatus = selectRequest(state, {requestId})
    const hasMorePosts = selectHasMorePost(state)
    const posts = selectStreamPosts(state)
    return {
      
      hasMorePosts,
      currentUser,
      searchRequestStatus: searchRequestStatus ? searchRequestStatus.status : ServerRequestStatusType.NoAction,
      posts,
      requestId
    }
  }
  return mapStateToProps
}

export const connectSearchPost =
  (component: Component<ISearchPostProps>) => connect(makeMapStateToProps, mapDispatchToProps)(component as any)