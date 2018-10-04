// - Import react components
import React, { Component } from 'react'
import classNames from 'classnames'
import Lightbox from 'src/lib/react-lit/index.js'
import ClearIcon from '@material-ui/icons/Clear'
import StackGrid, { transitions, easings } from 'react-stack-grid'

// - Material UI
import withStyles from '@material-ui/core/styles/withStyles'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import RaisedButton from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import StarBorderIcon from '@material-ui/icons/StarBorder'

import { photoGridStyles } from './photoGridStyles'
import { IPhotoGridProps } from './IPhotoGridProps'
import { IPhotoGridState } from './IPhotoGridState'
import PictureDialogComponent from 'layouts/pictureDialog'
import ImgCoverComponent from 'components/imgCover'

/**
 * Create component class
 */
export class PhotoGridComponent extends Component<IPhotoGridProps, IPhotoGridState> {

  /**
   * Component constructor
   */
  constructor(props: IPhotoGridProps) {
    super(props)

    // Defaul state

    this.state = {
      pictureDialogOpen: false
    }

    // Binding functions to `this`
    this.handleClosePictureDialog = this.handleClosePictureDialog.bind(this)
    this.handleOpenPictureDialog = this.handleOpenPictureDialog.bind(this)
    this.renderGrid = this.renderGrid.bind(this)
  }

  /**
   * Handle close picture dialog
   */
  handleClosePictureDialog = () => {
    this.setState({
      pictureDialogOpen: false
    })
  }

  /**
   * Handle open picture dialog
   */
  handleOpenPictureDialog = () => {
    this.setState({
      pictureDialogOpen: true
    })
  }

  /**
   * Render grid stack
   */
  renderGrid = (toggleLightbox: any) => {
    const { images, classes, onDelete, isOwner } = this.props
    const transition = transitions.scaleDown

    return (
      <StackGrid
        monitorImagesLoaded
        columnWidth={300}
        duration={600}
        gutterWidth={15}
        gutterHeight={15}
        easing={easings.cubicOut}
        appearDelay={60}
        appear={transition.appear}
        appeared={transition.appeared}
        enter={transition.enter}
        entered={transition.entered}
        leaved={transition.leaved}
      >

        {images.map((obj, index) => (
          <figure
            key={obj.src}
            className='image-stack'
          >
            <ImgCoverComponent src={obj.url} width={'300px'} height={'300px'}
              onClick={() => {
                console.log('index', index)
                toggleLightbox(index)
              }}
            />
            {/* <img src={obj.url} alt={obj.caption} /> */}
            {
              isOwner &&
              (<div className={classes.deleteIcon}>
              {obj.url !== undefined
                ? (<IconButton className={classes.icon} onClick={() => onDelete(obj)}>
                  <ClearIcon style={{ color: 'white' }} />
                </IconButton>)
                : <CircularProgress
                  className={classes.progress}
                  size={30}
                  style={{ color: 'white', marginLeft: 10 }}
                />}
            </div>)}
            <figcaption>{obj.caption}</figcaption>
          </figure>
        ))}
      </StackGrid>
    )
  }

  /**
   * Reneder component DOM
   */
  render() {
    const { images, classes, cols, onDelete } = this.props
    const { pictureDialogOpen } = this.state
    return (
      <Lightbox
        images={images}
        renderImageFunc={(toggleLightbox: any) => {
          return (
            <div className={classes.root}>
              {this.renderGrid(toggleLightbox)}
            </div>
          )
        }} />

    )
  }
}

// - Connect component to redux store
export default withStyles(photoGridStyles as any)(PhotoGridComponent as any) as typeof PhotoGridComponent
