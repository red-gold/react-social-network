// - Import react components
import React, { Component, RefObject } from 'react'
import { connect } from 'react-redux'

import { Map } from 'immutable'
import debounce from 'lodash/debounce'
import moment from 'moment/moment'
import { emojify } from 'react-emojione'
import { Picker, EmojiData } from 'emoji-mart'
import EventListener, { withOptions } from 'react-event-listener'
import classNames from 'classnames'
import uuid from 'uuid'
import { translate, Trans } from 'react-i18next'

// - Material-UI
import { withStyles } from '@material-ui/core/styles'
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth'
import BackIcon from '@material-ui/icons/ArrowBack'
import Hidden from '@material-ui/core/Hidden'
import Popover from '@material-ui/core/Popover'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import WorkIcon from '@material-ui/icons/Work'
import BeachAccessIcon from '@material-ui/icons/BeachAccess'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import Grow from '@material-ui/core/Grow'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Menu from '@material-ui/core/Menu'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import SearchIcon from '@material-ui/icons/Search'
import SendIcon from '@material-ui/icons/Send'
import MenuIcon from '@material-ui/icons/Menu'
import MoreIcon from '@material-ui/icons/MoreVert'
import EmojiIcon from '@material-ui/icons/SentimentSatisfied'
import * as Ramda from 'ramda'

// - Import app components
import ActivityProgress from 'layouts/activityProgress'
import ChatBodyComponent from 'components/chatBody'
import UserAvatar from 'components/userAvatar'

// - Import API

// - Import actions
import * as globalActions from 'store/actions/globalActions'
import * as chatActions from 'store/actions/chatActions'

import { IChatProps } from './IChatProps'
import { IChatState } from './IChatState'
import { chatStyles } from './chatStyles'
import { userSelector } from 'store/reducers/users/userSelector'
import { chatSelector } from 'store/reducers/chat/chatSelector'
import { Message } from 'core/domain/chat/message'
import { authorizeSelector } from 'store/reducers/authorize'
import { MessageType } from 'core/domain/chat/MessageType'
import { User } from 'core/domain/users'
import ChatRoomSettingComponent from 'components/chatRoomSetting'

const emojiOptions = {
  style: {
    height: 15,
    margin: 2,
  }
}

/**
 * Create component class
 */
export class ChatComponent extends Component<IChatProps, IChatState> {

  /**
   * Component constructor
   */
  constructor(props: IChatProps) {
    super(props)

    // Defaul state
    this.state = {
      newMessageCount: 0,
      searchText: '',
      settingDisplyed: false,
      messageText: '',
      anchorElCurrentUser: null,
      anchorElEmoji: null,
      leftSideDisabled: false,
      rightSideDisabled: false,
      smallSize: false,
      isMinimized: false
    }

    this.handleResize = debounce(this.handleResize, 200)

    // Binding functions to `this`
    this.sendMessage = this.sendMessage.bind(this)
    this.setCurrentChat = this.setCurrentChat.bind(this)
    this.handleRemoveHistory = this.handleRemoveHistory.bind(this)
    this.closeChatBox = this.closeChatBox.bind(this)
    this.handleToggleSetting = this.handleToggleSetting.bind(this)

  }

  /**
   * Send message
   */
  sendMessage(message: any) {
    const { messageText } = this.state
    const currentDate = moment().unix()
    const { currentUser, receiverUser, sendMessage, currentChatRoom } = this.props
    let translation: string | undefined = undefined

    const receiveLang =  Ramda.path(['translation', receiverUser!.userId!, 'input'], currentChatRoom) as string
    const sendLang =  Ramda.path(['translation', currentUser!.userId! || (currentUser! as any).id!, 'output'], currentChatRoom) as string
    if (receiveLang) {
      translation = receiveLang
    } else if (sendLang) {
      translation = sendLang
    }
    sendMessage!(new Message(
      uuid(),
      {
        [receiverUser!.userId || (receiverUser! as any).id]: true,
        [currentUser!.userId || (currentUser! as any).id]: true,
      },
      currentDate,
      messageText,
      currentChatRoom!.id,
      receiverUser!.userId || (receiverUser! as any).id,
      currentUser!.userId || (currentUser! as any).id,
      MessageType.Text,
      translation

    ))
    this.setState({
      messageText: ''
    })
  }

