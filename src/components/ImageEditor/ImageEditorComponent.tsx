// - Import react components
import 'cropperjs/dist/cropper.css';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { grey } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SvgRotateLeft from '@material-ui/icons/RotateLeft';
import SvgRotateRight from '@material-ui/icons/RotateRight';
import { SocialError } from 'core/domain/common';
import { IImageGalleryService } from 'core/services';
import { SocialProviderTypes } from 'core/socialProviderTypes';
import { Map } from 'immutable';
import { FileResult } from 'models/files';
import React, { Component } from 'react';
import Cropper from 'react-cropper';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { provider } from 'socialEngine';
import config from 'src/config';
import * as globalActions from 'store/actions/globalActions';
import * as imageGalleryActions from 'store/actions/imageGalleryActions';
import { authorizeSelector } from 'store/reducers/authorize';
import uuid from 'uuid';

import { IImageEditorComponentProps } from './IImageEditorComponentProps';
import { IImageEditorComponentState } from './IImageEditorComponentState';

// - Material UI
// - Import app components

// - Import API
// - Import actions
const styles = (theme: any) => ({
  dialogTitle: {
    display: 'flex'
  },
  titleText: {
    flex: 1
  },
  loading: {
    position: 'absolute',
    top: '45%',
    left: '45%'
  },
  cropperImage: {
    width: '100%',
    height: '100%'
  }
})

/**
 * React component class
 */
export class ImageEditorComponent extends Component<IImageEditorComponentProps, IImageEditorComponentState> {

  /**
   * Fields
   */
  cropperRef: any
  imageRef: any
  _imageGalleryService: IImageGalleryService

  /**
   * Component constructor
   *
   */
  constructor(
    props: IImageEditorComponentProps
  ) {
    super(props)
    this._imageGalleryService = provider.get<IImageGalleryService>(SocialProviderTypes.ImageGalleryService)
    // Defaul state
    this.state = {
      link: '',
      disabledOk: true,
      loading: true

    }

    // Binding functions to `this`

  }

  /**
   * Handle add link
   */
  handleCropDone = () => {
    const { onClose, progress, onSetUrl, showTopLoading, hideTopLoading, saveImage, showError, currentUser } = this.props
    showTopLoading!()
    let fileName = (`${uuid()}`)
    this.cropperRef.getCroppedCanvas({
      minWidth: 256,
      minHeight: 256,
      maxWidth: 4096,
      maxHeight: 4096,
      fillColor: '#fff',
      imageSmoothingEnabled: false,
      imageSmoothingQuality: 'high',
    }).toBlob((blob: any) => {
      const onSuccess = (fileResult: FileResult) => {
        onSetUrl(fileResult.fileURL)
        saveImage!(fileResult.fileURL)
        hideTopLoading!()
        progress!(100, false)
        onClose()
      }

      const onFailure = (error: SocialError) => {
        hideTopLoading!()
        showError!(error.code)
      }
      this._imageGalleryService.uploadFile(`${config.data.imageFolderPath}/${currentUser!.userId}`, blob, fileName, progress!, onSuccess, onFailure)
    })

  }

  /**
   * Rotate image
   */
  rotate = (degree: number) => {
    this.cropperRef.rotate(degree)
  }

  /**
   * On change image of image editor
   */
  handleCropImage = (crop: any) => {

  }

  /**
   * Call when editor is ready
   */
  hadnleEditorReady = () => {
    this.setState({
      disabledOk: false,
      loading: false
    })
  }

  setCropRef = (ref: any) => {
    this.cropperRef = ref
  }

  /**
   * Reneder component DOM
   */
  render() {
    const CropperX: any = Cropper
    const { classes, t, open, onClose, originalPhotoUrl, theme } = this.props
    const { disabledOk, loading } = this.state
    return (
      < Dialog
        open={open}
        onClose={onClose}
        maxWidth='sm'
      >
        <DialogTitle disableTypography className={classes.dialogTitle} >
          <Typography variant='h6' className={classes.titleText}>
            {t!('post.imageEditorTitle')}
          </Typography>
          <IconButton onClick={() => this.rotate(-90)}>
            <SvgRotateLeft />
          </IconButton>
          <IconButton >
            <SvgRotateRight onClick={() => this.rotate(90)} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <CropperX
            ref={this.setCropRef}
            src={originalPhotoUrl}
            style={{ height: 400, width: '100%' }}
            aspectRatio={16 / 9}
            ready={this.hadnleEditorReady}
            crop={this.handleCropImage} />
          {loading ? <div className={classes.loading}> <CircularProgress style={{color: theme.palette.primary.light}} size={30} thickness={5} /> </div> : ''}
        </DialogContent>
        <DialogActions>
          <Button
            color='primary'
            disableFocusRipple={true}
            disableRipple={true}
            onClick={onClose}
            style={{ color: grey[800] }}
          >
            {t!('post.cancelButton')}
          </Button>
          <Button
            color='primary'
            disableFocusRipple={true}
            disableRipple={true}
            onClick={this.handleCropDone}
            disabled={disabledOk}
          >
            {t!('post.addVideoButton')}
          </Button>
        </DialogActions>

      </Dialog >
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IImageEditorComponentProps) => {
  return {
    progress: (percentage: number, status: boolean) => dispatch(globalActions.progressChange(percentage, status)),
    showTopLoading: () => dispatch(globalActions.showTopLoading()),
    hideTopLoading: () => dispatch(globalActions.hideTopLoading()),
    saveImage: (fileUrl: string) => dispatch(imageGalleryActions.dbSaveImage(fileUrl)),
    showError: (error: string) => dispatch(globalActions.showMessage(error))
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IImageEditorComponentProps) => {
  const currentUser = authorizeSelector.getCurrentUser(state).toJS()
  return {
    
    currentUser
  }
}

// - Connect component to redux store
const translateWrapper = withTranslation('translations')(ImageEditorComponent as any)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, {withTheme: true})(translateWrapper as any) as any)
