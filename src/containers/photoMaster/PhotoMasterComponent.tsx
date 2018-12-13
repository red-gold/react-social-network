// - Import react components
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import { translate, Trans } from 'react-i18next'

// - Material-UI
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import { grey, teal } from '@material-ui/core/colors'
import SvgCamera from '@material-ui/icons/PhotoCamera'
import Paper from '@material-ui/core/Paper'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'

import { Map, List as ImuList, fromJS } from 'immutable'
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import Popover from '@material-ui/core/Popover'

// - Import app components
import PostComponent from 'src/components/post'
import PostWriteComponent from 'src/components/postWrite'
import UserAvatarComponent from 'src/components/userAvatar'
import PostPhotoMasterComponent from 'src/containers/postStream'
import LoadMoreProgressComponent from 'src/layouts/loadMoreProgress'
import AlbumDialogComponent from 'components/albumDialog'

// - Import API
import * as PostAPI from 'src/api/PostAPI'

// - Import actions
import * as globalActions from 'src/store/actions/globalActions'

import { IPhotoMasterProps } from './IPhotoMasterProps'
import { IPhotoMasterState } from './IPhotoMasterState'
import { Post } from 'src/core/domain/posts'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'
import StringAPI from 'api/StringAPI'
import { ServerRequestType } from 'constants/serverRequestType'
import { photoMasterStyles } from './photoMasterStyles'
import { userSelector } from 'store/reducers/users/userSelector'
import { connectPhotoMaster } from './connectPhotoMaster'
import PhotoStreamComponent from 'components/photoStream'
import FileAPI from 'api/FileAPI'

// - Create component class
export class PhotoMasterComponent extends Component<IPhotoMasterProps, IPhotoMasterState> {

  static propTypes = {
    /**
     * A list of post
     */
    posts: PropTypes.object,

    /**
     * The title of home header
     */
    homeTitle: PropTypes.string

  }

  /**
   * Selected photos
   */
  selectedPhotos: { file: any, fileName: string }[] = []

  /**
   * Handle close menu
   */
  handleCloseMenu = () => {
    this.setState({
      anchorElMenu: null
    })
  }

  /**
   * Handle open menu
   */
  handleOpenMenu = (event: any) => {
    this.setState({
      anchorElMenu: event.currentTarget
    })
  }

  /**
   * Close album dialog
   */
  closeAlbumDialog = () => {
    const { closeAlbum } = this.props
    if (closeAlbum) {
      closeAlbum()
    }
  }

  /**
   * Open album dialog
   */
  openAlbumDialog = () => {
    const { openAlbum } = this.props
    if (openAlbum) {
      openAlbum()
    }
  }

