// - Import react components
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import SvgDehaze from 'material-ui-icons/Dehaze'
import { grey, blue } from 'material-ui/colors'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import Popover from 'material-ui/Popover'
import AppBar from 'material-ui/AppBar'
import Menu, { MenuList, MenuItem } from 'material-ui/Menu'
import Paper from 'material-ui/Paper'
import NotificationsIcon from 'material-ui-icons/Notifications'
import EventListener, { withOptions } from 'react-event-listener'
import Tooltip from 'material-ui/Tooltip'
import Typography from 'material-ui/Typography'
import { Manager, Target, Popper } from 'react-popper'
import { withStyles } from 'material-ui/styles'

// - Import components
import UserAvatarComponent from 'components/userAvatar'
import Notify from 'components/notify'

// - Import actions
import * as globalActions from 'actions/globalActions'
import { authorizeActions } from 'actions'
import { IHomeHeaderComponentProps } from './IHomeHeaderComponentProps'
import { IHomeHeaderComponentState } from './IHomeHeaderComponentState'

const styles = {
  root: {
    backgroundColor: '#a5792a'
  },
  flex: {
    flex: 1
  }
}

// - Create HomeHeader component class
export class HomeHeaderComponent extends Component<IHomeHeaderComponentProps, IHomeHeaderComponentState> {

  styles = {
    avatarStyle: {
      margin: 5,
      cursor: 'pointer'
    }

  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
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
      openNotifyMenu: false
    }

    // Binding functions to `this`
    this.onToggleSidebar = this.onToggleSidebar.bind(this)
    this.handleCloseNotify = this.handleCloseNotify.bind(this)

  }

  /**
   * Handle close notification menu
   *
   *
   * @memberof HomeHeader
   */
  handleCloseNotify = () => {
    this.setState({
      openNotifyMenu: false
    })
  }

  // On click toggle sidebar
  onToggleSidebar = () => {
    if (this.props.sidebarStatus) {
      this.props.sidebar!(false, 'onToggle')

    } else {
      this.props.sidebar!(true, 'onToggle')

    }
  }

  /**
   * Handle notification touch
   *
   *
   * @memberof HomeHeader
   */
  handleNotifyTouchTap = (event: any) => {
    // This prevents ghost click.
    event.preventDefault()

    this.setState({
      openNotifyMenu: true,
      anchorEl: event.currentTarget
    })
  }

  /**
   * Handle touch on user avatar for popover
   *
   *
   * @memberof HomeHeader
   */
  handleAvatarTouchTap = (event: any) => {
    this.setState({
      openAvatarMenu: true,
      anchorEl: event.currentTarget
    })
  }

  /**
   * Handle logout user
   *
   *
   * @memberof HomeHeader
   */
  handleLogout = () => {
    this.props.logout!()
  }

  /**
   * Handle close popover
   *
   *
   * @memberof HomeHeader
   */
  handleRequestClose = () => {
    this.setState({
      openAvatarMenu: false,
      anchorEl: null
    })
  }

  handleKeyUp = () => {
    // TODO: Handle key up on press ESC to close menu
  }

  /**
   * Handle resize event for window to manipulate home header status
   * @param  {event} evt is the event is passed by winodw resize event
   */
  handleResize = (event: any) => {

    // Set initial state
    let width = window.innerWidth

    if (width >= 600 && !this.state.showTitle) {
      this.setState({
        showTitle: true
      })

    } else if (width < 600 && this.state.showTitle) {

      this.setState({
        showTitle: false
      })
    }
  }

  componentDidMount () {
    this.handleResize(null)
  }

  // Render app DOM component
  render () {
    const { classes } = this.props
    return (

      <AppBar position='fixed' color='secondary'>
        <Toolbar>
          <EventListener
            target='window'
            onResize={this.handleResize}
            onKeyUp={this.handleKeyUp}
          />
          {/* Left side */}

          <IconButton onClick={this.onToggleSidebar} >
            <SvgDehaze color='primary' style={{ cursor: 'pointer' }} />
          </IconButton>
          {/* Header title */}
          <Typography type='title' color='primary' style={{ marginLeft: '15px' }} >
            Green
          </Typography>
          <div className='homeHeader__title-root'>
            {this.state.showTitle ? <div className='homeHeader__title'>{this.props.title}</div> : ''}
          </div>

          {/* Notification */}
          <div className='homeHeader__right'>
            <Manager>
              <Target>
                {this.props.notifyCount! > 0 ? (
                  <Tooltip title='Notifications'>
                    <IconButton onClick={this.handleNotifyTouchTap}>
                      <div className='homeHeader__notify'>
                        <div className='title'>{this.props.notifyCount}</div>
                      </div>
                    </IconButton>
                  </Tooltip>)
                  : (<Tooltip title='Notifications'>
                    <IconButton onClick={this.handleNotifyTouchTap}>
                      <NotificationsIcon style={{ color: 'rgba(255, 255, 255, 0.87)' }} />
                    </IconButton>
                  </Tooltip>)}
              </Target>
              <Notify open={this.state.openNotifyMenu} anchorEl={this.state.anchorEl} onRequestClose={this.handleCloseNotify} />
            </Manager>

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
              anchorEl={this.state.anchorEl!}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              onClose={this.handleRequestClose}>
              <MenuItem style={{ backgroundColor: 'white', color: blue[500], fontSize: '14px' }} > MY ACCOUNT </MenuItem>
              <MenuItem style={{ fontSize: '14px' }} onClick={this.handleLogout.bind(this)} > LOGOUT </MenuItem>

            </Menu>
          </div>

        </Toolbar>
      </AppBar >
    )
  }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch: Function, ownProps: IHomeHeaderComponentProps) => {
  return {
    logout: () => dispatch(authorizeActions.dbLogout())
  }
}

// - Map state to props
const mapStateToProps = (state: any, ownProps: IHomeHeaderComponentProps) => {

  let notifyCount = state.notify.userNotifies
    ? Object
      .keys(state.notify.userNotifies)
      .filter((key) => !state.notify.userNotifies[key].isSeen).length
    : 0
  return {
    avatar: state.user.info && state.user.info[state.authorize.uid] ? state.user.info[state.authorize.uid].avatar : '',
    fullName: state.user.info && state.user.info[state.authorize.uid] ? state.user.info[state.authorize.uid].fullName : '',
    title: state.global.headerTitle,
    notifyCount
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomeHeaderComponent as any) as any)
