// - Import react components
import withStyles from '@material-ui/core/styles/withStyles';
import queryString from 'query-string';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router';

import { connectPhotoAlbum } from './connectPhotoAlbum';
import { IPhotoAlbumProps } from './IPhotoAlbumProps';
import { IPhotoAlbumState } from './IPhotoAlbumState';
import { photoAlbumStyles } from './photoAlbumStyles';

// - Material-UI
// - Import app components
// - Import actions
/**
 * Create component class
 */
export class PhotoAlbumComponent extends Component<IPhotoAlbumProps, IPhotoAlbumState> {

  /**
   * Fields
   */
  unlisten: any
  currentPage = 0

  /**
   * Component constructor
   *
   */
  constructor(props: IPhotoAlbumProps) {
    super(props)

    // Defaul state
    this.state = {

    }

    // Binding functions to `this`
    this.searchQuery = this.searchQuery.bind(this)
    this.executeSearch = this.executeSearch.bind(this)
    this.searchParam = this.searchParam.bind(this)

  }

  searchQuery(page: number) {
   const {location } = this.props
   this.executeSearch(location)
  }

  executeSearch(location: any) {
    const {search } = this.props
    const params: {q: string} = queryString.parse(location.search) as any
    search!(params.q, this.currentPage, 10)
    this.currentPage++
  }

  searchParam = () => {
    const params: {q: string} = queryString.parse(window.location.search) as any
    return params.q
  }

  componentDidMount() {
    const {history} = this.props
    const scope = this
    this.unlisten = history.listen((location: any, action: any) => {
      scope.currentPage = 0
      this.executeSearch(location)
    })
  }

  componentWillUnmount() {
    this.unlisten()
  }

  /**
   * Reneder component DOM
   * 
   */
  render() {


    return (
<div></div>
    )
  }
}

// - Connect component to redux store
const translateWrapper = withTranslation('translations')(PhotoAlbumComponent as any)

export default withRouter(connectPhotoAlbum(withStyles(photoAlbumStyles as any)(translateWrapper) as any) as any)