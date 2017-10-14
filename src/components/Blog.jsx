// - Import react components
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { grey400, grey800, darkBlack, lightBlack } from 'material-ui/styles/colors'
import SvgCamera from 'material-ui/svg-icons/image/photo-camera'
import Paper from 'material-ui/Paper'
import { List, ListItem } from 'material-ui/List'



// - Import app components
import Post from 'Post'
import PostWrite from 'PostWrite'
import UserAvatar from 'UserAvatar'

// - Import API
import * as AuthAPI from 'AuthAPI'
import * as PostAPI from 'PostAPI'

// - Import actions
import * as globalActions from 'globalActions'


// - Create Blog component class
export class Blog extends Component {

  static propTypes = {
    /**
     * If it's true , writing post block will be visible
     */
    displayWriting: PropTypes.bool.isRequired,
    /**
     * A list of post
     */
    posts: PropTypes.object,

  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props) {
    super(props)

    this.state = {
      /**
       * It's true if we want to have two column of posts
       */
      divided: false,
      /**
       * If it's true comment will be disabled on post
       */
      disableComments: this.props.disableComments,
      /**
       * If it's true share will be disabled on post
       */
      disableSharing: this.props.disableSharing,
      /**
       * If it's true, post write will be open
       */
      openPostWrite: false,
      /**
       * The title of home header
       */
      homeTitle: PropTypes.string
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
   * @memberof Blog
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
   * @memberof Blog
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

    let { posts,match } = this.props
    let {tag} = match.params
    if (posts === undefined || !Object.keys(posts).length > 0) {

      return (

        <h1>
          'Nothing has shared.'
                </h1>

      )
    }
    else {

      var postBack = { oddPostList: [], evenPostList: [] }
      var parsedPosts = []
      Object.keys(posts).forEach((postId) => {
        if(tag){
          let regex = new RegExp("#" + tag,'g')
          let postMatch = posts[postId].body.match(regex)
          if(postMatch !==null)
          parsedPosts.push({ ...posts[postId]})
        }else{
         parsedPosts.push({ ...posts[postId]})

        }
      })
      const sortedPosts =  PostAPI.sortObjectsDate(parsedPosts)
      if (sortedPosts.length > 6) {
        postBack.divided = true

      } else {
        postBack.divided = false
      }
      sortedPosts.forEach((post, index) => {

        var newPost = (
          <div key={post.id}>

            {index > 1 || (!postBack.divided && index > 0) ? <div style={{ height: "16px" }}></div> : ''}
            <Post
              body={post.body}
              commentCounter={post.commentCounter}
              creationDate={post.creationDate}
              id={post.id}
              image={post.image}
              lastEditDate={post.lastEditDate}
              ownerDisplayName={post.ownerDisplayName}
              ownerUserId={post.ownerUserId}
              ownerAvatar={post.ownerAvatar}
              postTypeId={post.postTypeId}
              score={post.score}
              tags={post.tags}
              video={post.video}
              disableComments={post.disableComments}
              disableSharing={post.disableSharing}
              viewCount={posts.viewCount}
              pictureState={true} />

          </div>
        )

        if ((index % 2) === 1 && postBack.divided) {
          postBack.oddPostList.push(newPost)
        }
        else {
          postBack.evenPostList.push(newPost)
        }
      })
      return postBack
    }

  }

  componentWillMount() {
    const {setHomeTitle} = this.props
    setHomeTitle()
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {

    let postList = this.postLoad()

    const {tag, displayWriting, } = this.props

    return (
      <div >


        <div className='grid grid__gutters grid__1of2 grid__space-around animate-top'>

          <div className='grid-cell animate-top'  style={{maxWidth: '530px', minWidth: '280px'}}>
            {displayWriting && !tag
            ? (<PostWrite open={this.state.openPostWrite} onRequestClose={this.handleClosePostWrite} edit={false} >
                  <Paper zDepth={2} style={{ height: "68px", width: "100%" }}>

                    <ListItem
                      primaryText={<span style={{ color: grey400, cursor: "text" }}> What's new with you? </span>}
                      leftAvatar={<UserAvatar fullName={this.props.fullName} fileName={this.props.avatar} size={36} />}
                      rightIcon={<SvgCamera />}
                      style={{ padding: "7px 0px", fontWeight: "200" }}
                      onTouchTap={this.handleOpenPostWrite}
                    />
                    
                  </Paper>
                  <div style={{ height: "16px" }}></div>
              </PostWrite>)
              : ''}

            {postList.evenPostList}
            <div style={{ height: "16px" }}></div>
          </div>
          {postList.divided
            ? (<div className='grid-cell animate-top' style={{maxWidth: '530px', minWidth: '280px'}}>
              <div className="blog__right-list">
                {postList.oddPostList}
                <div style={{ height: "16px" }}></div>
              </div>
            </div>)
            : ''}
        </div>


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
const mapStateToProps = (state, ownProps) => {
  return {
    avatar: state.user.info && state.user.info[state.authorize.uid] ? state.user.info[state.authorize.uid].avatar : '',
    fullName: state.user.info && state.user.info[state.authorize.uid] ? state.user.info[state.authorize.uid].fullName : ''
  }
}

// - Connect component to redux store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog))
