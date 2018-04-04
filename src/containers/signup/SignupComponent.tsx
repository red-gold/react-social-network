// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { NavLink, withRouter } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/Button'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import config from 'src/config'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'

// - Import actions
import * as authorizeActions from 'src/store/actions/authorizeActions'
import * as globalActions from 'src/store/actions/globalActions'

// - Import app API
import StringAPI from 'src/api/StringAPI'

import { ISignupComponentProps } from './ISignupComponentProps'
import { ISignupComponentState } from './ISignupComponentState'
import { UserRegisterModel } from 'src/models/users/userRegisterModel'
import { Grid } from 'material-ui'

const styles = (theme: any) => ({
  textField: {
    minWidth: 280,
    marginTop: 20

  },
  contain: {
    margin: '0 auto'
  },
  paper: {
    minHeight: 370,
    maxWidth: 450,
    minWidth: 337,
    textAlign: 'center',
    display: 'block',
    margin: 'auto'
  }
})

// - Create Signup component class
export class SignupComponent extends Component<ISignupComponentProps, ISignupComponentState> {

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
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
    const { register, translate } = this.props

    let error = false

    // Validate full name
    let fullNameCheck = fullNameInput.trim().toLowerCase()

    if (fullNameCheck.indexOf('test') > -1
      || fullNameCheck.indexOf('demo') > -1
      || fullNameCheck.indexOf('asd') > -1
      || fullNameCheck.length < 4) {
      this.setState({
        fullNameInputError: translate!('signup.validNameError')
      })
      error = true
    }

    /* Validate email*/
    if (!StringAPI.isValidEmail(emailInput)) {
      this.setState({
        emailInputError: translate!('signup.validEmailError')
      })
      error = true

    }

    /* Check password */
    if (passwordInput === '') {
      this.setState({
        passwordInputError: translate!('signup.passwordRequiredError')
      })
      error = true

    }
    if (confirmInput === '') {
      this.setState({
        confirmInputError: translate!('signup.confirmRequiredError')
      })
      error = true

    } else if (confirmInput !== passwordInput) {
      this.setState({
        passwordInputError: translate!('signup.passwordEqualConfirmError'),
        confirmInputError: translate!('signup.confirmEqualPasswordError')
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
   * @return {react element} return the DOM which rendered by component
   */
  render() {

    const { classes, translate } = this.props

    return (

      <Grid container spacing={24}>
        <Grid item xs={12} className={classes.contain}>
          <h1 className='g__app-name'>{config.settings.appName}</h1>

          <div className='animate-bottom'>
            <Paper className={classes.paper} elevation={1} >
              <div style={{ padding: '48px 40px 36px' }}>
                <div style={{
                  paddingLeft: '40px',
                  paddingRight: '40px'
                }}>

                  <h2 className='zoomOutLCorner animated g__paper-title'>{translate!('signup.title')}</h2>
                </div>

                <TextField
                  className={classes.textField}
                  autoFocus
                  onChange={this.handleInputChange}
                  helperText={this.state.fullNameInputError}
                  error={this.state.fullNameInputError.trim() !== ''}
                  name='fullNameInput'
                  label={translate!('signup.fullNameLabel')}
                  type='text'
                /><br />
                <TextField
                  className={classes.textField}
                  onChange={this.handleInputChange}
                  helperText={this.state.emailInputError}
                  error={this.state.emailInputError.trim() !== ''}
                  name='emailInput'
                  label={translate!('signup.emailLabel')}
                  type='email'
                /><br />
                <TextField
                  className={classes.textField}
                  onChange={this.handleInputChange}
                  helperText={this.state.passwordInputError}
                  error={this.state.passwordInputError.trim() !== ''}
                  name='passwordInput'
                  label={translate!('signup.passwordLabel')}
                  type='password'
                /><br />
                <TextField
                  className={classes.textField}
                  onChange={this.handleInputChange}
                  helperText={this.state.confirmInputError}
                  error={this.state.confirmInputError.trim() !== ''}
                  name='confirmInput'
                  label={translate!('signup.confirmPasswordLabel')}
                  type='password'
                /><br />
                <br />
                <div className='signup__button-box'>
                  <div>
                    <Button onClick={this.props.loginPage}>{translate!('signup.loginButton')}</Button>
                  </div>
                  <div>
                    <Button variant='raised' color='primary' onClick={this.handleForm}>{translate!('signup.createButton')}</Button>

                  </div>
                </div>

              </div>
            </Paper>
          </div>
        </Grid>
      </Grid>

    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
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
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: ISignupComponentProps) => {
  return {
    translate: getTranslate(state.get('locale')),
  }
}

// - Connect component to redux store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(SignupComponent as any) as any) as any)
