// - Import external components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/Button'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

// - Import actions
import * as authorizeActions from 'actions/authorizeActions'
import { IResetPasswordComponentProps } from './IResetPasswordComponentProps'
import { IResetPasswordComponentState } from './IResetPasswordComponentState'

const styles = (theme: any) => ({
  textField: {
    minWidth: 280,
    marginTop: 20

  },
  caption: {
    marginTop: 30
  }
})

/**
 * Create component class
 *
 * @export
 * @class ResetPasswordComponent
 * @extends {Component}
 */
export class ResetPasswordComponent extends Component<IResetPasswordComponentProps,IResetPasswordComponentState> {

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IResetPasswordComponentProps) {
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

    this.props.resetPassword!(this.state.emailInput)
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {

    const {classes} = this.props

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
          <Paper style={paperStyle} elevation={1}>
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
              className={classes.textField}
              autoFocus
                onChange={this.handleInputChange}
                helperText={this.state.emailInputError}
                error={this.state.emailInputError.trim() !== ''}
                name='emailInput'
                label='Email'
                type='email'
              /><br />
              <br />
              <br />
              <div className='settings__button-box'>
                <div>
                  <Button onClick={this.props.loginPage}> Back </Button>
                </div>
                <div>
                  <Button raised color='primary' onClick={this.handleForm}> Reset password </Button>
                </div>
              </div>
              <Typography className={classes.caption} type='caption' component='p'>
               Please put your email and click on "RESET PASSWORD". If not click on "BACK".
               We will send you an email contains the link of the reset password.
          </Typography>
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
const mapDispatchToProps = (dispatch: Function, ownProps: IResetPasswordComponentProps) => {
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
const mapStateToProps = (state: any, ownProps: IResetPasswordComponentProps) => {
  return {

  }
}

// - Connect component to redux store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResetPasswordComponent as any) as any))
