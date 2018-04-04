// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import moment from 'moment/moment'
import Linkify from 'react-linkify'
import copy from 'copy-to-clipboard'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import { Map } from 'immutable'

// - Material UI
import Card, { CardActions, CardHeader, CardMedia, CardContent } from 'material-ui/Card'
import {  LinearProgress } from 'material-ui/Progress'
import Typography from 'material-ui/Typography'
import SvgShare from 'material-ui-icons/Share'
import SvgComment from 'material-ui-icons/Comment'
import SvgFavorite from 'material-ui-icons/Favorite'
import SvgFavoriteBorder from 'material-ui-icons/FavoriteBorder'
import Checkbox from 'material-ui/Checkbox'
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import { grey } from 'material-ui/colors'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import { MenuList, MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import { ListItemIcon, ListItemText } from 'material-ui/List'
import { withStyles } from 'material-ui/styles'
import { Manager, Target, Popper } from 'react-popper'
import Grow from 'material-ui/transitions/Grow'
import ClickAwayListener from 'material-ui/utils/ClickAwayListener'
import classNames from 'classnames'

import reactStringReplace from 'react-string-replace'

// - Import app components
import CommentGroup from 'components/commentGroup'
import ShareDialog from 'components/shareDialog'
import PostWrite from 'components/postWrite'
import Img from 'components/img'
import IconButtonElement from 'layouts/IconButtonElement'
import UserAvatar from 'components/userAvatar'

// - Import actions
import * as voteActions from 'store/actions/voteActions'
import * as postActions from 'store/actions/postActions'
import * as commentActions from 'store/actions/commentActions'
import * as globalActions from 'store/actions/globalActions'
import { IPostComponentProps } from './IPostComponentProps'
import { IPostComponentState } from './IPostComponentState'

const styles = (theme: any) => ({
  iconButton: {
    width: 27,
    marginLeft: 5
  },
  vote: {
    display: 'flex',
    flex: 1
  },
  voteCounter: {
    color: 'rgb(134, 129, 129)',
    fontSize: 10,
    fontWeight: 400,
    padding: 2,
    zIndex: 1
  },
  commentCounter: {
    color: 'rgb(134, 129, 129)',
    fontSize: 10,
    fontWeight: 400,
    padding: 4
  },
  popperOpen: {
    zIndex: 10
  },
  popperClose: {
    pointerEvents: 'none',
    zIndex: 0
  },
  postBody: {
    wordWrap: 'break-word',
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '0.875rem',
    fontWeight: 400,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: '1.46429em'
  },
  image: {
    width: '100%',
    height: 500
  },
  fullPageXs: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
      margin: 0,
      overflowY: 'auto'
    }
  }
})

// - Create component class
export class PostComponent extends Component<IPostComponentProps, IPostComponentState> {

