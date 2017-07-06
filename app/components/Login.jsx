// - Import external components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

// - Import actions
import * as authorizeActions from 'authorizeActions'


// - Create Login component class
export class Login extends Component {

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props) {
    super(props);

    this.state = {
      emailInput: '',
      emailInputError: '',
      passwordInput: '',
      passwordInputError: '',


    }
    // Binding function to `this`
    this.handleForm = this.handleForm.bind(this)

  }

  /**
   * Handle data on input change
   * @param  {event} evt is an event of inputs of element on change
   */
  handleInputChange = (evt) => {
    const target = evt.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });


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

        break;
      default:

    }
  }

  /**
   * Handle register form
   */
  handleForm = () => {

    var error = false
    if (this.state.emailInput === '') {
      this.setState({
        emailInputError: 'This field is required'
      })
      error = true

    }
    if (this.state.passwordInput === '') {
      this.setState({
        passwordInputError: 'This field is required'
      })
      error = true

    }

    if (!error) {
      this.props.login(
        this.state.emailInput,
        this.state.passwordInput
      )
    }

  }


  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {

    const paperStyle = {
      minHeight: 370,
      width: 450,
      margin: 20,
      textAlign: 'center',
      display: 'block',
      margin: "auto"
    };
    return (
      <form>

        <h1 style={{
          textAlign: "center",
          padding: "20px",
          fontSize: "30px",
          fontWeight: 500,
          lineHeight: "32px",
          margin: "auto",
          color: "rgba(138, 148, 138, 0.2)"
        }}>Green</h1>

        <div className="animate-bottom">
          <Paper style={paperStyle} zDepth={1} rounded={false} >
            <div style={{ padding: "48px 40px 36px" }}>
              <div style={{
                paddingLeft: "40px",
                paddingRight: "40px"
              }}>

                <h2 style={{
                  textAlign: "left",
                  paddingTop: "16px",
                  fontSize: "24px",
                  fontWeight: 400,
                  lineHeight: "32px",
                  margin: 0
                }}>Sign in</h2>
              </div>

              <TextField
                onChange={this.handleInputChange}
                errorText={this.state.emailInputError}
                name="emailInput"
                floatingLabelStyle={{ fontSize: "15px" }}
                floatingLabelText="Email"
                type="email"
                tabIndex={1}
              /><br />
              <TextField
                onChange={this.handleInputChange}
                errorText={this.state.passwordInputError}
                name="passwordInput"
                floatingLabelStyle={{ fontSize: "15px" }}
                floatingLabelText="Password"
                type="password"
                tabIndex={2}
              /><br />
              <br />
              <br />
              <div className="login__button-box">
                <div>
                  <FlatButton label="Create an account" onClick={this.props.signupPage} tabIndex={4} />
                </div>
                <div >
                  <RaisedButton label="Login" primary={true} onClick={this.handleForm} tabIndex={3} />
                </div>
              </div>

            </div>
          </Paper>
        </div>
      </form>
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (username, password) => {
      dispatch(authorizeActions.dbLogin(username, password))
    },
    signupPage: () => {
      dispatch(push("/signup"))
    }
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state, ownProps) => {
  return {

  }
}

// - Connect component to redux store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
