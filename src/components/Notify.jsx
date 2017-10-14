// - Import react components
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'

// - Import app components
import NotifyItem from 'NotifyItem'
// - Import API

// - Import actions
import * as userActions from 'userActions'

/**
 * Create component class
 */
export class Notify extends Component {

  static propTypes = {
    /**
     * It will be true if the notification is open
     */
    open: PropTypes.bool,
    /**
     * Pass anchor element
     */
    anchorEl: PropTypes.any,
    /**
     * Fire to close notificaion 
     */
    onRequestClose: PropTypes.func,
    /**
     * If user's seen notification box or not (true/false)
     */
    isSeen: PropTypes.bool

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

  notifyItemList = () => {
    let { notifications, info, onRequestClose } = this.props
    let parsedDOM = []
    if (notifications) {
      Object.keys(notifications).forEach((key) => {
       const {notifierUserId} = notifications[key]
        parsedDOM.push(
          <NotifyItem
            key={key}
            description={(notifications[key] ? notifications[key].description || '' : '')}
            fullName={(info[notifierUserId] ? info[notifierUserId].fullName || '' : '')}
            avatar={(info[notifierUserId] ? info[notifierUserId].avatar || '' : '')}
            id={key}
            isSeen={(notifications[key] ? notifications[key].isSeen || false : false )}
            url={(notifications[key] ? notifications[key].url || '' : '')}
            notifierUserId={notifierUserId}
            closeNotify={onRequestClose}
          />
        )
      })
    }
    return parsedDOM
  }



  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {
    let { open, anchorEl, onRequestClose } = this.props

    return (
      <Popover
        className='homeHeader__notify-menu'
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        onRequestClose={onRequestClose}
      >
        <div className='container'>
          <div className='title'>Green </div>
          <div className='content'>
            {this.notifyItemList()}
          </div>
        </div>
      </Popover>

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
  return {
    notifications: state.notify.userNotifies,
    info: state.user.info
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(Notify)
