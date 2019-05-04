import { Map } from 'immutable';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as userActions from 'src/store/actions/userActions';
import { userSelector } from 'store/reducers/users/userSelector';

import { IFindPeopleComponentProps } from './IFindPeopleComponentProps';

// - Import actions
/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IFindPeopleComponentProps) => {
  return {
    loadPeople: (page: number, limit: number) => dispatch(userActions.dbFetchFindPeople(page, limit)),
    increasePage: () => dispatch(userActions.increaseFindPagePeoplePage())
  }
}

const makeMapStateToProps = () => {
  const selectHasMorePeople = userSelector.selectMoreFindPeople()
  const selectFindPeople = userSelector.selectFindPeople()
  const selectPage = userSelector.selectFindPeoplePage()

  const mapStateToProps = (state: Map<string, any>) => {
    const hasMorePeople = selectHasMorePeople(state)
    const info = selectFindPeople(state)
    const page = selectPage(state)
    return {
      
      peopleInfo: info,
      hasMorePeople,
      page
    }
  }
  return mapStateToProps
}

export const connectFindPeople =
  (component: Component<IFindPeopleComponentProps>) => connect(makeMapStateToProps, mapDispatchToProps)(component as any)