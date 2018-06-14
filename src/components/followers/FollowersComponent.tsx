// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import {Map} from 'immutable'

// - Import app components
import UserBoxList from 'components/userBoxList'

import { IFollowersComponentProps } from './IFollowersComponentProps'
import { IFollowersComponentState } from './IFollowersComponentState'
import { Circle } from 'core/domain/circles'

// - Import API

// - Import actions

/**
 * Create component class
 */
export class FollowersComponent extends Component<IFollowersComponentProps,IFollowersComponentState> {

  static propTypes = {

  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IFollowersComponentProps) {
    super(props)

    // Defaul state
    this.state = {

    }

    // Binding functions to `this`

  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {
    const {translate} = this.props
    const followers = this.props.followers!
    return (
          <div>
            {(followers && followers.keySeq().count() !== 0) ? (<div>
              <div className='profile__title'>
                {translate!('people.followersLabel')}
                        </div>
                        <UserBoxList users={followers} />
              <div style={{ height: '24px' }}></div>
              </div>)
              : (<div className='g__title-center'>
                 {translate!('people.noFollowersLabel')}
               </div>)}
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
const mapDispatchToProps = (dispatch: any,ownProps: IFollowersComponentProps) => {
  return{

  }
}

  /**
   * Map state to props
   * @param  {object} state is the obeject from redux store
   * @param  {object} ownProps is the props belong to component
   * @return {object}          props of component
   */
const mapStateToProps = (state: Map<string, any>,ownProps: IFollowersComponentProps) => {

  const uid = state.getIn(['authorize', 'uid'], 0)
  const circles: { [circleId: string]: Circle } = state.getIn(['circle', 'circleList'], {})
  const followers = state.getIn(['circle', 'userTieds'], {})
  return{
    translate: getTranslate(state.get('locale')),
    followers
  }
}

  // - Connect component to redux store
export default connect(mapStateToProps,mapDispatchToProps)(FollowersComponent as any)
