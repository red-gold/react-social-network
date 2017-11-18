// - Import external components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import Divider from 'material-ui/Divider'
import ActionAndroid from 'material-ui/svg-icons/action/android'

// - Import actions
import * as authorizeActions from 'actions/authorizeActions'
import { ILoginComponentProps } from './ILoginComponentProps'
import { ILoginComponentState } from './ILoginComponentState'
import { firebaseAuth } from 'data/firebaseClient'
import { OAuthType } from 'core/domain/authorize'

// - Create Login component class
export class LoginComponent extends Component<ILoginComponentProps,ILoginComponentState> {

  styles = {
    singinOptions: {
      paddingBottom: 10
    },
    divider: {
      marginBottom: 10,
      marginTop: 15
    },
    restPassword: {
      lineHeight: 6,
      fontWeight: 100,
      fontSize: 'small'
    },
    restPasswordLink: {
      color: '#0095ff'
    }
  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: ILoginComponentProps) {
    super(props)

    this.state = {
      emailInput: '',
      emailInputError: '',
      passwordInput: '',
      passwordInputError: '',
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
      default:

    }
  }

  /**
   * Handle register form
   */
  handleForm = () => {

    let error = false
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
      this.props.login!(
        this.state.emailInput,
        this.state.passwordInput
      )
    }

  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {

    const paperStyle = {
      minHeight: 370,
      width: 450,
      textAlign: 'center',
      display: 'block',
      margin: 'auto'
    }

    const {loginWithOAuth} = this.props
    return (
      <form>

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
          <Paper style={paperStyle} zDepth={1} rounded={false} >
            <div style={{ padding: '48px 40px 36px' }}>
              <div style={{
                paddingLeft: '40px',
                paddingRight: '40px'
              }}>

                <h2 style={{
                  textAlign: 'left',
                  paddingTop: '16px',
                  fontSize: '24px',
                  fontWeight: 400,
                  lineHeight: '32px',
                  margin: 0
                }} className='zoomOutLCorner animated'>Sign in</h2>
              </div>
              <div style={this.styles.singinOptions}>
              <FlatButton
                icon={<div className='icon-fb icon'></div>}
                onClick={() => loginWithOAuth(OAuthType.FACEBOOK)}
                />
              <FlatButton
                icon={<div className='icon-google icon'></div>}
                onClick={() => loginWithOAuth(OAuthType.GOOGLE)}
                />
              <FlatButton
                icon={<div className='icon-github icon'></div>}
                onClick={() => loginWithOAuth(OAuthType.GITHUB)}

              />

              </div>
              <Divider style={this.styles.divider} />
              <TextField
                onChange={this.handleInputChange}
                errorText={this.state.emailInputError}
                name='emailInput'
                floatingLabelStyle={{ fontSize: '15px' }}
                floatingLabelText='Email'
                type='email'
                tabIndex={1}
              /><br />
              <TextField
                onChange={this.handleInputChange}
                errorText={this.state.passwordInputError}
                name='passwordInput'
                floatingLabelStyle={{ fontSize: '15px' }}
                floatingLabelText='Password'
                type='password'
                tabIndex={2}
              /><br />
              <br />
              <br />
              <div className='login__button-box'>
                <div>
                  <FlatButton label='Create an account' onClick={this.props.signupPage} tabIndex={4} />
                </div>
                <div >
                  <RaisedButton label='Login' primary={true} onClick={this.handleForm} tabIndex={3} />
                </div>
              </div>
                <span style={this.styles.restPassword as any}>Have you forgot your password? <NavLink to='/resetPassword' style={this.styles.restPasswordLink}>reset your password</NavLink></span>
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
const mapDispatchToProps = (dispatch: any, ownProps: ILoginComponentProps) => {
  return {
    login: (email: string, password: string) => {
      dispatch(authorizeActions.dbLogin(email, password))
    },
    loginWithOAuth: (type: OAuthType) => dispatch(authorizeActions.dbLoginWithOAuth(type)),
    signupPage: () => {
      dispatch(push('/signup'))
    }
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: ILoginComponentProps) => {
  return {

  }
}

// - Connect component to redux store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginComponent as any))
