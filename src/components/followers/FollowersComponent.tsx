// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'

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
    return (
          <div>
            {(this.props.followers && Object.keys(this.props.followers).length !== 0) ? (<div>
              <div className='profile__title'>
                {translate!('people.followersLabel')}
                        </div>
                        <UserBoxList users={this.props.followers} />
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
const mapStateToProps = (state: any,ownProps: IFollowersComponentProps) => {
  const {circle, authorize, server} = state
  const { uid } = state.authorize
  const circles: { [circleId: string]: Circle } = circle ? (circle.circleList || {}) : {}
  const followers = circle ? circle.userTieds : {}
  return{
    translate: getTranslate(state.locale),
    followers
  }
}

  // - Connect component to redux store
export default connect(mapStateToProps,mapDispatchToProps)(FollowersComponent as any)
