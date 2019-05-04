// - Import react components
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { recentChatItemStyles } from 'components/recentChatItem/recentChatItemStyles';
import UserAvatar from 'components/userAvatar';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as chatActions from 'store/actions/chatActions';

import { IRecentChatItemProps } from './IRecentChatItemProps';
import { IRecentChatItemState } from './IRecentChatItemState';

// - Import app components
// - Import API

// - Import actions
/**
 * Create component class
 */
export class RecentChatItemComponent extends Component<IRecentChatItemProps, IRecentChatItemState> {

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
    closeRecentChat: PropTypes.func
  }

  /**
   * Component constructor
   *
   */
  constructor(props: IRecentChatItemProps) {
    super(props)

    // Defaul state
    this.state = {
    }

    // Binding functions to `this`
    this.handleSeenRecentChat = this.handleSeenRecentChat.bind(this)
    this.handleSetCurrentChat = this.handleSetCurrentChat.bind(this)
  }

  handleSeenRecentChat = (event: any) => {
    event.preventDefault()
    const { seenRecentChat, id, url, goTo, isSeen, closeRecentChat } = this.props
    if (id) {
      if (!isSeen) {
        seenRecentChat!(id)
      }
      closeRecentChat!()
      goTo!(url)
    }
  }

  /**
   * Handle setting current chat
   */
  handleSetCurrentChat() {
    const { setCurrentChat, followerId, closeRecentChat } = this.props
    setCurrentChat!(followerId)
    closeRecentChat!()

  }

  /**
   * Reneder component DOM
   * 
   */
  render() {
    let { description, fullName, avatar, isSeen, goTo, closeRecentChat, followerId, classes } = this.props

    return (

      <ListItem key={followerId} dense button className={classes.listItem} onClick={this.handleSetCurrentChat} style={isSeen ? { opacity: 0.6 } : {}}>
        <NavLink
          to={`/${followerId}`}
          onClick={(evt) => {
            evt.preventDefault()
            closeRecentChat!()
            goTo!(`/${followerId}`)
          }}
        >
          <UserAvatar fullName={fullName} fileName={avatar} />
        </NavLink>
        <ListItemText primary={<div>
          <div className='user-name'>
            {fullName}
          </div>
          <div className='description'>
            {description}
          </div>
        </div>
        } />
      </ListItem>

    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any) => {
  return {
    goTo: (url: string) => dispatch(push(url)),
    setCurrentChat: (userId: string) => dispatch(chatActions.activePeerChatRoom(userId)),
    getChatOnce: (chatRoomId: string) => dispatch(chatActions.dbFetchChatMessageOnce(chatRoomId)),
    subscribeChat: (chatRoomId: string) => dispatch(chatActions.dbSubscribeChatMessage(chatRoomId)),
  }
}

/**
 * Map state to props
 */
const mapStateToProps = () => {
  return {
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(recentChatItemStyles)(RecentChatItemComponent as any))
