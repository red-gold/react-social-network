// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Map } from 'immutable'
import config from 'src/config'
import queryString from 'query-string'
import { translate, Trans } from 'react-i18next'
import uuid from 'uuid'

// - Material-UI
import withStyles from '@material-ui/core/styles/withStyles'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import RaisedButton from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum'
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate'

// - Import app components
import StreamComponent from 'containers/stream'
import UserActivity from 'components/userActivity'
import ImgCover from 'components/imgCover'

// - Import actions
import * as postActions from 'src/store/actions/postActions'
import * as userActions from 'src/store/actions/userActions'
import * as globalActions from 'src/store/actions/globalActions'
import { IProfileAlbumProps } from './IProfileAlbumProps'
import { IProfileAlbumState } from './IProfileAlbumState'
import { User } from 'core/domain/users'
import { profileAlbumStyles } from './profileAlbumStyles'
import { connectProfileAlbum } from './connectProfileAlbum'
import { withRouter } from 'react-router'
import classNames from 'classnames'
import { Typography } from '@material-ui/core'
import { ActiveTabType } from 'components/ProfileAlbum/activeTabType'
import FileAPI from 'api/FileAPI'
import AlbumDialogComponent from 'components/albumDialog'
import AlbumStreamComponent from 'containers/albumStream'

/**
 * Create component class
 */
export class ProfileAlbumComponent extends Component<IProfileAlbumProps, IProfileAlbumState> {

  /**
   * Fields
   */
  selectedPhotos: {file: any, fileName: string}[] = []

  /**
   * Component constructor
   *
   */
  constructor(props: IProfileAlbumProps) {
    super(props)

    // Defaul state
    this.state = {
      activeTab: ActiveTabType.Album,
      acceptedFiles: [],
      rejectedFiles: [],
      albumDialogOpen: false
    }

    // Binding functions to `this`
    this.onDrop = this.onDrop.bind(this)
    this.onUploadAlbumChange = this.onUploadAlbumChange.bind(this)
    this.closeAlbumDialog = this.closeAlbumDialog.bind(this)
    this.openAlbumDialog = this.openAlbumDialog.bind(this)
    this.loadData = this.loadData.bind(this)

  }

  /**
   * Load albums
   */
  loadData(entryPage: number) {
    const {loadAlbums, page, increasePage, userId} = this.props
    if (loadAlbums && page !== undefined && increasePage) {
      loadAlbums(userId, page)
      increasePage()
    }
  }

  /**
   * Handle change tab
   */
  handleChangeTab = (event: any, activeTab: ActiveTabType) => {
    this.setState({ activeTab })
  }

  /**
   * Close album dialog
   */
  closeAlbumDialog = () => {
    const { closeAlbum } = this.props
    if (closeAlbum) {
      closeAlbum()
    }
  }

  /**
   * Open album dialog
   */
  openAlbumDialog = () => {
    const { openAlbum } = this.props
    if (openAlbum) {
      openAlbum()
    }
  }

  /**
   * Handle on change file upload
   */
  onUploadAlbumChange = (event: any) => {
    const { uploadImage } = this.props
    if (uploadImage) {
      const files: File[] = event.currentTarget.files
      const parsedFiles: {file: any, fileName: string}[] = []
      for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
        const file = files[fileIndex]
        const extension = FileAPI.getExtension(file.name)
        let fileName = (`${uuid()}.${extension}`)
        parsedFiles.push({file: URL.createObjectURL(file), fileName})
        uploadImage(file, fileName)
      }
      this.selectedPhotos = parsedFiles
      this.openAlbumDialog()
      event.currentTarget.value = null
    }
  }

  onDrop(acceptedFiles: any[], rejectedFiles: any[]) {
    this.setState({ acceptedFiles, rejectedFiles })
  }

  componentDidMount() {
    this.loadData(0)
  }

  /**
   * Reneder component DOM
   * 
   */
  render() {

    const { t, classes, albumDialogOpen, openAlbum, progress, posts, theme, isOwner, hasMoreAlbum, userId } = this.props
    const { activeTab } = this.state
    const albumOpen = (albumDialogOpen !== undefined) ? albumDialogOpen : false
    return (
      <>
        <div className={classes.card} >
          <Paper className={classes.paperContainer}>
            <div className={classes.root}>
              <Tabs
                value={activeTab}
                onChange={this.handleChangeTab}
                classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
              >
                {/* <Tab
                  value={ActiveTabType.Photos}
                  disableRipple
                  classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                  label={translate!('album.photos')}
                /> */}
                <Tab
                  disableRipple
                  value={ActiveTabType.Album}
                  classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                  label={t!('album.album')}
                />
              </Tabs>
              <input
                accept='image/*'
                className={classes.input}
                id='album-button-file'
                multiple
                onChange={this.onUploadAlbumChange}
                type='file'
              />
              {isOwner && (<div className={classes.header}>
                <label htmlFor='album-button-file'>
                  <Button component='span' color='primary'>
                    <PhotoAlbumIcon />
                    {t!('album.createAlbum')}
                  </Button>
                </label>
              </div>)}
             <AlbumStreamComponent posts={posts!} userId={userId} loadStream={this.loadData} hasMoreAlbum={hasMoreAlbum} />
            </div>
            {albumOpen ?  <AlbumDialogComponent 
            open={albumOpen}
            progress={progress!}
            photos={this.selectedPhotos}  
            onClose={this.closeAlbumDialog} /> : ''}
          </Paper>
        </div>
      </>
    )
  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(ProfileAlbumComponent)

export default withRouter<any>(connectProfileAlbum(withStyles(profileAlbumStyles as any, {withTheme: true})(translateWrraper as any) as any)) as typeof ProfileAlbumComponent