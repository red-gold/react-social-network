// - Import external components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import config from 'src/config'

import ReactMarkdown from 'react-markdown'
import {Map} from 'immutable'
import { translate, Trans } from 'react-i18next'

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
import DraftsIcon from '@material-ui/icons/Drafts'
import StarIcon from '@material-ui/icons/Star'
import SendIcon from '@material-ui/icons/Autorenew'
import CookieIcon from '@material-ui/icons/Fingerprint'
import PrivacyIcon from '@material-ui/icons/Https'
import TermsIcon from '@material-ui/icons/Assignment'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
import MenuIcon from '@material-ui/icons/Menu'

// - Components
import Footer from 'layouts/footer'

// - Import actions
import * as authorizeActions from 'src/store/actions/authorizeActions'
import { ITermsProps } from './ITermsProps'
import { ITermsState } from './ITermsState'
import { OAuthType } from 'src/core/domain/authorize'
import Grid from '@material-ui/core/Grid/Grid'
import CommonAPI from 'api/CommonAPI'
import Paper from '@material-ui/core/Paper'
import { localeDocs } from 'locales/localeDocs'
import { TermsType } from './termsType'
import { termsStyles } from './termsStyles'

// - Create Login component class
export class TermsComponent extends Component<ITermsProps, ITermsState> {

  /**
   * Component constructor
   */
  constructor(props: ITermsProps) {
    super(props)
    this.state = {
      selectedItem: TermsType.Terms,
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

  /**
   * Reneder component DOM
   */
  render() {
    const { classes, t, signupPage, currentLanguage, theme } = this.props
    const menuList = (
      <div>
        <ListItem button onClick={() => this.handleChange(TermsType.Terms, t!('terms.termsTitle'))}>
          <ListItemIcon>
            <TermsIcon />
          </ListItemIcon>
          <ListItemText primary={t!('terms.termsTitle')} />
        </ListItem>
        <ListItem button onClick={() => this.handleChange(TermsType.Privacy, t!('terms.privacyTitle'))}>
          <ListItemIcon>
            <PrivacyIcon />
          </ListItemIcon>
          <ListItemText primary={t!('terms.privacyTitle')} />
        </ListItem>
        <ListItem button onClick={() => this.handleChange(TermsType.Cookie, t!('terms.cookieTitle'))}>
          <ListItemIcon>
            <CookieIcon />
          </ListItemIcon>
          <ListItemText primary={t!('terms.cookieTitle')} />
        </ListItem>
        <ListItem button onClick={() => { signupPage!() }} >
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary={t!('terms.signUpTile')} />
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
        <AppBar className={classes.appBar}  color='secondary'>
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
                {selectedItem === TermsType.Terms ? t!('terms.termsTitle') : selectedText}
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
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Paper>
              <div className={classes.container}>
                {selectedItem === TermsType.Terms ? <Typography component='div'>  <ReactMarkdown source={localeDocs.getTerm(currentLanguage!)} /> </Typography> : <div></div>}
                {selectedItem === TermsType.Privacy ? <Typography component='div'>  <ReactMarkdown source={localeDocs.getPrivacyPolicy(currentLanguage!)} /> </Typography> : <div></div>}
                {selectedItem === TermsType.Cookie ? <Typography component='div'>  <ReactMarkdown source={localeDocs.getCookiePolicy(currentLanguage!)} /> </Typography> : <div></div>}
              </div>
            </Paper>
        </main>
      </div>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: ITermsProps) => {
  return {
    login: (email: string, password: string) => {
      dispatch(authorizeActions.dbLogin(email, password))
    },
    loginWithOAuth: (type: OAuthType) => dispatch(authorizeActions.dbLoginWithOAuth(type)),
    signupPage: () => {
      dispatch(push('/signup'))
    }
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: ITermsProps) => {
  return {
    
  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(TermsComponent as any)

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(termsStyles as any, {withTheme: true})(translateWrraper as any) as any)) as typeof TermsComponent
