// - Impoer react components
import React, { Component } from 'react'
import PropTypes, { object } from 'prop-types'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import moment from 'moment/moment'
import uuid from 'uuid'

import { Map } from 'immutable'
import * as R from 'ramda'
import config from 'src/config'
import { translate, Trans } from 'react-i18next'

// - Material-UI
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import StarBorder from '@material-ui/icons/StarBorder'
import MobileStepper from '@material-ui/core/MobileStepper'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'
import SvgUpload from '@material-ui/icons/CloudUpload'
import SvgAddImage from '@material-ui/icons/AddAPhoto'
import SvgDelete from '@material-ui/icons/Delete'
import { grey } from '@material-ui/core/colors'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import LinearProgress from '@material-ui/core/LinearProgress'
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate'
import TextField from '@material-ui/core/TextField'
import withMobileDialog from '@material-ui/core/withMobileDialog/withMobileDialog'
import CloseIcon from '@material-ui/icons/Close'
import LockIcon from '@material-ui/icons/VpnLock'
import CircularProgress from '@material-ui/core/CircularProgress'

// - Import actions
import * as imageGalleryActions from 'store/actions/imageGalleryActions'
import * as globalActions from 'store/actions/globalActions'

// - Import app components
import Img from 'components/img'
import UserPermissionComponent from 'components/userPermission'

// - Import API
import FileAPI from 'api/FileAPI'
import { IPostImageUploadProps } from './IPostImageUploadProps'
import { IPostImageUploadState } from './IPostImageUploadState'
import { Image } from 'core/domain/imageGallery'
import { userSelector } from 'store/reducers/users/userSelector'
import { albumDialogStyles } from 'components/albumDialog/albumDialogStyles'
import StringAPI from 'api/StringAPI'
import { Post } from 'core/domain/posts/post'
import * as postActions from 'store/actions/postActions'
import { PostType } from 'core/domain/posts/postType'
import { UserPermissionType } from 'core/domain/common/userPermissionType'
import { Photo } from 'core/domain/imageGallery/photo'
import { authorizeSelector } from 'store/reducers/authorize/authorizeSelector'
import { serverSelector } from 'store/reducers/server/serverSelector'
import { ServerRequestType } from 'constants/serverRequestType'
import { User } from 'core/domain/users/user'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'
import { Album } from 'core/domain/imageGallery/album'
import { postImageUploadStyles } from './postImageUploadStyles'

/**
 * Create component class
 */
export class PostImageUploadComponent extends Component<IPostImageUploadProps, IPostImageUploadState> {

  /**
   * Get drived state from props
   */
  static getDerivedStateFromProps(props: IPostImageUploadProps, state: IPostImageUploadState) {
   if (!R.equals(props.photos, state.prevPhotos)) {
     return {
       selectedPhotos: [...props.photos],
       prevPhotos: props.photos,
       
     }
   }
   
   return null
  }

  /**
   * Component constructor
   *
   */
  constructor(props: IPostImageUploadProps) {
    super(props)

    this.state = {
      selectedPhotos: [],
      prevPhotos: []
    }

    // Binding function to `this`
    this.imageList = this.imageList.bind(this)
    this.deleteSelectedPhoto = this.deleteSelectedPhoto.bind(this)
    this.saveAlbum = this.saveAlbum.bind(this)
  }

  /**
   * Save album
   */
  saveAlbum = () => {
    const { progress, t, currentUser, currentAlbum } = this.props
    const { accessUserList, permission } = this.state

    const description = StringAPI.isEmpty(this.state.description) ? '' : this.state.description
    const albumTitle = StringAPI.isEmpty(this.state.albumName) ? t!('album.defaultAlbumName') : this.state.albumName

    const selectedPhotos = [...this.state.selectedPhotos]
    const images: Photo[] = []
    const mappedPhotos = selectedPhotos.slice(0, 4).map((photo) => {
      const meta = progress.getIn([photo.fileName, 'meta'], { url: '' })
      const fileId = photo.fileName.split('.')[0]
      const image = new Photo(
        fileId,
        photo.fileName,
        '',
        meta.url || URL.createObjectURL(photo.src),
        meta.url || URL.createObjectURL(photo.src),
        currentUser!.userId!,
        0,
        albumTitle,
        '',
        0,
        0,
        {},
        permission,
        accessUserList
      )
      images.push(image)
      return {
        url: meta.url,
        fileName: photo.fileName,
        fileId
      }
    })

  }

