// - Import react components
import UserBoxList from 'components/userBoxList';
import LoadMoreProgressComponent from 'layouts/loadMoreProgress';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';

import { connectFindPeople } from './connectFindPeople';
import { IFindPeopleComponentProps } from './IFindPeopleComponentProps';
import { IFindPeopleComponentState } from './IFindPeopleComponentState';

// - Import app components
// - Import API

// - Import actions
/**
 * Create component class
 */
export class FindPeopleComponent extends Component<IFindPeopleComponentProps, IFindPeopleComponentState> {

  /**
   * Fields
   */
  nextPage = 0

    /**
     * Component constructor
     *
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
  scrollLoad = () => {
    const {loadPeople, page, increasePage} = this.props
    if (page !== undefined && loadPeople && increasePage) {
      loadPeople!(page, 10)
      increasePage()
    }
  }

  componentDidMount() {
    this.scrollLoad()
  }

    /**
     * Reneder component DOM
     * 
     */
  render () {
    const {hasMorePeople, t} = this.props
    const peopleInfo = this.props.peopleInfo!
    return (
            <div>
                <InfiniteScroll
                dataLength={peopleInfo ? peopleInfo.count() : 0}
                next={this.scrollLoad}
                hasMore={hasMorePeople!}
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                   
                  </p>}
                loader={<LoadMoreProgressComponent key='find-people-load-more-progress' />}
                >

                <div className='tracks'>

                {peopleInfo && peopleInfo.count() > 0 ? (<div>
                <div className='profile__title'>
                    {t!('people.suggestionsForYouLabel')}
                </div>
                <UserBoxList users={peopleInfo}/>
                <div style={{ height: '24px' }}></div>
                </div>) : (<div className='g__title-center'>
                {t!('people.nothingToShowLabel')}
               </div>)}
                </div>
            </InfiniteScroll>
            </div>
    )
  }
}

// - Connect component to redux store
const translateWrraper = withTranslation('translations')(FindPeopleComponent as any)

export default connectFindPeople(translateWrraper as any)
