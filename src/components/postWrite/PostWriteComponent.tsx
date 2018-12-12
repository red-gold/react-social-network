// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Map, fromJS, List as ImuList } from 'immutable'
import uuid from 'uuid'
import { translate, Trans } from 'react-i18next'

// - Material-UI
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import { grey } from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Menu from '@material-ui/core/Menu'
import Tooltip from '@material-ui/core/Tooltip'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import SvgRemoveImage from '@material-ui/icons/RemoveCircle'
import SvgCamera from '@material-ui/icons/PhotoCamera'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import SvgAddVideo from '@material-ui/icons/VideoCall'
import VideoGalleryIcon from '@material-ui/icons/VideoLibrary'
import SvgPlay from '@material-ui/icons/PlayCircleFilled'
import CloseIcon from '@material-ui/icons/Close'
import Grid from '@material-ui/core/Grid'

// - Import app components
import Img from 'components/img'
import UserAvatarComponent from 'components/userAvatar'
import VideoGalleryComponent from 'components/videoGallery'
import AddVideo from 'components/addVideo'
import UserPermissionComponent from 'components/userPermission'
import PostImageUploadComponent from 'components/postImageUpload'

// - Import API
import * as PostAPI from 'api/PostAPI'
import StringAPI from 'api/StringAPI'

// - Import actions
import { IPostWriteComponentProps } from './IPostWriteComponentProps'
import { IPostWriteComponentState } from './IPostWriteComponentState'
import { Post } from 'core/domain/posts'
import { PostType } from 'core/domain/posts/postType'
import { userSelector } from 'store/reducers/users/userSelector'
import { postWriteStyles } from './postWriteStyles'
import { UserPermissionType } from 'core/domain/common/userPermissionType'
import FileAPI from 'api/FileAPI'
import { DialogType } from 'models/common/dialogType'
import { globalSelector } from 'store/reducers/global/globalSelector'
import { authorizeSelector } from 'store/reducers/authorize/authorizeSelector'
import { User } from 'core/domain/users/user'
import { Album } from 'core/domain/imageGallery/album'
import AlbumDialogComponent from 'components/albumDialog'
import { connectPostWrite } from './connectPostWrite'

// - Create PostWrite component class
export class PostWriteComponent extends Component<IPostWriteComponentProps, IPostWriteComponentState> {

  /**
   * Fields
   */
  selectedPhotos: { file: any, fileName: string }[] = []
  /**
   * Component constructor
   *
   */
  constructor(props: IPostWriteComponentProps) {

    super(props)

    const { postModel } = props

    const albumPhotos: ImuList<any> = postModel && postModel.getIn(['album', 'photos'], ImuList([]))
    const selectedPhotos: any[] = 
    ( props.edit && postModel && postModel.get('postTypeId', 0) === PostType.PhotoGallery) 
    ? albumPhotos.map((photo) => {
      return Map({src: photo.get('url'), fileName: photo.get('fileName'), loaded: true})
    }).toJS() : []

    const galleryOpen = !!(this.props.edit! && selectedPhotos && selectedPhotos.length > 0)
    
    // Default state
    this.state = {
      /**
       * Post text
       */
      postText: this.props.edit && postModel ? postModel.get('body', '') : '',
      /**
       * The URL image of the post
       */
      image: this.props.edit && postModel ? postModel.get('image', '') : '',
      /**
       * The path identifier of image on the server
       */
      imageFullPath: this.props.edit && postModel ? postModel.get('imageFullPath', '') : '',
      /**
       * If it's true gallery will be open
       */
      galleryOpen: galleryOpen,
      /**
       * Whether menu is open
       */
      menuOpen: false,
      /**
       * If it's true post button will be disabled
       */
      disabledPost: true,
      /**
       * If it's true comment will be disabled on post
       */
      disableComments: this.props.edit && postModel ? postModel.get('disableComments', false) : false,
      /**
       * If it's true share will be disabled on post
       */
      disableSharing: this.props.edit && postModel ? postModel.get('disableSharing', false) : false,
      /**
       * Whether video dialog is open
       */
      videoLinkOpen: false,
      /**
       * Whether video gallery dialog is open
       */
      videoGalleryOpen: false,
      /**
       * Whether video gallery dialog is open
       */
      permissionOpen: false,
      /**
       * The URL video of the post
       */
      video: this.props.edit && postModel ? postModel.get('video', '') : '',
      /**
       * The address of video thumbnails on the post
       */
      videoThumbnails: this.props.edit && postModel ? postModel.get('videoThumbnails', '') : '',
      /**
       * Post content type 
       */
      postType: this.props.edit && postModel ? postModel.get('postTypeId', PostType.Text) : PostType.Text,
      /**
       * The list of user can access to post
       */
      accessUserList: this.props.edit && postModel ? postModel.get('accessUserList', []) : [],
      /**
       * User permission type
       */
      permission: this.props.edit && postModel ? postModel.get('permission', UserPermissionType.Public) : UserPermissionType.Public,
      /**
       * Selected photos
       */
      selectedPhotos: selectedPhotos,
      /**
       * Album
       */
      album: (this.props.edit && postModel ) ? postModel.get('album', Map({photos: ImuList([])})) :  Map({ photos: ImuList([])})

    }

    // Binding functions to `this`
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleCloseGallery = this.handleCloseGallery.bind(this)
    this.handleOpenGallery = this.handleOpenGallery.bind(this)
    this.onRequestSetImage = this.onRequestSetImage.bind(this)
    this.handlePost = this.handlePost.bind(this)
    this.handleRemoveImage = this.handleRemoveImage.bind(this)
    this.handleToggleComments = this.handleToggleComments.bind(this)
    this.handleToggleSharing = this.handleToggleSharing.bind(this)
    this.handleTogglePermission = this.handleTogglePermission.bind(this)
    this.isPostChangeValid = this.isPostChangeValid.bind(this)
    this.getPermissionLabel = this.getPermissionLabel.bind(this)
    this.onUploadAlbumChange = this.onUploadAlbumChange.bind(this)
    this.handleDeletePhoto = this.handleDeletePhoto.bind(this)

  }

