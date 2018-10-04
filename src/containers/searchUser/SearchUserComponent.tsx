// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Map } from 'immutable'
import queryString from 'query-string'
import { translate, Trans } from 'react-i18next'

// - Material UI
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

// - Import app components
import UserBoxList from 'components/userBoxList'
import LoadMoreProgressComponent from 'layouts/loadMoreProgress'

// - Import API

// - Import actions
import * as userActions from 'store/actions/userActions'
import { ISearchUserProps } from './ISearchUserProps'
import { ISearchUserState } from './ISearchUserState'
import { UserTie } from 'core/domain/circles/userTie'
import { connectSearchUser } from './connectSearchUser'
import SearchComponent from '../search'
import classNames from 'classnames'
import { searchUserStyles } from './searchUserStyles'
import { withRouter } from 'react-router-dom'

/**
 * Create component class
 */
export class SearchUserComponent extends Component<ISearchUserProps, ISearchUserState> {

  /**
   * Fields
   */
  unlisten: any
  nextPage = 0

  /**
   * Component constructor
   *
   */
  constructor(props: ISearchUserProps) {
    super(props)

    // Defaul state
    this.state = {

    }

  }

  searchQuery() {
    const { location } = this.props
    this.executeSearch(location)
  }

  executeSearch(location: any) {
    const { search } = this.props
    const params: { q: string } = queryString.parse(location.search)
    search!(params.q, this.nextPage, 10)
    this.nextPage++
  }

  searchParam = () => {
    const params: { q: string } = queryString.parse(location.search)
    return params.q
  }

  componentDidMount() {
    const { history } = this.props
    const scope = this
    this.unlisten = history.listen((location: any, action: any) => {
      scope.nextPage = 0
      this.executeSearch(location)
    })
    this.searchQuery()
  }

  componentWillUnmount() {
    this.unlisten()
  }

  /**
   * Reneder component DOM
   * 
   */
  render() {
    const { hasMorePeople, t, classes } = this.props
    const peopleInfo = this.props.peopleInfo!
    return (
      <SearchComponent tab='people'>
        <InfiniteScroll
          dataLength={peopleInfo ? peopleInfo.count() : 0}
          next={this.searchQuery}
          hasMore={hasMorePeople!}
          endMessage={
            <p style={{ textAlign: 'center' }}>
            </p>}
          loader={<LoadMoreProgressComponent key='find-people-load-more-progress' />}
        >
          <div className='tracks'>
            {peopleInfo && peopleInfo.count() > 0 ? (<div>
              <UserBoxList users={peopleInfo} />
              <div style={{ height: '24px' }}></div>
            </div>) : ''}
          </div>
        </InfiniteScroll>
        <div className={classNames({[classes.noDisplay]: !peopleInfo!.isEmpty() })}>
        <Typography className={classes.notFound}>
           {t!('search.notFoundUser', {query: this.searchParam()})}
          </Typography>
      </div>
      </SearchComponent>
    )
  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(SearchUserComponent)

export default withRouter<any>(connectSearchUser(withStyles(searchUserStyles as any)(translateWrraper as any) as any)) as typeof SearchUserComponent
