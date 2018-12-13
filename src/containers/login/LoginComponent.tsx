// - Import external components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { push } from 'connected-react-router'
import config from 'src/config'

import { Map } from 'immutable'
import { translate, Trans } from 'react-i18next'
import classNames from 'classnames'

// - Material-UI
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import RaisedButton from '@material-ui/core/Button'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import ActionAndroid from '@material-ui/icons/Android'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'

// - Components
import Footer from 'layouts/footer'

// - Import actions
import * as authorizeActions from 'src/store/actions/authorizeActions'
import { ILoginComponentProps } from './ILoginComponentProps'
import { ILoginComponentState } from './ILoginComponentState'
import { OAuthType } from 'src/core/domain/authorize'
import Grid from '@material-ui/core/Grid/Grid'
import CommonAPI from 'api/CommonAPI'
import StringAPI from 'api/StringAPI'
import { ServerRequestType } from 'constants/serverRequestType'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'
import { loginStyles } from './loginStyles'

// - Create Login component class
export class LoginComponent extends Component<ILoginComponentProps, ILoginComponentState> {

  styles = {
    singinOptions: {
      paddingBottom: 10,
      justifyContent: 'space-around',
      display: 'flex'
    },
    divider: {
      marginBottom: 10,
      marginTop: 15
    }
  }

  /**
   * Component constructor
   *
   */
  constructor(props: ILoginComponentProps) {
    super(props)

    this.state = {
      emailInput: '',
      emailInputError: '',
      passwordInput: '',
      passwordInputError: '',
      confirmInputError: ''
    }

    // Binding function to `this`
    this.handleForm = this.handleForm.bind(this)

  }

  /**
   * Handle data on input change
   * @param  {event} evt is an event of inputs of element on change
   */
  handleInputChange = (event: any) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value
    })

    switch (name) {
      case 'emailInput':
        this.setState({
          emailInputError: ''
        })
        break
      case 'passwordInput':
        this.setState({
          confirmInputError: '',
          passwordInputError: ''
        })

        break
      default:

    }
  }

  /**
   * Handle register form
   */
  handleForm = () => {
    const { t } = this.props
    let error = false
    if (this.state.emailInput === '') {
      this.setState({
        emailInputError: t!('login.emailRequiredError')
      })
      error = true

    }
    if (this.state.passwordInput === '') {
      this.setState({
        passwordInputError: t!('login.passwordRequiredError')
      })
      error = true

    }

    if (!error) {
      this.props.login!(
        this.state.emailInput,
        this.state.passwordInput
      )
    }

  }

  /**
   * Reneder component DOM
   * 
   */
  render() {
    const { classes, loginWithOAuth, t, loginRequest } = this.props
    const { emailInput } = this.state
    const OAuthLogin = (
      <div style={this.styles.singinOptions as any}>
        <IconButton
          onClick={() => loginWithOAuth!(OAuthType.FACEBOOK)}
        ><div className='icon-fb icon'></div></IconButton>
        <IconButton
          onClick={() => loginWithOAuth!(OAuthType.GOOGLE)}
        > <div className='icon-google icon'></div> </IconButton>
        <IconButton
          onClick={() => loginWithOAuth!(OAuthType.GITHUB)}
        > <div className='icon-github icon'></div> </IconButton>

      </div>
    )
    const loginRequestId = StringAPI.createServerRequestId(ServerRequestType.AuthLogin, emailInput)
    const loginRequestStatus = loginRequest!.get(loginRequestId, { status: ServerRequestStatusType.NoAction }).status
    const loading = loginRequestStatus === ServerRequestStatusType.Sent

    return (
      <form className={classes.paper}>
        <div className={classes.root}>
         
          {config.settings.enabledOAuthLogin ? OAuthLogin : ''}
          <Divider />
          <TextField
            className={classes.textField}
            color='secondary'
            autoFocus
            onChange={this.handleInputChange}
            helperText={this.state.emailInputError}
            error={this.state.emailInputError.trim() !== ''}
            name='emailInput'
            label={t!('login.emailLabel')}
            type='email'
            tabIndex={1}
          /><br />
          <TextField
            color='secondary'
            className={classes.textField}
            onChange={this.handleInputChange}
            helperText={this.state.passwordInputError}
            error={this.state.passwordInputError.trim() !== ''}
            name='passwordInput'
            label={t!('login.passwordLabel')}
            type='password'
            tabIndex={2}
          />
          <br />
          <br />
          <div className='login__button-box'>
            <div className={classes.wrapperButton}>
              <Button
                variant='contained'
                color='secondary'
                disabled={loading}
                onClick={this.handleForm}
                fullWidth
                tabIndex={3}
              >
                {t!('login.loginButton')}
              </Button>
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}

            </div>
          </div>
          <div className={classes.forgotRoot}>
            <span className={classes.bottomPaper}><NavLink to='/resetPassword' className={classes.forgotText}>{t!('login.forgetPasswordMessage')}</NavLink></span>
          </div>
          <Divider />
          <div className={classes.forgotRoot}>
            <span className={classes.bottomPaper}>{t!('login.createAccountText')} <NavLink to='/signup' className={classes.link}>{t!('login.createAccountButton')}</NavLink></span>
          </div>

        </div>
      </form>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: ILoginComponentProps) => {
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
const mapStateToProps = (state: Map<string, any>, ownProps: ILoginComponentProps) => {
  const loginRequest = state.getIn(['server', 'request'], Map({}))
  return {
    loginRequest
  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(LoginComponent as any)

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(loginStyles as any)(translateWrraper as any) as any))
