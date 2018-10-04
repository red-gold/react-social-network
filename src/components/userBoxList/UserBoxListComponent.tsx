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
     *
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
       users.forEach((user) => {
         const userId = user!.get('userId') as string
        if (uid !== userId) {
          userBoxList.push(<UserBox key={userId} userId={userId} user={user!}/>)
        }
      })
    }
    return userBoxList
  }

    /**
     * Reneder component DOM
     * 
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
 */
const mapDispatchToProps = (dispatch: Function, ownProps: IUserBoxListComponentProps) => {
  return {

  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: any, ownProps: IUserBoxListComponentProps) => {
  const uid = state.getIn(['authorize', 'uid'], 0)
  return {
    uid
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(UserBoxListComponent as any)
