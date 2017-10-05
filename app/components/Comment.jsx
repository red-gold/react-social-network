// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'
import { createAction as action } from 'redux-actions'
import moment from 'moment'
import Linkify from 'react-linkify'


// - Import material UI libraries
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'

// - Import app components
import UserAvatar from 'UserAvatar'


// - Import API

// - Import action types
import * as types from 'actionTypes'


// - Import actions
import * as commentActions from 'commentActions'
import * as userActions from 'userActions'



/**
 * Create component class
 */
export class Comment extends Component {



  static propTypes = {
    /**
     * Comment object
     */
    comment: PropTypes.object,
    /**
     * If it's true the post owner is the logged in user which this post be long to the comment
     */
    isPostOwner: PropTypes.bool,
    /**
     * If it's true the comment is disable to write
     */
    disableComments: PropTypes.bool,
  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props) {
    super(props)

    this.textareaRef = i => { this.inputText = i }
    this.divCommentRef = i => { this.divComment = i }

    //Defaul state
    this.state = {
      /**
       * Comment text
       */
      text: this.props.comment.text,
      /**
       * Comment text to match edit with new comment that is edited
       */
      initialText: this.props.comment.text,
      /**
       * If comment text dosn't take any change it will be true
       */
      editDisabled: true,
      /**
       * If it's true the post owner is the logged in user which this post be long to the comment
       */
      isPostOwner: PropTypes.bool

    }

    // Binding functions to `this`
    this.handleDelete = this.handleDelete.bind(this)
    this.handleUpdateComment = this.handleUpdateComment.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleCancelEdit = this.handleCancelEdit.bind(this)
    this.handleEditComment = this.handleEditComment.bind(this)

  }


  /**
   * Handle show edit comment
   * @param  {event} evt is an event passed by clicking on edit button
   */
  handleEditComment = (evt) => {
    this.inputText.style.height = this.divComment.clientHeight + 'px'
    this.props.openEditor()
  }


  /**
   * Handle cancel edit
   * @param  {event} evt is an event passed by clicking on cancel button
   */
  handleCancelEdit = (evt) => {

    this.setState({
      text: this.state.initialText
    })
    this.props.closeEditor()
  }

  /**
   * Handle edit comment
   * @param  {event} evt is an event passed by clicking on post button
   */
  handleUpdateComment = (evt) => {

    this.props.update(this.props.comment.id, this.props.comment.postId, this.state.text)
    this.setState({
      initialText: this.state.text
    })

  }

  

  /**
   * When comment text changed
   * @param  {event} evt is an event passed by change comment text callback funciton
   * @param  {string} data is the comment text which user writes
   */
  handleOnChange = (evt) => {
    const data = evt.target.value
    this.inputText.style.height = evt.target.scrollHeight + 'px'
    if (data.length === 0 || data.trim() === '' || data.trim() === this.state.initialText) {
      this.setState({
        text: data,
        editDisabled: true
      })
    }
    else {
      this.setState({
        text: data,
        editDisabled: false
      })
    }

  }


  /**
   * Delete a comment
   * @param  {event} evt    an event passed by click on delete comment
   * @param  {string} id     comment identifire
   * @param  {string} postId post identifier which comment belong to
   */
  handleDelete = (evt, id, postId) => {
    this.props.delete(id, postId)
  }

