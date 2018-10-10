// - Import external components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import config from 'src/config'

import ReactMarkdown from 'react-markdown'
import { Map } from 'immutable'
import { translate, Trans } from 'react-i18next'

// - Material-UI
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
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
import LoginWrapperIcon from '@material-ui/icons/Assignment'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
import MenuIcon from '@material-ui/icons/Menu'

// - Components
import Footer from 'layouts/footer'

// - Import actions
import * as authorizeActions from 'src/store/actions/authorizeActions'
import { ILoginWrapperProps } from './ILoginWrapperProps'
import { ILoginWrapperState } from './ILoginWrapperState'
import { OAuthType } from 'src/core/domain/authorize'
import Grid from '@material-ui/core/Grid/Grid'
import CommonAPI from 'api/CommonAPI'
import Paper from '@material-ui/core/Paper'
import { localeDocs } from 'locales/localeDocs'
import { loginWrapperStyles } from './loginWrapperStyles'
import LoginComponent from '../login'

// - Create Login component class
export class LoginWrapperComponent extends Component<ILoginWrapperProps, ILoginWrapperState> {

  /**
   * Component constructor
   */
  constructor(props: ILoginWrapperProps) {
    super(props)
    this.state = {
    }
  }

  /**
   * Reneder component DOM
   */
  render() {
    const { classes, t, signupPage, currentLanguage, theme, children } = this.props

    return (
      <div className={classes.root}>
        <div className={classes.appbar}>
          <img src={config.settings.logo} alt={config.settings.appName} className={classes.logo}/>
        </div>
        <div className={classes.pageContainer}>
          <div className={classNames(classes.centerRoot, 'animate-bottom')}>
            <div className={classes.centerContainer}>
              <div className={classNames(classes.contain, classes.pageItem)}>
                <LoginComponent />
              </div>
             
            </div>
          </div>
          <div style={{height: 30}}></div>          
          <Footer />

        </div>
      </div>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: ILoginWrapperProps) => {
  return {
    signupPage: () => {
      dispatch(push('/signup'))
    }
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: ILoginWrapperProps) => {
  return {
    
  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(LoginWrapperComponent as any)
const styleWrapper = withStyles(loginWrapperStyles as any, { withTheme: true })(translateWrraper as any)
export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(styleWrapper as any)) as typeof LoginWrapperComponent