  /**
   * Delete selected photo
   */
  deleteSelectedPhoto = (fileName: string) => {
    const {onDelete} = this.props
    let selectedPhotos = [...this.state.selectedPhotos]
    selectedPhotos = selectedPhotos.filter((photo) => photo.fileName !== fileName)
    this.setState({
      selectedPhotos
    })

    onDelete(fileName)

  }

  /**
   * Image list
   */
  imageList = () => {
    const { classes, progress } = this.props
    const { selectedPhotos } = this.state
    return selectedPhotos!.map((photo) => {
      const progressPercent = progress.getIn([photo.fileName, 'percent'], 0)
      const progressVisible = progress.getIn([photo.fileName, 'visible'], false)

      return (
        <GridListTile key={`album-dialog-tile-${photo.fileName}`}>
          <img src={photo.src} alt={'something'} />
          <GridListTileBar
            title={progressVisible ? <LinearProgress variant='determinate' value={progressPercent} color='secondary' /> : ''}
            actionIcon={
              !progressVisible
                ? (<IconButton className={classes.icon} onClick={() => this.deleteSelectedPhoto(photo.fileName)}>
                  <SvgDelete />
                </IconButton>) : ''}
          />
        </GridListTile>)
    })
  }

  /**
   * Render Grid tile
   */
  gridTile = () => {
    const { t, photos, classes } = this.props
    return (
      <GridList cellHeight={100} className={classes.gridList} cols={3}>
          {this.imageList()}
        </GridList>
    )
  }

  render() {

    const { t, classes, theme, createAlbumRequestStatus } = this.props
    const { activeStep, nextDisabled, selectedPhotos, description,
      descriptionError, albumNameError,
      albumName, permissionOpen, permission,
      saveDisabled
    } = this.state
    const loading = createAlbumRequestStatus === ServerRequestStatusType.Sent
    return (
      <div className={classes.root}>
        {
          this.gridTile()
        }
      </div>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IPostImageUploadProps) => {
  return {
    deleteImage: (fileId: string, fileName: string) => dispatch(imageGalleryActions.dbDeleteImage(fileId, config.data.imageFolderPath, fileName)),
    progressChange: (percent: number, status: boolean) => dispatch(globalActions.progressChange(percent, status))
  }
}

/**
 * Map state to props
 */
const makeMapStateToProps = () => {
  const selectCurrentUser = authorizeSelector.selectCurrentUser()
  const selectRequest = serverSelector.selectRequest()

  const mapStateToProps = (state: Map<string, any>, ownProps: IPostImageUploadProps) => {
    const currentUser = selectCurrentUser(state).toJS() as User
    const requestId = StringAPI.createServerRequestId(ServerRequestType.GalleryCreateAlbum, currentUser.userId!)
    const createAlbumRequestStatus = selectRequest(state, { requestId })
    return {
      
      currentUser,
      createAlbumRequestStatus: createAlbumRequestStatus ? createAlbumRequestStatus.status : ServerRequestStatusType.NoAction,
    }
  }
  return mapStateToProps
}

// - Connect component to redux store
const translateWrraper = translate('translations')(PostImageUploadComponent as any)

const componentWithStyles: any = withStyles(postImageUploadStyles as any, { withTheme: true })(translateWrraper as any)
export default connect(makeMapStateToProps, mapDispatchToProps)(componentWithStyles)
