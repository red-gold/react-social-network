// - Import react components
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import { ListItem } from 'material-ui/List'
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors'

// - Import actions
import * as commentActions from 'commentActions'

// - Import app components
import CommentList from 'CommentList'
import CommentWrite from 'CommentWrite'
import UserAvatar from 'UserAvatar'


/**
 * Create component class
 */
export class CommentGroup extends Component {


static propTypes = {
  /**
   * If it's true comment box will be open
   */
  open: PropTypes.bool,
  /**
   * If it's true the comment is disable to write
   */
  disableComments: PropTypes.bool,
  /**
   * The post identifier which comment belong to
   */
  postId: PropTypes.string,
  /**
   * If it's true the post owner is the logged in user which this post be long to the comment
   */
  isPostOwner: PropTypes.bool,
  /**
   * Toggle on show/hide comment by passing callback from parent component
   */
  onToggleRequest: PropTypes.func,
  /**
   * The user identifier of the post owner which comment belong to 
   */
  ownerPostUserId:PropTypes.string

}

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props) {
    super(props)

    /**
     * Defaul state
     */
    this.state = {
      commentText: "",
      postDisable: true

    }

    // Binding functions to `this`
    this.commentList = this.commentList.bind(this)
    this.handlePostComment = this.handlePostComment.bind(this)
    this.clearCommentWrite = this.clearCommentWrite.bind(this)


  }

  /**
   * Clear comment text field
   */
  clearCommentWrite = () => {
    this.setState({
      commentText: '',
      postDisable: false
    })
  }

  /**
   * Post comment
   */
  handlePostComment = () => {
    this.props.send(this.state.commentText, this.props.postId, this.clearCommentWrite)
  }

  /**
   * When comment text changed
   * @param  {event} evt is an event passed by change comment text callback funciton
   * @param  {string} data is the comment text which user writes
   */
  handleOnChange = (evt, data) => {
    this.setState({ commentText: data })
    if (data.length === 0 || data.trim() === '') {
      this.setState({
        commentText: '',
        postDisable: true
      })
    }
    else {
      this.setState({
        commentText: data,
        postDisable: false
      })
    }

  }

  /**
   * Get comments' DOM
   * @return {DOM} list of comments' DOM
   */
  commentList = () => {
    var comments = this.props.comments
    if (comments) {


      var parsedComments = [];
      Object.keys(comments).slice(0, 3).forEach((commentId) => {
        parsedComments.push({
          id: commentId,
          ...comments[commentId]
        });
      });
      if (parsedComments.length === 2) {
        parsedComments.push(parsedComments[0])
      }
      else if (parsedComments.length === 1) {
        parsedComments.push(parsedComments[0])
        parsedComments.push(parsedComments[0])
      }
      return parsedComments.map((comment, index) => {
        const {userInfo} = this.props

        const commentAvatar = userInfo && userInfo[comment.userId] ? userInfo[comment.userId].avatar || '' : ''
        const commentFullName = userInfo && userInfo[comment.userId] ? userInfo[comment.userId].fullName || '' : ''
        
        return (<ListItem key={index} style={{ height: "60px", position: "", zIndex: "" }} innerDivStyle={{ padding: "6px 16px 16px 72px" }}
          leftAvatar={<UserAvatar fullName={commentFullName} fileName={commentAvatar} style={{ top: "8px" }} size={36} />}
          secondaryText={<div style={{ height: "" }}>
            <span style={{
              fontSize: "13px",
              paddingRight: "10px",
              fontWeight: 400,
              color: "rgba(0,0,0,0.87)",
              textOverflow: "ellipsis",
              overflow: "hidden"
            }}>
              {comment.userDisplayName}:
            </span>
            <span style={{
              fontSize: "13px",
              lineHeight: "20px",
              color: "rgba(0,0,0,0.87)",
              fontWeight: 300,
              whiteSpace: "pre-wrap"
            }}>{comment.text}</span>

          </div>}
          secondaryTextLines={2}
        />

        )

      })

    }
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {


    return (
      <div>
        <div style={this.props.comments && Object.keys(this.props.comments).length > 0 ? { display: "block" } : { display: "none" }}>
          <Divider />
          <Paper zDepth={0} className="animate-top" style={!this.props.open ? { display: "block" } : { display: "none" }}>

            <div style={{ position: "relative", height: "60px" }} >
              <FlatButton label=" " style={{ height: "60px", zIndex: 5 }} fullWidth={true} onClick={this.props.onToggleRequest} />

              <div className="comment__list-show">
                {this.commentList()}

              </div>
            </div>
          </Paper>
          {(this.props.comments && Object.keys(this.props.comments).length > 0)
            ? (<Paper zDepth={0} style={this.props.open ? { display: "block", padding: "0px 0px" } : { display: "none", padding: "12px 16px" }}>
              <CommentList comments={this.props.comments} isPostOwner={this.props.isPostOwner} disableComments={this.props.disableComments}/>

            </Paper>) : ''}

        </div>
        {!this.props.disableComments ? (<div>
        <Divider />
        <Paper zDepth={0} className="animate2-top10" style={{ position: "relative", overflowY: "auto", padding: "12px 16px", display: (this.props.open ? "block" : "none") }}>

          <div style={{ display: "flex" }}>
            <UserAvatar fullName={this.props.fullName} fileName={this.props.avatar} style={{ flex: "none", margin: "4px 0px" }} size={36} />
            <div style={{ outline: "none", marginLeft: "16px", flex: "auto", flexGrow: 1 }}>
              <TextField
                value={this.state.commentText}
                onChange={this.handleOnChange}
                hintText="Add a comment..."
                underlineShow={false}
                multiLine={true}
                rows={1}
                hintStyle={{ fontWeight: 100, fontSize: "14px" }}
                rowsMax={4}
                textareaStyle={{ fontWeight: 100, fontSize: "14px" }}
                style={{ width: '100%' }}
              />
            </div>
          </div>
          <FlatButton primary={true} disabled={this.state.postDisable} label="Post" style={{ float: "right", clear: "both", zIndex: 5, margin: "0px 5px 5px 0px", fontWeight: 400 }} onClick={this.handlePostComment} />
        </Paper>
        </div>): ''}
      </div>
    );
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
    send: (text, postId, callBack) => {
      dispatch(commentActions.dbAddComment({
        postId: postId,
        text: text,
        ownerPostUserId:ownProps.ownerPostUserId
      }, callBack))
    }
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
    comments: state.comment.postComments[ownProps.postId],
    avatar: state.user.info && state.user.info[state.authorize.uid] ? state.user.info[state.authorize.uid].avatar || '' : '',
    fullName: state.user.info && state.user.info[state.authorize.uid] ? state.user.info[state.authorize.uid].fullName || '' : '',
    userInfo: state.user.info 

  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(CommentGroup)
