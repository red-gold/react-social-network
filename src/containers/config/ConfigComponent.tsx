// - Import external components
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationIcon from '@material-ui/icons/Notifications';
import KeyIcon from '@material-ui/icons/VpnKey';
import classNames from 'classnames';
import { push } from 'connected-react-router';
import NewPasswordComponent from 'containers/newPassword';
import { Map } from 'immutable';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import config from 'src/config';
import { OAuthType } from 'src/core/domain/authorize';
import * as authorizeActions from 'src/store/actions/authorizeActions';
import * as userSettingActions from 'src/store/actions/userSettingActions';

import NotificationSettingComponent from '../notificationSetting';
import { ConfigComponentType } from './configComponentType';
import { configStyles } from './configStyles';
import { IConfigProps } from './IConfigProps';
import { IConfigState } from './IConfigState';

// - Material-UI
// - Components
// - Import actions
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
    const { classes, t, homePage, theme, userSetting } = this.props
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
const mapStateToProps = (state: Map<string, any>) => {
  return {
    
    userSetting: state.get('userSetting')
  }
}

// - Connect component to redux store
const translateWrapper = withTranslation('translations')(ConfigComponent as any)

export default withRouter<any, any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(configStyles as any, { withTheme: true })(translateWrapper as any) as any))
