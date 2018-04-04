// - Import react components
import { HomeRouter } from 'routes'
import { Map } from 'immutable'
import React, { Component } from 'react'
import _ from 'lodash'
import { Route, Switch, withRouter, Redirect, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import config from 'src/config'
import classNames from 'classnames'

import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
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
import List from 'material-ui/List'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Hidden from 'material-ui/Hidden'
import MenuIcon from 'material-ui-icons/Menu'

// - Import app components
import Sidebar from 'src/components/sidebar'
import StreamComponent from 'containers/stream'
import HomeHeader from 'src/components/homeHeader'
import SidebarContent from 'src/components/sidebarContent'
import SidebarMain from 'src/components/sidebarMain'
import Profile from 'containers/profile'
import PostPage from 'containers/postPage'
import People from 'containers/people'

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
} from 'src/store/actions'

import { IHomeComponentProps } from './IHomeComponentProps'
import { IHomeComponentState } from './IHomeComponentState'

const drawerWidth = 220
const styles = (theme: any) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    maxWidth: drawerWidth,
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    },
  },
  drawerPaperLarge: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      height: '100%',
    },
    top: 70,
    backgroundColor: '#fafafa',
    borderRight: 0
  },
  menu: {
    height: '100%',
  },
  content: {
    backgroundColor: 'transparent',
    width: '100%',
    flexGrow: 1,
    padding: theme.spacing.unit * 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  'content-left': {
    marginLeft: 0,
  },
  'content-right': {
    marginRight: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth
    }
  },
  'contentShift-right': {
    marginRight: 0,
    [theme.breakpoints.up('md')]: {
      marginRight: drawerWidth
    }
  }
})

// - Create Home component class
export class HomeComponent extends Component<IHomeComponentProps, IHomeComponentState> {

  // Constructor
  constructor(props: IHomeComponentProps) {
    super(props)

    // Default state
    this.state = {
      drawerOpen: false
    }

    // Binding function to `this`

  }

  /**
   * Handle drawer toggle
   */
  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }

  componentWillMount() {
    const { global, clearData, loadData, authed, defaultDataEnable, isVerifide, goTo } = this.props
    if (!authed) {
      goTo!('/login')
      return
    }
    if (!isVerifide) {
      goTo!('/emailVerification')

    } else if (!global.get('defaultLoadDataStatus')) {

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
  render() {
    const HR = HomeRouter
    const { loaded, authed, loadDataStream, mergedPosts, hasMorePosts, showSendFeedback, translate, classes, theme } = this.props
    const { drawerOpen } = this.state
    const drawer = (
      <>

      <NavLink to='/'>
        <MenuItem style={{ color: 'rgb(117, 117, 117)' }}>
          <ListItemIcon>
            <SvgHome />
          </ListItemIcon>
          <ListItemText inset primary={translate!('sidebar.home')} />
        </MenuItem>
      </NavLink>
      <NavLink to={`/${this.props.uid}`}>
        <MenuItem style={{ color: 'rgb(117, 117, 117)' }}>
          <ListItemIcon>
            <SvgAccountCircle />
          </ListItemIcon>
          <ListItemText inset primary={translate!('sidebar.profile')} />
        </MenuItem>
      </NavLink>
      <NavLink to='/people'>
        <MenuItem style={{ color: 'rgb(117, 117, 117)' }}>
          <ListItemIcon>
            <SvgPeople />
          </ListItemIcon>
          <ListItemText inset primary={translate!('sidebar.people')} />
        </MenuItem>
      </NavLink>
      <Divider />
      <NavLink to='/settings'>
        <MenuItem style={{ color: 'rgb(117, 117, 117)' }}>
          <ListItemIcon>
            <SvgSettings />
          </ListItemIcon>
          <ListItemText inset primary={translate!('sidebar.settings')} />
        </MenuItem>
      </NavLink>
      <MenuItem onClick={() => showSendFeedback!()} style={{ color: 'rgb(117, 117, 117)' }}>
        <ListItemIcon>
          <SvgFeedback />
        </ListItemIcon>
        <ListItemText inset primary={translate!('sidebar.sendFeedback')} />
      </MenuItem>
      </>
    )

    const anchor = theme.direction === 'rtl' ? 'right' : 'left'
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <HomeHeader onToggleDrawer={this.handleDrawerToggle} drawerStatus={this.state.drawerOpen} />
          <Hidden mdUp>
            <Drawer
              variant='temporary'
              open={this.state.drawerOpen}
              classes={{
                paper: classes.drawerPaper,
              }}
              onClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <div>
                <div className={classes.drawerHeader} />
                <MenuList style={{ color: 'rgb(117, 117, 117)', width: '210px' }}>
                  <Divider />
                  {drawer}
                </MenuList>
              </div>
            </Drawer>
          </Hidden>
          <Hidden smDown implementation='js'>
            <Drawer
              variant='persistent'
              open={this.state.drawerOpen}
              classes={{
                paper: classes.drawerPaperLarge,
              }}
            >
              <div>
                <MenuList className={classes.menu} style={{ color: 'rgb(117, 117, 117)', width: '210px' }}>
                  {drawer}
                </MenuList>
              </div>
            </Drawer>
          </Hidden>
          <main
            className={classNames(classes.content, classes[`content-${anchor}`], {
              [classes.contentShift]: drawerOpen,
              [classes[`contentShift-${anchor}`]]: drawerOpen,
            })}
          >
            <HR enabled={loaded!} data={{ mergedPosts, loadDataStream, hasMorePosts }} />
          </main>
        </div>
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
const mapStateToProps = (state: Map<string, any>, ownProps: IHomeComponentProps) => {
  const uid = state.getIn(['authorize', 'uid'], {})
  const global = state.get('global', {})
  let mergedPosts = Map({})
  const circles = state.getIn(['circle', 'circleList'], {})
  const followingUsers: Map<string, any> = state.getIn(['circle', 'userTies'], {})
  const posts = state.getIn(['post', 'userPosts', uid ], {})
  const hasMorePosts = state.getIn(['post', 'stream', 'hasMoreData' ], true)
  followingUsers.forEach((user, userId) => {
    let newPosts = state.getIn(['post', 'userPosts', userId], {})
   mergedPosts = mergedPosts.merge(newPosts)
  })
  mergedPosts = mergedPosts.merge(posts)
  return {
    authed: state.getIn(['authorize', 'authed'], false),
    isVerifide: state.getIn(['authorize', 'isVerifide'], false),
    translate: getTranslate(state.get('locale')),
    currentLanguage: getActiveLanguage(state.get('locale')).code,
    mergedPosts,
    global,
    hasMorePosts,
    loaded: state.getIn(['user', 'loaded']) && state.getIn(['imageGallery', 'loaded']) && state.getIn(['notify', 'loaded']) && state.getIn(['circle', 'loaded'])
  }
}

// - Connect component to redux store
export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(HomeComponent as any) as any)) as typeof HomeComponent
