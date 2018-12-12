// - Import react components
import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {push} from 'connected-react-router'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import EventListener, { withOptions } from 'react-event-listener'
import InfiniteScroll from 'react-infinite-scroll-component'
import debounce from 'lodash/debounce'
import { translate, Trans } from 'react-i18next'

// - Material-UI
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import { grey, teal } from '@material-ui/core/colors'
import SvgCamera from '@material-ui/icons/PhotoCamera'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import Paper from '@material-ui/core/Paper'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'

import { Map, List as ImuList } from 'immutable'
import NoAlbumIcon from '@material-ui/icons/SettingsSystemDaydream'

// - Import app components
import PostComponent from 'src/components/post'
import PostWriteComponent from 'src/components/postWrite'
import PictureDialogComponent from 'src/layouts/pictureDialog'
import UserAvatarComponent from 'src/components/userAvatar'
import LoadMoreProgressComponent from 'src/layouts/loadMoreProgress'

// - Import API
import * as PostAPI from 'src/api/PostAPI'

// - Import actions
import * as globalActions from 'src/store/actions/globalActions'

import { IAlbumStreamProps } from './IAlbumStreamProps'
import { IAlbumStreamState } from './IAlbumStreamState'
import { Post } from 'src/core/domain/posts'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'
import StringAPI from 'api/StringAPI'
import { ServerRequestType } from 'constants/serverRequestType'
import { albumStreamStyles } from './albumStreamStyles'
import { userSelector } from 'store/reducers/users/userSelector'
import { ArrayAPI } from 'api/ArrayAPI'
import { PostType } from 'core/domain/posts/postType'
import { User } from 'core/domain/users'

// - Create component class
export class AlbumStreamComponent extends Component<IAlbumStreamProps, IAlbumStreamState> {

  /**
   * Feilds
   */
  nextPage = 0

  /**
   * Component constructor
   *
   */
  constructor(props: IAlbumStreamProps) {
    super(props)

    this.state = {

      /**
       * The title of home header
       */
      homeTitle: props.homeTitle!,

      /**
       * If there is more post to show {true} or not {false}
       */
      hasMorePosts: true,

      /**
       * List of posts
       */
      posts: [],

      /**
       * Stream length
       */
      prevPosts: Map({}),

      /**
       * The images from album
       */
      pictureDialogImages: [],

      /**
       * Wether picture dialog is open
       */
      picutreDialogOpen: false

    }

    // Binding functions to `this`
    this.loader = this.loader.bind(this)
    this.albumList = this.albumList.bind(this)
    this.gridTile = this.gridTile.bind(this)
    this.closePictureDialog = this.closePictureDialog.bind(this)
    this.openPictureDialog = this.openPictureDialog.bind(this)
    this.hanleClickAlbum = this.hanleClickAlbum.bind(this)

  }

  /**
   * Loader
   */
  loader = () => {
    const { streamRequestStatus, loadStream } = this.props
    if (streamRequestStatus && streamRequestStatus !== ServerRequestStatusType.Sent) {

      const { loadStream } = this.props
      loadStream!(this.nextPage)
      this.nextPage++

    }
  }

  /**
   * Open picture dialog
   */
  openPictureDialog = (images: string[]) => {
    this.setState({
      pictureDialogImages: images,
      picutreDialogOpen: true
    })

  }

  /**
   * Handle click album
   */
  hanleClickAlbum = (postId: string) => {
    const {posts, userId, goTo} = this.props

    if (userId && goTo) {
      goTo(`/u/${userId}/album/${postId}`)
    }
  
  }

  /**
   * Close picture dialog
   */
  closePictureDialog = () => {
    this.setState({
      pictureDialogImages: [],
      picutreDialogOpen: false
    })
  }

  /**
   * Image list
   */
  albumList = () => {
    const { classes, posts } = this.props
    return posts!.map((post) => {
      const imgSrc = post!.get('image')
      return (
        <GridListTile key={`album-dialog-tile-${post!.get('id')}`} cols={1} classes={{tile: classNames({[classes.noAlbum]: StringAPI.isEmpty(imgSrc)})}}>
        { !StringAPI.isEmpty(imgSrc)
          ? <img src={imgSrc} onClick={() => this.hanleClickAlbum(post!.get('id'))} />
          : (
            <div>
              <NoAlbumIcon  className={classes.noAlbumIcon} />
            </div>
          )
        }
          <GridListTileBar
            title={post!.getIn(['album', 'title'], '')}
            subtitle={post!.getIn(['body'], '')}

            classes={{
              root: classes.titleBar,
              title: classes.title,
            }}
          />
        </GridListTile>)
    })  
  }

  /**
   * Render Grid tile
   */
  gridTile = () => {
    const { t, posts, classes } = this.props
    const albumList = this.albumList()
    return (
      <div className={classes.gridTileRoot}>
        <GridList cellHeight={202} cols={3} className={classes.gridList}>
          <GridListTile key='Subheader' cols={3} style={{ height: 'auto' }}>
          </GridListTile>
          {albumList.count() > 0 && albumList}
        </GridList>
      </div>
    )
  }

  componentDidMount() {
    this.loader()
  }

  /**
   * Reneder component DOM
   * 
   */
  render() {

    const { hasMoreAlbum, t, classes, streamRequestStatus, posts } = this.props
    const { picutreDialogOpen, pictureDialogImages } = this.state

    return (
      <div id='scrollableAlbum' style={{ height: 300, overflow: 'auto' }}>
        <InfiniteScroll
          dataLength={posts ? posts.count() : 0}
          next={this.loader}
          hasMore={hasMoreAlbum!}
          endMessage={
            ''
          }
          scrollableTarget='scrollableAlbum'
          loader={<LoadMoreProgressComponent key='stream-load-more-progress' />}
        >

          <div className={classes.container}>
            {this.gridTile()}
          </div>

        </InfiniteScroll>
        <PictureDialogComponent open={picutreDialogOpen} onClose={this.closePictureDialog} images={pictureDialogImages} />
      </div>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IAlbumStreamProps) => {
  return {
    showTopLoading: () => dispatch(globalActions.showTopLoading()),
    hideTopLoading: () => dispatch(globalActions.hideTopLoading()),
    goTo: (url: string) => dispatch(push(url))

  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IAlbumStreamProps) => {
  const uid = state.getIn(['authorize', 'uid'])
  const currentUser = userSelector.getUserProfileById(state, { userId: uid }).toJS() as User
  const streamRequestStatus = state.getIn(['server', 'request', ownProps.requestId])
  return {
    streamRequestStatus: streamRequestStatus ? streamRequestStatus.status : ServerRequestStatusType.NoAction,
    
    avatar: currentUser.avatar || '',
    fullName: currentUser.fullName || '',
    currentUser
  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(AlbumStreamComponent as any)

export default withRouter<any>(connect<any>(mapStateToProps, mapDispatchToProps)(withStyles(albumStreamStyles as any)(translateWrraper as any))) as typeof AlbumStreamComponent
