// - Import react components
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import SvgDehaze from 'material-ui/svg-icons/image/dehaze'
import { green700, grey400, blue500 } from 'material-ui/styles/colors'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import EventListener, { withOptions } from 'react-event-listener'

// - Import components
import UserAvatarComponent from 'components/userAvatar'
import Notify from 'components/notify'

// - Import actions
import * as globalActions from 'actions/globalActions'
import { authorizeActions } from 'actions'
import { IHomeHeaderComponentProps } from './IHomeHeaderComponentProps'
import { IHomeHeaderComponentState } from './IHomeHeaderComponentState'

// - Create HomeHeader component class
export class HomeHeaderComponent extends Component<IHomeHeaderComponentProps,IHomeHeaderComponentState> {

  styles = {
    toolbarStyle: {
      transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
      boxSizing: 'border-box',
      fontFamily: 'Roboto, sans-serif',
      position: 'fixed',
      zIndex: '1101',
      width: '100%',
      top: '0px',
      boxShadow: '0 1px 8px rgba(0,0,0,.3)'
    },
    avatarStyle: {
      margin: 5,
      cursor: 'pointer'
    }

  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IHomeHeaderComponentProps) {
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
      this.props.sidebar!(false,'onToggle')

    } else {
      this.props.sidebar!(true,'onToggle')

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
    // This prevents ghost click.
    event.preventDefault()

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
      openAvatarMenu: false
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

    return (

      <Toolbar style={this.styles.toolbarStyle as any}>
        <EventListener
          target='window'
          onResize={this.handleResize}
          onKeyUp={this.handleKeyUp}
        />
        {/* Left side */}
        <ToolbarGroup firstChild={true}>

          <IconButton iconStyle={{ color: '#fff' }} onClick={this.onToggleSidebar} >
            <SvgDehaze style={{ color: '#fff', marginLeft: '15px', cursor: 'pointer' }} />
          </IconButton>
          {/* Header title */}
          <ToolbarTitle style={{ color: '#fff', marginLeft: '15px' }} text='Green' />
          {this.state.showTitle ? <div className='homeHeader__page'>{this.props.title}</div> : ''}
        </ToolbarGroup>
        <ToolbarGroup>

        </ToolbarGroup>

        {/* Notification */}
        <ToolbarGroup lastChild={true}>
          <div className='homeHeader__right'>
            {this.props.notifyCount! > 0 ? (<IconButton tooltip='Notifications' onTouchTap={this.handleNotifyTouchTap}>
              <div className='homeHeader__notify'>
                <div className='title'>{this.props.notifyCount}</div>
              </div>
            </IconButton>)

              : (<IconButton tooltip='Notifications' onTouchTap={this.handleNotifyTouchTap}>
                <NotificationsIcon color='rgba(255, 255, 255, 0.87)' />
              </IconButton>)}
              <Notify open={this.state.openNotifyMenu} anchorEl={this.state.anchorEl} onRequestClose={this.handleCloseNotify}/>

            {/* User avatar*/}
            <UserAvatarComponent
              onTouchTap={this.handleAvatarTouchTap}
              fullName={this.props.fullName!}
              fileName={this.props.avatar!}
              size={32}
              style={this.styles.avatarStyle}
            />
            <Popover
              open={this.state.openAvatarMenu}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
              onRequestClose={this.handleRequestClose}
            >
              <Menu>
                <MenuItem style={{ backgroundColor: 'white', color: blue500, fontSize: '14px' }} primaryText='MY ACCOUNT' />
                <MenuItem primaryText='LOGOUT' style={{ fontSize: '14px' }} onClick={this.handleLogout.bind(this)} />

              </Menu>
            </Popover>
          </div>
        </ToolbarGroup>

      </Toolbar>

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
export default connect(mapStateToProps, mapDispatchToProps)(HomeHeaderComponent as any)
