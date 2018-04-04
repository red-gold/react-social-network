// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import InfiniteScroll from 'react-infinite-scroller'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import {Map} from 'immutable'

// - Import app components
import UserBoxList from 'components/userBoxList'
import LoadMoreProgressComponent from 'layouts/loadMoreProgress'

// - Import API

// - Import actions
import * as userActions from 'store/actions/userActions'
import { IFindPeopleComponentProps } from './IFindPeopleComponentProps'
import { IFindPeopleComponentState } from './IFindPeopleComponentState'
import { UserTie } from 'core/domain/circles/userTie'

/**
 * Create component class
 */
export class FindPeopleComponent extends Component<IFindPeopleComponentProps, IFindPeopleComponentState> {

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
  constructor (props: IFindPeopleComponentProps) {
    super(props)

        // Defaul state
    this.state = {

    }

  }

  /**
   * Scroll loader
   */
  scrollLoad = (page: number) => {
    const {loadPeople} = this.props
    loadPeople!(page, 10)
  }

    /**
     * Reneder component DOM
     * @return {react element} return the DOM which rendered by component
     */
  render () {
    const {hasMorePeople, translate} = this.props
    const peopleInfo = Map<string, UserTie>(this.props.peopleInfo!)
    return (
            <div>
                <InfiniteScroll
                pageStart={0}
                loadMore={this.scrollLoad}
                hasMore={hasMorePeople}
                useWindow={true}
                loader={<LoadMoreProgressComponent key='find-people-load-more-progress' />}
                >

                <div className='tracks'>

                {peopleInfo && peopleInfo.count() > 0 ? (<div>
                <div className='profile__title'>
                    {translate!('people.suggestionsForYouLabel')}
                </div>
                <UserBoxList users={peopleInfo}/>
                <div style={{ height: '24px' }}></div>
                </div>) : (<div className='g__title-center'>
                {translate!('people.nothingToShowLabel')}
               </div>)}
                </div>
            </InfiniteScroll>
            </div>
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: any, ownProps: IFindPeopleComponentProps) => {
  return {
    loadPeople: (page: number, limit: number) => dispatch(userActions.dbGetPeopleInfo(page, limit))
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: IFindPeopleComponentProps) => {
  const people = state.getIn(['user', 'people'])
  const hasMorePeople = state.getIn(['user', 'people', 'hasMoreData' ], true)
  const info: Map<string, UserTie> = state.getIn(['user', 'info'])
  return {
    translate: getTranslate(state.get('locale')),
    peopleInfo: info,
    hasMorePeople
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(FindPeopleComponent as any)
