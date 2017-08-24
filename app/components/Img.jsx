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
export class Img extends Component {

  static propTypes = {

    /**
     * Use for getting url address from server
     */
    fileName: PropTypes.string,
    /**
     * Avatar style
     */
    style: PropTypes.object
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
    const styles = {
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

    let { fileName, style } = this.props
    let { isImageLoaded } = this.state
    return (
      <div>
        <img onLoad={this.handleLoadImage} src={fileName || ''} style={isImageLoaded ? style : { display: 'none' }} />
        <div style={{ backgroundColor: 'blue' }} style={isImageLoaded ? { display: 'none' } : styles.loding}>
          <div style={styles.loadingContent}>
            <SvgImage style={styles.loadingImage} />
            <div>Image has not loaded</div>
          </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Img)
