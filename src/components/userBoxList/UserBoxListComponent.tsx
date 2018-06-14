// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {Map} from 'immutable'

// - Import app components
import UserBox from 'components/userBox'

import { IUserBoxListComponentProps } from './IUserBoxListComponentProps'
import { IUserBoxListComponentState } from './IUserBoxListComponentState'
import { UserTie } from 'core/domain/circles/userTie'

// - Import API

// - Import actions

/**
 * Create component class
 */
export class UserBoxListComponent extends Component<IUserBoxListComponentProps,IUserBoxListComponentState> {

  static propTypes = {
        /**
         * List of users
         */
    users: PropTypes.object
  }

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
  constructor (props: IUserBoxListComponentProps) {
    super(props)

        // Defaul state
    this.state = {

    }

        // Binding functions to `this`

  }

  userList = () => {
    let { uid } = this.props
    const users = this.props.users
    const userBoxList: any[] = []
    if (users) {
       users.forEach((user: UserTie, key: string) => {
        if (uid !== key) {
          userBoxList.push(<UserBox key={key} userId={key} user={user}/>)
        }
      })
    }
    return userBoxList
  }

    /**
     * Reneder component DOM
     * @return {react element} return the DOM which rendered by component
     */
  render () {

    const styles = {

    }

    return (

                <div className='grid grid__1of4 grid__space-around'>
                  {this.userList()}
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
const mapDispatchToProps = (dispatch: Function, ownProps: IUserBoxListComponentProps) => {
  return {

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: IUserBoxListComponentProps) => {
  const uid = state.getIn(['authorize', 'uid'], 0)
  return {
    uid
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(UserBoxListComponent as any)