  /**
   * Toggle comments of the post to disable/enable
   */
  handleToggleComments = () => {
    this.setState((prevState, props) => ({
      disableSharing: !prevState.disableComments,
      disabledPost: !this.isPostChangeValid(prevState)
    }))
  }

  /**
   * Toggle sharing of the post to disable/enable
   */
  handleToggleSharing = () => {
    this.setState((prevState, props) => ({
      disableSharing: !prevState.disableSharing,
      disabledPost: !this.isPostChangeValid(prevState)
    }))
  }

  /**
   * Toggle Permission dialog
   */
  handleTogglePermission = () => {
    this.setState((prevState, props) => ({
      permissionOpen: !prevState.permissionOpen,
      disabledPost: !this.isPostChangeValid(prevState)
    }))
  }

  /**
   * Romove the image of post
   */
  handleRemoveImage = () => {
    this.setState((prevState, props) => ({
      image: '',
      video: '',
      imageFullPath: '',
      postType: PostType.Text,
      disabledPost: !this.isPostChangeValid(prevState)
    }))
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
   * Handle send post to the server
   */
  handlePost = () => {
    const {
      image,
      imageFullPath,
      disableComments,
      disableSharing,
      postText,
      video,
      videoThumbnails,
      postType,
      accessUserList,
      permission,
      album,
      galleryOpen,
      selectedPhotos
    } = this.state

    const {
      id,
      ownerAvatar,
      ownerDisplayName,
      edit,
      onRequestClose,
      post,
      update,
      postModel,
      progress
    } = this.props
    if (!this.isPostChangeValid(this.state)) {
      return undefined
    }
    this.setState({
      disabledPost: false
    })

    let tags = PostAPI.getContentTags(postText!)

    let albumPhotos: Album = new Album([], '', '' , 0, '')
    if (galleryOpen) {
      selectedPhotos.forEach((photo) => {
        const meta = progress!.getIn([photo.fileName, 'meta'])
        const fileId = photo.fileName.split('.')[0]
        const mappedPhoto: {url: string, fileName: string, fileId: string} = { url: '', fileId: fileId, fileName: photo.fileName}
        if (meta) {
          mappedPhoto.url = meta.url
        } else {
          mappedPhoto.url = photo.src
        }

        albumPhotos.photos.push(mappedPhoto)

      })
    }

    // In edit status we should fire update if not we should fire post function
    const newPost = {
      body: postText,
      tags: tags,
      image: image,
      video: video,
      videoThumbnails: videoThumbnails,
      imageFullPath: imageFullPath,
      ownerAvatar: ownerAvatar,
      ownerDisplayName: ownerDisplayName,
      disableComments: disableComments,
      disableSharing: disableSharing,
      postTypeId: postType,
      score: 0,
      album: {...albumPhotos},
      viewCount: 0,
      accessUserList: accessUserList,
      permission: permission
    }
    
    if (!edit) {
      post!( newPost, onRequestClose)

    } else { // In edit status we pass post to update functions
      
      const updatedPost = postModel!.set('body', postText)
        .set('tags', ImuList(tags))
        .set('image', image)
        .set('imageFullPath', imageFullPath)
        .set('video', video)
        .set('album', fromJS({...albumPhotos}))
        .set('videoThumbnails', videoThumbnails)
        .set('disableComments', disableComments)
        .set('disableSharing', disableSharing)
        .set('postTypeId', postType)
        .set('accessUserList', ImuList(accessUserList))
        .set('permission', permission)

      update!(updatedPost, onRequestClose)
    }
  }

  /**
   * Set post image url
   */
  onRequestSetImage = (url: string) => {
    this.setState({
      image: url,
      video: '',
      postType: PostType.Photo,
      disabledPost: false
    })
  }

  /**
   * Set post video url
   */
  onSetVideo = (url: string, videoThumbnails: string) => {
    this.setState({
      image: '',
      videoThumbnails,
      video: url,
      postType: PostType.Video,
      disabledPost: false
    })
  }

  /**
   * When the post text changed
   */
  handleOnChange = (event: any) => {
    const data = event.target.value
    this.setState({ postText: data })
    if (data.length === 0 || data.trim() === '' || (this.props.edit && data.trim() === this.props.text)) {
      this.setState({
        postText: data,
        disabledPost: true
      })
    } else {
      this.setState({
        postText: data,
        disabledPost: false
      })
    }

  }

  /**
   * Close image gallery
   */
  handleCloseGallery = () => {
    this.setState({
      galleryOpen: false
    })
  }

  /**
   * Open image gallery
   */
  handleOpenGallery = () => {
    
    this.setState({
      galleryOpen: true
    })
  }

  /**
   * Open add video link dialog
   */
  handleOpenVideoLink = () => {
    this.setState({
      videoLinkOpen: true
    })
  }

  /**
   * Clode add video link dialog
   */
  handleCloseVideoLink = () => {
    this.setState({
      videoLinkOpen: false
    })
  }

  /**
   * Open add video gallery dialog
   */
  handleOpenVideoGallery = () => {
    this.setState({
      videoGalleryOpen: true
    })
  }

  /**
   * Clode add video gallery dialog
   */
  handleCloseVideoGallery = () => {
    this.setState({
      videoGalleryOpen: false
    })
  }

  /**
   * Handle open more menu
   */
  handleOpenMenu = (event: any) => {
    this.setState({
      menuOpen: true,
      menuAnchorEl: event.currentTarget
    })
  }

  /**
   * Handle close more menu
   */
  handleCloseMenu = () => {
    this.setState({
      menuOpen: false,
      menuAnchorEl: null
    })
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
   * Handle delete photo
   */
  handleDeletePhoto = (fileName: string) => {
    const {selectedPhotos} = this.state
    const updatedPhotos: {
      src: any;
      fileName: string;
  }[] = []
    selectedPhotos.forEach((photo) => {
      if (fileName !== photo.fileName) {
        updatedPhotos.push(photo)
      }
    })
    this.setState({
      selectedPhotos: [...updatedPhotos]
    })
  }

  /**
   * Handle on change file upload
   */
  onUploadAlbumChange = (event: any) => {
    const { uploadImage } = this.props
    const {galleryOpen, album, selectedPhotos} = this.state
    if (uploadImage) {
      const files: File[] = event.currentTarget.files
      const parsedFiles: { src: string, fileName: string }[] = []
      for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
        const file = files[fileIndex]
        const extension = FileAPI.getExtension(file.name)
        let fileName = (`${uuid()}.${extension}`)
        parsedFiles.push({ src: URL.createObjectURL(file), fileName })
        uploadImage(file, fileName)
      }
      const photos = [
        ...selectedPhotos,
        ...parsedFiles]
        
        if (files.length > 3 && !galleryOpen) {
          this.selectedPhotos = photos.map((photo) => ({ file: photo.src, fileName: photo.fileName }))
          this.openAlbumDialog()
          
      } else {
        // this.handleOpenGallery()
        this.setState({
          selectedPhotos: [...photos],
          galleryOpen: true,
          postType: PostType.PhotoGallery
        })
      
      }
      event.currentTarget.value = null
    }
  }

  /**
   * Is post change valid
   */
  isPostChangeValid = (prevState: IPostWriteComponentState) => {
    const { image, video, postText } = prevState
    return (!StringAPI.isEmpty(image) || !StringAPI.isEmpty(video) || !StringAPI.isEmpty(postText))
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
   * Reneder component DOM
   */
  render() {

    const { classes, t, progress, albumDialogOpen } = this.props
    const { menuOpen, videoLinkOpen, video, image, postType,
      galleryOpen, selectedPhotos,
      videoThumbnails, permissionOpen, permission, menuAnchorEl } = this.state
      const albumOpen = (albumDialogOpen !== undefined) ? albumDialogOpen : false
    const rightIconMenu = (
      <div>
        <Tooltip id='tooltip-icon' title={t!('post.moreTooltip')} placement='bottom-start'>
          <IconButton
            onClick={this.handleOpenMenu}
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
        <Menu
          open={menuOpen}
          anchorEl={menuAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          onClose={this.handleCloseMenu}>
          <MenuItem onClick={this.handleToggleComments} style={{ fontSize: '14px' }}>{!this.state.disableComments ? t!('post.disableComments') : t!('post.enableComments')} </MenuItem>
          <MenuItem onClick={this.handleToggleSharing} style={{ fontSize: '14px' }}>{!this.state.disableSharing ? t!('post.disableSharing') : t!('post.disableSharing')}</MenuItem>

        </Menu>
      </div>
    )
    let postAvatar = <UserAvatarComponent fullName={this.props.ownerDisplayName!} fileName={this.props.ownerAvatar!} size={36} />

    let author = (
      <div className={classes.author}>
        <span style={{
          fontSize: '14px',
          paddingRight: '10px',
          fontWeight: 400,
          color: 'rgba(0,0,0,0.87)',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          lineHeight: '25px'
        }}>{`${this.props.ownerDisplayName} |`}</span>
        <span
          onClick={this.handleTogglePermission}
          className={classes.permission}>
          {`${this.getPermissionLabel()}`}
        </span>
      </div>
    )

    /**
     * Provide post image
     */
    const loadImage = ((image && image !== '' && postType === PostType.Photo) || (videoThumbnails && videoThumbnails !== '' && postType === PostType.Video))
      ? (
        <div>
          <div style={{ position: 'relative', overflowY: 'hidden', overflowX: 'auto' }}>
            <ul style={{ position: 'relative', whiteSpace: 'nowrap', padding: '0 0 0 16px', margin: '8px 0 0 0', paddingRight: '16px', verticalAlign: 'bottom', flexShrink: 0, listStyleType: 'none' }}>
              <div style={{ display: 'flex', position: 'relative' }}>
                <span onClick={this.handleRemoveImage} style={{
                  position: 'absolute', width: '28px', backgroundColor: 'rgba(6, 6, 6, 0.82)',
                  height: '28px', right: 12, top: 4, cursor: 'pointer', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <SvgRemoveImage style={{ color: 'rgba(239, 235, 235, 0.83)' }} />
                </span>
                <span className={classNames(classes.playVideo, { [classes.noDisplay]: postType !== PostType.Video })} style={{}}>
                  <SvgPlay className={classes.playIcon} />
                </span>

                <div style={{ display: 'inline-block', width: '100%', marginRight: '8px', transition: 'transform .25s' }}>
                  <li style={{ width: '100%', margin: 0, verticalAlign: 'bottom', position: 'static' }}>
                    <Img fileName={postType === PostType.Photo ? image! : videoThumbnails!} style={{ width: '100%', height: 'auto' }} />
                  </li>
                </div>
              </div>

            </ul>
          </div>
        </div>
      ) : ''

    return (
      <div style={this.props.style}>
        {this.props.children}
        <Dialog
          BackdropProps={{ className: classes.backdrop } as any}
          PaperProps={{ className: classes.fullPageXs }}
          key={this.props.id || 0}
          open={this.props.open}
          onClose={this.props.onRequestClose}
        >
          <DialogTitle className={classes.dialogTitle}>
            <CardHeader
              title={author}
              avatar={postAvatar}
              action={rightIconMenu}
            >
            </CardHeader>
          </DialogTitle>
          <DialogContent
            className={classes.content}
            style={{ paddingTop: 0 }}

          >

            <Card elevation={0}>

              <CardContent>
                <Grid item xs={12}>
                  <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ position: 'relative', flexDirection: 'column', display: 'flex', flexGrow: 1, overflowY: 'auto', maxHeight: '300px' }}>
                      <TextField
                        autoFocus
                        value={this.state.postText}
                        onChange={this.handleOnChange}
                        placeholder={t!('post.textareaPlaceholder')}
                        multiline
                        rows={2}
                        rowsMax={4}
                        style={{ fontWeight: 400, fontSize: '14px', margin: '0 16px', flexShrink: 0, width: 'initial', flexGrow: 1 }}

                      />

                      {loadImage}
                      {galleryOpen && <PostImageUploadComponent photos={selectedPhotos} progress={progress!} onDelete={this.handleDeletePhoto} />}
                    </div>

                  </div>
                </Grid>
              </CardContent>
            </Card>
          </DialogContent>
          <DialogActions className={classes.iconButtonsRoot}>
            <div style={{ flexShrink: 0, boxFlex: 0, flexGrow: 0, maxHeight: '48px', width: '100%' }}>
              <div style={{ flexDirection: 'row', display: 'flex' }}>
                <input
                  accept='image/*'
                  className={classes.input}
                  id='album-button-file'
                  multiple
                  onChange={this.onUploadAlbumChange}
                  type='file'
                />
                <div style={{ outline: 'none', width: '48px', zIndex: 0, overflow: 'hidden', position: 'relative', textAlign: 'center', transition: 'background .3s', border: 0, borderRadius: '50%', display: 'inlineBlock', height: '48px' }}>
                  <span style={{ top: '15px', display: 'block', position: 'relative', cursor: 'pointer' }}>
                    <label htmlFor='album-button-file'>
                      <SvgCamera style={{ color: 'grey' }} />
                    </label>
                  </span>
                </div>
                <div onClick={this.handleOpenVideoLink} style={{ outline: 'none', width: '48px', zIndex: 0, overflow: 'hidden', position: 'relative', textAlign: 'center', transition: 'background .3s', border: 0, borderRadius: '50%', display: 'inlineBlock', height: '48px' }}>
                  <span style={{ top: '12px', display: 'block', position: 'relative', cursor: 'pointer' }}>
                    <SvgAddVideo style={{ color: 'grey', width: 30, height: 30 }} />
                  </span>
                </div>
                <div onClick={this.handleOpenVideoGallery} style={{ outline: 'none', width: '48px', zIndex: 0, overflow: 'hidden', position: 'relative', textAlign: 'center', transition: 'background .3s', border: 0, borderRadius: '50%', display: 'inlineBlock', height: '48px' }}>
                  <span style={{ top: '14px', display: 'block', position: 'relative', cursor: 'pointer' }}>
                    <VideoGalleryIcon style={{ color: 'grey', width: 24, height: 24 }} />
                  </span>
                </div>
              </div>
            </div>
          </DialogActions>
          <DialogActions>
            <Button
              color='primary'
              disableFocusRipple={true}
              disableRipple={true}
              onClick={this.props.onRequestClose}
              style={{ color: grey[800] }}
            >
              {t!('post.cancelButton')}
            </Button>
            <Button
              color='primary'
              disableFocusRipple={true}
              disableRipple={true}
              onClick={this.handlePost}
              disabled={this.state.disabledPost}
            >
              {this.props.edit ? t!('post.updateButton') : t!('post.postButton')}
            </Button>
          </DialogActions>
        </Dialog>

        {albumOpen ? <AlbumDialogComponent
          open={albumOpen}
          progress={progress!}
          photos={this.selectedPhotos}
          onClose={this.closeAlbumDialog} /> : ''}

        {/* Video gallery Modal*/}
        <Dialog
          PaperProps={{ className: classNames(classes.fullPageXs, classes.videoGallery) }}
          open={this.state.videoGalleryOpen}
          onClose={this.handleCloseVideoGallery}

        >
          <DialogActions classes={{ action: classes.galleryAction }} className={classes.galleryActions}>
            <Typography variant={'h6'} component={'div'} className={classes.galleryDialogTitle}>
              <VideoGalleryIcon style={{ color: 'rgb(230, 35, 35)', margin: '0 10px', width: 24, height: 24 }} />
              {t!('post.videoGalleryLabel')}
            </Typography>
            <IconButton
              onClick={this.handleCloseVideoGallery}
            >
              <CloseIcon />
            </IconButton>
          </DialogActions>
          <Divider className={classes.devider} />
          <DialogContent>
            <VideoGalleryComponent set={this.onSetVideo} close={this.handleCloseVideoGallery} />
          </DialogContent>
        </Dialog>

        <AddVideo open={videoLinkOpen} onClose={this.handleCloseVideoLink} onAddLink={this.onSetVideo} />
        <UserPermissionComponent onClose={this.handleTogglePermission} open={permissionOpen} onAddAccessList={this.handleAccessList} access={permission} />
      </div>
    )
  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(PostWriteComponent as any)

export default connectPostWrite(withStyles(postWriteStyles)(translateWrraper as any) as any)
