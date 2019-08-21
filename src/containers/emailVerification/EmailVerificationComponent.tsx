// - Import external components
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import Captcha from 'components/recaptcha';
import { push } from 'connected-react-router';
import { LoginUser } from 'core/domain/authorize/loginUser';
import { IAuthorizeService } from 'core/services';
import { SocialProviderTypes } from 'core/socialProviderTypes';
import { Map } from 'immutable';
import Footer from 'layouts/footer';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { provider } from 'socialEngine';
import * as authorizeActions from 'store/actions/authorizeActions';
import * as globalActions from 'store/actions/globalActions';

import { EmailVerificationStepType } from './EmailVerificationStepType';
import { emailVerificationStyles } from './emailVerificationStyles';
import { IEmailVerificationProps } from './IEmailVerificationProps';
import { IEmailVerificationState } from './IEmailVerificationState';

// - Material UI
// - Components
// - Import actions
/**
 * Create component class
 */
export class EmailVerificationComponent extends Component<IEmailVerificationProps, IEmailVerificationState> {

  _authorizeService: IAuthorizeService

  /**
   * Component constructor
   *
   */
  constructor(props: IEmailVerificationProps) {
    super(props)
    this._authorizeService = provider.get<IAuthorizeService>(SocialProviderTypes.AuthorizeService)
    this.state = {
      code: '',
      codeError: '',
      countryCode: 'es',
      isNextDisabled: true,
      isVerifyDisabled: true,
      verifyId: '',
      loading: false,
      step: EmailVerificationStepType.EnterPhoneNumber,
      isCaptchaSuccess: false,
      captchaVerifier: null

    }
    // Binding function to `this`
    this.handleNextEmail = this.handleNextEmail.bind(this)

  }

  /**
   * Handle data on input change
   */
  handleInputChange = (event: any) => {
    const { t } = this.props
    const target = event.target
    let value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    if (name === 'code') {
      let codeError = ''
      const code = value ? (value as string).trim() : ''
      if (!value || (value && (value as string).trim() === '')) {
        codeError = t!('emailVerification.requiredCodeError')
      } else if (value && (value as string).trim().length !== 4) {
        codeError = t!('emailVerification.validCodeError')
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
    const { isCaptchaSuccess, captchaVerifier } = this.state
    if (isCaptchaSuccess) {
      this.setState({
        loading: true
      })
      this._authorizeService.sendEmailVerification(captchaVerifier).then((verifyId: string) => {
        this.setState({
          step: EmailVerificationStepType.VerificationCode,
          verifyId,
          loading: false
        })
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
    showMessage!(t!('emailVerification.capthaExpiredMessage'))
    this.handleReset()
  }

  /**
   * Handle reset sms verification
   */
  handleReset = () => {
    this.setState({
      code: '',
      codeError: '',
      loading: false,
      countryCode: 'es',
      isNextDisabled: true,
      isVerifyDisabled: true,
      step: EmailVerificationStepType.EnterPhoneNumber
    })
  }

  /**
   * Handle verify code
   */
  handleVerifyCode = () => {
    const { code, verifyId } = this.state
    const { home, showMessage, login } = this.props
    this.setState({
      loading: true
    })
    this._authorizeService.confirmVerificationEmail(code, verifyId).then((user: LoginUser) => {
      login!(user)
      home!()
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
    showMessage!(t!('emailVerification.capthaRenderErrorMessage'))
    this.handleReset()
  }

  /**
   * Reneder component DOM
   * 
   */
  render() {

    const { classes, t, logout } = this.props
    const { step, code, codeError, 
       isVerifyDisabled, loading, isCaptchaSuccess } = this.state

    return (
      <Grid container spacing={2}>
      <Grid item xs={12} className={classes.contain}>
      <div style={{height: 60}}></div>
        <div className='animate-bottom'>
          <Paper className={classes.paper} elevation={1}>
            <div className={classes.boxRoot}>
              <div style={{
                paddingLeft: '40px',
                paddingRight: '40px'
              }}>

                <h2 className='zoomOutLCorner animated g__paper-title'>{t!('emailVerification.title')}</h2>
              </div>

              {/* Phone Number */}
              <div className={classnames({ [classes.noDisplay]: step !== EmailVerificationStepType.EnterPhoneNumber })}>
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
                    <Button className={classes.logoutButton} onClick={logout}>{t!('emailVerification.logoutButton')}</Button>
                  </div>
                  <div className={classes.wrapper}>
                    <Button variant='contained' color='primary' className={classes.nextButton} disabled={!isCaptchaSuccess || loading} onClick={this.handleNextEmail}>{t!('emailVerification.verifyButton')} </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                  </div>
                </div>
                <Typography className={classes.caption} variant='caption' component='p'>
                  {t!('emailVerification.description')}
                </Typography>
              </div>

              {/* Verification Code */}
              <div className={classnames({ [classes.noDisplay]: step !== EmailVerificationStepType.VerificationCode })}>
              <FormControl className={classes.formControl} error={codeError !== ''} aria-describedby='code-error-text'>
                  <InputLabel htmlFor='code'>{t!('emailVerification.codeLabel')}</InputLabel>
                  <Input
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
                    <Button onClick={logout}>{t!('emailVerification.resetButton')}</Button>
                  </div>
                  <div>
                  <div className={classes.wrapper}>
                    <Button variant='contained' color='primary' className={classes.nextButton} disabled={isVerifyDisabled || loading} onClick={this.handleVerifyCode}>{t!('emailVerification.verifyButton')} </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                  </div>
                  </div>
                </div>
                <Typography className={classes.caption} variant='caption' component='p'>
                  {t!('emailVerification.codeVerifyDescription')}
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
const mapDispatchToProps = (dispatch: Function, ownProps: IEmailVerificationProps) => {
  return {
    logout:  () => dispatch(authorizeActions.dbLogout()),
   home: () => dispatch(push('/')),
    showMessage: (message: string) => dispatch(globalActions.showMessage(message)),
    login: (user: LoginUser) =>  dispatch(authorizeActions.login(user))
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IEmailVerificationProps) => {
  return {
    
  }
}

// - Connect component to redux store
const translateWrraper = withTranslation('translations')(EmailVerificationComponent as any)

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(emailVerificationStyles as any)(translateWrraper as any) as any))
