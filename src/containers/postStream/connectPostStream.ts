import { User } from 'core/domain/users';
import { Map } from 'immutable';
import { DialogType } from 'models/common/dialogType';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as globalActions from 'store/actions/globalActions';
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType';
import { authorizeSelector } from 'store/reducers/authorize/authorizeSelector';
import { globalSelector } from 'store/reducers/global/globalSelector';
import { serverSelector } from 'store/reducers/server/serverSelector';

import { IPostStreamProps } from './IPostStreamProps';

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IPostStreamProps) => {
    return {
      openPostWrite: () => dispatch(globalActions.openDialog(DialogType.PostWrite)),
      closePostWrite: () => dispatch(globalActions.closeDialog(DialogType.PostWrite)),
      showTopLoading: () => dispatch(globalActions.showTopLoading()),
      hideTopLoading: () => dispatch(globalActions.hideTopLoading())
    }
  }
  
  /**
   * Map state to props
   */
  const makeMapStateToProps = () => {
    const selectCurrentUser = authorizeSelector.selectCurrentUser()
    const selectPostWriteDialogState = globalSelector.selectDialogState()
    const selectProgress = globalSelector.selectProgress()
    const selectRequest = serverSelector.selectRequest()
  
    const mapStateToProps = (state: Map<string, any>, ownProps: IPostStreamProps) => {
      const currentUser = selectCurrentUser(state).toJS() as User
      const postWriteDilogOpen = selectPostWriteDialogState(state,{type: DialogType.PostWrite})
      const streamRequestStatus = selectRequest(state, { requestId: ownProps.requestId! })
      const progress = selectProgress(state)
      return {
        streamRequestStatus: streamRequestStatus ? streamRequestStatus.status : ServerRequestStatusType.NoAction,
        
        avatar: currentUser.avatar || '',
        fullName: currentUser.fullName || '',
        postWriteDilogOpen,
        progress
      }
  
    }
    return mapStateToProps
  }

  export const connectPostStream =
  (component: Component<IPostStreamProps>) => connect(makeMapStateToProps, mapDispatchToProps)(component as any)