// - Import react components
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import { blue } from '@material-ui/core/colors';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import BackIcon from '@material-ui/icons/ArrowBack';
import ChatIcon from '@material-ui/icons/Chat';
import SvgDehaze from '@material-ui/icons/Dehaze';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import classNames from 'classnames';
import Notify from 'components/notify';
import RecentChatComponent from 'components/recentChat';
import SearchBoxComponent from 'components/searchBox';
import UserAvatarComponent from 'components/userAvatar';
import EditProfile from 'components/editProfile';
import { push } from 'connected-react-router';
import { User } from 'core/domain/users';
import { Map } from 'immutable';
import queryString from 'query-string';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import config from 'src/config';
import * as authorizeActions from 'store/actions/authorizeActions';
import * as chatActions from 'store/actions/chatActions';
import * as userActions from 'store/actions/userActions';
import { userSelector } from 'store/reducers/users/userSelector';

import { homeHeaderStyles } from './homeHeaderStyles';
import { IHomeHeaderComponentProps } from './IHomeHeaderComponentProps';
import { IHomeHeaderComponentState } from './IHomeHeaderComponentState';

// - Material UI
// - Import components
// - Import actions
// - Create HomeHeader component class
export class HomeHeaderComponent extends Component<IHomeHeaderComponentProps, IHomeHeaderComponentState> {

  /**
   * Fields
   */
  unlisten: any
  styles = {
    avatarStyle: {
      margin: 5,
      cursor: 'pointer'
    }

  }

  /**
   * Component constructor
   *
   */
  constructor(props: IHomeHeaderComponentProps) {
    super(props)

    // Default state
    this.state = {
      /**
       * User avatar popover is open if true
       */
      openAvatarMenu: false,
      /**
       * Show header title or not (true/false)
       */
      showTitle: true,
      /**
       * If true notification menu will be open
       */
      openNotifyMenu: false,
      /**
       * If true notification menu will be open
       */
      openRecentChatMenu: false,
      /**
       * Search text
       */
      searchText: '',
      /**
       * Whether current page is search page
       */
      isSearchPage: false,
      /**
       * The location of previous page before redirecting to the
       */
      previousLocation: '/'
    }

    // Binding functions to `this`
    this.onToggleSidebar = this.onToggleSidebar.bind(this)
    this.handleCloseNotify = this.handleCloseNotify.bind(this)
    this.checkPageLocation = this.checkPageLocation.bind(this)
    this.handleSearch = this.handleSearch.bind(this)

  }

  /**
   * Handle close notification menu
   */
  handleCloseNotify = () => {
    this.setState({
      anchorElNotify: null,
      openNotifyMenu: false
    })
  }

  /**
   * Handle close avatar menu
   */
  handleCloseAvatarMenu = () => {
    this.setState({
      anchorElAvatar: null,
      openAvatarMenu: false
    })
  }

  /**
   * Handle close recent chat menu
   */
  handleCloseRecentChat = () => {
    const { closeRecentChat } = this.props
    closeRecentChat!()
  }

  // On click toggle sidebar
  onToggleSidebar = () => {
    const { onToggleDrawer } = this.props
    onToggleDrawer()
  }

  /**
   * Handle notification touch
   */
  handleNotifyTouchTap = (event: any) => {
    // This prevents ghost click.
    event.preventDefault()

    this.setState({
      openNotifyMenu: true,
      anchorElNotify: event.currentTarget
    })
  }

  /**
   * Handle notification touch
   */
  handleAvatarTouchTap = (event: any) => {
    // This prevents ghost click.
    event.preventDefault()

    this.setState({
      openAvatarMenu: true,
      anchorElAvatar: event.currentTarget
    })
  }

  /**
   * Handle notification touch
   */
  handleRecentChatTouchTap = (event: any) => {
    // This prevents ghost click.
    event.preventDefault()
    const { openRecentChat } = this.props
    openRecentChat!()
    this.setState({
      anchorElRecentChat: event.currentTarget
    })
  }

  /**
   * Handle search on change
   */
  handleChange = (prop: any) => (event: any) => {
    this.setState({ [prop]: event.target.value })
  }

