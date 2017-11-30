// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import Linkify from 'react-linkify'

// - Material UI
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import SvgShare from 'material-ui/svg-icons/social/share'
import SvgLink from 'material-ui/svg-icons/content/link'
import SvgComment from 'material-ui/svg-icons/communication/comment'
import SvgFavorite from 'material-ui/svg-icons/action/favorite'
import SvgFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
import Checkbox from 'material-ui/Checkbox'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import { grey200, grey400, grey600 } from 'material-ui/styles/colors'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'

import reactStringReplace from 'react-string-replace'

// - Import app components
import CommentGroup from 'components/commentGroup'
import PostWrite from 'components/postWrite'
import Img from 'components/img'
import IconButtonElement from 'layouts/IconButtonElement'
import UserAvatar from 'components/userAvatar'

// - Import actions
import * as voteActions from 'actions/voteActions'
import * as postActions from 'actions/postActions'
import * as commentActions from 'actions/commentActions'
import * as globalActions from 'actions/globalActions'
import { IPostComponentProps } from './IPostComponentProps'
import { IPostComponentState } from './IPostComponentState'

// - Create component class
export class PostComponent extends Component<IPostComponentProps,IPostComponentState> {

  styles = {
    counter: {
      lineHeight: '36px',
      color: '#777',
      fontSize: '12px',
      marginRight: '6px'
    },
    postBody: {
      wordWrap: 'break-word'
    },
    dialog: {
      width: '',
      maxWidth: '530px',
      borderRadius: '4px'
    },
    rightIconMenu: {
      position: 'absolute',
      right: 18,
      top: 8
    },
    iconButton: {
      width: 24,
      height: 24

    }

  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IPostComponentProps) {
    super(props)
    const {post} = props
    this.state = {
      /**
       * Post text
       */
      text: post.body!,
      /**
       * It's true if whole the text post is visible
       */
      readMoreState: false,
      /**
       * Handle open comment from parent component
       */
      openComments: false,
      /**
       * If it's true, share dialog will be open
       */
      shareOpen: false,
      /**
       * If it's true comment will be disabled on post
       */
      disableComments: post.disableComments!,
      /**
       * If it's true share will be disabled on post
       */
      disableSharing: post.disableSharing!,
      /**
       * Title of share post
       */
      shareTitle: 'Share On',
      /**
       * If it's true, post link will be visible in share post dialog
       */
      openCopyLink: false,
      /**
       * If it's true, post write will be open
       */
      openPostWrite: false
    }

    // Binding functions to this
    this.handleReadMore = this.handleReadMore.bind(this)
    this.getOpenCommentGroup = this.getOpenCommentGroup.bind(this)
    this.handleVote = this.handleVote.bind(this)
    this.handleOpenShare = this.handleOpenShare.bind(this)
    this.handleCloseShare = this.handleCloseShare.bind(this)
    this.handleCopyLink = this.handleCopyLink.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleOpenPostWrite = this.handleOpenPostWrite.bind(this)
    this.handleClosePostWrite = this.handleClosePostWrite.bind(this)
    this.handleOpenComments = this.handleOpenComments.bind(this)
  }

  /**
   * Toggle on show/hide comment
   * @param  {event} evt passed by clicking on comment slide show
   */
  handleOpenComments = () => {
    const { getPostComments, commentList, post} = this.props
    const {id, ownerUserId} = post
    if (!commentList) {
      getPostComments(ownerUserId!, id!)
    }
    this.setState({
      openComments: !this.state.openComments
    })
  }

  /**
   * Open post write
   *
   *
   * @memberof StreamComponent
   */
  handleOpenPostWrite = () => {
    this.setState({
      openPostWrite: true
    })
  }

  /**
   * Close post write
   *
   *
   * @memberof StreamComponent
   */
  handleClosePostWrite = () => {
    this.setState({
      openPostWrite: false
    })
  }

  /**
   * Delete a post
   *
   *
   * @memberof Post
   */
  handleDelete = () => {
    const {post} = this.props
    this.props.delete!(post.id!)
  }

  /**
   * Show copy link
   *
   *
   * @memberof Post
   */
  handleCopyLink = () => {
    this.setState({
      openCopyLink: true,
      shareTitle: 'Copy Link'
    })
  }

