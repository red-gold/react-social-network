// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Map} from 'immutable'
import { push } from 'connected-react-router'
import { NavLink, withRouter } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { withTranslation } from 'react-i18next'

// - Components

// - Import actions
import * as authorizeActions from 'src/store/actions/authorizeActions'
import * as globalActions from 'src/store/actions/globalActions'

// - Import app API
import StringAPI from 'src/api/StringAPI'

import { ICodeVerificationProps } from './ICodeVerificationProps'
import { ICodeVerificationState } from './ICodeVerificationState'
import CircularProgress from '@material-ui/core/CircularProgress'
import { ServerRequestStatusType } from 'src/store/actions/serverRequestStatusType'
import { ServerRequestType } from 'src/constants/serverRequestType'
import { codeVerificationStyles } from './codeVerificationStyles'

// - Create Signup component class
export class CodeVerificationComponent extends Component<ICodeVerificationProps, ICodeVerificationState> {

  /**
   * Component constructor
   *
   */
  constructor(props: ICodeVerificationProps) {
    super(props)

    this.state = {
      code: '',
      codeError: ''
    }
    // Binding function to `this`
    this.handleForm = this.handleForm.bind(this)

  }

  /**
   * Handle data on input change
   * @param  {event} evt is an event of inputs of element on change
   */
  handleInputChange = (event: any) => {
    const {t} = this.props
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value
    })
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
  handleForm = () => {
    const { code } = this.state
    const { verifyRegister } = this.props
    verifyRegister!(code)
  }

  /**
   * Reneder component DOM
   * 
   */
  render() {

    const { classes, t,  signupRequest } = this.props
    const {emailInput} = this.state
    const signupRequestId = StringAPI.createServerRequestId(ServerRequestType.AuthSignup, emailInput)
    const signupRequestStatus = signupRequest!.get(signupRequestId, { status: ServerRequestStatusType.NoAction }).status
    const loading = signupRequestStatus === ServerRequestStatusType.Sent
    return (
      <div className={classes.root}>
        <TextField
          className={classes.textField}
          autoFocus
          color='secondary'          
          onChange={this.handleInputChange}
          helperText={this.state.codeError}
          error={this.state.codeError.trim() !== ''}
          name='code'
          label={t!('signup.fullNameLabel')}
          type='text'
        /><br />
        <br />
        <div className={classes.signupButtonRoot}>
        <div className={classes.wrapperButton}>
              <Button
                variant='contained'
                className={classes.signupButton}
                color='secondary'
                disabled={loading}
                onClick={this.handleForm}
                fullWidth
                tabIndex={3}
              >
                {t!('signup.createButton')}
              </Button>
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}

            </div>
        </div>
        <Typography className={classes.caption} variant='caption' component='p'>
          {t!('signup.termCaption')} <NavLink to='/terms'> {t!('signup.termCaptionLink')} </NavLink>
        </Typography>
        <Divider />
          <div >
            <span className={classes.bottomPaper}>{t!('login.loginText')} <NavLink to='/login' className={classes.link}>{t!('login.loginButton')}</NavLink></span>
          </div>

      </div>

    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: ICodeVerificationProps) => {
  return {
    showError: (message: string) => {
      dispatch(globalActions.showMessage(message))
    },
    verifyRegister: (code: string) => {
      dispatch(authorizeActions.asyncVerifyUserRegisterCode(code))
    },
    loginPage: () => {
      dispatch(push('/login'))
    }
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: ICodeVerificationProps) => {
  const signupRequest = state.getIn(['server', 'request'], Map({}))
  return {
    signupRequest
  }
}

// - Connect component to redux store
const translateWrapper = withTranslation('translations')(CodeVerificationComponent as any)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(codeVerificationStyles as any)(translateWrapper as any) as any) as any)
