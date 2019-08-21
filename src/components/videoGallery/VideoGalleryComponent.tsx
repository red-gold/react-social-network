// - Impoer react components
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { withStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import AddVideoIcon from '@material-ui/icons/AddToQueue';
import SvgDelete from '@material-ui/icons/Delete';
import FileAPI from 'api/FileAPI';
import classNames from 'classnames';
import Img from 'components/img';
import { VideoFile } from 'core/domain/imageGallery';
import { User } from 'core/domain/users';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React, { Component, RefObject } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import config from 'src/config';
import * as globalActions from 'store/actions/globalActions';
import * as imageGalleryActions from 'store/actions/imageGalleryActions';
import { userSelector } from 'store/reducers/users/userSelector';
import uuid from 'uuid';

import { IVideoGalleryProps } from './IVideoGalleryProps';
import { IVideoGalleryState } from './IVideoGalleryState';
import { videoGalleryStyles } from './videoGalleryStyles';

// - Material UI
// - Import actions
// - Import app components
// - Import API
/**
 * Create ImageGallery component class
 */
class VideoGalleryComponent extends Component<IVideoGalleryProps, IVideoGalleryState> {

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
    deleteVideo: {
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
   * Fields
   */
  fileInputRef: RefObject<HTMLInputElement>
  videoRef: RefObject<HTMLVideoElement>
  blobFile: any
  file: any

  /**
   * Component constructor
   */
  constructor(props: IVideoGalleryProps) {
    super(props)

    this.state = {
      fileName: '',
      isPreview: false,
      isSaveDisabled: false
    }

    this.fileInputRef = React.createRef()
    this.videoRef = React.createRef()
    // Binding function to `this`
    this.close = this.close.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
    this.handleSetVideo = this.handleSetVideo.bind(this)
    this.handleDeleteVideo = this.handleDeleteVideo.bind(this)
    this.videoList = this.videoList.bind(this)
    this.handleUploadVideo = this.handleUploadVideo.bind(this)
  }

  /**
   * Handle set video
   */
  handleSetVideo = (event: any, URL: string, fullPath: string) => {
    this.props.set!(URL, fullPath)
    this.close()
  }

  togglePreview = () => {
    this.setState((prevState, props) => {
      if (prevState.isPreview) {
        this.fileInputRef!.current!.value = ''
      }
      return { isPreview: !prevState.isPreview }
    })
  }

  /**
   * Handle delete video
   */
  handleDeleteVideo = (event: any, id: string) => {
    this.props.deleteVideo!(id)
  }

  /**
   * Handle on change file upload
   */
  onFileChange = (event: any) => {
    const {showError, t} = this.props
    const extension = FileAPI.getExtension(event.target.files[0].name)
    let saveDisabled = false
    const isExceedMax = FileAPI.checkMaxFileSize(event.target.files[0].size, config.settings.maxVideoFileSize)
    if (isExceedMax) {
      saveDisabled = true
      showError!(t!('videGallery.maxExceedMessage'))
    }
    let fileName = (`${uuid()}.${extension}`)
    this.setState({
      isPreview: true,
      fileName,
      isSaveDisabled: saveDisabled
    })
    this.file = event.currentTarget.files[0]
    const type = this.file.type
    const videoNode = this.videoRef.current
    let canPlay: any = videoNode!.canPlayType(type)
    if (canPlay === '') { canPlay = 'no' }
    var fileURL = URL.createObjectURL(this.file)
    videoNode!.src = fileURL

  }

  /**
   * Hide image gallery
   */
  close = () => {
    this.props.close!()
  }

  videoList = () => {
    return this.props.videos!.map((video: VideoFile, index: number) => {

      return (
        <GridListTile
          key={video.id!}
        >
          <div>
            <div style={{ overflowY: 'hidden', overflowX: 'auto' }}>
              <ul style={{ whiteSpace: 'nowrap', padding: '0 6px', margin: '8px 0 0 0', verticalAlign: 'bottom', flexShrink: 0, listStyleType: 'none' }}>
                <div style={{ display: 'block' }}>
                  <div style={{ display: 'block', marginRight: '8px', transition: 'transform .25s' }}>
                    <li style={{ width: '100%', margin: 0, verticalAlign: 'bottom', position: 'static', display: 'inline-block' }}>
                      <Img fileName={video.videoThumbnails!} style={{ width: '100%', height: 'auto' }} />

                    </li>
                  </div>
                </div>

              </ul>
            </div>
          </div>
          <GridListTileBar
            title={<SvgDelete style={this.styles.deleteVideo as any} onClick={evt => this.handleDeleteVideo(evt, video.id!)} />}
            titlePosition='top'
            actionIcon={
              <AddVideoIcon style={this.styles.addImage as any} onClick={evt => this.handleSetVideo(evt, video.URL, video.videoThumbnails!)} />}
            actionPosition='left'
          />
        </GridListTile>)
    })
  }

  /**
   * Handle upload video
   */
  handleUploadVideo = () => {
    const { uploadVideo } = this.props
    const { fileName } = this.state
    const videoCanvas = FileAPI.captureVideo(this.videoRef.current!, null)

    videoCanvas.toBlob((blobFile) => {

      uploadVideo!(this.file, fileName, blobFile!)
      this.togglePreview()
    }, 'image/jpeg', 0.95)
  }

  componentDidMount() {
    const { getVideoGallery } = this.props
    if (getVideoGallery) {
      getVideoGallery()
    }

  }

  render() {

    const { t, videos, classes } = this.props
    const {  isPreview, isSaveDisabled } = this.state

    /**
     * Album element
     */
    const album = (
      <GridList
        cellHeight={180}
        className={classNames(classes.gridList, { [classes.noDisplay]: isPreview })}
      >
        <GridListTile key='upload-image-gallery' >

          <div style={{ display: 'flex', backgroundColor: 'rgba(222, 222, 222, 0.52)', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>

            <input
              accept='video/mp4,video/x-m4v,video/*'
              style={this.styles.uploadInput as any}
              id='raised-button-file'
              onChange={this.onFileChange}
              ref={this.fileInputRef}
              type='file'
            />
            <label htmlFor='raised-button-file'>
              <Button variant='contained' component='span' style={this.styles.uploadButton as any}>
                {t!('imageGallery.uploadButton')}
              </Button>
            </label>
          </div>
        </GridListTile>
        {videos && videos.count() > 0 ? this.videoList() : ''}
      </GridList>
    )

    /**
     * Preveiew element
     */
    const preview = (
        <div className={classNames(classes.videoRoot, { [classes.noDisplay]: !isPreview })}>
          <video className={classNames(classes.video)} controls autoPlay={false} ref={this.videoRef}></video>
        </div>
       
    )

    return (
      <div style={this.styles.root as any}>

        <Zoom in={!isPreview}>
          {album}
        </Zoom>
        <Zoom in={isPreview}>
          {preview}
        </Zoom>
        <div className={classNames(classes.previewActions, { [classes.noDisplay]: !isPreview })} >
            <Button disabled={isSaveDisabled} color={'primary'} onClick={this.handleUploadVideo}> {t!('videGallery.saveButton')} </Button>
            <Button onClick={this.togglePreview} > {t!('videGallery.backButton')} </Button>
          </div>
      </div>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IVideoGalleryProps) => {
  return {
    uploadVideo: (file: any, fileName: string, thumbnail: Blob) => dispatch(imageGalleryActions.dbUploadVideo(file, fileName, thumbnail)),
    deleteVideo: (id: string) => dispatch(imageGalleryActions.dbDeletedVideo(id)),
    getVideoGallery: () => dispatch(imageGalleryActions.dbGetVideoGallery()),
    showError: (message: string) => dispatch(globalActions.showMessage(message))

  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>) => {
  const uid = state.getIn(['authorize', 'uid'])
  const currentUser = userSelector.getUserProfileById(state, { userId: uid }).toJS() as User
  return {
    
    videos: state.getIn(['imageGallery', 'videos'], Map({})),
    avatar: currentUser ? currentUser.avatar : ''

  }
}

// - Connect component to redux store
const translateWrraper = withTranslation('translations')(VideoGalleryComponent as any)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(videoGalleryStyles as any)(translateWrraper as any) as any)
