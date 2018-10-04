// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Map } from 'immutable'
import config from 'src/config'
import InfiniteScroll from 'react-infinite-scroll-component'
import Measure from 'react-measure'
import { translate, Trans } from 'react-i18next'

// - Material-UI
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
import StackGrid, { transitions, easings } from 'react-stack-grid'

// - Import app components
import LoadMoreProgressComponent from 'src/layouts/loadMoreProgress'

// - Import actions
import * as postActions from 'src/store/actions/postActions'
import * as userActions from 'src/store/actions/userActions'
import * as globalActions from 'src/store/actions/globalActions'
import { IPhotoStreamProps } from './IPhotoStreamProps'
import { IPhotoStreamState } from './IPhotoStreamState'
import { User } from 'core/domain/users'
import { photoStreamStyles} from './photoStreamStyles'
import { connectPhotoStream } from './connectPhotoStream'
import { withRouter } from 'react-router'
import classNames from 'classnames'
import { Typography } from '@material-ui/core'
import PhotoGridComponent from 'layouts/photoGrid'
import { Photo } from 'core/domain/imageGallery/photo'

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
		const {classes, images, currentUser, currentAlbum} = this.props
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

    const { t, classes, images, hasMorePhotos, requestId } = this.props

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
const translateWrraper = translate('translations')(PhotoStreamComponent)

export default withRouter<any>(connectPhotoStream(withStyles(photoStreamStyles as any)(translateWrraper as any) as any)) as typeof PhotoStreamComponent