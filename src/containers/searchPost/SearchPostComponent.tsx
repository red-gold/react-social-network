// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Map } from 'immutable'
import config from 'src/config'
import queryString from 'query-string'
import { translate, Trans } from 'react-i18next'

// - Material-UI
import withStyles from '@material-ui/core/styles/withStyles'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import RaisedButton from '@material-ui/core/Button'

// - Import app components
import StreamComponent from 'containers/stream'
import UserActivity from 'components/userActivity'
import ImgCover from 'components/imgCover'

// - Import actions
import * as postActions from 'src/store/actions/postActions'
import * as userActions from 'src/store/actions/userActions'
import * as globalActions from 'src/store/actions/globalActions'
import { ISearchPostProps } from './ISearchPostProps'
import { ISearchPostState } from './ISearchPostState'
import { User } from 'core/domain/users'
import { searchPostStyles } from './searchPostStyles'
import { userSelector } from 'store/reducers/users/userSelector'
import PostStreamComponent from '../postStream'
import { PostAPI } from 'api/PostAPI'
import { ServerRequestType } from 'constants/serverRequestType'
import StringAPI from 'api/StringAPI'
import { postSelector } from 'store/reducers/posts'
import SearchComponent from '../search'
import { connectSearchPost } from './connectSearchPost'
import { withRouter } from 'react-router'
import classNames from 'classnames'
import { Typography } from '@material-ui/core'

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

  searchQuery(page: number) {
   const {location } = this.props
   this.executeSearch(location)
  }

  executeSearch(location: any) {
    const {search } = this.props
    const params: {q: string} = queryString.parse(location.search)
    search!(params.q, this.currentPage, 10)
    this.currentPage++
  }

  searchParam = () => {
    const params: {q: string} = queryString.parse(location.search)
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

    const { t, classes, posts, hasMorePosts, requestId, search} = this.props

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
const translateWrraper = translate('translations')(SearchPostComponent)

export default withRouter<any>(connectSearchPost(withStyles(searchPostStyles as any)(translateWrraper as any) as any)) as typeof SearchPostComponent