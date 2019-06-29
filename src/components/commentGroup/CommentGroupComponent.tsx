// - Import react components
import { Card, CardActions, CardHeader } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { teal } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import StringAPI from 'api/StringAPI';
import CommentListComponent from 'components/commentList';
import UserAvatar from 'components/userAvatar';
import { ServerRequestType } from 'constants/serverRequestType';
import { Comment } from 'core/domain/comments';
import { User } from 'core/domain/users';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as commentActions from 'store/actions/commentActions';
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType';
import { userSelector } from 'store/reducers/users/userSelector';

import { ICommentGroupComponentProps } from './ICommentGroupComponentProps';
import { ICommentGroupComponentState } from './ICommentGroupComponentState';

// - Import actions
// - Import app components
const styles = (theme: any) => ({
  textField: {
    fontWeight: 400,
    fontSize: '14px'
  },
  header: {
    padding: '2px 3px 3px 10px'
  },
  commentBody: {
    color: 'black',
    fontWeight: 400,
    fontSize: '12px',
    height: '100%',
    border: 'none',
    width: '100%',
    outline: 'none',
    resize: 'none',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  author: {
    fontSize: '10px',
    paddingRight: '10px',
    fontWeight: 400,
    color: 'rgba(0,0,0,0.87)',
    textOverflow: 'ellipsis',
    overflow: 'hidden'

  },
  noUnderline: {
    display: 'none'
  },
  postButton: {
    flexDirection: 'row-reverse'
  },
  cardHeaderContent: {
    flex: '1 1 auto',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  }
})

/**
 * Create component class
 */
export class CommentGroupComponent extends Component<ICommentGroupComponentProps, ICommentGroupComponentState> {

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
    ownerPostUserId: PropTypes.string

  }

  styles = {
    commentItem: {
      height: '60px',
      position: '',
      zIndex: ''
    },
    toggleShowList: {
      height: '60px',
      zIndex: 5
    },
    writeCommentTextField: {
      width: '100%',
      fontWeight: 400,
      fontSize: '14px'
    },
    progressbar: {
      height: '1.5px',
      backgroundColor: 'rgb(245, 243, 243)',
      color: teal['A400']
    },
    secondaryText: {
      fontSize: '13px',
      lineHeight: '20px',
      color: 'rgba(0,0,0,0.87)',
      fontWeight: 300,
      whiteSpace: 'pre-wrap'
    },
    primaryText: {
      fontSize: '13px',
      paddingRight: '10px',
      fontWeight: 400,
      color: 'rgba(0,0,0,0.87)',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    }
  }

  /**
   * Component constructor
   *
   */
  constructor (props: ICommentGroupComponentProps) {
    super(props)

    /**
     * Defaul state
     */
    this.state = {
      commentText: '',
      postDisable: true

    }

    // Binding functions to `this`
    this.handlePostComment = this.handlePostComment.bind(this)
    this.clearCommentWrite = this.clearCommentWrite.bind(this)
    this.commentWriteBox = this.commentWriteBox.bind(this)
    this.loadCommentsList = this.loadCommentsList.bind(this)
  }

  /**
   * Clear comment text field
   */
  clearCommentWrite = () => {
    this.setState({
      commentText: '',
      postDisable: true
    })
  }

  /**
   * Post comment
   */
  handlePostComment = () => {

    this.props.send!(this.state.commentText, this.props.postId, this.clearCommentWrite)

    this.clearCommentWrite()
  }

  /**
   * When comment text changed
   */
  handleChange = (event: any) => {
    const data = event.target.value
    this.setState({ commentText: data })
    if (data.length === 0 || data.trim() === '') {
      this.setState({
        commentText: '',
        postDisable: true
      })
    } else {
      this.setState({
        commentText: data,
        postDisable: false
      })
    }

  }

  shouldComponentUpdate(nextProps: ICommentGroupComponentProps, nextState: ICommentGroupComponentState) {

    let shouldUpdate = false

    if (!R.equals(this.state, nextState)) {
      shouldUpdate = true
    } else if (nextProps.open !== this.props.open) {
      shouldUpdate = true
    } else if (nextProps.disableComments !== this.props.disableComments) {
      shouldUpdate = true
    } else if (nextProps.commentsRequestStatus !== this.props.commentsRequestStatus) {
      shouldUpdate = true
    } else if ((nextProps.comments!) !== (this.props.comments!)) {
      shouldUpdate = true
    }
    return shouldUpdate
  }

  /**
   * Comment list box
   */
  commentWriteBox = () => {
    const { classes, postId, fullName, avatar, t } = this.props
    return (
      <div>
        <Divider />
        <Paper key={postId! + '-commentwrite'} elevation={0} className='animate2-top10'>
            <Card elevation={0}>
              <CardHeader
              className={classes.header}
                avatar={<UserAvatar fullName={fullName!} fileName={avatar!} size={24} />}
                subheader={<TextField
                  autoFocus
                  placeholder={t!('comment.addCommentPlaceholder')}
                  multiline
                  rowsMax='4'
                  InputProps={{
                    disableUnderline: true,
                    autoFocus: true,
                    fullWidth: true
                  }}
                  value={this.state.commentText}
                  onChange={this.handleChange}
                  className={classes.textField}
                  fullWidth={true}
                />}
              >
              </CardHeader>
                  <CardActions className={classes.postButton} >
            <Button color='primary' disabled={this.state.postDisable} onClick={this.handlePostComment}>
          {t!('comment.postButton')}
          </Button>
                    </CardActions>
            </Card>
          </Paper>
          </div>
    )
  }

  /**
   * Loading Comments listItem
   *
   */
   loadCommentsList = () => {
     const { postId, commentsRequestStatus, open} = this.props
     const comments: Map<string, Comment> = this.props.comments || Map({})
     const showComments = (comments! ? (
     <Paper elevation={0} style={open ? { display: 'block', padding: '0px 0px' } : { display: 'none', padding: '12px 16px' }}>
       <CommentListComponent comments={comments!} isPostOwner={this.props.isPostOwner} disableComments={this.props.disableComments} postId={postId}/>
     </Paper>) : '')
     const loadComments = ((commentsRequestStatus === ServerRequestStatusType.Sent)  ?  <LinearProgress style={this.styles.progressbar} variant='indeterminate' /> : showComments)
     return (
       loadComments
     )
   }

  /**
   * Reneder component DOM
   *
   */
  render () {
    const { postId, open} = this.props
    /**
     * Return Elements
     */
    return (
      <div key={postId + '-comments-group'}>
          <Divider />
        <div style={open ? { display: 'block' } : { display: 'none' }}>
          <Paper elevation={0} className='animate-top' style={!open ? { display: 'block' } : { display: 'none' }}>
            <div style={{ position: 'relative', height: '60px' }} >
              <Button style={this.styles.toggleShowList} fullWidth={true} onClick={this.props.onToggleRequest} > {' '}</Button>
              </div>
            </Paper>
        </div>
        {open ? this.loadCommentsList() : ''}
        {(!this.props.disableComments && open ) ? this.commentWriteBox() : ''}
      </div>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: ICommentGroupComponentProps) => {
  return {
    send: (text: string, postId: string, callBack: Function) => {
      dispatch(commentActions.dbAddComment(ownProps.ownerPostUserId, {
        postId: postId,
        text: text
      }, callBack))
    }
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: ICommentGroupComponentProps) => {
  const { postId } = ownProps
  const uid = state.getIn(['authorize', 'uid'], 0)
  const requestId = StringAPI.createServerRequestId(ServerRequestType.CommentGetComments, postId)
  const commentsRequestStatus = state.getIn(['server', 'request', requestId])
  // const commentSlides = state.getIn(['post', 'entities', ownerPostUserId, postId, 'comments'], Map({}))
  const user = userSelector.getUserProfileById(state, {userId: uid}).toJS() as User
  return {

    commentsRequestStatus : commentsRequestStatus ? commentsRequestStatus.status : ServerRequestStatusType.NoAction,
    // commentSlides,
    avatar: user.avatar || '',
    fullName: user.fullName || ''

  }
}

// - Connect component to redux store
const translateWrraper = withTranslation('translations')(CommentGroupComponent as any)
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(translateWrraper as any))
