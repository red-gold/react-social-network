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
export class ImgCover extends Component {

  static propTypes = {

    /**
     * Use for getting url address from server
     */
    fileName: PropTypes.string.isRequired,
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
    this.getImageURL = this.getImageURL.bind(this)

  }

  componentWillReceiveProps(nextProps) {
    const { fileName, avatarURL } = this.props
    if (fileName && !avatarURL[fileName]) {
      if (this.props.imageRequests.indexOf(fileName) > -1)
        return
      this.getImageURL()
    }
  }

  getImageURL = () => {
    let { fileName } = this.props
    if (fileName && fileName !== '') {
      if (this.props.imageRequests.indexOf(fileName) > -1)
        return
      this.props.getImage(fileName)

    }
  }

  componentWillMount() {
    let { fileName } = this.props
    
    if (this.props.imageRequests.indexOf(fileName) > -1)
      return
    this.getImageURL()
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {
    let { fileName, style, size, onTouchTap, avatarURL } = this.props

    return (
      <Avatar src={avatarURL[fileName] || ''} size={size || 36} style={style} onTouchTap={onTouchTap} />

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
    getImage: (name) => dispatch(imageGalleryActions.dbDownloadImage(name))

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
export default connect(mapStateToProps, mapDispatchToProps)(ImgCover)
