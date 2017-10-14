// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { List, ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { grey400, grey800, darkBlack, lightBlack } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import SvgRemoveImage from 'material-ui/svg-icons/content/remove-circle'
import SvgCamera from 'material-ui/svg-icons/image/photo-camera'
import IconMenu from 'material-ui/IconMenu'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'



// - Import app components
import ImageGallery from 'ImageGallery'
import Img from 'Img'
import UserAvatar from 'UserAvatar'

// - Import API
import * as AuthAPI from 'AuthAPI'
import * as PostAPI from 'PostAPI'

// - Import actions
import * as imageGalleryActions from 'imageGalleryActions'
import * as postActions from 'postActions'

// - Create PostWrite component class
export class PostWrite extends Component {

  static propTypes = {
    /**
     * If it's true post writing page will be open
     */
    open: PropTypes.bool,
    /**
     * Recieve request close function
     */
    onRequestClose: PropTypes.func,
    /**
     * Post write style
     */
    style: PropTypes.object,
    /**
    * If it's true, post will be in edit view
    */
    edit: PropTypes.bool.isRequired,
    /**
     * The text of post in editing state
     */
    text: PropTypes.string,
    /**
     * The image of post in editing state
     */
    image: PropTypes.string,
    /**
     * If post state is editing this id sould be filled with post identifier
     */
    id: PropTypes.string

  }
  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props) {



    super(props)

    // Default state
    this.state = {
      /**
       * Post text
       */
      postText: this.props.edit ? this.props.text : '',
      /**
       * The URL image of the post
       */
      image: this.props.edit ? this.props.image : '',
      /**
       * The path identifier of image on the server
       */
      imageFullPath: this.props.edit ? this.props.imageFullPath : '',
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
      disableComments: this.props.edit ? this.props.disableComments : false,
      /**
       * If it's true share will be disabled on post 
       */
      disableSharing: this.props.edit ? this.props.disableSharing : false,

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
      disabledPost: false
    })
  }

  /**
   * Handle send post to the server
   * @param  {event} evt passed by clicking on the post button
   */
  handlePost = (evt) => {

    const {
      image,
      imageFullPath,
      disableComments,
      disableSharing,
      postText } = this.state

    const {
      id,
      avatar,
      name,
      edit,
      onRequestClose,
      post,
      update } = this.props

    var tags = PostAPI.getContentTags(postText)

    // In edit status we should fire update if not we should fire post function
    if (!edit) {
      if (image !== '') {
        post({
          body: postText,
          tags: tags,
          image: image,
          imageFullPath: imageFullPath,
          avatar: avatar,
          name: name,
          disableComments: disableComments,
          disableSharing: disableSharing
        }, onRequestClose)
      }
      else {
        post({
          body: postText,
          tags: tags,
          avatar: avatar,
          name: name,
          disableComments: disableComments,
          disableSharing: disableSharing
        }, onRequestClose)
      }
    }

    // In edit status we pass post to update functions
    else {
      update({
        id: id,
        body: postText,
        tags: tags,
        image: image,
        imageFullPath: imageFullPath,
        disableComments: disableComments,
        disableSharing: disableSharing
      }, onRequestClose)
    }
  }

  /**
   * Set post image url
   */
  onRequestSetImage = (url, fullPath) => {
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
  handleOnChange = (evt, data) => {
    this.setState({ postText: data })
    if (data.length === 0 || data.trim() === '' || (this.props.edit && data.trim() === this.props.text)) {
      this.setState({
        postText: data,
        disabledPost: true
      })
    }
    else {
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

  componentWillReceiveProps(nextProps) {
    if (!nextProps.open) {
      this.setState({
        /**
         * Post text
         */
        postText: this.props.edit ? this.props.text : '',
        /**
         * The image of the post
         */
        image: this.props.edit ? this.props.image : '',
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
        disableComments: this.props.edit ? this.props.disableComments : false,
        /**
         * If it's true share will be disabled on post 
         */
        disableSharing: this.props.edit ? this.props.disableSharing : false,

      })
    }
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {

    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    )

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onClick={this.handleToggleComments} style={{ fontSize: "14px" }}>{!this.state.disableComments ? 'Disable comments' : 'Enable comments'} </MenuItem>
        <MenuItem onClick={this.handleToggleSharing} style={{ fontSize: "14px" }}>{!this.state.disableSharing ? 'Disable sharing' : 'Enable sharing'}</MenuItem>
      </IconMenu>
    )
    var postAvatar = <UserAvatar fullName={this.props.name} fileName={this.props.avatar} style={{ top: "8px" }} size={40} />

    var author = (
      <div>
        <span style={{
          fontSize: "14px",
          paddingRight: "10px",
          fontWeight: 400,
          color: "rgba(0,0,0,0.87)",
          textOverflow: "ellipsis",
          overflow: "hidden",
          paddingLeft: "50px",
          lineHeight: "25px"
        }}>{this.props.name}</span><span style={{
          fontWeight: 100,
          fontSize: "10px"
        }}> | Public</span>
      </div>
    )

    const writeActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        keyboardFocused={false}
        onTouchTap={this.props.onRequestClose}
        style={{ color: grey800 }}
      />,
      <FlatButton
        label={this.props.edit ? 'UPDATE' : 'POST'}
        primary={true}
        keyboardFocused={false}
        onTouchTap={this.handlePost}
        disabled={this.state.disabledPost}
      />
    ]

    const galleryActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        keyboardFocused={false}
        onTouchTap={this.handleCloseGallery}
        style={{ color: grey800 }}
      />
    ]

    const styles = {
      dialog: {
        width: '',
        maxWidth: '530px',
        borderRadius: "4px"
      }
    }

    return (
      <div style={this.props.style}>
        {this.props.children}
        <Dialog
          id={this.props.id || 0}
          actions={writeActions}
          modal={false}
          open={this.props.open}
          contentStyle={styles.dialog}
          onRequestClose={this.props.onRequestClose}
          overlayStyle={{ background: "rgba(0,0,0,0.12)" }}
          bodyStyle={{ padding: 0 }}
          autoDetectWindowHeight={false}
          actionsContainerStyle={{ borderTop: "1px solid rgb(224, 224, 224)" }}

        >

          <ListItem
            disabled={true}

            leftAvatar={postAvatar}
            rightIconButton={rightIconMenu}
            primaryText={author}
            style={{ padding: "16px 4px 30px 16px" }}
          />
          <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, overflow: "hidden" }}>
            <div style={{ position: "relative", flexDirection: "column", display: "flex", flexGrow: 1, overflow: "hidden", overflowY: "auto", maxHeight: "300px" }}>
              <TextField
                value={this.state.postText}
                onChange={this.handleOnChange}
                hintText="What is new with you?"
                underlineShow={false}
                multiLine={true}
                rows={2}
                hintStyle={{ fontWeight: 200, fontSize: "14px" }}
                textareaStyle={{ fontWeight: 200, fontSize: "14px" }}
                style={{ margin: "0 16px", flexShrink: 0, width: "initial", flexGrow: 1 }}

              />

              {(this.state.image && this.state.image !== '')
                ? (<div>
                  <div style={{ position: "relative", overflowY: "hidden", overflowX: "auto" }}>
                    <ul style={{ position: "relative", whiteSpace: "nowrap", padding: "0 0 0 16px", margin: "8px 0 0 0", paddingRight: "16px", verticalAlign: "bottom", flexShrink: 0, listStyleType: "none" }}>
                      <div style={{ display: "flex", position: "relative" }}>
                        <span onClick={this.handleRemoveImage} style={{
                          position: "absolute", width: "28px", backgroundColor: "rgba(255, 255, 255, 0.22)",
                          height: "28px", right: 12, top: 4, cursor: "pointer", borderRadius: "50%",
                          display: "flex", alignItems: "center", justifyContent: "center"
                        }}>
                          <SvgRemoveImage hoverColor="rgba(0, 0, 0, 0.65)" style={{ color: "rgba(0, 0, 0, 0.53)" }} />
                        </span>

                        <div style={{ display: "inline-block", width: "100%", marginRight: "8px", transition: "transform .25s" }}>
                          <li style={{ width: "100%", margin: 0, verticalAlign: "bottom", position: "static" }}>
                            <Img fileName={this.state.image} style={{ width: "100%", height: "auto" }} />
                          </li>
                        </div>
                      </div>

                    </ul>
                  </div>
                </div>) : ''}
            </div>
            <div style={{ flexShrink: 0, boxFlex: 0, flexGrow: 0, maxHeight: "48px", width: "100%" }}>
              <div style={{ flexDirection: "row", display: "flex" }}>
                <div onClick={this.handleOpenGallery} style={{ outline: "none", width: "48px", zIndex: 0, overflow: "hidden", position: "relative", textAlign: "center", transition: "background .3s", border: 0, borderRadius: "50%", display: "inlineBlock", height: "48px" }}>
                  <span style={{ top: "15px", display: "block", position: "relative", cursor: "pointer" }}>
                    <SvgCamera color="grey" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
        <Dialog
          actions={galleryActions}
          modal={false}
          open={this.state.galleryOpen}
          contentStyle={styles.dialog}
          onRequestClose={this.handleCloseGallery}
          overlayStyle={{ background: "rgba(0,0,0,0.12)" }}
          autoDetectWindowHeight={false}

        >
          <ImageGallery set={this.onRequestSetImage} close={this.handleCloseGallery} />
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
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    post: (post, callBack) => dispatch(postActions.dbAddImagePost(post, callBack)),
    update: (post, callBack) => dispatch(postActions.dbUpdatePost(post, callBack))
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state, ownProps) => {
  return {
    postImageState: state.imageGallery.status,
    avatar: state.user.info && state.user.info[state.authorize.uid] ? state.user.info[state.authorize.uid].avatar : '',
    name: state.user.info && state.user.info[state.authorize.uid] ? state.user.info[state.authorize.uid].fullName : ''
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(PostWrite)