  /**
   * Handle on change file upload
   */
  onUploadAlbumChange = (event: any) => {
    const { uploadImage } = this.props
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
      this.selectedPhotos = parsedFiles
      this.openAlbumDialog()
      event.currentTarget.value = null
    }
  }

  /**
   * Component constructor
   *
   */
  constructor(props: IPhotoMasterProps) {
    super(props)

    this.state = {
      anchorElMenu: null
    }

    // Binding functions to `this`
    this.loadData = this.loadData.bind(this)
    this.handleCloseMenu = this.handleCloseMenu.bind(this)
    this.handleOpenMenu = this.handleOpenMenu.bind(this)
    this.handleDeleteAlbum = this.handleDeleteAlbum.bind(this)
    this.handleDeleteImage = this.handleDeleteImage.bind(this)

  }

  /**
   * Handle delete image
   */
  handleDeleteImage = (fileId: string) => {
    const {updateAlbum, currentAlbum, images} = this.props
    if (currentAlbum && currentAlbum.album && currentAlbum.album.photos && updateAlbum && images && images.length > 0) {
      const updatedImages: {url: string, fileId: string, fileName: string}[]  = []
       images.slice(0, 4)
      .forEach((image) => {
        if (image.id !== fileId) {
          updatedImages.push({
            url: image.url,
            fileId: image.id,
            fileName: image.fileName
          })
        }
      })
      currentAlbum.album.photos = updatedImages
      if (updatedImages.length > 0) {
        currentAlbum.image = updatedImages[0].url
        currentAlbum.album.cover = updatedImages[0].url
        currentAlbum.album.coverId = updatedImages[0].fileId
      } else {
        currentAlbum.image = ''
        currentAlbum.album.cover = ''
        currentAlbum.album.coverId = ''
      }
      updateAlbum(fromJS({...currentAlbum}), () => {
        console.log('Album Deleted!')
      })
    }
  }

  /**
   * Handle delete album
   */
  handleDeleteAlbum = () => {
    const { deleteAlbum, currentAlbum } = this.props
    if (deleteAlbum && currentAlbum) {
      deleteAlbum(currentAlbum.id!)
      this.setState({
        anchorElMenu: null
      })
    }
  }

  componentWillMount() {
    const { setHomeTitle, t } = this.props
    setHomeTitle!(t!('header.home'))
  }

  /**
   * Load posts
   */
  loadData() {
    const { loadImages, loadAlbum } = this.props
    if (loadImages && loadAlbum) {
      loadAlbum()
      loadImages()
    }
  }

  componentDidMount() {
    this.loadData()
  }
  /**
   * Reneder component DOM
   * 
   */
  render() {

    const { images, t, classes, loadImages, 
      requestId, 
      currentUser, 
      currentAlbum, 
      albumDialogOpen,
      isOwner, 
      progress 
    } = this.props
    const { anchorElMenu } = this.state
    const album = (currentAlbum && currentAlbum.album) ? currentAlbum.album! : { title: '' }
    const albumOpen = (albumDialogOpen !== undefined) ? albumDialogOpen : false

    const rightIconMenu = (
      <div>

        <IconButton
          aria-owns={anchorElMenu! ? 'circle-menu' : ''}
          aria-haspopup='true'
          onClick={this.handleOpenMenu}
        >
          <MoreVertIcon />
        </IconButton>

        <Popover
          id='current-user-menu-root'
          anchorEl={anchorElMenu}
          open={Boolean(anchorElMenu)}
          onClose={this.handleCloseMenu}
          PaperProps={{
            style: {
              maxHeight: 200 * 4.5,
              boxShadow: '0 1px 4px 0 rgba(0,0,0,0.14)',

            },
          }}
        >
          <MenuList role='menu'>
            <MenuItem onClick={this.handleDeleteAlbum} > {t!('album.deleteAlbum')} </MenuItem>
          </MenuList>
        </Popover>
      </div>

    )

    const cardActions = (
      <CardActions>
      <input
        accept='image/*'
        className={classes.input}
        id='album-button-file'
        multiple
        onChange={this.onUploadAlbumChange}
        type='file'
      />
      <div className={classes.header}>
        <label htmlFor='album-button-file'>
          <Button component='span' color='primary'>
            <PhotoAlbumIcon />
            {t!('album.addPhotos')}
          </Button>
        </label>
      </div>
    </CardActions>
    )

    const renderAlbum = (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <UserAvatarComponent fileName={(currentAlbum && currentAlbum.image) ? currentAlbum.image : ''} fullName={album.title}>
              </UserAvatarComponent>}
            action={isOwner && rightIconMenu}
            title={album.title}
            subheader={(currentAlbum && currentAlbum.body) ? currentAlbum.body : ''}
          />

          {isOwner && cardActions}
         
          <CardContent>
            <PhotoStreamComponent loadPhotos={this.loadData}  onDelete={this.handleDeleteImage} images={images} currentAlbum={currentAlbum!} />
          </CardContent>

        </Card>
        {albumOpen ? <AlbumDialogComponent
          currentAlbum={currentAlbum}
          open={albumOpen}
          progress={progress!}
          photos={this.selectedPhotos}
          onClose={this.closeAlbumDialog} /> : ''}
      </div>
    )

    if (currentAlbum && Object.keys(currentAlbum).length > 0) {
      return renderAlbum
    } else {
      return (
        <Paper className={classes.noAlbumRoot}>
          <VisibilityOffIcon className={classes.noAlbumIcon}/>
          <Typography variant='body1' className={classes.noAlbumText}>
            {t!('album.noExistAlbum')}
          </Typography>
        </Paper>
      )
    }
  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(PhotoMasterComponent as any)

export default withRouter<any>(connectPhotoMaster(withStyles(photoMasterStyles as any)(translateWrraper as any) as any))