// - Import external components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { firebaseRef, firebaseAuth } from 'data/firebaseClient'

// - Import actions
import * as authorizeActions from 'actions/authorizeActions'
import { IRestPasswordComponentProps } from './IRestPasswordComponentProps'
import { IRestPasswordComponentState } from './IRestPasswordComponentState'

/**
 * Create component class
 *
 * @export
 * @class RestPasswordComponent
 * @extends {Component}
 */
export class RestPasswordComponent extends Component<IRestPasswordComponentProps,IRestPasswordComponentState> {

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IRestPasswordComponentProps) {
    super(props)

    this.state = {
      emailInput: '',
      emailInputError: ''

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

      return
    }

    this.props.resetPassword(this.state.emailInput)
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
                }} className='zoomOutLCorner animated'>Reset Password</h2>
              </div>

              <TextField
                onChange={this.handleInputChange}
                errorText={this.state.emailInputError}
                name='emailInput'
                floatingLabelStyle={{ fontSize: '15px' }}
                floatingLabelText='Email'
                type='email'
              /><br />
              <br />
              <br />
              <div className='settings__button-box'>
                <div>
                  <FlatButton label='Back' onClick={this.props.loginPage} />
                </div>
                <div>
                  <RaisedButton label='Reset password' primary={true} onClick={this.handleForm} />
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
const mapDispatchToProps = (dispatch: Function, ownProps: IRestPasswordComponentProps) => {
  return {
    loginPage: () => {
      dispatch(push('/login'))
    },
    resetPassword: (emailAddress: string) => dispatch(authorizeActions.dbResetPassword(emailAddress))
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: IRestPasswordComponentProps) => {
  return {

  }
}

// - Connect component to redux store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RestPasswordComponent as any))
