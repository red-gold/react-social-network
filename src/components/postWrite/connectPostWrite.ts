import {Map} from 'immutable'
import { Component, connect } from 'react-redux'

import * as imageGalleryActions from 'store/actions/imageGalleryActions'
import * as postActions from 'store/actions/postActions'
import * as globalActions from 'store/actions/globalActions'
import { IPostWriteComponentProps } from 'components/postWrite/IPostWriteComponentProps'
import { DialogType } from 'models/common/dialogType'
import { Post } from 'core/domain/posts'
import { authorizeSelector } from 'store/reducers/authorize/authorizeSelector'
import { globalSelector } from 'store/reducers/global/globalSelector'
import { User } from 'core/domain/users'

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IPostWriteComponentProps) => {
    return {
      openAlbum: () => dispatch(globalActions.openDialog(DialogType.Album)),
      closeAlbum: () => dispatch(globalActions.closeDialog(DialogType.Album)),
      post: (post: Post, callBack: Function) => dispatch(postActions.dbAddPost(post, callBack)),
      update: (post: Map<string, any>, callBack: Function) => dispatch(postActions.dbUpdatePost(post, callBack)),
      uploadImage: (image: any, imageName: string) => dispatch(imageGalleryActions.dbUploadImage(image, imageName)),
    }
  }
  
  /**
   * Map state to props
   */
  const makeMapStateToProps = () => {
    const selectCurrentUser = authorizeSelector.selectCurrentUser()
    const selectAlbumDialogState = globalSelector.selectDialogState()
    const selectProgress = globalSelector.selectProgress()
  
    const mapStateToProps = (state: Map<string, any>, ownProps: IPostWriteComponentProps) => {
      const currentUser = selectCurrentUser(state).toJS() as User
      const albumDialogOpen = selectAlbumDialogState(state,{type: DialogType.Album})
      const progress = selectProgress(state)
      return {
        
        postImageState: state.getIn(['imageGallery', 'status']),
        ownerAvatar: currentUser.avatar || '',
        ownerDisplayName: currentUser.fullName || '',
        albumDialogOpen,
        progress
      }
  
    }
    return mapStateToProps
  }

  export const connectPostWrite =
  (component: Component<IPostWriteComponentProps>) => connect(makeMapStateToProps, mapDispatchToProps)(component as any)