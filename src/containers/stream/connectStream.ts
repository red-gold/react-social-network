import StringAPI from 'api/StringAPI';
import { ServerRequestType } from 'constants/serverRequestType';
import { User } from 'core/domain/users';
import { Map } from 'immutable';
import { Component } from 'react';
import { connect } from 'react-redux';
import { globalActions, postActions } from 'src/store/actions';
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType';
import { authorizeSelector } from 'store/reducers/authorize/authorizeSelector';
import { postSelector } from 'store/reducers/posts';
import { serverSelector } from 'store/reducers/server/serverSelector';

import { IStreamComponentProps } from './IStreamComponentProps';

// - Import actions
/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IStreamComponentProps) => {
  return {
    loadStream:
      (page: number, limit: number) => dispatch(postActions.dbGetPosts(page, limit)),
    setHomeTitle: (homeTitle: string) => dispatch(globalActions.setHeaderTitle(homeTitle || '')),
    increasePage: () => dispatch(postActions.increasePageStream()),
    showTopLoading: () => dispatch(globalActions.showTopLoading()),
    hideTopLoading: () => dispatch(globalActions.hideTopLoading())

  }
}

const makeMapStateToProps = () => {
  const selectCurrentUser = authorizeSelector.selectCurrentUser()
  const selectHasMorePost = postSelector.selectHasMorePostStream()
  const selectStreamPage = postSelector.selectStreamPage()
  const selectRequest = serverSelector.selectRequest()
  const selectStreamPosts = postSelector.selectStreamPosts()

  const mapStateToProps = (state: Map<string, any>, ownProps: IStreamComponentProps) => {
    const currentUser = selectCurrentUser(state).toJS() as User
    const requestId = StringAPI.createServerRequestId(ServerRequestType.StreamGetPosts, currentUser.userId!)
    const streamRequestStatus = selectRequest(state, {requestId})
    const hasMorePosts = selectHasMorePost(state)
    const posts = selectStreamPosts(state)
    const page = selectStreamPage(state)
    return {
      
      hasMorePosts,
      currentUser,
      streamRequestStatus: streamRequestStatus ? streamRequestStatus.status : ServerRequestStatusType.NoAction,
      posts,
      requestId,
      page
    }
  }
  return mapStateToProps
}

export const connectStream =
  (component: Component<IStreamComponentProps>) => connect(makeMapStateToProps, mapDispatchToProps)(component as any)