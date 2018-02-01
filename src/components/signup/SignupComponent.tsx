// - Import react components
import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { NavLink, withRouter } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/Button'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'

// - Import actions
import * as authorizeActions from 'actions/authorizeActions'
import * as globalActions from 'actions/globalActions'

// - Import app API
import StringAPI from 'api/StringAPI'

import { ISignupComponentProps } from './ISignupComponentProps'
import { ISignupComponentState } from './ISignupComponentState'
import { UserRegisterModel } from 'models/users/userRegisterModel'

const styles = (theme: any) => ({
  textField: {
    minWidth: 280,
    marginTop: 20

  }
})

// - Create Signup component class
export class SignupComponent extends Component<ISignupComponentProps,ISignupComponentState> {

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: ISignupComponentProps) {
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

    const {fullNameInput, emailInput, passwordInput, confirmInput} = this.state
    const {register} = this.props

    let error = false

     // Validate full name
    let fullNameCheck = fullNameInput.trim().toLowerCase()

    if (fullNameCheck.indexOf('test') > -1
      || fullNameCheck.indexOf('demo') > -1
      || fullNameCheck.indexOf('asd') > -1
      || fullNameCheck.length < 4) {
      this.setState({
        fullNameInputError: 'Please enter a valid name.'
      })
      error = true
    }

     /* Validate email*/
    if (!StringAPI.isValidEmail(emailInput)) {
      this.setState({
        emailInputError: 'Please enter a valid email.'
      })
      error = true

    }

    /* Check password */
    if (passwordInput === '') {
      this.setState({
        passwordInputError: 'This field is required.'
      })
      error = true

    }
    if (confirmInput === '') {
      this.setState({
        confirmInputError: 'This field is required.'
      })
      error = true

    } else if (confirmInput !== passwordInput) {
      this.setState({
        passwordInputError: 'This field sould be equal to confirm password.',
        confirmInputError: 'This field sould be equal to password.'
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
  render () {

    const {classes} = this.props
    const paperStyle = {
      minHeight: 500,
      width: 450,
      textAlign: 'center',
      display: 'block',
      margin: 'auto'
    }

    return (

  <div>

      <h1 style={{
        textAlign: 'center',
        padding: '20px',
        fontSize: '30px',
        fontWeight: 500,
        lineHeight: '32px',
        margin: 'auto',
        color: 'rgba(138, 148, 138, 0.2)'
      }}>Green</h1>

          <div className='animate-bottom'>
   <Paper style={paperStyle} elevation={1} >
     <div style={{padding: '48px 40px 36px'}}>
     <div style={{paddingLeft: '40px',
       paddingRight: '40px'}}>

     <h2 style={{
       textAlign: 'left',
       paddingTop: '16px',
       fontSize: '24px',
       fontWeight: 400,
       lineHeight: '32px',
       margin: 0}} className='zoomOutLCorner animated'>Sign up</h2>
         </div>

     <TextField
     className={classes.textField}
     autoFocus
       onChange={this.handleInputChange}
       helperText={this.state.fullNameInputError}
       error={this.state.fullNameInputError.trim() !== ''}
       name='fullNameInput'
      label='Full Name'
      type='text'
    /><br />
    <TextField
    className={classes.textField}
      onChange={this.handleInputChange}
      helperText={this.state.emailInputError}
      error={this.state.emailInputError.trim() !== ''}
      name='emailInput'
     label='Email'
     type='email'
   /><br />
   <TextField
   className={classes.textField}
     onChange={this.handleInputChange}
     helperText={this.state.passwordInputError }
     error={this.state.passwordInputError.trim() !== ''}
     name='passwordInput'
    label='Password'
    type='password'
  /><br />
  <TextField
  className={classes.textField}
    onChange={this.handleInputChange}
    helperText={this.state.confirmInputError }
    error={this.state.confirmInputError.trim() !== ''}
    name='confirmInput'
   label='Confirm Password'
   type='password'
 /><br />
<br />
  <div className='signup__button-box'>
    <div>
      <Button onClick={this.props.loginPage}> Login </Button>
    </div>
    <div>
      <Button raised color='primary' onClick={this.handleForm}> Create </Button>

    </div>
  </div>

</div>
   </Paper>
 </div>
  </div>

    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: any,ownProps: ISignupComponentProps) => {
  return {
    showError: (message: string) => {
      dispatch(globalActions.showErrorMessage(message))
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
const mapStateToProps = (state: any,ownProps: ISignupComponentProps) => {
  return{

  }
}

// - Connect component to redux store
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SignupComponent as any) as any))
