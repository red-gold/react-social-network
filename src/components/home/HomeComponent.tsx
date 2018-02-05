// - Import react components
import { HomeRouter } from 'routes'
import React, { Component } from 'react'
import _ from 'lodash'
import { Route, Switch, withRouter, Redirect, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Menu from 'material-ui/Menu'
import { MenuList, MenuItem } from 'material-ui/Menu'
import { ListItemIcon, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import SvgArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import SvgHome from 'material-ui-icons/Home'
import SvgFeedback from 'material-ui-icons/Feedback'
import SvgSettings from 'material-ui-icons/Settings'
import SvgAccountCircle from 'material-ui-icons/AccountCircle'
import SvgPeople from 'material-ui-icons/People'
import config from 'src/config'
// - Import app components
import Sidebar from 'components/sidebar'
import StreamComponent from 'components/stream'
import HomeHeader from 'components/homeHeader'
import SidebarContent from 'components/sidebarContent'
import SidebarMain from 'components/sidebarMain'
import Profile from 'components/profile'
import PostPage from 'components/postPage'
import People from 'components/people'

// - Import API

// - Import actions
// - Import actions
import {
  authorizeActions,
  imageGalleryActions,
  postActions,
  commentActions,
  voteActions,
  userActions,
  globalActions,
  circleActions,
  notifyActions
} from 'actions'

import { IHomeComponentProps } from './IHomeComponentProps'
import { IHomeComponentState } from './IHomeComponentState'

// - Create Home component class
export class HomeComponent extends Component<IHomeComponentProps, IHomeComponentState> {

  // Constructor
  constructor (props: IHomeComponentProps) {
    super(props)

    // Default state
    this.state = {
      sidebarOpen: () => _,
      sidebarStatus: true,
      sidebarOverlay: false
    }

    // Binding function to `this`
    this.sidebar = this.sidebar.bind(this)
    this.sidebarStatus = this.sidebarStatus.bind(this)
    this.sidebarOverlay = this.sidebarOverlay.bind(this)
    this.handleCloseSidebar = this.handleCloseSidebar.bind(this)

  }

  /**
   * handle close sidebar
   */
  handleCloseSidebar = () => {
    this.state.sidebarOpen!(false, 'overlay')
  }

  /**
   * Change sidebar overlay status
   * @param  {boolean} status if is true, the sidebar is on overlay status
   */
  sidebarOverlay = (status: boolean) => {
    this.setState({
      sidebarOverlay: status
    })
  }

  /**
   * Pass the function to change sidebar status
   * @param  {boolean} open  is a function callback to change sidebar status out of sidebar component
   */
  sidebar = (open: (status: boolean, source: string) => void) => {

    this.setState({
      sidebarOpen: open
    })
  }

  /**
   * Change sidebar status if is open or not
   * @param  {boolean} status is true, if the sidebar is open
   */
  sidebarStatus = (status: boolean) => {
    this.setState({
      sidebarStatus: status
    })
  }

  componentWillMount () {
    const { global, clearData, loadData, authed, defaultDataEnable, isVerifide, goTo } = this.props
    if (!authed) {
      goTo!('/login')
      return
    }
    if (!isVerifide) {
      goTo!('/emailVerification')

    } else if (!global.defaultLoadDataStatus) {

      clearData!()
      loadData!()
      defaultDataEnable!()
    }
  }

  /**
   * Render DOM component
   *
   * @returns DOM
   *
   * @memberof Home
   */
  render () {
    const HR = HomeRouter as any
    const { loaded, authed, loadDataStream, mergedPosts, hasMorePosts, showSendFeedback } = this.props
    return (
      <div id='home'>
        <HomeHeader sidebar={this.state.sidebarOpen} sidebarStatus={this.state.sidebarStatus} />
        <Sidebar overlay={this.sidebarOverlay} open={this.sidebar} status={this.sidebarStatus}>
          <SidebarContent>
            <MenuList style={{ color: 'rgb(117, 117, 117)', width: '210px' }}>
              {this.state.sidebarOverlay
                ? <div>
                  <MenuItem style={{ color: 'rgb(117, 117, 117)' }}>
                  <ListItemIcon>
                  <SvgArrowLeft viewBox='0 3 24 24' style={{ color: '#fff', marginLeft: '15px', width: '32px', height: '32px', cursor: 'pointer' }} />
                  </ListItemIcon>
                  <ListItemText inset
                  primary={<span style={{ color: 'rgb(117, 117, 117)' }}
                  className='sidebar__title'>{config.settings.appName}</span>} />
                </MenuItem>
                  <Divider /></div>
                : ''
              }

              <NavLink to='/'>
                <MenuItem style={{ color: 'rgb(117, 117, 117)' }}>
                  <ListItemIcon>
                    <SvgHome />
                  </ListItemIcon>
                  <ListItemText inset primary='Home' />
                </MenuItem>
              </NavLink>
              <NavLink to={`/${this.props.uid}`}>
                <MenuItem style={{ color: 'rgb(117, 117, 117)' }}>
                  <ListItemIcon>
                    <SvgAccountCircle />
                  </ListItemIcon>
                  <ListItemText inset primary='Profile' />
                </MenuItem>
              </NavLink>
              <NavLink to='/people'>
              <MenuItem style={{ color: 'rgb(117, 117, 117)' }}>
                  <ListItemIcon>
                    <SvgPeople />
                  </ListItemIcon>
                  <ListItemText inset primary='People' />
                </MenuItem>
              </NavLink>
              <Divider />
              <NavLink to='/settings'>
              <MenuItem style={{ color: 'rgb(117, 117, 117)' }}>
                  <ListItemIcon>
                    <SvgSettings />
                  </ListItemIcon>
                  <ListItemText inset primary='Settings' />
                </MenuItem>
              </NavLink>
              <MenuItem onClick={() => showSendFeedback!()} style={{ color: 'rgb(117, 117, 117)' }}>
                  <ListItemIcon>
                    <SvgFeedback />
                  </ListItemIcon>
                  <ListItemText inset primary='Send feedback' />
                </MenuItem>
              </MenuList>
          </SidebarContent>

          <SidebarMain>
            <HR enabled={loaded!} data={{ mergedPosts, loadDataStream, hasMorePosts }} />
          </SidebarMain>
        </Sidebar>

      </div>

    )
  }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch: any, ownProps: IHomeComponentProps) => {

  return {
    loadDataStream:
      (page: number, limit: number) => dispatch(postActions.dbGetPosts(page, limit)),
    loadData: () => {
      dispatch(postActions.dbGetPosts())
      dispatch(imageGalleryActions.dbGetImageGallery())
      dispatch(userActions.dbGetUserInfo())
      dispatch(notifyActions.dbGetNotifications())
      dispatch(circleActions.dbGetCircles())
      dispatch(circleActions.dbGetUserTies())
      dispatch(circleActions.dbGetFollowers())

    },
    clearData: () => {
      dispatch(imageGalleryActions.clearAllData())
      dispatch(postActions.clearAllData())
      dispatch(userActions.clearAllData())
      dispatch(notifyActions.clearAllNotifications())
      dispatch(circleActions.clearAllCircles())
      dispatch(globalActions.clearTemp())

    },
    defaultDataDisable: () => {
      dispatch(globalActions.defaultDataDisable())
    },
    defaultDataEnable: () => {
      dispatch(globalActions.defaultDataEnable())
    },
    goTo: (url: string) => dispatch(push(url)),
    showSendFeedback: () => dispatch(globalActions.showSendFeedback()),
    hideSendFeedback: () => dispatch(globalActions.hideSendFeedback())

  }

}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: IHomeComponentProps) => {
  const { authorize, global, user, post, imageGallery, notify, circle } = state
  const { uid } = authorize
  let mergedPosts = {}
  const circles = circle ? (circle.circleList || {}) : {}
  const followingUsers = circle ? circle.userTies : {}
  const posts = post.userPosts ? post.userPosts[authorize.uid] : {}
  const hasMorePosts = post.stream.hasMoreData
  Object.keys(followingUsers).forEach((userId) => {
    let newPosts = post.userPosts ? post.userPosts[userId] : {}
    _.merge(mergedPosts, newPosts)
  })
  _.merge(mergedPosts, posts)
  return {
    authed: authorize.authed,
    isVerifide: authorize.isVerifide,
    mainStyle: global.sidebarMainStyle,
    mergedPosts,
    global,
    hasMorePosts,
    loaded: user.loaded && imageGallery.loaded && notify.loaded && circle.loaded
  }
}

// - Connect component to redux store
export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(HomeComponent as any)) as typeof HomeComponent
