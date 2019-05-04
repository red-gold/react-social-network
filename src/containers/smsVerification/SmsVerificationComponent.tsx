// - Import external components
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
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
import FlagIcon from 'layouts/flagIcon';
import Footer from 'layouts/footer';
import { AsYouType, isValidNumber } from 'libphonenumber-js';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { provider } from 'socialEngine';
import * as authorizeActions from 'store/actions/authorizeActions';
import * as globalActions from 'store/actions/globalActions';

import { ISmsVerificationComponentProps } from './ISmsVerificationComponentProps';
import { ISmsVerificationComponentState } from './ISmsVerificationComponentState';
import { SmsVerificationStepType } from './smsVerificationStepType';

// - Material UI
// - Components
// - Import actions
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
    margin: '0 auto'
  },
  boxRoot: {
    padding: '20px 40px 36px'
  },
  paper: {
    minHeight: 370,
    maxWidth: 450,
    minWidth: 337,
    textAlign: 'center',
    display: 'block',
    margin: 'auto'
  },
  logoutButton: {
    margin: 8
  },
  phoneExample: {
    display: 'inline-grid',
    textAlign: 'left',
    fontSize: 11,
    color: 'darkgrey',
  }
})

/**
 * Create component class
 */
export class SmsVerificationComponent extends Component<ISmsVerificationComponentProps, ISmsVerificationComponentState> {

  _authorizeService: IAuthorizeService

