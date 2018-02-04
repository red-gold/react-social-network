// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Card, CardActions, CardHeader, CardMedia, CardContent } from 'material-ui'
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText
} from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import RaisedButton from 'material-ui/Button'
import { grey } from 'material-ui/colors'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import Tooltip from 'material-ui/Tooltip'
import { MenuList, MenuItem } from 'material-ui/Menu'
import SvgRemoveImage from 'material-ui-icons/RemoveCircle'
import SvgCamera from 'material-ui-icons/PhotoCamera'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import { withStyles } from 'material-ui/styles'
import { Manager, Target, Popper } from 'react-popper'
import Grow from 'material-ui/transitions/Grow'
import ClickAwayListener from 'material-ui/utils/ClickAwayListener'
import classNames from 'classnames'

// - Import app components
import ImageGallery from 'components/imageGallery'
import Img from 'components/img'
import UserAvatarComponent from 'components/userAvatar'

// - Import API
import * as PostAPI from 'api/PostAPI'

// - Import actions
import * as imageGalleryActions from 'actions/imageGalleryActions'
import * as postActions from 'actions/postActions'
import { IPostWriteComponentProps } from './IPostWriteComponentProps'
import { IPostWriteComponentState } from './IPostWriteComponentState'
import { Post } from 'core/domain/posts'

const styles = (theme: any) => ({
  backdrop: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: '-1',
    position: 'fixed',
    willChange: 'opacity',
    backgroundColor: 'rgba(251, 249, 249, 0.5)',
    WebkitTapHighlightColor: 'transparent'
  },
  root: {
    padding: 0,
    paddingTop: 0
  },
  dialogRoot: {
    paddingTop: 0
  },
  popperOpen: {
    zIndex: 10
  },
  popperClose: {
    pointerEvents: 'none',
    zIndex: 0
  },
  author: {
    paddingRight: 70
  }
})

