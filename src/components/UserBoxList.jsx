// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


// - Import app components
import UserBox from 'UserBox'

// - Import API


// - Import actions

/**
* Create component class
 */
export class UserBoxList extends Component {

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
    constructor(props) {
        super(props)

        //Defaul state
        this.state = {

        }

        // Binding functions to `this`

    }

     userList = () => {
        let { users, uid } = this.props

        if (users) {
            return Object.keys(users).map((key, index) => {
                if(uid !== key)
                return <UserBox key={key} userId={key} user={users[key]}/>
            })
        }
    }


    /**
     * Reneder component DOM
     * @return {react element} return the DOM which rendered by component
     */
    render() {

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
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state, ownProps) => {
    const {uid} = state.authorize
    return {
        uid
    }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(UserBoxList)