  /**
   * Component constructor
   *
   */
  constructor(props: ISmsVerificationComponentProps) {
    super(props)
    this._authorizeService = provider.get<IAuthorizeService>(SocialProviderTypes.AuthorizeService)
    this.state = {
      phoneNumber: '',
      phoneNumberError: '',
      code: '',
      codeError: '',
      countryCode: 'vn',
      isNextDisabled: true,
      isVerifyDisabled: true,
      verifyId: '',
      loading: false,
      step: SmsVerificationStepType.EnterPhoneNumber,
      isCaptchaSuccess: false,
      captchaVerifier: null

    }
    // Binding function to `this`
    this.handleNextPhoneNumber = this.handleNextPhoneNumber.bind(this)

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

    if (name === 'phoneNumber') {

      let phoneNumberError = ''

      if (value && value.trim() !== '') {
        const arrayValue = (value as string)
        if (arrayValue[0] === '0') {
          phoneNumberError = t!('smsVerification.validPhoneNumberError')

        } else {
          value = arrayValue[0] === '+' ? value : `+${value}`
        }
      } else {
        phoneNumberError = t!('smsVerification.requiredPhoneNumberError')

      }

      let phoneNumber = asYouType.input(value)
      if (value && (value as string).length > 3 && !asYouType.country) {
        phoneNumberError = t!('smsVerification.validPhoneNumberError')
      }
      const countryCode = (asYouType.country || 'ir').toLocaleLowerCase()
      this.setState({
        phoneNumber,
        countryCode,
        phoneNumberError,
        isNextDisabled: (phoneNumber !== undefined && phoneNumberError !== '')
          || !phoneNumber || (phoneNumber !== undefined && !isValidNumber(phoneNumber))

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
  handleNextPhoneNumber = () => {
    const { phoneNumber, isCaptchaSuccess, captchaVerifier } = this.state
    if (phoneNumber && phoneNumber.trim() !== '' && isCaptchaSuccess) {
      this.setState({
        loading: true
      })
      const { phoneNumber } = this.state
      this._authorizeService.sendSmsVerification(`+${phoneNumber.replace(/\D/g, '')}`, captchaVerifier).then((verifyId: string) => {
        this.setState({
          step: SmsVerificationStepType.VerificationCode,
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
    showMessage!(t!('smsVerification.capthaExpiredMessage'))
    this.handleReset()
  }

  /**
   * Handle reset sms verification
   */
  handleReset = () => {
    this.setState({
      phoneNumber: '',
      phoneNumberError: '',
      code: '',
      codeError: '',
      loading: false,
      countryCode: 'es',
      isNextDisabled: true,
      isVerifyDisabled: true,
      step: SmsVerificationStepType.EnterPhoneNumber
    })
  }

  /**
   * Handle verify code
   */
  handleVerifyCode = () => {
    const { code, verifyId, phoneNumber } = this.state
    const { home, showMessage, login } = this.props
    this.setState({
      loading: true
    })
    this._authorizeService.confirmVerificationPhone(code, verifyId, `+${phoneNumber.replace(/\D/g, '')}`).then((user: LoginUser) => {
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
    showMessage!(t!('smsVerification.capthaRenderErrorMessage'))
    this.handleReset()
  }

  /**
   * Reneder component DOM
   * 
   */
  render() {

    const { classes, t, logout } = this.props
    const { phoneNumber, countryCode, phoneNumberError,
       isNextDisabled, step, code, codeError, 
       isVerifyDisabled, loading, isCaptchaSuccess } = this.state

    return (
      <Grid container spacing={24}>
      <Grid item xs={12} className={classes.contain}>

        <div className='animate-bottom'>
          <Paper className={classes.paper} elevation={1}>
            <div className={classes.boxRoot}>
              <div style={{
                paddingLeft: '40px',
                paddingRight: '40px'
              }}>

                <h2 className='zoomOutLCorner animated g__paper-title'>{t!('smsVerification.title')}</h2>
              </div>

              {/* Phone Number */}
              <div className={classnames({ [classes.noDisplay]: step !== SmsVerificationStepType.EnterPhoneNumber })}>
                <FormControl className={classes.formControl} error={phoneNumberError !== ''} aria-describedby='phone-number-error-text'>
                  <InputLabel htmlFor='phone-number'>{t!('smsVerification.phoneNumberLabel')}</InputLabel>
                  <Input
                    type={'tel'}
                    id='phone-number'
                    value={phoneNumber}
                    name={'phoneNumber'}
                    onChange={this.handleInputChange}
                    autoFocus
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                        >
                          <FlagIcon code={countryCode} />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText id='phone-number-error-text'>{phoneNumberError}</FormHelperText>
                </FormControl>
                <span className={classes.phoneExample}> ex. +34665432110 </span>
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
                    <Button className={classes.logoutButton} onClick={logout}>{t!('smsVerification.logoutButton')}</Button>
                  </div>
                  <div className={classes.wrapper}>
                    <Button variant='contained' color='primary' className={classes.nextButton} disabled={isNextDisabled || !isCaptchaSuccess || loading} onClick={this.handleNextPhoneNumber}>{t!('smsVerification.verifyButton')} </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                  </div>
                </div>
                <Typography className={classes.caption} variant='caption' component='p'>
                  {t!('smsVerification.phoneNumberDescription')}
                </Typography>
              </div>

              {/* Verification Code */}
              <div className={classnames({ [classes.noDisplay]: step !== SmsVerificationStepType.VerificationCode })}>
                <FormControl className={classes.formControl} error={codeError !== ''} aria-describedby='code-error-text'>
                  <InputLabel htmlFor='code'>{t!('smsVerification.codeLabel')}</InputLabel>
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
                    <Button onClick={logout}>{t!('smsVerification.resetButton')}</Button>
                  </div>
                  <div>
                  <div className={classes.wrapper}>
                    <Button variant='contained' color='primary' className={classes.nextButton} disabled={isVerifyDisabled || loading} onClick={this.handleVerifyCode}>{t!('smsVerification.verifyButton')} </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                  </div>
                  </div>
                </div>
                <Typography className={classes.caption} variant='caption' component='p'>
                  {t!('smsVerification.codeVerifyDescription')}
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
const mapDispatchToProps = (dispatch: Function, ownProps: ISmsVerificationComponentProps) => {
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
const mapStateToProps = (state: Map<string, any>, ownProps: ISmsVerificationComponentProps) => {
  return {
    
  }
}

// - Connect component to redux store
const translateWrraper = withTranslation('translations')(SmsVerificationComponent as any)

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(translateWrraper as any) as any))
