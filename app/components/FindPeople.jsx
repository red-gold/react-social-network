// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'


// - Import app components
import UserBoxList from 'UserBoxList'


// - Import API


// - Import actions
import * as userActions from 'userActions'

/**
* Create component class
 */
export class FindPeople extends Component {

    static propTypes = {

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

    componentWillMount() {
        this.props.loadPeople()
    }
    /**
     * Reneder component DOM
     * @return {react element} return the DOM which rendered by component
     */
    render() {

        const styles = {
            paper: {
                height: 254,
                width: 243,
                margin: 10,
                textAlign: 'center',
                maxWidth: '257px'
            },
            followButton:{
                position: 'absolute',
                bottom: '8px',
                left: 0,
                right: 0
            }
        }

        return (
            <div>
                {this.props.peopleInfo && Object.keys(this.props.peopleInfo).length !== 0 ?  (<div>
                <div className='profile__title'>
                    Suggestions for you
                </div>
                <UserBoxList users={this.props.peopleInfo}/>
                <div style={{ height: '24px' }}></div>
                </div>) : (<div className='g__title-center'>
                Nothing to show! :(
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
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadPeople: () => dispatch(userActions.dbGetPeopleInfo())
    }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state, ownProps) => {
    return {
        peopleInfo: state.user.info
    }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(FindPeople)