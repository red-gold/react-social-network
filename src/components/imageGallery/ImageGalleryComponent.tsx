// - Impoer react components
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { translate, Trans } from 'react-i18next'

import GridList from '@material-ui/core/GridList'
import GridListTileBar  from '@material-ui/core/GridListTileBar'
import GridListTile from '@material-ui/core/GridListTile'
import IconButton from '@material-ui/core/IconButton'
import StarBorder from '@material-ui/icons/StarBorder'
import Button from '@material-ui/core/Button'
import SvgUpload from '@material-ui/icons/CloudUpload'
import SvgAddImage from '@material-ui/icons/AddAPhoto'
import SvgDelete from '@material-ui/icons/Delete'
import { grey } from '@material-ui/core/colors'
import { withStyles } from '@material-ui/core/styles'
import uuid from 'uuid'

import {Map} from 'immutable'
import config from 'src/config'

// - Import actions
import * as imageGalleryActions from 'store/actions/imageGalleryActions'
import * as globalActions from 'store/actions/globalActions'

// - Import app components
import Img from 'components/img'

// - Import API
import FileAPI from 'api/FileAPI'
import { IImageGalleryComponentProps } from './IImageGalleryComponentProps'
import { IImageGalleryComponentState } from './IImageGalleryComponentState'
import { Image } from 'core/domain/imageGallery'
import { userSelector } from 'store/reducers/users/userSelector'

const styles = (theme: any) => ({
  fullPageXs: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
      margin: 0,
      overflowY: 'auto'
    }
  }
})

/**
 * Create ImageGallery component class
 */
export class ImageGalleryComponent extends Component<IImageGalleryComponentProps, IImageGalleryComponentState> {

  static propTypes = {

    /**
     * Callback function to ser image url on parent component
     */
    open: PropTypes.func
  }

  styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around'
    },
    gridList: {
      width: 500,
      height: 450,
      overflowY: 'auto'
    },
    uploadButton: {
      verticalAlign: 'middle',
      fontWeight: 400
    },
    uploadInput: {
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      width: '100%',
      opacity: 0
    },
    deleteImage: {
      marginLeft: '5px',
      cursor: 'pointer',
      color: 'white'
    },
    addImage: {
      marginRight: '5px',
      cursor: 'pointer',
      color: 'white'
    }
  }

  /**
   * Component constructor
   *
   */
  constructor (props: IImageGalleryComponentProps) {
    super(props)

    // Binding function to `this`
    this.close = this.close.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
    this.handleSetImage = this.handleSetImage.bind(this)
    this.handleDeleteImage = this.handleDeleteImage.bind(this)
    this.imageList = this.imageList.bind(this)
  }

  /**
   * Handle set image
   */
  handleSetImage = (event: any, URL: string) => {
    this.props.set!(URL)
    this.close()
  }

  /**
   * Handle delete image
   */
  handleDeleteImage = (event: any, id: string, fileName: string) => {
    
    this.props.deleteImage!(id,fileName)
  }

  componentDidMount () {
    window.addEventListener('onSendResizedImage', this.handleSendResizedImage)
    const {loadData} = this.props
    if (loadData) {
      loadData()
    }
  }
  componentWillUnmount () {
    window.removeEventListener('onSendResizedImage', this.handleSendResizedImage)
  }

  /**
   * Handle send image resize event that pass the resized image
   */
  handleSendResizedImage = (event: any) => {

    const { resizedImage, fileName } = event.detail
    const {uploadImage} = this.props
    uploadImage!(resizedImage,fileName)
  }

  /**
   * Handle on change file upload
   */
  onFileChange = (event: any) => {

    const extension = FileAPI.getExtension(event.target.files[0].name)
    let fileName = (`${uuid()}.${extension}`)
    let image = FileAPI.constraintImage(event.target.files[0], fileName)

  }

  /**
   * Hide image gallery
   */
  close = () => {
    this.props.close!()
  }

  imageList = () => {
    return this.props.images!.map((image , index) => {

      return (
      <GridListTile
        key={image!.get('id')!}
      >
        <div>
          <div style={{ overflowY: 'hidden', overflowX: 'auto' }}>
            <ul style={{ whiteSpace: 'nowrap', padding: '0 6px', margin: '8px 0 0 0', verticalAlign: 'bottom', flexShrink: 0, listStyleType: 'none' }}>
              <div style={{ display: 'block' }}>
                <div style={{ display: 'block', marginRight: '8px', transition: 'transform .25s' }}>
                  <li style={{ width: '100%', margin: 0, verticalAlign: 'bottom', position: 'static', display: 'inline-block' }}>
                    <Img fileName={image!.get('url')} style={{ width: '100%', height: 'auto' }} />

                  </li>
                </div>
              </div>

            </ul>
          </div>
        </div>
        <GridListTileBar
              title={<SvgDelete style={this.styles.deleteImage as any} onClick={evt => 
                this.handleDeleteImage(evt, image!.get('id'), image!.get('fileName'))} />}
              titlePosition='top'
              actionIcon={
                <SvgAddImage style={this.styles.addImage as any} onClick={evt => this.handleSetImage(evt, image!.get('url'))} />}
              actionPosition='left'
            />
      </GridListTile>)
    })
  }

  render () {

    const {t, images} = this.props
    /**
     * Component styles
     */

    return (
      <div style={this.styles.root as any}>
        <GridList
          cellHeight={180}
          style={this.styles.gridList as any}
        >
          <GridListTile key='upload-image-gallery' >

            <div style={{ display: 'flex', backgroundColor: 'rgba(222, 222, 222, 0.52)', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>

              <input
                accept='image/*'
                style={this.styles.uploadInput as any}
                id='raised-button-file'
                onChange={this.onFileChange}
                type='file'
              />
              <label htmlFor='raised-button-file'>
                <Button variant='raised' component='span' style={this.styles.uploadButton as any}>
                  {t!('imageGallery.uploadButton')}
        </Button>
              </label>
            </div>
          </GridListTile>
          {images && images.count() > 0 ? this.imageList() : ''}
        </GridList>
      </div>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IImageGalleryComponentProps) => {
  return {
    deleteImage: (fileId: string, fileName: string) => dispatch(imageGalleryActions.dbDeleteImage(fileId, ownProps.folder, fileName)),
    progressChange : (percent: number,status: boolean) => dispatch(globalActions.progressChange(percent, status))

  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>) => {
  const uid = state.getIn(['authorize', 'uid'])
  const currentUser = userSelector.getUserProfileById(state, {userId: uid}).toJS()
  return {
    
    avatar: currentUser ? currentUser.avatar : ''

  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(ImageGalleryComponent as any)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(translateWrraper as any) as any)
