// - Import react components
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {NavLink, withRouter} from 'react-router-dom'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

// - Import actions
import *  as authorizeActions from 'authorizeActions'
import * as globalActions from 'globalActions'

// - Import app API
import StringAPI from 'StringAPI'


// - Create Signup componet class
export class Signup extends Component {

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props){
    super(props);

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
  handleInputChange = (evt) => {
   const target = evt.target
   const value = target.type === 'checkbox' ? target.checked : target.value
   const name = target.name
   this.setState({
     [name]: value
   })


   switch (name) {
     case 'fullNameInput':
        this.setState({
          fullNameInputError: '',
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
       break;
     default:


   }
 }

  /**
   * Handle register form
   */
  handleForm = () => {

   const {fullNameInput, emailInput, passwordInput, confirmInput} = this.state
   const {register} = this.props

    var error = false
    
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

     }
     else if(confirmInput !== passwordInput){
       this.setState({
         passwordInputError: 'This field sould be equal to confirm password.',
         confirmInputError: 'This field sould be equal to password.'
       })
       error = true

     }
     if (!error) {
       register({
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
    const paperStyle = {
  minHeight: 500,
  width: 450,
  textAlign: 'center',
  display: 'block',
  margin: "auto"
};

    return (

  <div>

      <h1 style={{
        textAlign: "center",
        padding:"20px",
        fontSize: "30px",
        fontWeight: 500,
        lineHeight: "32px",
              margin: "auto",
              color: "rgba(138, 148, 138, 0.2)"
            }}>Green</h1>

          <div className="animate-bottom">
   <Paper style={paperStyle}  zDepth={1} rounded={false} >
     <div style={{padding: "48px 40px 36px"}}>
     <div style={{paddingLeft: "40px",
    paddingRight: "40px"}}>

     <h2 style={{
         textAlign: "left",
             paddingTop: "16px",
             fontSize: "24px",
             fontWeight: 400,
             lineHeight: "32px",
             margin: 0}}>Sign up</h2>
         </div>

     <TextField
       onChange={this.handleInputChange}
       errorText={this.state.fullNameInputError}
       name="fullNameInput"
       floatingLabelStyle={{fontSize:"15px"}}
      floatingLabelText="Full Name"
      type="text"
    /><br />
    <TextField
      onChange={this.handleInputChange}
      errorText={this.state.emailInputError}
      name="emailInput"
      floatingLabelStyle={{fontSize:"15px"}}
     floatingLabelText="Email"
     type="email"
   /><br />
   <TextField
     onChange={this.handleInputChange}
     errorText={this.state.passwordInputError }
     name="passwordInput"
     floatingLabelStyle={{fontSize:"15px"}}
    floatingLabelText="Password"
    type="password"
  /><br />
  <TextField
    onChange={this.handleInputChange}
    errorText={this.state.confirmInputError }
    name="confirmInput"
    floatingLabelStyle={{fontSize:"15px"}}
   floatingLabelText="Confirm Password"
   type="password"
 /><br />
<br />
  <div className="signup__button-box">
    <div>
      <FlatButton label="Login" onClick={this.props.loginPage} />
    </div>
    <div>
      <RaisedButton label="Create" primary={true} onClick={this.handleForm}/>

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
const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    showError: (message) => {
      dispatch(action(types.SHOW_ERROR_MESSAGE_GLOBAL)(error.message))
    },
    register: (data) => {
      dispatch(authorizeActions.dbSignup(data))
    },
    loginPage: () => {
      dispatch(push("/login"))
    }
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state,ownProps) => {
  return{

  }
}

// - Connect component to redux store
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Signup))
