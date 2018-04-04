// - Import react components
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import { grey, teal } from 'material-ui/colors'
import SvgCamera from 'material-ui-icons/PhotoCamera'
import Paper from 'material-ui/Paper'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import InfiniteScroll from 'react-infinite-scroller'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import { Map, List as ImuList } from 'immutable'

// - Import app components
import PostComponent from 'src/components/post'
import PostWriteComponent from 'src/components/postWrite'
import UserAvatarComponent from 'src/components/userAvatar'
import LoadMoreProgressComponent from 'src/layouts/loadMoreProgress'

// - Import API
import * as PostAPI from 'src/api/PostAPI'

// - Import actions
import * as globalActions from 'src/store/actions/globalActions'

import { IStreamComponentProps } from './IStreamComponentProps'
import { IStreamComponentState } from './IStreamComponentState'
import { Post } from 'src/core/domain/posts'

// - Create StreamComponent component class
export class StreamComponent extends Component<IStreamComponentProps, IStreamComponentState> {

  static propTypes = {
    /**
     * If it's true , writing post block will be visible
     */
    displayWriting: PropTypes.bool.isRequired,
    /**
     * A list of post
     */
    posts: PropTypes.object,

    /**
     * The title of home header
     */
    homeTitle: PropTypes.string

  }

  styles = {
    postWritePrimaryText: {
      color: grey[400],
      cursor: 'text'
    },
    postWtireItem: {
      fontWeight: '200'
    }
  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props: IStreamComponentProps) {
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
      hasMorePosts: true
    }

    // Binding functions to `this`
    this.postLoad = this.postLoad.bind(this)
    this.handleOpenPostWrite = this.handleOpenPostWrite.bind(this)
    this.handleClosePostWrite = this.handleClosePostWrite.bind(this)

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
   * Create a list of posts
   * @return {DOM} posts
   */
  postLoad = () => {

    let { match } = this.props
    let posts: Map<string, Map<string, any>> = this.props.posts
    let { tag } = match.params
    if (posts === undefined || !(posts.keySeq().count() > 0)) {
      
      return (
        
        <h1>
          'Nothing has shared.'
                </h1>

)
} else {
  
  let postBack = { divided: false, oddPostList: [], evenPostList: [] }
  let parsedPosts: ImuList<any> = ImuList()
  posts.forEach((post: Map<string, any>) => {
        if (tag) {
          let regex = new RegExp('#' + tag, 'g')
          let postMatch = String(post.get('body', '')).match(regex)
          if (postMatch !== null) {
            parsedPosts =  parsedPosts.push(post)
          }
        } else {
          parsedPosts = parsedPosts.push(post)
        }
      })
      const sortedPosts = PostAPI.sortImuObjectsDate(parsedPosts)
      if (sortedPosts.count() > 6) {
        postBack.divided = true
        
      } else {
        postBack.divided = false
      }
      let index = 0
      sortedPosts.forEach((post) => {
        
        let newPost: any = (
          <div key={`${post!.get('id')!}-stream-div`}>
          
            {index > 1 || (!postBack.divided && index > 0) ? <div style={{ height: '16px' }}></div> : ''}
            <PostComponent key={`${post!.get('id')}-stream-div-post`} post={post! as any} />

          </div>
        )
        
        if ((index % 2) === 1 && postBack.divided) {
          postBack.oddPostList.push(newPost as never)
        } else {
          postBack.evenPostList.push(newPost as never)
        }
        ++index
      })
      return postBack
    }

  }

  /**
   * Scroll loader
   */
  scrollLoad = (page: number) => {
    const { loadStream } = this.props
    loadStream!(page, 10)
  }

  componentWillMount() {
    const { setHomeTitle } = this.props
    setHomeTitle!()
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {

    const { tag, displayWriting, hasMorePosts, translate } = this.props
    const postList = this.postLoad() as { evenPostList: Post[], oddPostList: Post[], divided: boolean } | any

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.scrollLoad}
        hasMore={hasMorePosts}
        useWindow={true}
        loader={<LoadMoreProgressComponent key='stream-load-more-progress' />}
      >
        <div className='grid grid__gutters grid__1of2 grid__space-around animate-top'>
          <div className='grid-cell animate-top' style={{ maxWidth: '530px', minWidth: '280px' }}>
            {displayWriting && !tag
              ? (<PostWriteComponent open={this.state.openPostWrite} onRequestClose={this.handleClosePostWrite} edit={false} >
                <Paper elevation={2}>

                  <ListItem button
                    style={this.styles.postWtireItem as any}
                    onClick={this.handleOpenPostWrite}
                  >
                    <UserAvatarComponent fullName={this.props.fullName!} fileName={this.props.avatar!} size={36} />
                    <ListItemText inset primary={<span style={this.styles.postWritePrimaryText as any}> {translate!('home.postWriteButtonText')}</span>} />
                    <ListItemIcon>
                      <SvgCamera />
                    </ListItemIcon>
                  </ListItem>

                </Paper>
                <div style={{ height: '16px' }}></div>
              </PostWriteComponent>)
              : ''}

            {postList.evenPostList}
            <div style={{ height: '16px' }}></div>
          </div>
          {postList.divided
            ? (<div className='grid-cell animate-top' style={{ maxWidth: '530px', minWidth: '280px' }}>
              <div className='blog__right-list'>
                {postList.oddPostList}
                <div style={{ height: '16px' }}></div>
              </div>
            </div>)
            : ''}

        </div>

      </InfiniteScroll>
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: any, ownProps: IStreamComponentProps) => {
  return {
    setHomeTitle: () => dispatch(globalActions.setHeaderTitle(ownProps.homeTitle || '')),
    showTopLoading: () => dispatch(globalActions.showTopLoading()),
    hideTopLoading: () => dispatch(globalActions.hideTopLoading())

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IStreamComponentProps) => {
const uid = state.getIn(['authorize', 'uid'])
const user = state.getIn(['user', 'info', uid])
  return {
    translate: getTranslate(state.get('locale')),
    avatar: user.avatar || '',
    fullName: user.fullName || ''
  }
}

// - Connect component to redux store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StreamComponent as any) as any) as typeof StreamComponent