  componentWillMount() {
    const {userId} = this.props.comment
    if (!this.props.isCommentOwner && !this.props.info[userId]) {
      this.props.getUserInfo()
    }
  }


  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {

  /**
   * DOM styles
   * 
   * 
   * @memberof Comment
   */
  const styles = {
    comment: {
      marginBottom: '12px'
    },
    iconButton: {
      width: 16,
      height: 16

    },
    author:{
          fontSize: "13px",
          paddingRight: "10px",
          fontWeight: 400,
          color: "rgba(0,0,0,0.87)",
          textOverflow: "ellipsis",
          overflow: "hidden"
        
    },
    commentBody:{
        fontSize: "13px",
        lineHeight: "20px",
        color: "rgba(0,0,0,0.87)",
        fontWeight: 300,
        height: "",
        display: "block"
      
    }
  }

    /**
     * Comment object from props
     */
    const {comment} = this.props
  
    const iconButtonElement = (
      <IconButton style={styles.iconButton} iconStyle={styles.iconButton}
        touch={true}
      >
        <MoreVertIcon color={grey400} viewBox='9 0 24 24' />
      </IconButton>
    )


    const RightIconMenu = () => (
      <IconMenu iconButtonElement={iconButtonElement} style={{ display: "block", position: "absolute", top: "0px", right: "4px" }}>
        <MenuItem style={{ fontSize: "14px" }}>Reply</MenuItem>
        {this.props.isCommentOwner ? (<MenuItem style={{ fontSize: "14px" }} onClick={this.handleEditComment}>Edit</MenuItem>): ''}
       {(this.props.isCommentOwner || this.props.isPostOwner) ? ( <MenuItem style={{ fontSize: "14px" }} onClick={(evt) => this.handleDelete(evt, comment.id, comment.postId)}>Delete</MenuItem>): ''}
      </IconMenu>
    )

    const Author = () => (
      <div style={{ marginTop: "-11px" }}>
        <span style={styles.author}>{comment.userDisplayName}</span><span style={{
          fontWeight: 100,
          fontSize: "10px"
        }}>{moment.unix(comment.creationDate).fromNow()}</span>
      </div>
    )
    const commentBody = (
      <p style={styles.commentBody}>{comment.text}</p>
    )

    const {userId} = comment

    return (
      <div className="animate-top" style={styles.comment} key={comment.id}>
        <Paper zDepth={0} className="animate2-top10" style={{ position: "relative", padding: "", display: (!this.state.display ? "block" : "none") }}>
          <div style={{ marginLeft: "0px", padding: "16px 56px 0px 72px", position: "relative" }}>
            <NavLink to={`/${userId}`}><UserAvatar fullName={this.props.fullName} fileName={this.props.avatar} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", position: "absolute", top: "8px", left: "16px" }} size={36} /></NavLink>
           <NavLink to={`/${userId}`}> <Author /></NavLink>
            {(!this.props.isCommentOwner && !this.props.isPostOwner && this.props.disableComments )? '' : (<RightIconMenu />)}
            <div style={{ outline: "none", marginLeft: "16px", flex: "auto", flexGrow: 1 }}>
              <textarea ref={this.textareaRef} className="animate2-top10" style={{ fontWeight: 100, fontSize: "14px", border: "none", width: "100%", outline: "none", resize: "none", display: (this.props.comment.editorStatus ? 'block' : 'none') }} onChange={this.handleOnChange} value={this.state.text}></textarea>
              <Linkify properties={{target: '_blank', style: {color: 'blue'}}}>
              <div ref={this.divCommentRef} className="animate2-top10" style={{ fontWeight: 100, fontSize: "14px", height: "100%", border: "none", width: "100%", outline: "none", resize: "none", display: (!this.props.comment.editorStatus ? 'block' : 'none') }}>{this.state.text}</div>
              </Linkify>
            </div>
          </div>
          <div style={{ display: (this.props.comment.editorStatus ? "flex" : "none"), flexDirection: "row-reverse" }}>
            <FlatButton primary={true} disabled={this.state.editDisabled} label="Update" style={{ float: "right", clear: "both", zIndex: 5, margin: "0px 5px 5px 0px", fontWeight: 400 }} onClick={this.handleUpdateComment} />
            <FlatButton primary={true} label="Cancel" style={{ float: "right", clear: "both", zIndex: 5, margin: "0px 5px 5px 0px", fontWeight: 400 }} onClick={this.handleCancelEdit} />
          </div>
        </Paper>

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
    delete: (id, postId) => dispatch(commentActions.dbDeleteComment(id, postId)),
    update: (id, postId, comment) => dispatch(commentActions.dbUpdateComment(id, postId, comment)),
    openEditor: () => dispatch(commentActions.openCommentEditor({ id: ownProps.comment.id, postId: ownProps.comment.postId })),
    closeEditor: () => dispatch(commentActions.closeCommentEditor({ id: ownProps.comment.id, postId: ownProps.comment.postId })),
    getUserInfo: () => dispatch(userActions.dbGetUserInfoByUserId(ownProps.comment.userId))
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state, ownProps) => {
  const {uid} = state.authorize
  const avatar = state.user.info && state.user.info[ownProps.comment.userId] ? state.user.info[ownProps.comment.userId].avatar || '' : ''
  const fullName = state.user.info && state.user.info[ownProps.comment.userId] ? state.user.info[ownProps.comment.userId].fullName || '' : ''
  return {
    uid: uid,
    isCommentOwner: (uid === ownProps.comment.userId),
    info: state.user.info,
    avatar,
    fullName
    

  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(Comment)
