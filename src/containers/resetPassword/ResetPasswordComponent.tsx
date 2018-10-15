// - Import external components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import config from 'src/config'

import FlagIcon from 'layouts/flagIcon'
import { parse, format, AsYouType, isValidNumber } from 'libphonenumber-js'
import classnames from 'classnames'
import { translate, Trans } from 'react-i18next'
import { Map } from 'immutable'

// - Material UI
import CircularProgress from '@material-ui/core/CircularProgress'
import green from '@material-ui/core/colors/green'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import RaisedButton from '@material-ui/core/Button'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import IInputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import IconButton from '@material-ui/core/IconButton'

// - Components
import Captcha from 'components/recaptcha'
import Footer from 'layouts/footer'

// - Import actions
import * as globalActions from 'store/actions/globalActions'
import * as authorizeActions from 'store/actions/authorizeActions'

import { IResetPasswordComponentProps } from './IResetPasswordComponentProps'
import { IResetPasswordComponentState } from './IResetPasswordComponentState'
import { ResetPasswordStepType } from './resetPasswordStepType'
import { IAuthorizeService } from 'core/services'
import { provider } from 'socialEngine'
import { SocialProviderTypes } from 'core/socialProviderTypes'
import { LoginUser } from 'core/domain/authorize/loginUser'

