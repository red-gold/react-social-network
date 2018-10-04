import { Component, connect } from 'react-redux'
import { postSelector } from 'store/reducers/posts'

import { authorizeSelector } from 'store/reducers/authorize/authorizeSelector'
import { Map } from 'immutable'
import { IPhotoMasterProps } from './IPhotoMasterProps'

// - Import actions
import {
  authorizeActions,
  imageGalleryActions,
  postActions,
  commentActions,
  voteActions,
  userActions,
  globalActions,
  circleActions,
  notifyActions,
  chatActions
} from 'src/store/actions'
import StringAPI from 'api/StringAPI'
import { ServerRequestType } from 'constants/serverRequestType'
import { User } from 'core/domain/users'
import { serverSelector } from 'store/reducers/server/serverSelector'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'
import { gallerySelector } from 'store/reducers/imageGallery/gallerySelector'
import { globalSelector } from 'store/reducers/global/globalSelector'
import { DialogType } from 'models/common/dialogType'
import { Post } from 'core/domain/posts'

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IPhotoMasterProps) => {
  const { userId, albumId } = ownProps.match.params
  return {
    updateAlbum: (post: Map<string, any>, callBack: Function) => dispatch(postActions.dbUpdatePost(post, callBack)),
    loadImages: () => dispatch(imageGalleryActions.dbFetchAlbumImages(userId, albumId)),
    loadAlbum: () => dispatch(postActions.dbGetPostById(userId, albumId)),
    uploadImage: (image: any, imageName: string) => dispatch(imageGalleryActions.dbUploadImage(image,imageName)),
    deleteAlbum: (albumId: string) => dispatch(postActions.dbDeletePost(albumId)),
    setHomeTitle: (homeTitle: string) => dispatch(globalActions.setHeaderTitle(homeTitle || '')),
    showTopLoading: () => dispatch(globalActions.showTopLoading()),
    hideTopLoading: () => dispatch(globalActions.hideTopLoading()),
    openAlbum: () => dispatch(globalActions.openDialog(DialogType.Album)),
    closeAlbum: () => dispatch(globalActions.closeDialog(DialogType.Album))

  }
}

const makeMapStateToProps = () => {
  const selectCurrentUser = authorizeSelector.selectCurrentUser()
  const selectHasMoreImage = gallerySelector.selectMoreImages()
  const selectRequest = serverSelector.selectRequest()
  const selectAlbumImages = gallerySelector.selectAlbumImages()
  const selectAlbum = postSelector.selectPost()
  const selectAlbumDialogState = globalSelector.selectDialogState()
  const selectProgress = globalSelector.selectProgress()

  const mapStateToProps = (state: Map<string, any>, ownProps: IPhotoMasterProps) => {
    const { userId, albumId } = ownProps.match.params
    const currentUser = selectCurrentUser(state).toJS() as User
    const albumDialogOpen = selectAlbumDialogState(state,{type: DialogType.Album})
    const progress = selectProgress(state)
    const requestId = StringAPI.createServerRequestId(ServerRequestType.StreamGetPosts, currentUser.userId!)
    const streamRequestStatus = selectRequest(state, {requestId})
    const hasMoreImages = selectHasMoreImage(state, albumId)
    const images = selectAlbumImages(state, {albumId} ).toJS()
    const currentAlbum: Post = selectAlbum(state, {userId, postId: albumId }).toJS()
    const isOwner = currentAlbum.ownerUserId === currentUser.userId
    return {
      
      hasMoreImages,
      currentUser,
      streamRequestStatus: streamRequestStatus ? streamRequestStatus.status : ServerRequestStatusType.NoAction,
      images,
      requestId,
      currentAlbum,
      progress,
      albumDialogOpen,
      isOwner
    }
  }
  return mapStateToProps
}

export const connectPhotoMaster =
  (component: Component<IPhotoMasterProps>) => connect(makeMapStateToProps, mapDispatchToProps)(component as any)