  /**
   * Handle search
   */
  handleSearch() {

  }

  /**
   * Handle display setting
   */
  handleToggleSetting = () => {
    this.setState((prevState, props) => {
      return { settingDisplyed: !prevState.settingDisplyed, anchorElCurrentUser: null }
    })
  }

  /**
   * Handle search on change
   */
  handleChange = (prop: any) => (event: any) => {
    this.setState({ [prop]: event.target.value })
  }

  /**
   * Handle mouse down prevent default
   */
  handleMouseDown = (event: any) => {
    event.preventDefault()
  }

  /**
   * Handle open current user menu
   */
  handleOpenCurrentUserMenu = (event: any) => {
    this.setState({ anchorElCurrentUser: event.currentTarget })
  }

  /**
   * Handle close current user menu
   */
  handleCloseCurrentUserMenu = () => {
    this.setState({ anchorElCurrentUser: null })
  }

  /**
   * Handle open emoji menu
   */
  handleOpenEmojiMenu = (event: any) => {
    this.setState({ anchorElEmoji: event.currentTarget })
  }

  /**
   * Handle close emoji menu
   */
  handleCloseEmojiMenu = () => {
    this.setState({ anchorElEmoji: null })
  }

  /**
   * Handle select emoji
   */
  handleSelectEmoji = (emoji: any, event: any) => {
    this.setState((prevState, props) => {
      const { messageText } = prevState
      return { messageText: messageText + emoji.native }

    })
  }

  /**
   * Toggle left side
   */
  toggleLeftSide = () => {
    this.setState((prevState, props) => {
      return { leftSideDisabled: !prevState.leftSideDisabled }
    })
  }

  /**
   * Toggle right side
   */
  toggleRightSide = () => {
    this.setState((prevState, props) => {
      return { rightSideDisabled: !prevState.rightSideDisabled }
    })
  }

  /**
   * Handle resize event on window
   */
  handleResize = () => {

    let width = window.innerWidth
    const { smallSize } = this.state
    if (width < 599.95) {
      this.setState({
        smallSize: true
      })
    } else {
      this.setState({
        smallSize: false
      })
    }
  }

  /**
   * Handle toggle minimize
   */
  toggleMinimize = () => {
    this.setState((prevState, props) => {
      return { isMinimized: !prevState.isMinimized, anchorElCurrentUser: null }
    })
  }

  /**
   * Handle contact menu
   */
  handleContactMenu = () => {
    const { smallSize } = this.state
    const { openRecentChat, width } = this.props
    if (isWidthDown('xs', width!)) {
      openRecentChat!()
    } else {

      this.toggleLeftSide()
    }
    this.setState({
      anchorElCurrentUser: null
    })
  }

  /**
   * Handle remove history
   */
  handleRemoveHistory() {
    const { removeChatHistory, currentChatRoom } = this.props
    if (removeChatHistory && currentChatRoom) {
      removeChatHistory(currentChatRoom.id)
      this.setState({ anchorElCurrentUser: null })
    }
  }

  /**
   * Handle key press
   */
  handleKeyPress() {

  }

  /**
   * Set current chat
   */
  setCurrentChat(recieverId: string) {
    const { setCurrentChat, } = this.props
    setCurrentChat!(recieverId)
  }

  /**
   * Contact list
   */
  contactList = () => {
    let { followers, classes, receiverUser } = this.props
    let parsedDOM: any[] = []
    if (followers) {
      followers.forEach((follower, key) => {
        const followerId = follower!.get('userId')
        parsedDOM.push(
          <ListItem onClick={() => this.setCurrentChat(followerId)} key={`chat-component-contact-user-${followerId}`} button
            className={classNames(classes.userItem, { [classes.activeUserItem]: receiverUser!.userId === followerId })}>
            <UserAvatar fullName={follower!.get('fullName', '')} size={30} fileName={follower!.get('avatar', '')} />
            <ListItemText classes={{ primary: classes.primaryText, secondary: classes.secondaryText }} primary={follower!.get('fullName', '')} secondary={''} />
          </ListItem>

        )
      })
    }
    return parsedDOM
  }

  /**
   * Close chat box
   */
  closeChatBox() {
    const { onToggle } = this.props
    this.setState({
      anchorElCurrentUser: null
    })
    onToggle!()
  }

