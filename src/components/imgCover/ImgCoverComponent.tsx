// - Import react components
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SvgImage from 'material-ui-icons/Image'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import {Map} from 'immutable'

// - Import app components

// - Import API

// - Import actions
import * as imageGalleryActions from 'store/actions/imageGalleryActions'
import { IImgCoverComponentProps } from './IImgCoverComponentProps'
import { IImgCoverComponentState } from './IImgCoverComponentState'

/**
 * Create component class
 */
export class ImgCoverComponent extends Component<IImgCoverComponentProps,IImgCoverComponentState> {

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

  styles = {
    cover: {
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    },
    loding: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100px',
      position: 'relative',
      color: '#cacecd',
      fontWeight: 400
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

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IImgCoverComponentProps) {
    super(props)

    // Defaul state
    this.state = {
      isImageLoaded: false
    }

    // Binding functions to `this`
    this.handleLoadImage = this.handleLoadImage.bind(this)
  }

  /**
   * Will be called on loading image
   *
   * @memberof ImgCoverComponent
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
  render () {

    let { fileName, style, translate } = this.props
    let { isImageLoaded } = this.state

    return (
      <div>
        <div style={Object.assign({},this.styles.cover,{
          backgroundImage: 'url(' + (fileName || '') + ')',
          width: this.props.width,
          height: this.props.height,
          borderRadius: this.props.borderRadius
        },style)}>
          {this.props.children}
        </div>
        <div style={Object.assign({},{ backgroundColor: 'blue' },isImageLoaded ? { display: 'none' } : this.styles.loding)}>
          <div style={this.styles.loadingContent as any}>
            <SvgImage style={this.styles.loadingImage} />
            <div>{translate!('image.notLoaded')}</div>
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
const mapDispatchToProps = (dispatch: any, ownProps: IImgCoverComponentProps) => {
  return {
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: IImgCoverComponentProps) => {
  return {
    translate: getTranslate(state.get('locale'))

  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(ImgCoverComponent as any)