  styles = {
    dialog: {
      width: '',
      maxWidth: '530px',
      borderRadius: '4px'
    }

  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IPostComponentProps) {
    super(props)
    const { post } = props
    this.state = {
      /**
       * Post text
       */
      text: post.get('body', ''),
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
      disableComments: post.get('disableComments', false),
      /**
       * If it's true share will be disabled on post
       */
      disableSharing: post.get('disableSharing', false),
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
      openPostWrite: false,
      /**
       * Post menu anchor element
       */
      postMenuAnchorEl: null,
      /**
       * Whether post menu open
       */
      isPostMenuOpen: false
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
    const { getPostComments, commentList, post } = this.props
    const id = post.get('id')
    const ownerUserId = post.get('ownerUserId')
    if (!commentList) {
      getPostComments!(ownerUserId!, id!)
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
    const { post } = this.props
    this.props.delete!(post.get('id'))
  }

  /**
   * Open post menu
   */
  openPostMenu = (event: any) => {
    this.setState({
      postMenuAnchorEl: event.currentTarget,
      isPostMenuOpen: true
    })
  }

  /**
   * Close post menu
   */
  closePostMenu = (event: any) => {
    this.setState({
      postMenuAnchorEl: event.currentTarget,
      isPostMenuOpen: false
    })
  }

  /**
   * Show copy link
   *
   *
   * @memberof Post
   */
  handleCopyLink = () => {
    const {translate} = this.props
    this.setState({
      openCopyLink: true,
      shareTitle: translate!('post.copyLinkButton')
    })
  }

  /**
   * Open share post
   *
   *
   * @memberof Post
   */
  handleOpenShare = () => {
    const {post} = this.props
    copy(`${location.origin}/${post.get('ownerUserId')}/posts/${post.get('id')}`)
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
    const { post, setHomeTitle, goTo, fullName, isPostOwner, commentList, avatar, classes , translate} = this.props
    const { postMenuAnchorEl, isPostMenuOpen } = this.state
    const rightIconMenu = (
      <Manager>
        <Target>
          <IconButton
            aria-owns={isPostMenuOpen! ? 'post-menu' : ''}
            aria-haspopup='true'
            onClick={this.openPostMenu.bind(this)}
          >
            <MoreVertIcon />
          </IconButton>

        </Target>
        <Popper
          placement='bottom-start'
          eventsEnabled={isPostMenuOpen!}
          className={classNames({ [classes.popperClose]: !isPostMenuOpen }, { [classes.popperOpen]: isPostMenuOpen })}
        >
          <ClickAwayListener onClickAway={this.closePostMenu}>
            <Grow in={isPostMenuOpen} >
              <Paper>
                <MenuList role='menu'>
                  <MenuItem onClick={this.handleOpenPostWrite} > {translate!('post.edit')} </MenuItem>
                  <MenuItem onClick={this.handleDelete} > {translate!('post.delete')} </MenuItem>
                  <MenuItem
                    onClick={() => this.props.toggleDisableComments!(!post.get('disableComments'))} >
                    {post.get('disableComments') ? translate!('post.enableComments') : translate!('post.disableComments')}
                  </MenuItem>
                  <MenuItem
                    onClick={() => this.props.toggleSharingComments!(!post.get('disableSharing'))} >
                    {post.get('disableSharing') ? translate!('post.enableSharing') : translate!('post.disableSharing')}
                  </MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          </ClickAwayListener>
        </Popper>
      </Manager>
    )

    const { 
      ownerUserId, 
      ownerDisplayName, 
      creationDate, 
      image, 
      body, 
      id, 
      disableComments, 
      commentCounter, 
      disableSharing ,
    } = post.toJS()
    // Define variables
    return (
      <Card key={`post-component-${id}`}>
        <CardHeader
          title={<NavLink to={`/${ownerUserId}`}>{ownerDisplayName}</NavLink>}
          subheader={creationDate ? moment.unix(creationDate!).fromNow() + ' | ' + translate!('post.public') : <LinearProgress color='primary' />}
          avatar={<NavLink to={`/${ownerUserId}`}><UserAvatar fullName={fullName!} fileName={avatar!} size={36} /></NavLink>}
          action={isPostOwner ? rightIconMenu : ''}
        >
        </CardHeader>
        {image ? (
          <CardMedia image={image}>
            <Img fileName={image} />
          </CardMedia>) : ''}

        <CardContent className={classes.postBody}>
          <Linkify properties={{ target: '_blank', style: { color: 'blue' } }}>
            {reactStringReplace(body, /#(\w+)/g, (match: string, i: string) => (
              <NavLink
                style={{ color: 'green' }}
                key={match + i}
                to={`/tag/${match}`}
                onClick={evt => {
                  evt.preventDefault()
                  goTo!(`/tag/${match}`)
                  setHomeTitle!(`#${match}`)
                }}
              >
                #{match}

              </NavLink>

            ))}
          </Linkify>
        </CardContent>
        <CardActions>
          <div className={classes.vote}>
            <IconButton
              className={classes.iconButton}
              onClick={this.handleVote}
              aria-label='Love'>
              <Checkbox
                className={classes.iconButton}
                checkedIcon={<SvgFavorite style={{ fill: '#4CAF50' }} />}
                icon={<SvgFavoriteBorder style={{ fill: '#757575' }} />}
                checked={this.props.currentUserVote}
              />
              <div className={classes.voteCounter}> {this.props.voteCount! > 0 ? this.props.voteCount : ''} </div>
            </IconButton>
          </div>
          {!disableComments ?
            (<div style={{ display: 'inherit' }}><IconButton
              className={classes.iconButton}
              onClick={this.handleOpenComments}
              aria-label='Comment'>
              <SvgComment />
              <div className={classes.commentCounter}>{commentCounter! > 0 ? commentCounter : ''} </div>
            </IconButton>
            </div>) : ''}
          {!disableSharing ? (<IconButton
            className={classes.iconButton}
            onClick={this.handleOpenShare}
            aria-label='Comment'>
            <SvgShare />
          </IconButton>) : ''}

        </CardActions>

        <CommentGroup open={this.state.openComments} comments={commentList} ownerPostUserId={ownerUserId!} onToggleRequest={this.handleOpenComments} isPostOwner={this.props.isPostOwner!} disableComments={disableComments!} postId={id} />

        <ShareDialog 
        onClose={this.handleCloseShare} 
        shareOpen={this.state.shareOpen} 
        onCopyLink={this.handleCopyLink} 
        openCopyLink={this.state.openCopyLink}
        post={post} 

        />
       
        <PostWrite
          open={this.state.openPostWrite}
          onRequestClose={this.handleClosePostWrite}
          edit={true}
          postModel={post}
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
  const { post } = ownProps
  return {
    vote: () => dispatch(voteActions.dbAddVote(post.get('id'), post.get('ownerUserId'))),
    unvote: () => dispatch(voteActions.dbDeleteVote(post.get('id'), post.get('ownerUserId'))),
    delete: (id: string) => dispatch(postActions.dbDeletePost(id)),
    toggleDisableComments: (status: boolean) => {
      dispatch(postActions.dbUpdatePost(post.set('disableComments', status), (x: any) => x))
    },
    toggleSharingComments: (status: boolean) => {
      dispatch(postActions.dbUpdatePost(post.set('disableSharing', status), (x: any) => x))
    },
    goTo: (url: string) => dispatch(push(url)),
    setHomeTitle: (title: string) => dispatch(globalActions.setHeaderTitle(title || '')),
    getPostComments: (ownerUserId: string, postId: string) => dispatch(commentActions.dbFetchComments(ownerUserId, postId))

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IPostComponentProps) => {

  const uid = state.getIn(['authorize', 'uid'])
  let currentUserVote = ownProps.post.getIn(['votes', uid], false)
  const voteCount = state.getIn(['post', 'userPosts', ownProps.post.get('ownerUserId'), ownProps.post.get('id'), 'score'], 0)
  const commentList: { [commentId: string]: Comment } = state.getIn(['comment', 'postComments', ownProps.post.get('id')])
  const user = state.getIn(['user', 'info', ownProps.post.get('ownerUserId')])
  return {
    translate: getTranslate(state.get('locale')),
    commentList,
    avatar: user ? user.avatar : '',
    fullName: user ? user.fullName : '',
    voteCount,
    currentUserVote,
    isPostOwner: uid === ownProps.post.get('ownerUserId')
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(PostComponent as any) as any)
