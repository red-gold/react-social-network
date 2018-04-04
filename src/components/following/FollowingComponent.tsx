// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import {Map} from 'immutable'

// - Import app components
import UserBoxList from 'components/userBoxList'

import { Circle } from 'core/domain/circles'

// - Import API
import { IFollowingComponentProps } from './IFollowingComponentProps'
import { IFollowingComponentState } from './IFollowingComponentState'

// - Import actions

/**
 * Create component class
 */
export class FollowingComponent extends Component<IFollowingComponentProps,IFollowingComponentState> {

  static propTypes = {

  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IFollowingComponentProps) {
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
    const followingUsers = Map(this.props.followingUsers!)
    return (
          <div>
            {(followingUsers && followingUsers.keySeq().count() !== 0 ) ? (<div>
              <div className='profile__title'>
                {translate!('people.followingLabel')}
                        </div>
                        <UserBoxList users={followingUsers} />
              <div style={{ height: '24px' }}></div>

              </div>) : (<div className='g__title-center'>
                 {translate!('people.noFollowingLabel')}
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
const mapDispatchToProps = (dispatch: any,ownProp: IFollowingComponentProps) => {
  return{

  }
}

  /**
   * Map state to props
   * @param  {object} state is the obeject from redux store
   * @param  {object} ownProps is the props belong to component
   * @return {object}          props of component
   */
const mapStateToProps = (state: Map<string, any>,ownProps: IFollowingComponentProps) => {

  const uid = state.getIn(['authorize', 'uid'], 0)
  const circles: { [circleId: string]: Circle } = state.getIn(['circle', 'circleList'], {})
  const followingUsers = state.getIn(['circle', 'userTies'], {})
  return {
    translate: getTranslate(state.get('locale')),
    uid,
    circles,
    followingUsers

  }
}

  // - Connect component to redux store
export default connect(mapStateToProps,mapDispatchToProps)(FollowingComponent as any)
