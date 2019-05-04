// - Impoer react components
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import CloseIcon from '@material-ui/icons/Close';
import SvgDelete from '@material-ui/icons/Delete';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LockIcon from '@material-ui/icons/VpnLock';
import FileAPI from 'api/FileAPI';
import StringAPI from 'api/StringAPI';
import { albumDialogStyles } from 'components/albumDialog/albumDialogStyles';
import UserPermissionComponent from 'components/userPermission';
import { ServerRequestType } from 'constants/serverRequestType';
import { UserPermissionType } from 'core/domain/common/userPermissionType';
import { Album } from 'core/domain/imageGallery/album';
import { Photo } from 'core/domain/imageGallery/photo';
import { Post } from 'core/domain/posts/post';
import { PostType } from 'core/domain/posts/postType';
import { User } from 'core/domain/users/user';
import { Map } from 'immutable';
import moment from 'moment/moment';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import config from 'src/config';
import * as globalActions from 'store/actions/globalActions';
import * as imageGalleryActions from 'store/actions/imageGalleryActions';
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType';
import { authorizeSelector } from 'store/reducers/authorize/authorizeSelector';
import { serverSelector } from 'store/reducers/server/serverSelector';
import uuid from 'uuid';

import { IAlbumDialogProps } from './IAlbumDialogProps';
import { IAlbumDialogState } from './IAlbumDialogState';

// - Material-UI
// - Import actions
// - Import app components
// - Import API
const tutorialSteps = [
  {
    label: '',
  },
  {
    label: ''
  }
]

function Transition(props: any) {
  return <Slide direction='up' {...props} />
}

/**
 * Create component class
 */
export class AlbumDialogComponent extends Component<IAlbumDialogProps, IAlbumDialogState> {

  static getDerivedStateFromProps(props: IAlbumDialogProps, state: IAlbumDialogState) {
    if (props.progress) {
      for (let index = 0; index < state.selectedPhotos.length; index++) {
        const photo = state.selectedPhotos[index]
        if (props.progress.getIn([photo.fileName, 'percent'], 0) !== 100) {
          return {
            nextDisabled: true
          }
        }

      }
      return {
        nextDisabled: false
      }
    }
    return null
  }

  /**
   * Component constructor
   *
   */
  constructor(props: IAlbumDialogProps) {
    super(props)

    this.state = {
      acceptedFiles: [],
      rejectedFiles: [],
      activeStep: 0,
      selectedPhotos: [...props.photos],
      nextDisabled: true,
      description: (props.currentAlbum && props.currentAlbum.body) ? props.currentAlbum.body! : '',
      descriptionError: '',
      albumName: (props.currentAlbum && props.currentAlbum.album && props.currentAlbum.album.title) ? props.currentAlbum.album.title : '',
      saveDisabled: props.currentAlbum === undefined,
      albumNameError: '',
      accessUserList: (props.currentAlbum && props.currentAlbum.accessUserList) ? props.currentAlbum.accessUserList! : [],
      permission: (props.currentAlbum && props.currentAlbum.permission) ? props.currentAlbum.permission! : UserPermissionType.Public,
      permissionOpen: false,
    }

    // Binding function to `this`
    this.close = this.close.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
    this.handleSetImage = this.handleSetImage.bind(this)
    this.imageList = this.imageList.bind(this)
    this.deleteSelectedPhoto = this.deleteSelectedPhoto.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.saveAlbum = this.saveAlbum.bind(this)
    this.handleTogglePermission = this.handleTogglePermission.bind(this)
    this.getPermissionLabel = this.getPermissionLabel.bind(this)
    this.handleAccessList = this.handleAccessList.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.createAlbum = this.createAlbum.bind(this)
    this.updateAlbum = this.updateAlbum.bind(this)
  }

  /**
   * Handle set image
   */
  handleSetImage = (event: any, URL: string) => {
    this.close()
  }

  /**
   * Get permission label
   */
  getPermissionLabel = () => {
    const { t } = this.props
    const { permission } = this.state
    let permissionLabel = ''
    if (permission === UserPermissionType.Public) {
      permissionLabel = t!('permission.public')
    } else if (permission === UserPermissionType.Circles) {
      permissionLabel = t!('permission.circles')
    } else if (permission === UserPermissionType.OnlyMe) {
      permissionLabel = t!('permission.onlyMe')
    }
    return permissionLabel
  }

  /**
   * Handle change input
   */
  handleChange = (name: string) => (event: any) => {
    const { t } = this.props
    const targetValue = event.target.value
    let error: any = null
    if (StringAPI.isEmpty(targetValue)) {
      error = t!(`album.${name}Error`)
    }
    this.setState((prevState, props) => {
      return {
        [name]: targetValue,
        [`${name}Error`]: error,
        saveDisabled: !StringAPI.isEmpty(error)
      }
    })
  }