  /**
   * Open share post
   *
   *
   * @memberof Post
   */
  handleOpenShare = () => {
    this.setState({
      shareOpen: true
    })
  }

  /**
   * Close share post
   *
   *
   * @memberof Post
   */
  handleCloseShare = () => {
    this.setState({
      shareOpen: false,
      shareTitle: 'Share On',
      openCopyLink: false
    })
  }

  /**
   * Handle vote on a post
   *
   *
   * @memberof Post
   */
  handleVote = () => {
    if (this.props.currentUserVote) {
      this.props.unvote!()
    } else {
      this.props.vote!()
    }
  }

  /**
   * Set open comment group function on state which passed by CommentGroup component
   * @param  {function} open the function to open comment list
   */
  getOpenCommentGroup = (open: () => void) => {
    this.setState({
      openCommentGroup: open
    })
  }

  /**
   * Handle read more event
   * @param  {event} evt  is the event passed by click on read more
   */
  handleReadMore (event: any) {
    this.setState({
      readMoreState: !this.state.readMoreState

    })
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {
    const {post ,setHomeTitle, goTo, fullName, isPostOwner, commentList, avatar} = this.props

    const RightIconMenu = () => (
      <IconMenu iconButtonElement={IconButtonElement} style={{ display: 'block', position: 'absolute', top: '0px', right: '4px' }}>
        <MenuItem primaryText='Edit' onClick={this.handleOpenPostWrite} />
        <MenuItem primaryText='Delete' onClick={this.handleDelete} />
       <MenuItem primaryText={post.disableComments ? 'Enable comments' : 'Disable comments'} onClick={() => this.props.toggleDisableComments!(!post.disableComments)} />
       <MenuItem primaryText={post.disableSharing ? 'Enable sharing' : 'Disable sharing'} onClick={() => this.props.toggleSharingComments!(!post.disableSharing)} />
      </IconMenu>
    )

    const {ownerUserId, ownerDisplayName, creationDate, image, body} = post
    // Define variables
    return (
      <Card>
        <CardHeader
          title={<NavLink to={`/${ownerUserId}`}>{ownerDisplayName}</NavLink>}
          subtitle={moment.unix(creationDate!).fromNow() + ' | public'}
          avatar={<NavLink to={`/${ownerUserId}`}><UserAvatar fullName={fullName!} fileName={avatar!} size={36} /></NavLink>}
        >
         {isPostOwner ? ( <div style={this.styles.rightIconMenu as any}><RightIconMenu /></div>) : ''}
        </CardHeader>
        {image ? (
          <CardMedia>
            <Img fileName={image} />
          </CardMedia>) : ''}

        <CardText style={this.styles.postBody}>
          <Linkify properties={{target: '_blank', style: {color: 'blue'}}}>
            {reactStringReplace(body,/#(\w+)/g, (match: string, i: string) => (
            <NavLink
            style={{color: 'green'}}
            key={match + i}
            to={`/tag/${match}`}
            onClick ={evt => {
              evt.preventDefault()
              goTo!(`/tag/${match}`)
              setHomeTitle!(`#${match}`)
            }}
            >
            #{match}

            </NavLink>

          ))}
          </Linkify>
        </CardText>
        <CardActions>
          <div style={{ margin: '16px 8px', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              {/*<FloatingActionButton  style={{ margin: "0 8px" }} zDepth={1} backgroundColor={grey200} iconStyle={{ color: grey600, fill: grey600, height: "36px", width: "36px" }} zDepth={1} secondary={false}>*/}
             <div className='g__circle' onClick={this.handleVote}>
              <Checkbox
                                checkedIcon={<SvgFavorite style={{fill: '#4CAF50'}}/>}
                                uncheckedIcon={<SvgFavoriteBorder style={{fill: '#757575'}} />}
                                checked={this.props.currentUserVote}
                                style={{transform: 'translate(6px, 6px)'}}
                            />
                </div>
              <div style={this.styles.counter}> {this.props.voteCount! > 0 ? this.props.voteCount : ''} </div>
            </div>
            <div style={{ display: 'flex' }}>
              {!post.disableComments ? (<div style={{display: 'inherit'}}><FloatingActionButton onClick={this.handleOpenComments} style={{ margin: '0 8px' }} backgroundColor={grey200} iconStyle={{ color: grey600, fill: grey600, height: '36px', width: '36px' }} zDepth={1} secondary={false}>
                <SvgComment viewBox='0 -9 24 34' style={{ height: '30px', width: '30px' }} /> 3
            </FloatingActionButton>
              <div style={this.styles.counter}>{post.commentCounter! > 0 ? post.commentCounter : ''} </div></div>) : ''}
              {!post.disableSharing ? (<FloatingActionButton onClick={this.handleOpenShare} style={{ margin: '0 8px' }} backgroundColor={grey200} iconStyle={{ color: grey600, fill: grey600, height: '36px', width: '36px' }} zDepth={1} secondary={false}>
                <SvgShare viewBox='0 -9 24 34' style={{ height: '30px', width: '30px' }} />
              </FloatingActionButton>) : ''}
            </div>
          </div>
        </CardActions>

        <CommentGroup open={this.state.openComments} comments={commentList} ownerPostUserId={post.ownerUserId!} onToggleRequest={this.handleOpenComments} isPostOwner={this.props.isPostOwner!} disableComments={post.disableComments!} postId={post.id!} />

        {/* Copy link dialog*/}
        <Dialog
          title='Share On'
          modal={false}
          open={this.state.shareOpen}
          onRequestClose={this.handleCloseShare}
          overlayStyle={{ background: 'rgba(0,0,0,0.12)' }}
          contentStyle={this.styles.dialog}
          autoDetectWindowHeight={false}
          actionsContainerStyle={{ borderTop: '1px solid rgb(224, 224, 224)' }}
        >
          {!this.state.openCopyLink
            ? (<Paper >
              <Menu>
                <MenuItem primaryText='Copy Link' leftIcon={<SvgLink />} onClick={this.handleCopyLink} />
              </Menu>
            </Paper>)
            : <TextField fullWidth={true} id='text-field-default' defaultValue={`${location.origin}/${post.ownerUserId}/posts/${post.id}`} />
          }
        </Dialog>

        <PostWrite
        open={this.state.openPostWrite}
        onRequestClose={this.handleClosePostWrite}
        edit={true}
        postModel= {post}
        />

      </Card>

    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: any, ownProps: IPostComponentProps) => {
  const {post} = ownProps
  return {
    vote: () => dispatch(voteActions.dbAddVote(post.id!,post.ownerUserId!)),
    unvote: () => dispatch(voteActions.dbDeleteVote(post.id!, post.ownerUserId!)) ,
    delete: (id: string) => dispatch(postActions.dbDeletePost(id)),
    toggleDisableComments: (status: boolean) => {
      post.disableComments = status
      dispatch(postActions.dbUpdatePost(post, (x: any) => x))
    },
    toggleSharingComments: (status: boolean) => {
      post.disableSharing = status
      dispatch(postActions.dbUpdatePost({id: post.id!, disableSharing: status},(x: any) => x))
    },
    goTo: (url: string) => dispatch(push(url)),
    setHomeTitle: (title: string) => dispatch(globalActions.setHeaderTitle(title || '')),
    getPostComments: (ownerUserId: string, postId: string) => dispatch(commentActions.dbGetComments(ownerUserId,postId))

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: IPostComponentProps) => {
  const {post, vote, authorize, comment} = state
  const {uid} = authorize
  let currentUserVote = post.votes ? post.votes[uid] : false
  const postModel = post.userPosts[ownProps.post.ownerUserId!][ownProps.post.id!]
  const postOwner = (post.userPosts[uid] ? Object.keys(post.userPosts[uid]).filter((key) => { return ownProps.post.id === key }).length : 0)
  const commentList: { [commentId: string]: Comment } = comment.postComments[ownProps.post.id!]

  return {
    commentList,
    avatar: state.user.info && state.user.info[ownProps.post.ownerUserId!] ? state.user.info[ownProps.post.ownerUserId!].avatar || '' : '',
    fullName: state.user.info && state.user.info[ownProps.post.ownerUserId!] ? state.user.info[ownProps.post.ownerUserId!].fullName || '' : '',
    voteCount: postModel.score,
    currentUserVote,
    isPostOwner: postOwner > 0
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(PostComponent as any)
