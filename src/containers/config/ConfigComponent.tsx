// - Import external components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { push } from 'connected-react-router'
import config from 'src/config'

import ReactMarkdown from 'react-markdown'
import { translate, Trans } from 'react-i18next'
import { Map } from 'immutable'

// - Material-UI
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import NotificationIcon from '@material-ui/icons/Notifications'
import KeyIcon from '@material-ui/icons/VpnKey'
import HomeIcon from '@material-ui/icons/Home'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
import MenuIcon from '@material-ui/icons/Menu'

// - Components
import Footer from 'layouts/footer'

// - Import actions
import * as authorizeActions from 'src/store/actions/authorizeActions'
import * as userSettingActions from 'src/store/actions/userSettingActions'

import { IConfigProps } from './IConfigProps'
import { IConfigState } from './IConfigState'
import { OAuthType } from 'src/core/domain/authorize'
import Grid from '@material-ui/core/Grid/Grid'
import CommonAPI from 'api/CommonAPI'
import Paper from '@material-ui/core/Paper'
import { localeDocs } from 'locales/localeDocs'
import { ConfigComponentType } from './configComponentType'
import NewPasswordComponent from 'containers/newPassword'
import { configStyles } from './configStyles'
import NotificationSettingComponent from '../notificationSetting'

// - Create Login component class
export class ConfigComponent extends Component<IConfigProps, IConfigState> {

  /**
   * Component constructor
   */
  constructor(props: IConfigProps) {
    super(props)
    this.state = {
      selectedItem: ConfigComponentType.ChangePassword,
      selectedText: '',
      mobileOpen: false
    }
  }

  handleChange = (value: number, text: string) => {
    this.setState({
      selectedItem: value,
      selectedText: text,
    })
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  componentDidMount() {
    const {getUserSetting} = this.props
    getUserSetting!()
  }

  /**
   * Reneder component DOM
   */
  render() {
    const { classes, t, homePage, currentLanguage, theme, userSetting } = this.props
    const menuList = (
      <div>
        <ListItem button onClick={() => this.handleChange(ConfigComponentType.ChangePassword, t!('config.changePasswordLabel'))}>
          <ListItemIcon>
            <KeyIcon />
          </ListItemIcon>
          <ListItemText primary={t!('config.changePasswordLabel')} />
        </ListItem>
        <ListItem button onClick={() => this.handleChange(ConfigComponentType.Notification, t!('config.notificationLabel'))}>
          <ListItemIcon>
            <NotificationIcon />
          </ListItemIcon>
          <ListItemText primary={t!('config.notificationLabel')} />
        </ListItem>
        <ListItem button onClick={() => { homePage!() }} >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={t!('config.homeLabel')} />
        </ListItem>
      </div>
    )

    const { selectedItem, selectedText } = this.state

    const drawer = (
      <Drawer
        variant='permanent'
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor={'left'}
      >
        <div className={classes.toolbar} >
        <img src={config.settings.logoHead} alt={config.settings.appName} className={classes.logo}/>
        </div>
        <Divider />
        <List>{menuList}</List>
      </Drawer>
    )
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} color='secondary'>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' noWrap>
                {selectedItem === ConfigComponentType.ChangePassword ? t!('config.changePasswordLabel') : selectedText}
              </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation='css'>
          <Drawer
            variant='permanent'
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classNames(classes.content, classes.fullBox)}>
          <div className={classes.toolbar} />
            <div className={classNames(classes.container, classes.fullBox)}>
            <div style={{height: 30}}></div>
              {selectedItem === ConfigComponentType.ChangePassword ? <NewPasswordComponent footerDisabled logoDisabled /> : <div></div>}
              {selectedItem === ConfigComponentType.Notification ? <NotificationSettingComponent userSetting={userSetting!} /> : <div></div>}
            </div>
        </main>
      </div>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IConfigProps) => {
  return {
    login: (email: string, password: string) => {
      dispatch(authorizeActions.dbLogin(email, password))
    },
    getUserSetting: () => dispatch(userSettingActions.dbFetchUserSetting()),
    loginWithOAuth: (type: OAuthType) => dispatch(authorizeActions.dbLoginWithOAuth(type)),
    homePage: () => {
      dispatch(push('/'))
    }
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IConfigProps) => {
  return {
    
    userSetting: state.get('userSetting')
  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(ConfigComponent as any)

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(configStyles as any, { withTheme: true })(translateWrraper as any) as any)) as typeof ConfigComponent
