// - Import react components
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'

// - Import app components


// - Import API

// - Import actions
import * as imageGalleryActions from 'imageGalleryActions'


/**
 * Create component class
 */
export class UserAvatar extends Component {

  static propTypes = {

    /**
     * Use for getting url address from server
     */
    fileName: PropTypes.string.isRequired,
    /**
     * User full name
     */
    fullName: PropTypes.string.isRequired,
    /**
     * Avatar style
     */
    style: PropTypes.object,
    /**
     * Avatar size
     */
    size: PropTypes.number,
    /**
     * Trigger on touch tap
     */
    onTouchTap: PropTypes.func

  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props) {
    super(props)

    //Defaul state
    this.state = {
    }

    // Binding functions to `this`

  }




  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {
    let { fileName, fullName, style, size, onTouchTap } = this.props

    return (
      <div style={{display: 'inherit'}}>
       {(fileName && fileName !== '' && fileName !== 'noImage' ) 
       ? ( <Avatar backgroundColor='#ffffff' src={fileName} size={size || 36} style={style} onTouchTap={onTouchTap} />)
        : (<Avatar backgroundColor='#00bcd4' size={size || 36} style={style} onTouchTap={onTouchTap}>{fullName.slice(0, 1)}</Avatar>) }
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
    avatarURL: state.imageGallery.imageURLList,
        imageRequests: state.imageGallery.imageRequests

  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(UserAvatar)
