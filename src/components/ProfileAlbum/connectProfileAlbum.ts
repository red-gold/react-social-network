import { Component, connect } from 'react-redux'
import { postSelector } from 'store/reducers/posts'

import { authorizeSelector } from 'store/reducers/authorize/authorizeSelector'
import { Map } from 'immutable'
import { IProfileAlbumProps } from './IProfileAlbumProps'

// - Import actions
import {
  authorizeActions,
  postActions,
  userActions,
  globalActions,
} from 'src/store/actions'
import * as imageGalleryActions from 'src/store/actions/imageGalleryActions'
import StringAPI from 'api/StringAPI'
import { ServerRequestType } from 'constants/serverRequestType'
import { User } from 'core/domain/users'
import { serverSelector } from 'store/reducers/server/serverSelector'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'
import { globalSelector } from 'store/reducers/global/globalSelector'
import { DialogType } from 'models/common/dialogType'
import { userSelector } from 'store/reducers/users/userSelector'

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IProfileAlbumProps) => {
  return {
    loadAlbums:
    (userId: string, page: number) => dispatch(userActions.fetchAlbums(userId, page)),
    increasePage: () => dispatch(userActions.increasePageAlbum(ownProps.userId)),
    uploadImage: (image: any, imageName: string) => dispatch(imageGalleryActions.dbUploadImage(image,imageName)),
    setHomeTitle: (homeTitle: string) => dispatch(globalActions.setHeaderTitle(homeTitle || '')),
    showTopLoading: () => dispatch(globalActions.showTopLoading()),
    hideTopLoading: () => dispatch(globalActions.hideTopLoading()),
    openAlbum: () => dispatch(globalActions.openDialog(DialogType.Album)),
    closeAlbum: () => dispatch(globalActions.closeDialog(DialogType.Album)),

  }
}

const makeMapStateToProps = () => {
  const selectCurrentUser = authorizeSelector.selectCurrentUser()
  const selectMoreAlbum = userSelector.selectMoreAlbum()
  const selectRequest = serverSelector.selectRequest()
  const selectAlbumDialogState = globalSelector.selectDialogState()
  const selectProgress = globalSelector.selectProgress()
  const selectAlbumPosts = userSelector.selectAlbumPosts()
  const selectAlbumPage = userSelector.selectLastAlbumPage()

  const mapStateToProps = (state: Map<string, any>, ownProps: IProfileAlbumProps) => {
    const currentUser = selectCurrentUser(state).toJS() as User
    const albumDialogOpen = selectAlbumDialogState(state,{type: DialogType.Album})
    const hasMoreAlbum = selectMoreAlbum(state, {userId: ownProps.userId})
    const posts = selectAlbumPosts(state, {userId: ownProps.userId})
    const progress = selectProgress(state)
    const page = selectAlbumPage(state, {userId: ownProps.userId})
    return {
      
      hasMoreAlbum,
      currentUser,
      posts,
      progress,
      albumDialogOpen,
      page
    }
  }
  return mapStateToProps
}

export const connectProfileAlbum =
  (component: Component<IProfileAlbumProps>) => connect(makeMapStateToProps, mapDispatchToProps)(component as any)