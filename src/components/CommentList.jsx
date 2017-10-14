// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { List, ListItem } from 'material-ui/List'




// - Import app components
import Comment from 'Comment'
import * as PostAPI from 'PostAPI'

// - Import actions




/**
 * Create component class
 */
export class CommentList extends Component {

   static propTypes = {
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

    /**
     * Default state
     */
    this.state = {

    }

    // Binding functions to `this`

  }



  /**
   * Get comments' DOM
   * @return {DOM} list of comments' DOM
   */
  commentList = () => {
    var comments = this.props.comments
    if (comments) {


      var parsedComments = [];
      Object.keys(comments).forEach((commentId) => {
        parsedComments.push({
          id: commentId,
          ...comments[commentId]
        });
      });
      let sortedComments = PostAPI.sortObjectsDate(parsedComments)
      
      return sortedComments.map((comment, index, array) => {

        return <Comment key={comment.id} comment={comment} isPostOwner={this.props.isPostOwner} disableComments={this.props.disableComments}/>

      })

    }
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {

    const styles = {
      list: {
        width: "100%",
        maxHeight: 450,
        overflowY: 'auto'
      }
    }

    return (


      <List style={styles.list}>

        {this.commentList()}
      </List>
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


  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state) => {
  return {

  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
