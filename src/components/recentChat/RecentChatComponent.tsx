// - Import react components
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Popover from '@material-ui/core/Popover';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import BackIcon from '@material-ui/icons/ArrowBack';
import classNames from 'classnames';
import { recentChatStyles } from 'components/recentChat/recentChatStyles';
import RecentChatItem from 'components/recentChatItem';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { IRecentChatProps } from './IRecentChatProps';
import { IRecentChatState } from './IRecentChatState';

// - Material-UI
// - Import app components
// - Import API

// - Import actions
/**
 * Create component class
 */
export class RecentChatComponent extends Component<IRecentChatProps, IRecentChatState> {

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
  constructor(props: IRecentChatProps) {
    super(props)

    // Defaul state
    this.state = {
      currentTab: 0
    }

    // Binding functions to `this`

  }

  notifyItemList = () => {
    let { onRequestClose, followers } = this.props

    let parsedDOM: any[] = []
    if (followers) {
      followers.forEach((follower, key) => {
        const followerId = follower!.get('userId')
        parsedDOM.push(
          <RecentChatItem
            key={key}
            description={follower!.get('description', '')}
            fullName={(follower!.get('fullName', ''))}
            avatar={(follower!.get('avatar', ''))}
            id={key!}
            isSeen={follower!.get('isSeen', false)}
            url={follower!.get('url', '#')}
            followerId={followerId}
            closeRecentChat={onRequestClose}
          />
        )
      })
    }
    return parsedDOM
  }
  handleChangeTab = (event: any, value: any) => {
    this.setState({ currentTab: value })
  }

  /**
   * Reneder component DOM
   */
  render() {
    let { open, anchorEl, onRequestClose, classes, t } = this.props
    const { currentTab } = this.state
    const noRecentChat = (
      <div className={classes.noData}>
        {t!('chat.noData')} </div>
    )
    const items = this.notifyItemList()
    return (

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onRequestClose}
        PaperProps={{ className: classNames(classes.fullPageXs, classes.paper) }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <IconButton className={classes.header} onClick={onRequestClose}>
          <BackIcon />
        </IconButton>
        <Tabs
          value={currentTab}
          indicatorColor='primary'
          textColor='primary'
          centered={true}
          fullWidth
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
          onChange={this.handleChangeTab}
        >
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label={t!('chat.contactsCaption')} />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label={t!('chat.recentlyCaption')}
            disabled />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label={t!('chat.groupsCaption')} disabled />
        </Tabs>
        {items.length > 0 ? <List className={classes.list} >{items}</List> : noRecentChat}
      </Popover>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IRecentChatProps) => {
  return {

  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IRecentChatProps) => {
  const followers = state.getIn(['circle', 'userTieds'], Map({}))

  return {
    
    notifications: state.getIn(['notify', 'userNotifies']),
    info: state.getIn(['user', 'entities']),
    followers
  }
}

// - Connect component to redux store
const translateWrraper = withTranslation('translations')(RecentChatComponent as any)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(recentChatStyles as any)(translateWrraper as any))
