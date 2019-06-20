// - Impoer react components
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import LinearProgress from '@material-ui/core/LinearProgress';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { withStyles } from '@material-ui/core/styles';
import SvgAddImage from '@material-ui/icons/AddAPhoto';
import SvgDelete from '@material-ui/icons/Delete';
import FileAPI from 'api/FileAPI';
import Img from 'components/img';
import { User } from 'core/domain/users';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import moment from 'moment/moment';
import * as globalActions from 'store/actions/globalActions';
import * as imageGalleryActions from 'store/actions/imageGalleryActions';
import { userSelector } from 'store/reducers/users/userSelector';
import { globalSelector } from 'store/reducers/global/globalSelector';
import uuid from 'uuid';
import { fromJS } from 'immutable';
import { UserPermissionType } from 'core/domain/common/userPermissionType';
import { Photo } from 'core/domain/imageGallery/photo';
import config from 'src/config';

import { IImageGalleryComponentProps } from './IImageGalleryComponentProps';
import { IImageGalleryComponentState } from './IImageGalleryComponentState';

// - Import actions
// - Import app components
// - Import API
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

let isPhotoSelected: boolean

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
    isPhotoSelected = false
  }

  /**
   * Handle set image
   */
  handleSetImage = (event: any, URL: string) => {
    this.props.set!(URL)
    this.close()
    isPhotoSelected = false
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
    const { tempAddImageToList, tempAddImages, uid } = this.props
    const file = event.target.files[0]
    const extension = FileAPI.getExtension(event.target.files[0].name)
    let fileName = (`${uuid()}.${extension}`)
    FileAPI.constraintImage(event.target.files[0], fileName)
    isPhotoSelected = true
    const parsedFiles: { file: any, fileName: string }[] = []
    parsedFiles.push({ file: URL.createObjectURL(file), fileName })
    this.setState({
        selectedPhotos: parsedFiles
      })
    // const {fileURL} = (URL.createObjectURL(file)).toString
    const fileId = (fileName as string).split('.')[0]
    const newAvatar = new Photo(
      fileId,
      fileName,
      '',
      URL.createObjectURL(file),
      URL.createObjectURL(file),
      uid!,
      moment.utc().valueOf(),
      config.data.avatarFolderPath,
      config.data.avatarFolderPath,
      0,
      0,
      {},
      UserPermissionType.Public,
      []
    )

    const mapImage = Map({[fileId]: fromJS({...newAvatar})})
    tempAddImageToList!(mapImage)
    tempAddImages!(uid!, Map({[fileId]: true}))
  }

  /**
   * Hide image gallery
   */
  close = () => {
    this.props.close!()
  }

  imageList = () => {
    const { progress } = this.props
    return this.props.images!.map((image , index) => {
      let progressPercent = 100
      let progressVisible = false
      if (isPhotoSelected && index === 0) {
        progressPercent = progress ? (progress.getIn([image!.get('fileName'), 'percent'], 0)) : 100
        progressVisible = progress ? (progress.getIn([image!.get('fileName'), 'visible'], true)): false
      }
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
        <GridListTileBar
            title={ progressVisible ? (<LinearProgress variant='determinate' value={progressPercent} color='secondary' />) : ''}
            titlePosition='bottom'
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
                <Button variant='contained' component='span' style={this.styles.uploadButton as any}>
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
    progressChange: (percent: number,status: boolean) => dispatch(globalActions.progressChange(percent, status)),
    tempAddImageToList: (mapImage: Map<string, any>) => dispatch(imageGalleryActions.addImageList(mapImage)),
    tempAddImages: (uid: string, imageIds: Map<string, boolean>) =>  dispatch(imageGalleryActions.addAvatarImages(uid, imageIds))
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>) => {
  const uid = state.getIn(['authorize', 'uid'])
  let getProgress = globalSelector.selectProgress()
  const progress = getProgress(state)
  const currentUser = userSelector.getUserProfileById(state, {userId: uid}).toJS() as User
  return {

    avatar: currentUser ? currentUser.avatar : '',
    progress,
    uid

  }
}

// - Connect component to redux store
const translateWrraper = withTranslation('translations')(ImageGalleryComponent as any)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(translateWrraper as any) as any)
