// - Import react components
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import SvgClose from '@material-ui/icons/Close';
import UserAvatar from 'components/userAvatar';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as notifyActions from 'store/actions/notifyActions';

import { INotifyItemComponentProps } from './INotifyItemComponentProps';
import { INotifyItemComponentState } from './INotifyItemComponentState';

// - Import app components
// - Import API

// - Import actions
const styles = (theme: any) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  closeButton: {
    color: 'black',
    top: 20,
    right: 6
  },
  closeIcon: {
    width: 25, 
    height: 25,
    '&:hover': {
      color: '#868686'
    }
  },
  listItem: {
    backgroundColor: 'white',
    marginBottom: '6px',
    boxShadow: '0 1px 2px rgba(0,0,0,.2)',
    borderRadius: 5
  },
  itemGutter: {
    paddingLeft: 15
  },
  description: {
    color: 'rgba(0,0,0,0.54)',
    fontSize: 14,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%,'
  },
  userName: {
    color: 'rgba(0,0,0,0.87)',
    fontSize: 16,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  }
})

/**
 * Create component class
 */
export class NotifyItemComponent extends Component<INotifyItemComponentProps,INotifyItemComponentState> {

  static propTypes = {
        /**
         * Notification description
         */
    description: PropTypes.string,
        /**
         * Which user relates to the notification item
         */
    fullName: PropTypes.string,
        /**
         * Avatar of the user who relate to the notification item
         */
    avatar: PropTypes.string,
        /**
         * Notification identifier
         */
    id: PropTypes.string,
        /**
         * If user's seen the notification or not (true/false)
         */
    isSeen: PropTypes.bool,
        /**
         * Which address notification refers
         */
    url: PropTypes.string,
        /**
         * The notifier user identifier
         */
    notifierUserId: PropTypes.string,
        /**
         * Close notification popover
         */
    closeNotify: PropTypes.func
  }

    /**
     * Component constructor
     *
     */
  constructor (props: INotifyItemComponentProps) {
    super(props)

        // Defaul state
    this.state = {
    }

        // Binding functions to `this`
    this.handleSeenNotify = this.handleSeenNotify.bind(this)
  }

  handleSeenNotify = (event: any) => {
    event.preventDefault()
    const { seenNotify, id, url, goTo, isSeen, closeNotify } = this.props
    if (id) {
      if (!isSeen) {
        seenNotify!(id)
      }
      closeNotify!()
      goTo!(url)
    }
  }

    /**
     * Reneder component DOM
     * 
     */
  render () {
    let { description, fullName, avatar, isSeen, id, goTo,closeNotify, notifierUserId, url, deleteNotiy, classes } = this.props

    return (

        <ListItem key={notifierUserId} classes={{gutters: classes.itemGutter}} dense button className={classes.listItem} style={isSeen ? { opacity: 0.6 } : {}}>
              <NavLink
                        to={`/${notifierUserId}`}
                        onClick={(evt) => {
                          evt.preventDefault()
                          closeNotify!()
                          goTo!(`/${notifierUserId}`)
                        }}
                    >
                        <UserAvatar fullName={fullName} size={40} fileName={avatar} />
                    </NavLink>
              <ListItemText primary={<NavLink to={url} onClick={this.handleSeenNotify}>
                        <div className={classes.userName}>
                            {fullName}
                        </div>
                        <div className={classes.description}>
                            {description}
                        </div>
                    </NavLink>} />
              <ListItemSecondaryAction className={classes.closeButton}>
              <div onClick={() => deleteNotiy!(id)}>
                    <SvgClose className={classes.closeIcon} style={{ cursor: 'pointer' }} />
                </div>
              </ListItemSecondaryAction>
            </ListItem>

    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: INotifyItemComponentProps) => {
  return {
    goTo: (url: string) => dispatch(push(url)),
    seenNotify: (id: string) => dispatch(notifyActions.dbSeenNotification(id)),
    deleteNotiy: (id: string) => dispatch(notifyActions.dbDeleteNotification(id))
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: any, ownProps: INotifyItemComponentProps) => {
  return {

  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(NotifyItemComponent as any) as any )
