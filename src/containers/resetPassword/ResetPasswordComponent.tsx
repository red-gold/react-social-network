// - Import external components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import config from 'src/config'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'

// - Material UI
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/Button'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import { Grid } from 'material-ui'

// - Import actions
import * as authorizeActions from 'src/store/actions/authorizeActions'
import { IResetPasswordComponentProps } from './IResetPasswordComponentProps'
import { IResetPasswordComponentState } from './IResetPasswordComponentState'

const styles = (theme: any) => ({
  textField: {
    minWidth: 280,
    marginTop: 20

  },
  caption: {
    marginTop: 30
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
    const {translate} = this.props
    let error = false
    if (this.state.emailInput === '') {
      this.setState({
        emailInputError: translate!('resetPassword.emailRequiredError')
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

    const {classes, translate} = this.props

    return (
      <Grid container spacing={24}>
      <Grid item xs={12} className={classes.contain}>

        <h1 className='g__app-name'>{config.settings.appName}</h1>

        <div className='animate-bottom'>
          <Paper className={classes.paper} elevation={1}>
            <div style={{ padding: '48px 40px 36px' }}>
              <div style={{
                paddingLeft: '40px',
                paddingRight: '40px'
              }}>

                <h2 className='zoomOutLCorner animated g__paper-title'>{translate!('resetPassword.title')}</h2>
              </div>

              <TextField
              className={classes.textField}
              autoFocus
                onChange={this.handleInputChange}
                helperText={this.state.emailInputError}
                error={this.state.emailInputError.trim() !== ''}
                name='emailInput'
                label={translate!('resetPassword.emailLabel')}
                type='email'
              /><br />
              <br />
              <br />
              <div className='settings__button-box'>
                <div>
                  <Button onClick={this.props.loginPage}>{translate!('resetPassword.backButton')}</Button>
                </div>
                <div>
                  <Button variant='raised' color='primary' onClick={this.handleForm}>{translate!('resetPassword.resetPasswordButton')} </Button>
                </div>
              </div>
              <Typography className={classes.caption} variant='caption' component='p'>
              {translate!('resetPassword.description')}
          </Typography>
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
    translate: getTranslate(state.get('locale')),
  }
}

// - Connect component to redux store
export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(ResetPasswordComponent as any) as any)) as typeof ResetPasswordComponent
