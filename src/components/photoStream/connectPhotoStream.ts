import { Component, connect } from 'react-redux'
import { postSelector } from 'store/reducers/posts'

import { authorizeSelector } from 'store/reducers/authorize/authorizeSelector'
import { Map } from 'immutable'
import { IPhotoStreamProps } from './IPhotoStreamProps'
import config from 'src/config'

// - Import actions
import * as imageGalleryActions from 'src/store/actions/imageGalleryActions'
import * as globalActions from 'src/store/actions/globalActions'
import StringAPI from 'api/StringAPI'
import { ServerRequestType } from 'constants/serverRequestType'
import { User } from 'core/domain/users'
import { serverSelector } from 'store/reducers/server/serverSelector'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'
import { gallerySelector } from 'store/reducers/imageGallery/gallerySelector'

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IPhotoStreamProps) => {
  return {
    deleteImage: (fileId: string, fileName: string) => dispatch(imageGalleryActions.dbDeleteImage(fileId, config.data.imageFolderPath, fileName)),
    setHomeTitle: (homeTitle: string) => dispatch(globalActions.setHeaderTitle(homeTitle || '')),
    showTopLoading: () => dispatch(globalActions.showTopLoading()),
    hideTopLoading: () => dispatch(globalActions.hideTopLoading())

  }
}

const makeMapStateToProps = () => {
  const selectCurrentUser = authorizeSelector.selectCurrentUser()
  const selectHasMorePhotos = gallerySelector.selectMoreImages()
  const selectRequest = serverSelector.selectRequest()
  const selectStreamPosts = postSelector.selectSearchPosts()

  const mapStateToProps = (state: Map<string, any>, ownProps: IPhotoStreamProps) => {
    const currentUser = selectCurrentUser(state).toJS() as User
    const requestId = StringAPI.createServerRequestId(ServerRequestType.SearchPosts, currentUser.userId!)
    const searchRequestStatus = selectRequest(state, {requestId})
    const hasMorePhotos = selectHasMorePhotos(state, {albumId: ownProps.currentAlbum.id!})
    const posts = selectStreamPosts(state)
    return {
      
      hasMorePhotos,
      currentUser,
      searchRequestStatus: searchRequestStatus ? searchRequestStatus.status : ServerRequestStatusType.NoAction,
      posts,
      requestId
    }
  }
  return mapStateToProps
}

export const connectPhotoStream =
  (component: Component<IPhotoStreamProps>) => connect(makeMapStateToProps, mapDispatchToProps)(component as any)