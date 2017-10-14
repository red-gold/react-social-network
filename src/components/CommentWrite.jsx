// - Import react components
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Faker from 'faker'

// - Import app components

// - Import actions
import * as commentActions from 'commentActions'

// - Define variable
const buttonStyle = {
  marginTop: '5px'
};

// - Create CommentWrite component class
export class CommentWrite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue:''
    }

    // Binding functions to `this`
    this.handleRef = this.handleRef.bind(this);
    this.focus = this.focus.bind(this);
    this.handleAddComment = this.handleAddComment.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this)

  }

  handleOnChange = (evt) =>{
    this.setState({inputValue:evt.target.value})

  }

  handleRef = c => {
    this.inputRef = c
  }

  focus = () => {
    this.inputRef.focus()
  }
  handleAddComment = (evt) => {
    this.props.send(this.state.inputValue,this.props.postId,this.props.close)

  }

// Render DOM
  render() {
    return (
      <div>
        <textarea autoFocus defaultValue={this.props.commentText} onChange={this.handleOnChange}/>

        <Button basic style={buttonStyle} onClick={this.handleAddComment} color='teal'>Add Comment</Button>

      </div>
    );
  }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch,ownProps) => {
  return{
    send: (text,postId,callBack) => {
      dispatch(commentActions.dbAddComment({
              postId: postId,
              text: text
           },callBack))

    }
  }
}

// - Map state to props
const mapStateToProps = (state) => {
  return{

  }
}

// - Connect component to store
export default connect(mapStateToProps,mapDispatchToProps)(CommentWrite)