  /**
   * Handle next step
   */
  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }))
  }

  /**
   * Handle back step
   */
  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }))
  }

  /**
   * Toggle Permission dialog
   */
  handleTogglePermission = () => {
    this.setState((prevState, props) => ({
      permissionOpen: !prevState.permissionOpen
    }))
  }

  /**
   * Handle post access list
   */
  handleAccessList = (accessList: string[], selectedAccess: UserPermissionType) => {
    this.setState({
      accessUserList: accessList,
      permission: selectedAccess,
      permissionOpen: false
    })
  }

  /**
   * Close dialog
   */
  closeDialog = () => {
    const { onClose } = this.props
    if (onClose) {
      onClose()
    }
  }

  /**
   * Save album
   */
  saveAlbum = () => {
    const { progress, post, t, currentUser, currentAlbum } = this.props
    const { accessUserList, permission } = this.state

    const description = StringAPI.isEmpty(this.state.description) ? '' : this.state.description
    const albumTitle = StringAPI.isEmpty(this.state.albumName) ? t!('album.defaultAlbumName') : this.state.albumName

    const selectedPhotos = [...this.state.selectedPhotos]
    const images: Photo[] = []
    const mappedPhotos = selectedPhotos.map((photo) => {
      const meta = progress.getIn([photo.fileName, 'meta'], { url: '' })
      const fileId = photo.fileName.split('.')[0]
      const image = new Photo(
        fileId,
        photo.fileName,
        '',
        meta.url || URL.createObjectURL(photo.file),
        meta.url || URL.createObjectURL(photo.file),
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

    if (post && currentUser) {
      const album = {
        photos: mappedPhotos.slice(0, 4),
        cover: mappedPhotos[0].url,
        coverId: mappedPhotos[0].fileId,
        count: mappedPhotos.length,
        title: albumTitle,
      }

      if (!currentAlbum) {
        this.createAlbum(currentUser,
          description,
          mappedPhotos[0].url,
          album,
          accessUserList,
          permission,
          images
        )
      } else {
        this.updateAlbum(
          {...currentAlbum},
          currentUser,
          description,
          mappedPhotos[0].url,
          album,
          accessUserList,
          permission,
          images
        )
      }

    }

  }

  /**
   * Create new album
   */
  createAlbum = (
    currentUser: User,
    description: string,
    url: string,
    album: Album,
    accessUserList: string[],
    permission: UserPermissionType,
    images: Photo[]
  ) => {
    const { post } = this.props
    const newPost = new Post(
      '0',
      PostType.Album,
      moment().utc().valueOf(),
      0,
      0,
      {},
      0,
      {},
      description,
      currentUser.userId,
      currentUser.fullName,
      currentUser.avatar,
      0,
      [],
      0,
      url,
      '',
      '',
      '',
      album,
      false,
      false,
      false,
      accessUserList,
      permission,
      config.dataFormat.postVersion
    )
    if (post) {
      post(newPost, images)
    }

  }

  /**
   * Create new album
   */
  updateAlbum = ( 
    currentPostAlbum: Post,   
    currentUser: User,
    description: string,
    url: string,
    album: Album,
    accessUserList: string[],
    permission: UserPermissionType,
    images: Photo[]) => {
      const { post } = this.props
      currentPostAlbum.body = description
      currentPostAlbum.image = url
      currentPostAlbum.album = album
      currentPostAlbum.accessUserList = accessUserList
      currentPostAlbum.permission = permission
      if (post) {
        post(currentPostAlbum, images)
      }
  }

  /**
   * Handle change step
   */
  handleStepChange = (activeStep: number) => {
    this.setState({ activeStep })
  }

  /**
   * Handle on change file upload
   */
  onFileChange = (event: any) => {
    const { uploadImage } = this.props
    const selectedPhotos = [...this.state.selectedPhotos]
    if (uploadImage) {
      const files: File[] = event.currentTarget.files
      const parsedFiles: { file: any, fileName: string }[] = []
      for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
        const file = files[fileIndex]
        const extension = FileAPI.getExtension(file.name)
        let fileName = (`${uuid()}.${extension}`)
        parsedFiles.push({ file: URL.createObjectURL(file), fileName })
        uploadImage(file, fileName)
      }
      const joinedPhotos = [...selectedPhotos, ...parsedFiles]

      this.setState({
        selectedPhotos: joinedPhotos
      })
      event.currentTarget.value = null
    }

  }

  /**
   * Delete selected photo
   */
  deleteSelectedPhoto = (fileName: string) => {
    let selectedPhotos = [...this.state.selectedPhotos]
    selectedPhotos = selectedPhotos.filter((photo) => photo.fileName !== fileName)
    this.setState({
      selectedPhotos
    })
  }

  onDrop(acceptedFiles: any[], rejectedFiles: any[]) {
    this.setState({ acceptedFiles, rejectedFiles })
  }

  /**
   * Hide image gallery
   */
  close = () => {
    this.props.onClose!()
  }

  /**
   * Image list
   */
  imageList = () => {
    const { classes, progress } = this.props
    const { selectedPhotos } = this.state
    return selectedPhotos!.map((photo) => {
      const progressPercent = progress.getIn([photo.fileName, 'percent'], 0)
      const progressVisible = progress.getIn([photo.fileName, 'visible'], true)

      return (
        <GridListTile key={`album-dialog-tile-${photo.fileName}`}>
          <img src={photo.file} alt={'something'} />
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
    const { classes } = this.props
    return (
      <div className={classes.gridTileRoot}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key='Subheader' cols={2} style={{ height: 'auto' }}>
          </GridListTile>
          {this.imageList()}
        </GridList>
      </div>
    )
  }

  render() {

    const { t, classes, theme, open, onClose, createAlbumRequestStatus } = this.props
    const { activeStep, nextDisabled, selectedPhotos, description,
      descriptionError, albumNameError,
      albumName, permissionOpen, permission,
      saveDisabled
    } = this.state
    const maxSteps = tutorialSteps.length
    const loading = createAlbumRequestStatus === ServerRequestStatusType.Sent
    return (
      <Dialog
        id={'album-dialog-'}
        open={open}
        classes={{ paper: classes.paper }}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <input
          accept='image/*'
          className={classes.input}
          id='album-dialog-button-file'
          multiple
          onChange={this.onFileChange}
          type='file'
        />
        <div className={classes.root}>
          <Paper square elevation={0} className={classes.header}>
            <Typography>{tutorialSteps[activeStep].label}</Typography>
            <IconButton color='inherit' onClick={onClose} aria-label='Close'>
              <CloseIcon />
            </IconButton>
            {activeStep === 0 ?
              (<label htmlFor='album-dialog-button-file'>
                <Button component='span' color='primary'>
                  <AddPhotoIcon />
                  {t!('album.addPhotos')}
                </Button>
              </label>) : <Typography variant={'h6'}> {t!('album.saveAlbum')} </Typography>}
          </Paper>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={this.state.activeStep}
            onChangeIndex={this.handleStepChange}
            enableMouseEvents
          >
            {
              this.gridTile()
            }
            <div className={classes.information}>
              <Button variant='extendedFab' aria-label='open-permission' onClick={this.handleTogglePermission} className={classes.button}>
                <LockIcon />
                {this.getPermissionLabel()}
              </Button>
              <div style={{ height: 40 }}></div>

              <TextField
                autoFocus={activeStep === 1}
                value={albumName}
                onChange={this.handleChange('albumName')}
                placeholder={t!('album.albumTitle')}
                error={!StringAPI.isEmpty(albumNameError)}
                helperText={albumNameError}

              />
              <div style={{ height: 40 }}></div>
              <TextField
                value={description}
                onChange={this.handleChange('description')}
                placeholder={t!('album.description')}
                multiline
                rows={2}
                rowsMax={4}
                style={{ fontWeight: 400, fontSize: '14px', flexShrink: 0, width: 'initial', flexGrow: 1 }}
                error={!StringAPI.isEmpty(descriptionError)}
                helperText={descriptionError}
              />
            </div>
          </SwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position='bottom'
            activeStep={activeStep}
            className={classes.mobileStepper}
            nextButton={

              activeStep !== (maxSteps - 1)
                ? (
                  <>
                    <Button size='small' disabled={nextDisabled || !(selectedPhotos.length > 0)} onClick={this.handleNext}>
                      {t!('album.next')} {(theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />)}
                    </Button>
                  </>)
                : (
                  <div className={classes.wrapper}>
                    <Button size='small' variant={'contained'}
                      disabled={loading || saveDisabled || !StringAPI.isEmpty(albumNameError) || !StringAPI.isEmpty(descriptionError)}
                      color='secondary' onClick={this.saveAlbum}>
                      {t!('album.save')}
                    </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                  </div>
                )
            }

            backButton={
              <Button size='small' onClick={this.handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                {t!('album.back')}
              </Button>}
          />
        </div>
        <UserPermissionComponent onClose={this.handleTogglePermission} open={permissionOpen} onAddAccessList={this.handleAccessList} access={permission} />
      </Dialog>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IAlbumDialogProps) => {
  return {
    post: (albumPost: Post, images: Photo[]) => dispatch(imageGalleryActions.dbCreateAlbum(albumPost, images)),
    uploadImage: (image: any, imageName: string) => dispatch(imageGalleryActions.dbUploadImage(image, imageName)),
    deleteImage: (fileId: string, fileName: string) => dispatch(imageGalleryActions.dbDeleteImage(fileId, config.data.imageFolderPath,  fileName)),
    progressChange: (percent: number, status: boolean) => dispatch(globalActions.progressChange(percent, status))
  }
}

/**
 * Map state to props
 */
const makeMapStateToProps = () => {
  const selectCurrentUser = authorizeSelector.selectCurrentUser()
  const selectRequest = serverSelector.selectRequest()

  const mapStateToProps = (state: Map<string, any>, ownProps: IAlbumDialogProps) => {
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
const translateWrraper = withTranslation('translations')(AlbumDialogComponent as any)
const componentWithStyles: any = withStyles(albumDialogStyles as any, { withTheme: true })(translateWrraper as any)
export default connect(makeMapStateToProps, mapDispatchToProps)(componentWithStyles)
