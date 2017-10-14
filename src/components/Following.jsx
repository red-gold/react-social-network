// - Import react components
import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

// - Import app components
import UserBoxList from 'UserBoxList'

// - Import API
import CircleAPI from 'CircleAPI'


// - Import actions

/**
* Create component class
 */
export class Following extends Component {

static propTypes = {

    }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props){
    super(props)

    //Defaul state
    this.state = {

    }

    // Binding functions to `this`

  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {
    
        return (
          <div>
            {(this.props.followingUsers && Object.keys(this.props.followingUsers).length !== 0 )? (<div>
              <div className='profile__title'>
                Following
                        </div>
                        <UserBoxList users={this.props.followingUsers} />
              <div style={{ height: '24px' }}></div>
             
              </div>) : (<div className='g__title-center'>
                 No following user!
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
  const mapDispatchToProps = (dispatch,ownProps) => {
    return{

    }
  }

  /**
   * Map state to props
   * @param  {object} state is the obeject from redux store
   * @param  {object} ownProps is the props belong to component
   * @return {object}          props of component
   */
  const mapStateToProps = (state,ownProps) => {
  const { uid } = state.authorize
  const circles = state.circle ? state.circle.userCircles[uid] : {}
  const followingUsers = CircleAPI.getFollowingUsers(circles)
  return {
    uid,
    circles,
    followingUsers,
    
  }
  }

  // - Connect component to redux store
  export default connect(mapStateToProps,mapDispatchToProps)(Following)