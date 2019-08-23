// - Import react components
import { withStyles } from '@material-ui/core/styles';
import SvgImage from '@material-ui/icons/Image';
import { Map } from 'immutable';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { IImgComponentProps } from './IImgComponentProps';
import { IImgComponentState } from './IImgComponentState';

// - Import app components

// - Import API

// - Import actions
const styles = (theme: any) => ({
  image: {
    verticalAlign: 'top',
    maxWidth: '100%',
    minWidth: '100%',
    width: '100%'
  }
})

/**
 * Create component class
 */
export class ImgComponent extends Component<IImgComponentProps,IImgComponentState> {

  styles = {
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
   *
   */
  constructor (props: IImgComponentProps) {
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
   * Handle click on image
   */
  handleClick = (event: any) => {
    const {onClick} = this.props
    if (onClick) {
      onClick(event)
    }
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
   * Reneder component DOM
   * 
   */
  render () {

    let { fileName, style, t } = this.props
    let { isImageLoaded } = this.state
    const {classes} = this.props
    return (
      <div>
        <img alt={fileName || ''} className={classes.image} onClick={this.handleClick} onLoad={this.handleLoadImage} src={fileName || ''} style={isImageLoaded ? style : { display: 'none' }} />
        <div style={Object.assign({},{ backgroundColor: 'white' }, isImageLoaded ? { display: 'none' } : this.styles.loding)}>
          <div style={this.styles.loadingContent as any}>
            <SvgImage style={this.styles.loadingImage} />
            <div>{t!('image.notLoaded')}</div>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IImgComponentProps) => {
  return {

  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IImgComponentProps) => {
  return {
    
    avatarURL: state.getIn(['imageGallery', 'imageURLList']),
    imageRequests: state.getIn(['imageGallery', 'imageRequests'])
  }
}

// - Connect component to redux store
const translateWrapper = withTranslation('translations')(ImgComponent as any)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(translateWrapper as any)as any)
