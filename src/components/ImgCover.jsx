// - Import react components
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SvgImage from 'material-ui/svg-icons/image/image'

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
    fileName: PropTypes.string,
    /**
     * Image width
     */
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    /**
     * Image height
     */
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    /**
     * Image border radius
     */
    borderRadius: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props) {
    super(props)

    //Defaul state
    this.state = {
      isImageLoaded: false
    }

    // Binding functions to `this`
    this.handleLoadImage = this.handleLoadImage.bind(this)
  }

  /**
   * Will be called on loading image
   * 
   * @memberof Img
   */
  handleLoadImage = () => {
    this.setState({
      isImageLoaded: true
    })
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {

    let { fileName, style } = this.props
    let { isImageLoaded } = this.state

    /**
     * Styles
     */
    const styles = {
      cover: {
        backgroundImage: 'url(' + (fileName || '') + ')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: this.props.width,
        height: this.props.height,
        borderRadius: this.props.borderRadius

      },
      loding: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100px',
        position: 'relative',
        color: '#cacecd',
        fontWeight: 100
      },
      loadingContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
      loadingImage: {
        fill: 'aliceblue',
        width: '50px',
        height: '50px'
      }
    }
    return (
      <div>
        <div style={Object.assign({},styles.cover,style)}>
          {this.props.children}
        </div>
        <div style={{ backgroundColor: 'blue' }} style={isImageLoaded ? { display: 'none' } : styles.loding}>
          <div style={styles.loadingContent}>
            <SvgImage style={styles.loadingImage} />
            <div>Image has not loaded</div>
          </div>
        </div>
         <img onLoad={this.handleLoadImage} src={fileName || ''} style={{ display: 'none'}} />
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
export default connect(mapStateToProps, mapDispatchToProps)(ImgCover)
