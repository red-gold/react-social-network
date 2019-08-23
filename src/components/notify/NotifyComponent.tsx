// - Import react components
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import Popover from '@material-ui/core/Popover'
import { Map } from 'immutable'

// - Import app components
import NotifyItem from 'components/notifyItem'
// - Import API

// - Import actions

import { INotifyComponentProps } from './INotifyComponentProps'
import { INotifyComponentState } from './INotifyComponentState'

import CommonAPI from 'api/CommonAPI'

const styles = (theme: any) => ({
  root: {
    width: 360,
    maxWidth: 360,
    backgroundColor: '#efefef',
    minHeight: 376,
    display: 'flex',
  },
  paper: {
    outline: 'none',
    position: 'absolute',
    minWidth: '16px',
    maxWidth: 'calc(100% - 32px)',
  },
  fullPageXs: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
      margin: 0,
      overflowY: 'auto',
      maxHeight: '100%',
      maxWidth: '100%',
      position: 'relative',
      top: '0 !important',
      left: '0 !important',
    }
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
    padding: 5,
    width: '100%'

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
   *
   */
  constructor(props: INotifyComponentProps) {
    super(props)

    // Defaul state
    this.state = {
    }

    // Binding functions to `this`

  }

  notifyItemList = () => {
    let { onRequestClose } = this.props
    let notifications: Map<string, any> = this.props.notifications!
    let parsedDOM: any[] = []
    if (notifications) {
      const sortedNotifications = CommonAPI.sortImmutable(notifications.toList())
      sortedNotifications.forEach((notification) => {
        const notifierUserId = notification!.get('notifierUserId')
        parsedDOM.push(
          <NotifyItem
            key={notification!.get('id')}
            description={notification!.get('description', '')}
            fullName={(notification!.getIn(['notifierProfile', 'fullName'], ''))}
            avatar={(notification!.getIn(['notifierProfile', 'avatar'], ''))}
            id={notification!.get('id')!}
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
   * 
   */
  render() {
    let { open, anchorEl, onRequestClose, classes, t } = this.props
    const noNotify = (
      <div className={classes.noNotify}>
        {t!('header.notification.emptyCaption')} </div>
    )
    const items = this.notifyItemList()
    return (

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onRequestClose}
        PaperProps={{ className: classNames(classes.paper) }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Paper className={classNames(classes.root, { [classes.overflowHidden]: !open })} elevation={4} >

          {items.length > 0 ? <List className={classes.list} >{items}</List> : noNotify}

        </Paper>
      </Popover>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: INotifyComponentProps) => {
  return {

  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: INotifyComponentProps) => {
  return {
    
    notifications: state.getIn(['notify', 'userNotifies']),
    info: state.getIn(['user', 'entities'])
  }
}

// - Connect component to redux store
const translateWrapper = withTranslation('translations')(NotifyComponent as any)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(translateWrapper as any) as any)