  /**
   * Handle logout user
   */
  handleLogout = () => {
    this.props.logout!()
  }

  /**
   * Handle resize event for window to manipulate home header status
   */
  handleResize = (event: any) => {
    const { drawerStatus } = this.props
    // Set initial state
    let width = window.innerWidth

    if (width >= 600 && !drawerStatus) {
      this.onToggleSidebar()
    } else if (width < 600) {

    }
  }

  /**
   * Handle search
   */
  handleSearch() {
    const {goTo} = this.props
    if (goTo) {
      goTo('/search?q=')
    }
  }

  /**
   * Check page location
   */
  checkPageLocation(nextLocation: any) {
    const { location } = this.props
    const nextParams: { q: string } = queryString.parse(nextLocation.search) as any
    const params: { q: string } = queryString.parse(location.search)  as any
    const isPreviousSearch = (params !== undefined && params.q !== undefined)
    const nextState = {
      isSearchPage: (nextParams !== undefined && nextParams.q !== undefined),
    }
    if (!isPreviousSearch) {
      nextState['previousLocation'] = location.pathname
    }
    this.setState(nextState)
  }
  /**
   * Handle mouse down prevent default
   */
  handleMouseDown = (event: any) => {
    event.preventDefault()
  }

  componentDidMount() {
    const { history } = this.props
    this.unlisten = history.listen((location: any, action: any) => {
      this.checkPageLocation(location)
    })
    this.handleResize(null)
  }

  componentWillUnmount() {
    this.unlisten()
  }