  componentDidMount() {
    this.handleResize()
  }

  /**
   * Reneder component DOM
   */
  render() {

    const { t, classes, open, onToggle, chatMessages, receiverUser, currentUser, currentChatRoom } = this.props
    const { newMessageCount, smallSize, searchText, anchorElCurrentUser, anchorElEmoji, isMinimized,
      messageText, leftSideDisabled, rightSideDisabled, settingDisplyed } = this.state

    /**
     * Current user menu
     */
    const currentUserMenu = (
      <Popover
        id='current-user-menu-root'
        anchorEl={anchorElCurrentUser}
        open={Boolean(anchorElCurrentUser)}
        onClose={this.handleCloseCurrentUserMenu}
        PaperProps={{
          style: {
            maxHeight: 200 * 4.5,
            width: 100,
            boxShadow: '0 1px 4px 0 rgba(0,0,0,0.14)',

          },
        }}
      >
        <MenuItem className={classes.menuItem} key={'current-user-menu-root-contact'} onClick={this.handleContactMenu}>
          {t!('chat.contactsCaption')}
        </MenuItem>
        <MenuItem className={classes.menuItem} key={'current-user-menu-root-remove-history'} onClick={this.handleRemoveHistory}>
          {t!('chat.removeHistoryCaption')}
        </MenuItem>
        <MenuItem className={classes.menuItem} key={'current-user-menu-root-minimize'} onClick={this.toggleMinimize}>
          {
            !isMinimized ? t!('chat.minimizeMenu') : t!('chat.maximumMenu')
          }
        </MenuItem>
        <MenuItem className={classes.menuItem} key={'current-user-menu-root-setting'} onClick={this.handleToggleSetting}>
          {t!('chat.settingCaption')}
        </MenuItem>
        <MenuItem className={classes.menuItem} key={'current-user-menu-root-close'} onClick={this.closeChatBox}>
          {t!('chat.closeMenu')}
        </MenuItem>

      </Popover>
    )

    /**
     * Whether left side is close
     */
    const leftSideClose = leftSideDisabled || smallSize || isMinimized

    /**
     * Left chat side
     */
    const leftSide = (
      <Grid item sm={6} md={6} lg={6} xl={6}
        className={classNames(classes.leftSideChatRoot, { [classes.noDisplay]: leftSideClose })}>
        <ListItem classes={{container: classes.currentUserItem}} className={classNames(classes.userItem)}>
            <UserAvatar fullName={currentUser!.fullName} size={30} fileName={currentUser!.avatar} />
            <ListItemText classes={{ primary: classes.primaryText, secondary: classes.secondaryText }} primary={currentUser!.fullName} secondary={currentUser!.tagLine} />
            <ListItemSecondaryAction>
              <IconButton
                className={classes.moreMenu}
                onClick={this.toggleLeftSide}
              >
                <MenuIcon className={classes.moreMenuIcon} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <FormControl fullWidth component='li' className={classes.searchField}>
            <Input
              className={classes.searchInput}
              id='adornment-search'
              placeholder={t!('chat.searchText')}
              type={'text'}
              disableUnderline
              fullWidth
              value={searchText}
              onChange={this.handleChange('searchText')}
              startAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    onClick={this.handleSearch}
                    onMouseDown={this.handleMouseDown}
                  >
                    <SearchIcon className={classes.searchIcon} />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        <List className={classNames(classes.listContainer, classes.leftListContainer)}>
          
          {this.contactList()}
        </List>
      </Grid>
    )

    /**
     * Left chat side
     */
    const rightSide = (
      <Grid item xs={12} sm={leftSideClose ? 12 : 6} md={leftSideClose ? 12 : 6}
        lg={leftSideClose ? 12 : 6} xl={leftSideClose ? 12 : 6}
        className={classNames(classes.rightSideChatRoot, { [classes.noDisplay]: rightSideDisabled })}>
        <List className={classes.listContainer}>
          <ListItem className={classNames(classes.userItem, classes.receiverUserItem)}>
            <IconButton className={classes.header} onClick={onToggle}>
              <BackIcon />
            </IconButton>
            <UserAvatar fullName={receiverUser!.fullName} size={30} fileName={receiverUser!.avatar} />
            <ListItemText
              onClick={this.toggleMinimize}
              className={classes.receiverUserRoot}
              classes={{ primary: classes.primaryText, secondary: classNames(classes.secondaryText, classes.receiverSecondaryText) }}
              primary={receiverUser!.fullName} secondary={receiverUser!.tagLine || ''} />
            <ListItemSecondaryAction>
              <IconButton
                onClick={this.handleOpenCurrentUserMenu}
              >
                <MoreIcon className={classes.receiverMoreIcon} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          {currentUserMenu}
          <ChatBodyComponent currentUser={currentUser!} chatMessages={chatMessages!} />

          <li className={classNames(classes.sendMessageRoot, { [classes.noDisplay]: isMinimized })}>
            <FormControl fullWidth className={classes.messageField}>
              <Input
                className={classes.messageInput}
                id='adornment-password'
                placeholder={t!('chat.messageText')}
                type={'text'}
                disableUnderline
                fullWidth
                value={messageText}
                multiline
                rows={1}
                rowsMax={4}
                onChange={this.handleChange('messageText')}
                endAdornment={
                  <InputAdornment position='end'>
                    <EmojiIcon className={classes.emojiIcon} onClick={this.handleOpenEmojiMenu} />
                  </InputAdornment>
                }
              />
            </FormControl>
            <IconButton
              onClick={this.sendMessage}
              onMouseDown={this.handleMouseDown}
            >
              <SendIcon className={classes.sendIcon} />
            </IconButton>
          </li>
        </List>

      </Grid>
    )
    return (
      <Grid className={classNames(classes.fullPageXs, classes.root,
        { [classes.oneColumn]: leftSideClose || rightSideDisabled }, { [classes.rootMinimized]: isMinimized }, { [classes.noDisplay]: !open })} container spacing={24} >
        <EventListener
          target='window'
          onResize={this.handleResize}
        />

        <Popover
          open={Boolean(anchorElEmoji)}
          anchorEl={anchorElEmoji}
          onClose={this.handleCloseEmojiMenu}
          PaperProps={{ className: classNames(classes.fullPageEmojiXs, classes.paperEmoji) }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Picker emojiSize={20} onClick={this.handleSelectEmoji} showPreview={false} custom={[]} />
        </Popover>

        {leftSide}
        {settingDisplyed
          ? <ChatRoomSettingComponent
            open={settingDisplyed}
            onClose={this.handleToggleSetting}
            rightSideDisabled={rightSideDisabled}
            leftSideClose={leftSideClose}
            room={currentChatRoom!}
            currentUser={currentUser!}
             />
          : rightSide}
      </Grid>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IChatProps) => {

  return {
    sendMessage: (message: Message) => dispatch(chatActions.dbCreateChatMessage(message)),
    openRecentChat: () => dispatch(chatActions.openRecentChat()),
    closeRecentChat: () => dispatch(chatActions.closeRecentChat()),
    removeChatHistory: (roomId: string) => dispatch(chatActions.dbRemoveChatHistory(roomId)),
    setCurrentChat: (userId: string) => dispatch(chatActions.activePeerChatRoom(userId)),
  }
}

const makeMapStateToProps = () => {
  const selectCurrentReceiver = chatSelector.selectCurrentReceiver()
  const selectCurrentChatRoom = chatSelector.selectCurrentChatRoom()
  const selectCurrentMessages = chatSelector.selectCurrentMessages()
  const selectCurrentUser = authorizeSelector.selectCurrentUser()
  const mapStateToProps = (state: Map<string, any>, ownProps: IChatProps) => {
    const receiverUser: User = selectCurrentReceiver(state, {}).toJS()
    const followers = state.getIn(['circle', 'userTieds'], Map({}))
    return {
      
      receiverUser,
      chatMessages: selectCurrentMessages(state, { userId: receiverUser.userId }).toJS(),
      currentUser: selectCurrentUser(state).toJS(),
      currentChatRoom: selectCurrentChatRoom(state, ownProps).toJS(),
      recentChatOpen: state.getIn(['chat', 'recentChatOpen'], false),
      followers
    }
  }
  return mapStateToProps
}

// - Connect component to redux store
const translateWrraper = translate('translations')(ChatComponent)

export default connect(makeMapStateToProps, mapDispatchToProps)(withWidth({ resizeInterval: 200 })(withStyles(chatStyles as any)(translateWrraper as any) as any) as any)