// - Create PostWrite component class
export class PostWriteComponent extends Component<IPostWriteComponentProps, IPostWriteComponentState> {

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IPostWriteComponentProps) {

    super(props)

    const { postModel } = props

    // Default state
    this.state = {
      /**
       * Post text
       */
      postText: this.props.edit && postModel ? (postModel.body ? postModel.body! : '') : '',
      /**
       * The URL image of the post
       */
      image: this.props.edit && postModel ? (postModel.image ? postModel.image! : '') : '',
      /**
       * The path identifier of image on the server
       */
      imageFullPath: this.props.edit && postModel ? (postModel.imageFullPath ? postModel.imageFullPath! : '') : '',
      /**
       * If it's true gallery will be open
       */
      galleryOpen: false,
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
      disableComments: this.props.edit && postModel ? postModel.disableComments! : false,
      /**
       * If it's true share will be disabled on post
       */
      disableSharing: this.props.edit && postModel ? postModel.disableSharing! : false

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

  }

  /**
   * Toggle comments of the post to disable/enable
   *
   *
   * @memberof PostWrite
   */
  handleToggleComments = () => {
    this.setState({
      disableComments: !this.state.disableComments,
      disabledPost: false
    })
  }

  /**
   * Toggle sharing of the post to disable/enable
   *
   *
   * @memberof PostWrite
   */
  handleToggleSharing = () => {
    this.setState({
      disableSharing: !this.state.disableSharing,
      disabledPost: false
    })
  }

  /**
   * Romove the image of post
   *
   *
   * @memberof PostWrite
   */
  handleRemoveImage = () => {
    this.setState({
      image: '',
      imageFullPath: '',
      disabledPost: this.state.postText.trim() === ''
    })
  }

  /**
   * Handle send post to the server
   * @param  {event} evt passed by clicking on the post button
   */
  handlePost = () => {
    const {
      image,
      imageFullPath,
      disableComments,
      disableSharing,
      postText } = this.state

    const {
        id,
      ownerAvatar,
      ownerDisplayName,
      edit,
      onRequestClose,
      post,
      update,
      postModel
      } = this.props
    if (image === '' && postText.trim() === '') {
      this.setState({
        disabledPost: false
      })
      return
    }

    let tags = PostAPI.getContentTags(postText!)

    // In edit status we should fire update if not we should fire post function
    if (!edit) {
      if (image !== '') {
        post!({
          body: postText,
          tags: tags,
          image: image,
          imageFullPath: imageFullPath,
          ownerAvatar: ownerAvatar,
          ownerDisplayName: ownerDisplayName,
          disableComments: disableComments,
          disableSharing: disableSharing,
          postTypeId: 1,
          score: 0,
          viewCount: 0
        }, onRequestClose)
      } else {
        post!({
          body: postText,
          tags: tags,
          ownerAvatar: ownerAvatar,
          ownerDisplayName: ownerDisplayName,
          disableComments: disableComments,
          disableSharing: disableSharing,
          postTypeId: 0,
          score: 0,
          viewCount: 0
        }, onRequestClose)
      }
    } else { // In edit status we pass post to update functions
      postModel!.body = postText
      postModel!.tags = tags
      postModel!.image = image
      postModel!.imageFullPath = imageFullPath
      postModel!.disableComments = disableComments
      postModel!.disableSharing = disableSharing

      update!(postModel!, onRequestClose)
    }
  }

  /**
   * Set post image url
   */
  onRequestSetImage = (url: string, fullPath: string) => {
    this.setState({
      image: url,
      imageFullPath: fullPath,
      disabledPost: false
    })
  }

  /**
   * When the post text changed
   * @param  {event} evt is an event passed by change post text callback funciton
   * @param  {string} data is the post content which user writes
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
   * Handle open more menu
   */
  handleOpenMenu = () => {
    this.setState({
      menuOpen: true
    })
  }

  /**
   * Handle close more menu
   */
  handleCloseMenu = () => {
    this.setState({
      menuOpen: false
    })
  }

  componentWillReceiveProps (nextProps: IPostWriteComponentProps) {
    if (!nextProps.open) {
      const { postModel } = this.props
      this.setState({
        /**
         * Post text
         */
        postText: this.props.edit && postModel ? (postModel.body ? postModel.body! : '') : '',
        /**
         * The URL image of the post
         */
        image: this.props.edit && postModel ? (postModel.image ? postModel.image! : '') : '',
        /**
         * The path identifier of image on the server
         */
        imageFullPath: this.props.edit && postModel ? (postModel.imageFullPath ? postModel.imageFullPath! : '') : '',
        /**
         * If it's true gallery will be open
         */
        galleryOpen: false,
        /**
         * If it's true post button will be disabled
         */
        disabledPost: true,
        /**
         * If it's true comment will be disabled on post
         */
        disableComments: this.props.edit && postModel ? postModel.disableComments! : false,
        /**
         * If it's true share will be disabled on post
         */
        disableSharing: this.props.edit && postModel ? postModel.disableSharing! : false

      })
    }
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {

    const { classes } = this.props
    const { menuOpen } = this.state

    const rightIconMenu = (
      <Manager>
        <Target>
          <Tooltip id='tooltip-icon' title='more' placement='bottom-start'>
            <IconButton
              onClick={this.handleOpenMenu}
            >
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </Target>
        <Popper
          placement='bottom-start'
          eventsEnabled={menuOpen}
          className={classNames({ [classes.popperClose]: !menuOpen }, { [classes.popperOpen]: menuOpen })}
        >
          <ClickAwayListener onClickAway={this.handleCloseMenu}>
            <Grow in={menuOpen} style={{ transformOrigin: '0 0 0' }}>
              <Paper>
                <MenuList role='menu'>
                  <MenuItem onClick={this.handleToggleComments} style={{ fontSize: '14px' }}>{!this.state.disableComments ? 'Disable comments' : 'Enable comments'} </MenuItem>
                  <MenuItem onClick={this.handleToggleSharing} style={{ fontSize: '14px' }}>{!this.state.disableSharing ? 'Disable sharing' : 'Enable sharing'}</MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          </ClickAwayListener>
        </Popper>
      </Manager>
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
        }}>{this.props.ownerDisplayName}</span><span style={{
          fontWeight: 100,
          fontSize: '10px'
        }}> | Public</span>
      </div>
    )

    /**
     * Provide post image
     */
    const loadImage = (this.state.image && this.state.image !== '')
      ? (
      <div>
        <div style={{ position: 'relative', overflowY: 'hidden', overflowX: 'auto' }}>
          <ul style={{ position: 'relative', whiteSpace: 'nowrap', padding: '0 0 0 16px', margin: '8px 0 0 0', paddingRight: '16px', verticalAlign: 'bottom', flexShrink: 0, listStyleType: 'none' }}>
            <div style={{ display: 'flex', position: 'relative' }}>
              <span onClick={this.handleRemoveImage} style={{
                position: 'absolute', width: '28px', backgroundColor: 'rgba(255, 255, 255, 0.22)',
                height: '28px', right: 12, top: 4, cursor: 'pointer', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <SvgRemoveImage style={{ color: 'rgba(0, 0, 0, 0.53)' }} />
              </span>

              <div style={{ display: 'inline-block', width: '100%', marginRight: '8px', transition: 'transform .25s' }}>
                <li style={{ width: '100%', margin: 0, verticalAlign: 'bottom', position: 'static' }}>
                  <Img fileName={this.state.image} style={{ width: '100%', height: 'auto' }} />
                </li>
              </div>
            </div>

          </ul>
        </div>
      </div>
      ) : ''

    const styles = {
      dialog: {
        width: '',
        maxWidth: '530px',
        borderRadius: '4px'
      }
    }

    return (
      <div style={this.props.style}>
        {this.props.children}
        <Dialog
        BackdropProps={{className: classes.backdrop} as any}
          key={this.props.id || 0}
          open={this.props.open}
          onClose={this.props.onRequestClose}
        >
          <DialogContent
          className={classes.root}
          style={{paddingTop: 0}}

          >

            <Card elevation={0}>
              <CardHeader
                title={author}
                avatar={postAvatar}
                action={rightIconMenu}
              >
              </CardHeader>
              <CardContent>
                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
                  <div style={{ position: 'relative', flexDirection: 'column', display: 'flex', flexGrow: 1, overflow: 'hidden', overflowY: 'auto', maxHeight: '300px' }}>
                    <TextField
                     autoFocus
                      value={this.state.postText}
                      onChange={this.handleOnChange}
                      placeholder='What is new with you?'
                      multiline
                      rows={2}
                      rowsMax={4}
                      style={{ fontWeight: 200, fontSize: '14px', margin: '0 16px', flexShrink: 0, width: 'initial', flexGrow: 1 }}

                    />

                    {loadImage}
                  </div>
                  <div style={{ flexShrink: 0, boxFlex: 0, flexGrow: 0, maxHeight: '48px', width: '100%' }}>
                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                      <div onClick={this.handleOpenGallery} style={{ outline: 'none', width: '48px', zIndex: 0, overflow: 'hidden', position: 'relative', textAlign: 'center', transition: 'background .3s', border: 0, borderRadius: '50%', display: 'inlineBlock', height: '48px' }}>
                        <span style={{ top: '15px', display: 'block', position: 'relative', cursor: 'pointer' }}>
                          <SvgCamera style={{ color: 'grey' }} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button
              color='primary'
              disableFocusRipple={true}
              disableRipple={true}
              onClick={this.props.onRequestClose}
              style={{ color: grey[800] }}
            >
              Cancel
      </Button>
            <Button
              color='primary'
              disableFocusRipple={true}
              disableRipple={true}
              onClick={this.handlePost}
              disabled={this.state.disabledPost}
            >
              {this.props.edit ? 'UPDATE' : 'POST'}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.galleryOpen}
          onClose={this.handleCloseGallery}

        >
          <DialogContent>
            <ImageGallery set={this.onRequestSetImage} close={this.handleCloseGallery} />
          </DialogContent>
          <DialogActions>
            <Button
              color='primary'
              disableFocusRipple={true}
              disableRipple={true}
              onClick={this.handleCloseGallery}
              style={{ color: grey[800] }}
            >
              Cancel
        </Button>
          </DialogActions>
        </Dialog>

      </div>
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: any, ownProps: IPostWriteComponentProps) => {
  return {
    post: (post: Post, callBack: Function) => dispatch(postActions.dbAddImagePost(post, callBack)),
    update: (post: Post, callBack: Function) => dispatch(postActions.dbUpdatePost(post, callBack))
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: IPostWriteComponentProps) => {
  return {
    postImageState: state.imageGallery.status,
    ownerAvatar: state.user.info && state.user.info[state.authorize.uid] ? state.user.info[state.authorize.uid].avatar : '',
    ownerDisplayName: state.user.info && state.user.info[state.authorize.uid] ? state.user.info[state.authorize.uid].fullName : ''
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(PostWriteComponent as any) as any)
