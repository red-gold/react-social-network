import { Map } from 'immutable';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as userActions from 'src/store/actions/userActions';
import { userSelector } from 'store/reducers/users/userSelector';

import { ISearchUserProps } from './ISearchUserProps';

// - Import actions
/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: ISearchUserProps) => {
  return {
    search: (query: string, page: number, limit: number) => dispatch(userActions.fetchUserSearch(query,page, limit))
  }
}

const makeMapStateToProps = () => {
  const selectHasMorePeople = userSelector.selectMoreSearchPeople()
  const selectFindPeople = userSelector.selectSearchPeople()

  const mapStateToProps = (state: Map<string, any>, ownProps: ISearchUserProps) => {
    const hasMorePeople = selectHasMorePeople(state)
    const info = selectFindPeople(state)
    return {
      
      peopleInfo: info,
      hasMorePeople
    }
  }
  return mapStateToProps
}

export const connectSearchUser =
  (component: Component<ISearchUserProps>) => connect(makeMapStateToProps, mapDispatchToProps)(component as any)