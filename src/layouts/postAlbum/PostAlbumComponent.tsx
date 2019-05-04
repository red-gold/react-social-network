// - Import react components
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import NoAlbumIcon from '@material-ui/icons/SettingsSystemDaydream';
import classNames from 'classnames';
import PostPhotoGridComponent from 'layouts/postPhotoGrid';
import * as R from 'ramda';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Lightbox from 'src/lib/react-lit/index.js';
import { isArray } from 'util';

import { IPostAlbumProps } from './IPostAlbumProps';
import { IPostAlbumState } from './IPostAlbumState';
import { postAlbumStyles } from './postAlbumStyles';

// - Material UI
/**
 * Create component class
 */
export class PostAlbumComponent extends Component<IPostAlbumProps, IPostAlbumState> {

  /**
   * Component constructor
   */
  constructor(props: IPostAlbumProps) {
    super(props)

    // Defaul state

    this.state = {
    }

    // Binding functions to `this`
    this.handleImageClick = this.handleImageClick.bind(this)
  }

  /**
   * Handle image click
   */
  handleImageClick = (imageIndex: number, toggleLightbox: any) => {
    toggleLightbox(imageIndex)
  }

  shouldComponentUpdate(nextProps: IPostAlbumProps, nextState: IPostAlbumState) {
    if (R.equals(nextProps.images, this.props.images)) {
      return false
    }

    return true
  }

  /**
   * Reneder component DOM
   */
  render() {
    const { classes, images, currentAlbum } = this.props
    if (isArray(images) && images && images.length > 0) {
      const gridImages = images.slice(0, 4)
      return (
        <Lightbox
          images={images}
          renderImageFunc={(toggleLightbox: any) => {
            return (
              <div className={classes.root}>
                {
                  <PostPhotoGridComponent 
                  images={gridImages} 
                  onClick={(event: any, imageIndex: number) => this.handleImageClick(imageIndex, toggleLightbox)} />
                }
        
                  <div className={classNames(classes.titleContainer, { [classes.noDisplay]: !(currentAlbum && currentAlbum.album!.title) })}>
                    <div className={classes.aboveContainer} />
                    <div className={classes.bottomContainer} />
                    <NavLink to={`/u/${currentAlbum && currentAlbum.ownerUserId}/album/${currentAlbum && currentAlbum.id}`}>
                      <Typography className={classes.title}>{currentAlbum && currentAlbum.album!.title}</Typography>
                    </NavLink>
                  </div>
                </div>
            )
          }} />
      )

    } else {
      return (
        <div className={classes.noAlbum}>
          <NoAlbumIcon className={classes.noAlbumIcon} />
        </div>)
    }
  }
}

// - Connect component to redux store
export default withStyles(postAlbumStyles as any)(PostAlbumComponent as any)
