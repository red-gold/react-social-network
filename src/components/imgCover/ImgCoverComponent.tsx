// - Import react components
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SvgImage from '@material-ui/icons/Image'

import {Map} from 'immutable'
import { translate, Trans } from 'react-i18next'

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
      backgroundPosition: 'top center'
    },
    loding: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100px',
      position: 'relative',
      fontWeight: 400
    },
    loadingContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    loadingImage: {
      width: '50px',
      height: '50px'
    }
  }

  /**
   * Component constructor
   */
  constructor (props: IImgCoverComponentProps) {
    super(props)

    // Defaul state
    this.state = {
      isImageLoaded: false
    }

    // Binding functions to `this`
    this.handleLoadImage = this.handleLoadImage.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  /**
   * Will be called on loading image
   */
  handleLoadImage = () => {
    this.setState({
      isImageLoaded: true
    })
  }
  
  /**
   * Handle click
   */
  handleClick = (event: any) => {

    const {onClick} = this.props
    if (onClick) {
      onClick(event)
    }

  }

  /**
   * Reneder component DOM
   */
  render () {

    let { src, style, t, className, onClick } = this.props
    let { isImageLoaded } = this.state

    return (
      <div>
        <div onClick={this.handleClick} className={className} style={(!isImageLoaded ? { display: 'none' } : Object.assign({},this.styles.cover,{
          backgroundImage: 'url(' + (src || '') + ')',
          width: this.props.width,
          height: this.props.height,
          borderRadius: this.props.borderRadius
        },style) as any)}>
          {this.props.children}
        </div>
        <div style={(isImageLoaded ? { display: 'none' } : this.styles.loding as any)}>
          <div style={this.styles.loadingContent as any}>
            <SvgImage style={this.styles.loadingImage} />
            <div>{t!('image.notLoaded')}</div>
          </div>
        </div>
         <img onLoad={this.handleLoadImage} src={src || ''} style={{ display: 'none'}} />
      </div>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IImgCoverComponentProps) => {
  return {
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: any, ownProps: IImgCoverComponentProps) => {
  return {
    
  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(ImgCoverComponent)

export default connect(mapStateToProps, mapDispatchToProps)(translateWrraper as any)
