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


/**
 * Create component class
 * 
 * @export
 * @class Settings
 * @extends {Component}
 */
export class Settings extends Component {

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props) {
    super(props);

    this.state = {
      passwordInput: '',
      passwordInputError: '',
      confirmInput: '',
      confirmInputError: '',


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
      case 'passwordInput':
        this.setState({
          passwordInputError: ''
        })
        break
      case 'confirmInput':
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
    if (this.state.passwordInput === '') {
      this.setState({
        passwordInputError: 'This field is required'
      })
      error = true

    }
    else if (this.state.confirmInput === '') {
      this.setState({
        confirmInputError: 'This field is required'
      })
      error = true

    }
    else if(this.state.confirmInput !== this.state.passwordInput) {
      this.setState({
        confirmInputError: 'Password and confirm password should be equal!'
      })
      error = true

    }

    if (!error) {
      this.props.login(
        this.state.passwordInput,
        this.state.confirmInput
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
      textAlign: 'center',
      display: 'block',
      margin: "auto"
    };
    return (
      <div>

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
                }}>Change Password</h2>
              </div>

              <TextField
                onChange={this.handleInputChange}
                errorText={this.state.passwordInputError}
                name="passwordInput"
                floatingLabelStyle={{ fontSize: "15px" }}
                floatingLabelText="New password"
                type="password"
              /><br />
              <TextField
                onChange={this.handleInputChange}
                errorText={this.state.confirmInputError}
                name="confirmInput"
                floatingLabelStyle={{ fontSize: "15px" }}
                floatingLabelText="Confirm password"
                type="password"
              /><br />
              <br />
              <br />
              <div className="settings__button-box">
                <div>
                  <FlatButton label="Home" onClick={this.props.homePage} />
                </div>
                <div>
                  <RaisedButton label="Change password" primary={true} onClick={this.handleForm} />

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
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (password) => {
      dispatch(authorizeActions.dbUpdatePassword(password))
    },
    homePage: () => {
      dispatch(push("/"))
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Settings))
