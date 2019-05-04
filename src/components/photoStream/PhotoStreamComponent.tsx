// - Import react components
import withStyles from '@material-ui/core/styles/withStyles';
import { Photo } from 'core/domain/imageGallery/photo';
import PhotoGridComponent from 'layouts/photoGrid';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import Measure from 'react-measure';
import { withRouter } from 'react-router';
import LoadMoreProgressComponent from 'src/layouts/loadMoreProgress';

import { connectPhotoStream } from './connectPhotoStream';
import { IPhotoStreamProps } from './IPhotoStreamProps';
import { IPhotoStreamState } from './IPhotoStreamState';
import { photoStreamStyles } from './photoStreamStyles';

// - Material-UI
// - Import app components
// - Import actions
/**
 * Create component class
 */
export class PhotoStreamComponent extends Component<IPhotoStreamProps, IPhotoStreamState> {

  /**
   * Fields
   */

  /**
   * Component constructor
   *
   */
  constructor(props: IPhotoStreamProps) {
    super(props)

    // Defaul state
    this.state = {
      lightboxIsOpen: false,
			currentImage: 0,
			width: -1
    }

    // Binding functions to `this`

  }

  loader = () => {
    const {loadPhotos} = this.props
    if (loadPhotos) {
      loadPhotos(0)
    }
	}

  /**
   * Handle delete photo
   */
  handleDelete = (file: Photo) => {
    const {deleteImage, onDelete} = this.props
    if (deleteImage) {
      deleteImage(file.id, file.fileName)
    }
    if (onDelete) {
      onDelete(file.id)
    }
  }

	/**
	 * Render gallery
	 */
	renderGallery = () => {
		const {images, currentUser, currentAlbum} = this.props
			const {width} = this.state
		return( 
		<Measure bounds onResize={(contentRect) => this.setState({ width: contentRect.bounds!.width })}>
        {
        ({measureRef}) => {
          if (width < 1 ) {
            return <div ref={measureRef}></div>
          }
          let columns = 1
          if (width >= 480) {
            columns = 2
          }
          if (width >= 1024) {
            columns = 3
          }
          if (width >= 1824) {
            columns = 4
          }
          return <div ref={measureRef}>
          <PhotoGridComponent  isOwner={(currentAlbum && currentUser) ? currentAlbum.ownerUserId === currentUser.userId : false}
          images={images} cols={columns} onDelete={this.handleDelete} /></div>
        }}
			</Measure>
			)
	}

  /**
   * Reneder component DOM
   * 
   */
  render() {

    const { images, hasMorePhotos } = this.props

    return (
      <InfiniteScroll
        dataLength={images ? images.length : 0}
        next={this.loader}
        hasMore={hasMorePhotos!}
        endMessage={
          ''
        }
        loader={<LoadMoreProgressComponent key='stream-load-more-progress' />}
      >
	 		{this.renderGallery()}
      </InfiniteScroll>

    )
  }
}

// - Connect component to redux store
const translateWrraper = withTranslation('translations')(PhotoStreamComponent as any)

export default withRouter<any>(connectPhotoStream(withStyles(photoStreamStyles as any)(translateWrraper as any) as any))