const styles = (theme: any) => ({
  textField: {
    minWidth: 280,
    marginTop: 20

  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  caption: {
    marginTop: 30
  },
  formControl: {
    minWidth: 280
  },
  noDisplay: {
    display: 'none'
  },
  loading: {
    position: 'absolute',
    top: '45%',
    left: '45%'
  },
  contain: {
    margin: '0 auto',
    marginTop: 50
  },
  paper: {
    minHeight: 370,
    maxWidth: 450,
    minWidth: 337,
    textAlign: 'center',
    display: 'block',
    margin: 'auto'
  },
  logo: {
    height: 50,
    marginBottom: 30
  },
  boxRoot: {
    padding: '20px 40px 36px'
  },
  backButton: {
    margin: 8
  }
})

/**
 * Create component class
 */
export class ResetPasswordComponent extends Component<IResetPasswordComponentProps, IResetPasswordComponentState> {

  _authorizeService: IAuthorizeService

  /**
   * Component constructor
   *
   */
  constructor(props: IResetPasswordComponentProps) {
    super(props)
    this._authorizeService = provider.get<IAuthorizeService>(SocialProviderTypes.AuthorizeService)
    this.state = {
      email: '',
      emailError: '',
      code: '',
      codeError: '',
      isNextDisabled: true,
      isVerifyDisabled: true,
      verifyId: '',
      loading: false,
      step: ResetPasswordStepType.EnterEmail,
      isCaptchaSuccess: false,
      captchaVerifier: null

    }
    // Binding function to `this`
    this.handleNextEmail = this.handleNextEmail.bind(this)

  }

  /**
   * Handle data on input change
   * @param  {event} evt is an event of inputs of element on change
   */
  handleInputChange = (event: any) => {
    const { t } = this.props
    const target = event.target
    let value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    const asYouType = new AsYouType()

    if (name === 'email') {

      let emailError = ''

      if (value && value.trim() === '') {
        emailError = t!('resetPassword.requiredEmailError')
      }
      let email = value.trim()
      this.setState({
        email,
        emailError,
        isNextDisabled: emailError !== ''
      })

    }

    if (name === 'code') {
      let codeError = ''
      const code = value ? (value as string).trim() : ''
      if (!value || (value && (value as string).trim() === '')) {
        codeError = t!('smsVerification.requiredCodeError')
      } else if (value && (value as string).trim().length !== 4) {
        codeError = t!('smsVerification.validCodeError')
      }
      this.setState({
        code,
        codeError,
        isVerifyDisabled: codeError !== ''
      })
    }

  }

  /**
   * Handle register form
   */
  handleNextEmail = () => {
    const { t, showMessage } = this.props
    const { email, isCaptchaSuccess, captchaVerifier } = this.state
    if (email && email.trim() !== '' && isCaptchaSuccess) {
      this.setState({
        loading: true
      })
      const { email } = this.state
      this._authorizeService.sendResetPasswordVerification(email.trim(), captchaVerifier).then((verifyId: string) => {
        this.setState({
          step: ResetPasswordStepType.VerificationCode,
          verifyId,
          loading: false
        })
      }).catch((error) => {
        showMessage!(error.message)
        this.handleReset()
      })
    }

  }

  /**
   * Handle success result of solving captcha
   */
  handleSuccessCaptcha = (value: any) => {
    this.setState({
      captchaVerifier: value,
      isCaptchaSuccess: true
    })
  }

  /**
   * Handle expired captcha
   */
  handleExpiredCaptcha = () => {
    const { showMessage, t } = this.props
    showMessage!(t!('resetPassword.capthaExpiredMessage'))
    this.handleReset()
  }

  /**
   * Handle reset sms verification
   */
  handleReset = () => {
    this.setState({
      email: '',
      emailError: '',
      code: '',
      codeError: '',
      loading: false,
      isNextDisabled: true,
      isVerifyDisabled: true,
      step: ResetPasswordStepType.EnterEmail
    })
  }

  /**
   * Handle verify code
   */
  handleVerifyCode = () => {
    const { code, verifyId, email } = this.state
    const { updatePassword, showMessage, login } = this.props
    this._authorizeService.confirmResetPassword(code, verifyId, email).then((user: LoginUser) => {
      login!(user)
      updatePassword!()
    }).catch((error) => {
      showMessage!(error.message)
      this.handleReset()
    })
  }

  /**
   * Handle error capthcha render
   */
  handleErrorCapthaRender = () => {
    const { showMessage, t } = this.props
    showMessage!(t!('resetPassword.capthaRenderErrorMessage'))
    this.handleReset()
  }

  /**
   * Reneder component DOM
   * 
   */
  render() {

    const { classes, t, logout } = this.props
    const { email, emailError,
      isNextDisabled, step, code, codeError,
      isVerifyDisabled, loading, isCaptchaSuccess } = this.state

    return (
      <Grid container spacing={24}>
        <Grid item xs={12} className={classes.contain}>

          {/* <h1 className='g__app-name'>{config.settings.appName}</h1> */}

          <div className='animate-bottom'>
            <Paper className={classes.paper} elevation={1}>
              <div className={classes.boxRoot}>
                <div style={{
                  paddingLeft: '40px',
                  paddingRight: '40px'
                }}>

                  <img className={classes.logo} src={config.settings.raisedLogo} alt={config.settings.companyName} />
                </div>

                {/* Phone Number */}
                <div className={classnames({ [classes.noDisplay]: step !== ResetPasswordStepType.EnterEmail })}>
                  <FormControl className={classes.formControl} error={emailError !== ''} aria-describedby='email-error-text'>
                    <InputLabel htmlFor='email'>{t!('resetPassword.emailLabel')}</InputLabel>
                    <Input
                      type={'email'}
                      id='email'
                      value={email}
                      name={'email'}
                      onChange={this.handleInputChange}
                      autoFocus
                    />
                    <FormHelperText id='email-error-text'>{emailError}</FormHelperText>
                  </FormControl>
                  <br />
                  <br />
                  {/* Recaptcha */}
                  <Captcha
                    onSuccess={this.handleSuccessCaptcha}
                    onExpired={this.handleExpiredCaptcha}
                    onRenderError={this.handleErrorCapthaRender}
                  />
                  <div className='settings__button-box'>
                    <div>
                      <Button className={classes.backButton} onClick={logout}>{t!('resetPassword.backButton')}</Button>
                    </div>
                    <div className={classes.wrapper}>
                      <Button variant='contained' color='primary' className={classes.nextButton} disabled={isNextDisabled || !isCaptchaSuccess || loading} onClick={this.handleNextEmail}>{t!('resetPassword.verifyButton')} </Button>
                      {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                  </div>
                  <Typography className={classes.caption} variant='caption' component='p'>
                    {t!('resetPassword.emailDescription')}
                  </Typography>
                </div>

                {/* Verification Code */}
                <div className={classnames({ [classes.noDisplay]: step !== ResetPasswordStepType.VerificationCode })}>
                  <FormControl className={classes.formControl} error={codeError !== ''} aria-describedby='code-error-text'>
                    <InputLabel htmlFor='code'>{t!('resetPassword.codeLabel')}</InputLabel>
                    <Input
                      type={'tel'}
                      id='code'
                      value={code}
                      name={'code'}
                      onChange={this.handleInputChange}
                      autoFocus
                    />
                    <FormHelperText id='code-error-text'>{codeError}</FormHelperText>
                  </FormControl>
                  <br />
                  <br />
                  <div className='settings__button-box'>
                    <div>
                      <Button className={classes.nextButton} onClick={logout}>{t!('resetPassword.resetButton')}</Button>
                    </div>
                    <div>
                      <Button variant='contained' color='primary' className={classes.nextButton} disabled={isVerifyDisabled} onClick={this.handleVerifyCode}>{t!('resetPassword.verifyButton')} </Button>
                    </div>
                  </div>
                  <Typography className={classes.caption} variant='caption' component='p'>
                    {t!('resetPassword.codeVerifyDescription')}
                  </Typography>
                </div>

              </div>
            </Paper>
          </div>
        </Grid>
        <Footer />
      </Grid>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: Function, ownProps: IResetPasswordComponentProps) => {
  return {
    logout: () => dispatch(authorizeActions.dbLogout()),
    home: () => dispatch(push('/')),
    updatePassword: () => dispatch(push('/newPassword')),
    showMessage: (message: string) => dispatch(globalActions.showMessage(message)),
    login: (user: LoginUser) => dispatch(authorizeActions.login(user))
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IResetPasswordComponentProps) => {
  return {
    
  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(ResetPasswordComponent as any)

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(translateWrraper as any))) as typeof ResetPasswordComponent