  // Render app DOM component
  render() {
    const { classes, t, theme, recentChatOpen, myProfileAccountOpen } = this.props
    const { isSearchPage, previousLocation } = this.state
    const anchor = theme.direction === 'rtl' ? 'right' : 'left'

    const rightHeader = (
      <div className='homeHeader__right'>
        <Hidden smUp>
          <IconButton
            onClick={this.handleSearch}
            onMouseDown={this.handleMouseDown}
            className={classes.searchButton}
          >
            <SearchIcon style={{color: theme.palette.common.white}} />
          </IconButton>
        </Hidden>
        {/* Recent Chat Message */}

        {false ? (
          <Tooltip title={t!('header.recentChatTooltip')}>
            <IconButton onClick={this.handleRecentChatTouchTap}>
              <Badge className={classes.margin} badgeContent={4} color='primary'>
                <ChatIcon style={{color: theme.palette.common.white}} />
              </Badge>
            </IconButton>
          </Tooltip>)
          : (<Tooltip title={t!('header.recentChatTooltip')}>
            <IconButton onClick={this.handleRecentChatTouchTap}>
              <ChatIcon style={{color: theme.palette.common.white}} />
            </IconButton>
          </Tooltip>)}

        <RecentChatComponent open={recentChatOpen!} anchorEl={this.state.anchorElRecentChat} onRequestClose={this.handleCloseRecentChat} />

        {/* Notification */}

        {this.props.notifyCount! > 0 ? (
          <Tooltip title={t!('header.notificationTooltip')}>
            <IconButton onClick={this.handleNotifyTouchTap}>
              <div className='homeHeader__notify'>
                <div className='title'>{this.props.notifyCount}</div>
              </div>
            </IconButton>
          </Tooltip>)
          : (<Tooltip title={t!('header.notificationTooltip')}>
            <IconButton onClick={this.handleNotifyTouchTap}>
              <NotificationsIcon style={{color: theme.palette.common.white}} />
            </IconButton>
          </Tooltip>)}

        <Notify open={this.state.openNotifyMenu} anchorEl={this.state.anchorElNotify} onRequestClose={this.handleCloseNotify} />

        {/* User avatar*/}
        <UserAvatarComponent
          onClick={this.handleAvatarTouchTap}
          fullName={this.props.fullName!}
          fileName={this.props.avatar!}
          size={32}
          style={this.styles.avatarStyle}
        />

        <Menu
          open={this.state.openAvatarMenu}
          anchorEl={this.state.anchorElAvatar!}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          onClose={this.handleCloseAvatarMenu}>
          <MenuItem style={{ backgroundColor: 'white', color: blue[500], fontSize: '14px' }} onClick={this.props.openEditor} > {t!('header.myAccount')} </MenuItem>
          <MenuItem style={{ fontSize: '14px' }} onClick={this.handleLogout.bind(this)} > {t!('header.logout')} </MenuItem>

        </Menu>
        {myProfileAccountOpen ? (<EditProfile
            avatar={this.props.avatar ? this.props.avatar : ''}
            banner={this.props.banner ? this.props.banner : ''}
            fullName={this.props.fullName ? this.props.fullName : ''}
        />) : ''}
      </div>
    )

    return (

      <AppBar position='fixed' style={{backgroundColor: theme.palette.secondary.main}}>
        <Toolbar>
          {/* Left side */}
          {!isSearchPage
            ? (<IconButton onClick={this.onToggleSidebar} >
              <SvgDehaze style={{ cursor: 'pointer', color: theme.palette.common.white }} />
            </IconButton>)

            : (
              <NavLink to={previousLocation}>
                <IconButton >
                  <BackIcon style={{ cursor: 'pointer', color: theme.palette.common.white }} />
                </IconButton>
              </NavLink>
            )
          }

          {/* Header title */}
          {(isWidthDown('xs', this.props.width) && isSearchPage) ? '' : <img src={config.settings.appIcon} className={classes.appIcon} alt={config.settings.appName} />}
          {/* <Typography variant='h6' style={{ marginLeft: '15px', color: theme.palette.secondary.main }} >
            {config.settings.appName}
          </Typography> */}
          <div className='homeHeader__title-root'>
            <Hidden smDown>
              <div className={classNames(classes.pageTitle, { 'homeHeader__title-left': anchor === 'left', 'homeHeader__title-right': anchor === 'right' })}>{this.props.title}</div>
            </Hidden>
          </div>
          <div className={classes.fullBox}>

          <Hidden xsDown>

            <div className={classes.searchBox}>

              <SearchBoxComponent />
            </div>
          </Hidden>

          {
            isWidthDown('xs', this.props.width) && isSearchPage
              ? (
                <div className={classes.smallSearchBox}>
                  <SearchBoxComponent />
                </div>
              )
              : ''

          }
          </div>

          {
            isWidthDown('xs', this.props.width) && isSearchPage
              ? ''
              : rightHeader
          }
        </Toolbar>
      </AppBar >
    )
  }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch: Function, ownProps: IHomeHeaderComponentProps) => {
  return {
    logout: () => dispatch(authorizeActions.dbLogout()),
    openRecentChat: () => dispatch(chatActions.openRecentChat()),
    closeRecentChat: () => dispatch(chatActions.closeRecentChat()),
    goTo: (url: string) => dispatch(push(url)),
    openEditor: () => dispatch(userActions.openEditProfile())
  }
}

// - Map state to props
const mapStateToProps = (state: Map<string, any>, ownProps: IHomeHeaderComponentProps) => {
  const selectUser = userSelector.selectUserProfileById()
  const uid = state.getIn(['authorize', 'uid'], 0)
  const userNotifies: Map<string, any> = state.getIn(['notify', 'userNotifies'])
  let notifyCount = userNotifies
    ? userNotifies
      .filter((notification) => !notification.get('isSeen', false)).count()
    : 0
  const user = selectUser(state, { userId: uid }).toJS() as User
  return {

    avatar: user.avatar || '',
    fullName: user.fullName || '',
    title: state.getIn(['global', 'headerTitle'], ''),
    recentChatOpen: state.getIn(['chat', 'recentChatOpen'], false),
    notifyCount,
    myProfileAccountOpen: state.getIn(['user', 'openEditProfile'])
  }
}

// - Connect component to redux store
const translateWrraper = withTranslation('translations')(HomeHeaderComponent as any)
const withStylesComponent = withStyles(homeHeaderStyles, { withTheme: true })(translateWrraper)
const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(withStylesComponent)
export default withRouter<any>(withWidth()(connectedComponent) as any)
