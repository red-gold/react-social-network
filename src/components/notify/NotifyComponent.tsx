// - Import react components
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Manager, Target, Popper } from 'react-popper'
import ClickAwayListener from 'material-ui/utils/ClickAwayListener'
import Grow from 'material-ui/transitions/Grow'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import { Map } from 'immutable'

// - Import app components
import NotifyItem from 'components/notifyItem'
// - Import API

// - Import actions
import * as userActions from 'store/actions/userActions'

import { INotifyComponentProps } from './INotifyComponentProps'
import { INotifyComponentState } from './INotifyComponentState'
import { Notification } from 'core/domain/notifications'

const styles = (theme: any) => ({
  root: {
    width: 360,
    maxWidth: 360,
    backgroundColor: '#efefef',
    minHeight: 376,
    display: 'flex',
  },
  noNotify: {
    color: '#888888',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '100%'
  },
  popperClose: {
    pointerEvents: 'none'
  },
  popperOpen: {
    zIndex: 1,
    maxWidth: 500,
    overflowY: 'auto'
  },
  popper: {
  },
  overflowHidden: {
    overflow: 'hidden'
  },
  list: {
    maxHeight: 380,
    overflowY: 'auto',
    width: '98%'

  },
  fullPageXs: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
      margin: 0,
      overflowY: 'auto'
    }
  }
})

/**
 * Create component class
 */
export class NotifyComponent extends Component<INotifyComponentProps, INotifyComponentState> {

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
  constructor (props: INotifyComponentProps) {
    super(props)

    // Defaul state
    this.state = {
    }

    // Binding functions to `this`

  }

  notifyItemList = () => {
    let { info, onRequestClose } = this.props
    let notifications: Map<string, Map<string, any>> = this.props.notifications!
    let parsedDOM: any[] = []
    if (notifications) {
      notifications.forEach((notification, key) => {
        const notifierUserId = notification!.get('notifierUserId')
        const userInfo = info!.get(notifierUserId)
        parsedDOM.push(
          <NotifyItem
            key={key}
            description={notification!.get('description', '')}
            fullName={(userInfo ? userInfo.fullName || '' : '')}
            avatar={(userInfo ? userInfo.avatar || '' : '')}
            id={key!}
            isSeen={notification!.get('isSeen', false)}
            url={notification!.get('url')}
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
  render () {
    let { open, anchorEl, onRequestClose, classes } = this.props
    const noNotify = ( 
    <div className={classes.noNotify}>
     All caught up! </div>
     )
    const items = this.notifyItemList()
    return (
      <Popper
        placement='bottom-start'
        eventsEnabled={open}
        className={classNames({ [classes.popperClose]: !open }, { [classes.popperOpen]: open })}
      >

        <ClickAwayListener onClickAway={onRequestClose}>
          <Grow in={open} >
          <Paper className={classNames(classes.root, { [classes.overflowHidden]: !open })} elevation={4} >

                {items.length > 0 ? <List className={classes.list} >{items}</List> : noNotify}

              </Paper>
          </Grow>
        </ClickAwayListener>
      </Popper>
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: any, ownProps: INotifyComponentProps) => {
  return {

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: Map<string, any>, ownProps: INotifyComponentProps) => {
  return {
    notifications: state.getIn(['notify', 'userNotifies']),
    info: state.getIn(['user', 'info'])
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(NotifyComponent as any) as any)
