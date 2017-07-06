// - Import react components
import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

// - Import app components
import UserBoxList from 'UserBoxList'

// - Import API


// - Import actions

/**
* Create component class
 */
export class Followers extends Component {

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
            {(this.props.followers && Object.keys(this.props.followers).length !==0) ? (<div>
              <div className='profile__title'>
                Followers
                        </div>
                        <UserBoxList users={this.props.followers} />
              <div style={{ height: '24px' }}></div>
              </div>) 
              : (<div className='g__title-center'>
                 No followers!
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
    return{
      followers: circles ? (circles['-Followers'] ? circles['-Followers'].users || {} : {}) : {}
    }
  }

  // - Connect component to redux store
  export default connect(mapStateToProps,mapDispatchToProps)(Followers)