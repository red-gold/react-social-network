// - Import react components
import { HomeRouter } from 'routes'
import React, { Component } from 'react'
import _ from 'lodash'
import { Route, Switch, withRouter, Redirect, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import SvgArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import SvgHome from 'material-ui/svg-icons/action/home'
import SvgFeedback from 'material-ui/svg-icons/action/feedback'
import SvgSettings from 'material-ui/svg-icons/action/settings'
import SvgAccountCircle from 'material-ui/svg-icons/action/account-circle'
import SvgPeople from 'material-ui/svg-icons/social/people'

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
import CircleAPI from 'api/CircleAPI'

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

    const {global, clearData, loadData, authed, defaultDataEnable, isVerifide, goTo } = this.props
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
    const {loaded, authed, mergedPosts} = this.props
    return (
      <div id='home'>
        <HomeHeader sidebar={this.state.sidebarOpen} sidebarStatus={this.state.sidebarStatus} />
        <Sidebar overlay={this.sidebarOverlay} open={this.sidebar} status={this.sidebarStatus}>
          <SidebarContent>
            <Menu style={{ color: 'rgb(117, 117, 117)', width: '210px' }}>
              {this.state.sidebarOverlay
                ? <div><MenuItem onClick={this.handleCloseSidebar} primaryText={<span style={{ color: 'rgb(117, 117, 117)' }} className='sidebar__title'>Green</span>} rightIcon={<SvgArrowLeft viewBox='0 3 24 24' style={{ color: '#fff', marginLeft: '15px', width: '32px', height: '32px', cursor: 'pointer' }} />} /><Divider /></div>
                : ''
              }

              <NavLink to='/'><MenuItem primaryText='Home' style={{ color: 'rgb(117, 117, 117)' }} leftIcon={<SvgHome />} /></NavLink>
              <NavLink to={`/${this.props.uid}`}><MenuItem primaryText='Profile' style={{ color: 'rgb(117, 117, 117)' }} leftIcon={<SvgAccountCircle />} /></NavLink>
              <NavLink to='/people'><MenuItem primaryText='People' style={{ color: 'rgb(117, 117, 117)' }} leftIcon={<SvgPeople />} /></NavLink>
              <Divider />
              <NavLink to='/settings'><MenuItem primaryText='Settings' style={{ color: 'rgb(117, 117, 117)' }} leftIcon={<SvgSettings />} /></NavLink>
              <NavLink to='#'><MenuItem primaryText='Send feedback' style={{ color: 'rgb(117, 117, 117)' }} leftIcon={<SvgFeedback />} /></NavLink>
            </Menu>
          </SidebarContent>

          <SidebarMain>
            <HomeRouter enabled={loaded!} data={{mergedPosts}} />
          </SidebarMain>
        </Sidebar>

      </div>

    )
  }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch: any, ownProps: IHomeComponentProps) => {

  return {
    loadData: () => {
      dispatch(imageGalleryActions.dbGetImageGallery())
      dispatch(postActions.dbGetPosts())
      dispatch(userActions.dbGetUserInfo())
      dispatch(notifyActions.dbGetNotifications())
      dispatch(circleActions.dbGetCircles())

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
    goTo: (url: string) => dispatch(push(url))
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
  const circles = circle ? (circle.userCircles[uid] || {}) : {}
  const followingUsers = CircleAPI.getFollowingUsers(circles)
  const posts = post.userPosts ? post.userPosts[authorize.uid] : {}
  Object.keys(followingUsers).forEach((userId) => {
    let newPosts = post.userPosts ? post.userPosts[userId] : {}
    _.merge(mergedPosts,newPosts)
  })
  _.merge(mergedPosts,posts)
  return {
    authed: authorize.authed,
    isVerifide: authorize.isVerifide,
    mainStyle: global.sidebarMainStyle,
    mergedPosts,
    global,
    loaded: user.loaded && post.loaded && imageGallery.loaded && notify.loaded && circle.loaded
  }
}

// - Connect component to redux store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeComponent as any))
