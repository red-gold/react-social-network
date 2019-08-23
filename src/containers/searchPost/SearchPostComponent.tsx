// - Import react components
import { Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import queryString from 'query-string';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router';

import PostStreamComponent from '../postStream';
import SearchComponent from '../search';
import { connectSearchPost } from './connectSearchPost';
import { ISearchPostProps } from './ISearchPostProps';
import { ISearchPostState } from './ISearchPostState';
import { searchPostStyles } from './searchPostStyles';

// - Material-UI
// - Import actions
/**
 * Create component class
 */
export class SearchPostComponent extends Component<ISearchPostProps, ISearchPostState> {

  /**
   * Fields
   */
  unlisten: any
  currentPage = 0

  /**
   * Component constructor
   *
   */
  constructor(props: ISearchPostProps) {
    super(props)

    // Defaul state
    this.state = {

    }

    // Binding functions to `this`
    this.searchQuery = this.searchQuery.bind(this)
    this.executeSearch = this.executeSearch.bind(this)
    this.searchParam = this.searchParam.bind(this)

  }

  searchQuery() {
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
    this.unlisten = history.listen((location: any) => {
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

    const { t, classes, posts, hasMorePosts, requestId} = this.props

    return (

      <SearchComponent tab='posts'>
      <div className={classNames({[classes.noDisplay]: posts!.isEmpty() })}>
      <PostStreamComponent
          posts={posts}
          requestId={requestId}
          loadStream={this.searchQuery}
          hasMorePosts={hasMorePosts}
          displayWriting={false} />
      </div>
      <div className={classNames({[classes.noDisplay]: !posts!.isEmpty() })}>
        <Typography className={classes.notFound}>
           {t!('search.notFoundPost', {query: this.searchParam()})}
          </Typography>
      </div>
      </SearchComponent>
    )
  }
}

// - Connect component to redux store
const translateWrapper = withTranslation('translations')(SearchPostComponent as any)

export default withRouter<any, any>(connectSearchPost(withStyles(searchPostStyles as any)(translateWrapper as any) as any))