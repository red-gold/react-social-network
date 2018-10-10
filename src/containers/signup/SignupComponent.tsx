// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { NavLink, withRouter } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import RaisedButton from '@material-ui/core/Button'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import config from 'src/config'

import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import { translate, Trans } from 'react-i18next'

// - Components

// - Import actions
import * as authorizeActions from 'src/store/actions/authorizeActions'
import * as globalActions from 'src/store/actions/globalActions'

// - Import app API
import StringAPI from 'src/api/StringAPI'

import { ISignupComponentProps } from './ISignupComponentProps'
import { ISignupComponentState } from './ISignupComponentState'
import { UserRegisterModel } from 'src/models/users/userRegisterModel'
import { Grid } from '@material-ui/core'

const styles = (theme: any) => ({
  root: {
    padding: '20px 40px 36px',
    [theme.breakpoints.down('xs')]: {
      padding: '0px 40px 36px'

    },
  },
  textField: {
    minWidth: 280,
    marginTop: 20

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
  caption: {
    marginTop: 30,
    marginBottom: 15
  },
  logo: {
    height: 60
  },
  link: {
    color: theme.palette.primary.main,
    display: 'inline-block'
  },
  bottomPaper: {
    display: 'inherit',
    fontSize: 'small',
    marginTop: 15,
    marginBottom: 15
  },
  signupButton: {
    maxWidth: 280,
    minWidth: 280,
  },
  signupButtonRoot: {

  }
})

// - Create Signup component class
export class SignupComponent extends Component<ISignupComponentProps, ISignupComponentState> {

  /**
   * Component constructor
   *
   */
  constructor(props: ISignupComponentProps) {
    super(props)

    this.state = {
      fullNameInput: '',
      fullNameInputError: '',
      emailInput: '',
      emailInputError: '',
      passwordInput: '',
      passwordInputError: '',
      confirmInput: '',
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
      case 'fullNameInput':
        this.setState({
          fullNameInputError: ''
        })
        break
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
      case 'confirmInput':
        this.setState({
          confirmInputError: '',
          passwordInputError: ''
        })
        break
      case 'checkInput':
        this.setState({
          checkInputError: ''
        })
        break
      default:

    }
  }

  /**
   * Handle register form
   */
  handleForm = () => {

    const { fullNameInput, emailInput, passwordInput, confirmInput } = this.state
    const { register, t } = this.props

    let error = false

    // Validate full name
    let fullNameCheck = fullNameInput.trim().toLowerCase()

    if (fullNameCheck.indexOf('test') > -1
      || fullNameCheck.indexOf('demo') > -1
      || fullNameCheck.indexOf('asd') > -1
      || fullNameCheck.length < 4) {
      this.setState({
        fullNameInputError: t!('signup.validNameError')
      })
      error = true
    }

    /* Validate email*/
    if (!StringAPI.isValidEmail(emailInput)) {
      this.setState({
        emailInputError: t!('signup.validEmailError')
      })
      error = true

    }

    /* Check password */
    if (passwordInput === '') {
      this.setState({
        passwordInputError: t!('signup.passwordRequiredError')
      })
      error = true

    }
    if (confirmInput === '') {
      this.setState({
        confirmInputError: t!('signup.confirmRequiredError')
      })
      error = true

    } else if (confirmInput !== passwordInput) {
      this.setState({
        passwordInputError: t!('signup.passwordEqualConfirmError'),
        confirmInputError: t!('signup.confirmEqualPasswordError')
      })
      error = true

    }
    if (!error) {
      register!({
        email: emailInput,
        password: passwordInput,
        fullName: fullNameInput
      })
    }

  }

  /**
   * Reneder component DOM
   * 
   */
  render() {

    const { classes, t } = this.props

    return (
      <div className={classes.root}>
        <TextField
          className={classes.textField}
          autoFocus
          color='secondary'          
          onChange={this.handleInputChange}
          helperText={this.state.fullNameInputError}
          error={this.state.fullNameInputError.trim() !== ''}
          name='fullNameInput'
          label={t!('signup.fullNameLabel')}
          type='text'
        /><br />
        <TextField
          className={classes.textField}
          color='secondary'
          onChange={this.handleInputChange}
          helperText={this.state.emailInputError}
          error={this.state.emailInputError.trim() !== ''}
          name='emailInput'
          label={t!('signup.emailLabel')}
          type='email'
        /><br />
        <TextField
            color='secondary'
          className={classes.textField}
          onChange={this.handleInputChange}
          helperText={this.state.passwordInputError}
          error={this.state.passwordInputError.trim() !== ''}
          name='passwordInput'
          label={t!('signup.passwordLabel')}
          type='password'
        /><br />
        <TextField
          className={classes.textField}
          color='secondary'
          onChange={this.handleInputChange}
          helperText={this.state.confirmInputError}
          error={this.state.confirmInputError.trim() !== ''}
          name='confirmInput'
          label={t!('signup.confirmPasswordLabel')}
          type='password'
          InputLabelProps={{color: 'secondary'}}
        />
        <br />
        <br />
        <div className={classes.signupButtonRoot}>
            <Button variant='raised' className={classes.signupButton} color='secondary' fullWidth onClick={this.handleForm}>{t!('signup.createButton')}</Button>
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
const mapDispatchToProps = (dispatch: any, ownProps: ISignupComponentProps) => {
  return {
    showError: (message: string) => {
      dispatch(globalActions.showMessage(message))
    },
    register: (userRegister: UserRegisterModel) => {
      dispatch(authorizeActions.dbSignup(userRegister))
    },
    loginPage: () => {
      dispatch(push('/login'))
    }
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: any, ownProps: ISignupComponentProps) => {
  return {
    
  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(SignupComponent)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(translateWrraper as any) as any) as any)
