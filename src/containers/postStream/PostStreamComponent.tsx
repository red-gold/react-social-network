// - Import react components
import { grey } from '@material-ui/core/colors';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import SvgCamera from '@material-ui/icons/PhotoCamera';
import { ArrayAPI } from 'api/ArrayAPI';
import StringAPI from 'api/StringAPI';
import classNames from 'classnames';
import { PostType } from 'core/domain/posts/postType';
import { Map } from 'immutable';
import debounce from 'lodash/debounce';
import React, { Component, Fragment } from 'react';
import EventListener from 'react-event-listener';
import { withTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { withRouter } from 'react-router-dom';
import PostComponent from 'src/components/post';
import PostWriteComponent from 'src/components/postWrite';
import UserAvatarComponent from 'src/components/userAvatar';
import LoadMoreProgressComponent from 'src/layouts/loadMoreProgress';
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType';

import { connectPostStream } from './connectPostStream';
import { IPostStreamProps } from './IPostStreamProps';
import { IPostStreamState } from './IPostStreamState';
import { postStreamStyles } from './postStreamStyles';

// - Material-UI
// import InfiniteScroll from 'react-infinite-scroller'

// - Import app components
// - Import API
// - Import actions
/**
 * Handle window width changed
 */
let handleWidth = (value: number, posts: Map<string, any>) => {
  if (value > 1400) {
    return creatColumn(3, posts)
  } else if (value < 867) {
    return creatColumn(1, posts)
  } else if (value < 1400) {
    return creatColumn(2, posts)
  }
  return []
}

/**
 * Create four column of items
 */
const creatColumn = (numberOfCoulmn: number, posts: Map<string, any>) => {
  let postList: any[] = []
  let currentIndex = 0
  let scoreArray = ArrayAPI.getZeroArray(numberOfCoulmn)
  posts.forEach((item: Map<string, any>, key) => {
    if (!postList[currentIndex]) {
      postList[currentIndex] = []
    }
    postList[currentIndex].push(item)
    ++scoreArray[currentIndex]
    const postType: PostType = item.get('postTypeId')
    if (postType !== PostType.Text) {
      ++scoreArray[currentIndex]
    }
    const body: string = item.get('body')
    scoreArray[currentIndex] += Number(StringAPI.getNumberOfLines(body) / 10)
    currentIndex = ArrayAPI.getMinIndex(scoreArray)
  })
  return postList
}

// - Create StreamComponent component class
export class PostStreamComponent extends Component<IPostStreamProps, IPostStreamState> {

  /**
   * Feilds
   */
  nextPage = 0

  styles = {
    postWritePrimaryText: {
      color: grey[400],
      cursor: 'text'
    },
    postWtireItem: {
      fontWeight: '200'
    }
  }

  static getDerivedStateFromProps(nextProps: IPostStreamProps, prevState: IPostStreamState) {
    if (nextProps.posts && nextProps.posts.count() > 0 && !nextProps.posts.equals(prevState.prevPosts)) {
      const posts = handleWidth(window.innerWidth, nextProps.posts)
      return ({
        posts,
        prevPosts: nextProps.posts.count()
      })
    }
    return null
  }

  /**
   * Component constructor
   *
   */
  constructor(props: IPostStreamProps) {
    super(props)

    this.state = {
      /**
       * It's true if we want to have two column of posts
       */
      divided: false,
      /**
       * If it's true comment will be disabled on post
       */
      disableComments: this.props.disableComments!,
      /**
       * If it's true share will be disabled on post
       */
      disableSharing: this.props.disableSharing!,
      /**
       * If it's true, post write will be open
       */
      openPostWrite: false,
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
      prevPosts: Map({})
    }

    // Binding functions to `this`
    this.handleResize = debounce(this.handleResize, 300)
    this.handleResize = this.handleResize.bind(this)
    this.loader = this.loader.bind(this)
    this.handleOpenPostWrite = this.handleOpenPostWrite.bind(this)
    this.handleClosePostWrite = this.handleClosePostWrite.bind(this)

  }

  /**
   * Loader
   */
  loader = () => {
    const { streamRequestStatus } = this.props
    if (streamRequestStatus && streamRequestStatus !== ServerRequestStatusType.Sent) {

      const { loadStream } = this.props
      loadStream!(this.nextPage)
      this.nextPage++

    }
  }

  /**
   * Handle resize
   */
  handleResize = (event: any) => {

    const { posts } = this.props
    const mappedPosts = handleWidth(event.target.innerWidth, posts)
    this.setState({
      posts: mappedPosts
    })
  }

  /**
   * Open post write
   */
  handleOpenPostWrite = () => {
   const {openPostWrite} = this.props
   if (openPostWrite) {
     openPostWrite()
   }
  }

  /**
   * Close post write
   */
  handleClosePostWrite = () => {
   const {closePostWrite} = this.props
   if (closePostWrite) {
     closePostWrite()
   }
  }

  /**
   * Write post box element
   */
  writePostElement = () => {
    const { tag, displayWriting, classes, t, postWriteDilogOpen } = this.props
    return (
      <div className={classNames('grid-cell animate-top', classes.gridCell)} style={{ maxWidth: '530px', minWidth: '280px' }}>
      {postWriteDilogOpen && <PostWriteComponent open={postWriteDilogOpen} onRequestClose={this.handleClosePostWrite} edit={false} />}
        {displayWriting && !tag
          ? (<>
            <Paper elevation={2}>

              <ListItem button
                style={this.styles.postWtireItem as any}
                onClick={this.handleOpenPostWrite}
              >
                <UserAvatarComponent fullName={this.props.fullName!} fileName={this.props.avatar!} size={36} />
                <ListItemText inset primary={<span style={this.styles.postWritePrimaryText as any}> {t!('home.postWriteButtonText')}</span>} />
                <ListItemIcon>
                  <SvgCamera />
                </ListItemIcon>
              </ListItem>

            </Paper>
            <div style={{ height: '16px' }}></div></>)
          : ''}

      </div>
    )
  }

  /**
   * Get list of post
   */
  getpostList = () => {
    const { classes } = this.props
    const { posts } = this.state
    const postListDom: any[] = [];
    (posts || []).forEach((items: any[], index) => {
      const column = (
        <div className={classes.postBox} key={`post-stream-column-${index}`} >
          {index === 0 ? this.writePostElement() : ''}
          {items.map((post, indexpost) => <Fragment key={`post-container-${post.get('id')}`}>
            {indexpost > 0 ? <div className={classes.spaceBox}> </div> : ''}
            <PostComponent key={`${post!.get('id')}-stream-div-post`} post={post! as any} /> </Fragment>)}
        </div>
      )
      postListDom.push(column)

    })

    return postListDom
  }

  componentDidMount() {
    this.loader()
  }

  /**
   * Reneder component DOM
   * 
   */
  render() {

    const { hasMorePosts, classes, posts } = this.props

    return (
      <InfiniteScroll
        dataLength={posts ? posts.count() : 0}
        next={this.loader}
        hasMore={hasMorePosts!}
        endMessage={
         ''
          }
        loader={<LoadMoreProgressComponent key='stream-load-more-progress' />}
      >

        <EventListener
          target='window'
          onResize={this.handleResize}
        />
        {
          posts && !(posts.count() > 0)
          ? this.writePostElement()
          : ''
        }
        <div className={classes.container}>
        {posts && (posts.count() > 0) && this.getpostList()}
        </div>

      </InfiniteScroll>
    )
  }
}

// - Connect component to redux store
const translateWrraper = withTranslation('translations')(PostStreamComponent as any)

export default withRouter<any>(connectPostStream(withStyles(postStreamStyles as any)(translateWrraper as any) as any))