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
import config from 'src/config'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'

// - Import actions
import * as authorizeActions from 'src/store/actions/authorizeActions'
import { ISettingComponentProps } from './ISettingComponentProps'
import { ISettingComponentState } from './ISettingComponentState'
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
  },
})
/**
 * Create component class
 *
 * @export
 * @class SettingComponent
 * @extends {Component}
 */
export class SettingComponent extends Component<ISettingComponentProps,ISettingComponentState> {

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: ISettingComponentProps) {
    super(props)

    this.state = {
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

        break
      default:

    }
  }

  /**
   * Handle register form
   */
  handleForm = () => {
    const {translate} = this.props
    let error = false
    if (this.state.passwordInput === '') {
      this.setState({
        passwordInputError: translate!('changePassword.newPasswordRequiredError')
      })
      error = true

    } else if (this.state.confirmInput === '') {
      this.setState({
        confirmInputError: translate!('changePassword.confirmPasswordRequiredError')
      })
      error = true

    } else if (this.state.confirmInput !== this.state.passwordInput) {
      this.setState({
        confirmInputError: translate!('changePassword.confirmPasswordEqualNewPasswordError')
      })
      error = true

    }

    if (!error) {
      this.props.login!(
        this.state.passwordInput,
        this.state.confirmInput
      )
    }

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
          <Paper className={classes.paper} elevation={1} >
            <div style={{ padding: '48px 40px 36px' }}>
              <div style={{
                paddingLeft: '40px',
                paddingRight: '40px'
              }}>

                <h2 style={{
                  textAlign: 'left',
                  paddingTop: '10px',
                  fontSize: '24px',
                  fontWeight: 400,
                  lineHeight: '32px',
                  margin: 0
                }} className='zoomOutLCorner animated g__paper-title'>{translate!('changePassword.title')}</h2>
              </div>

              <TextField
              autoFocus
              className={classes.textField}
                onChange={this.handleInputChange}
                helperText={this.state.passwordInputError}
                name='passwordInput'
                label={translate!('changePassword.newPasswordLabel')}
                type='password'
                error={this.state.passwordInputError.trim() !== ''}
              /><br />
              <TextField
              className={classes.textField}
                onChange={this.handleInputChange}
                helperText={this.state.confirmInputError}
                name='confirmInput'
                label={translate!('changePassword.confirmPasswordLabel')}
                type='password'
                error={this.state.confirmInputError.trim() !== ''}
              /><br />
              <br />
              <br />
              <div className='settings__button-box'>
                <div>
                  <Button onClick={this.props.homePage} > {translate!('changePassword.homeButton')} </Button>
                </div>
                <div>
                  <Button variant='raised' color='primary' onClick={this.handleForm}> {translate!('changePassword.changePasswordButton')} </Button>

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
const mapDispatchToProps = (dispatch: any, ownProps: ISettingComponentProps) => {
  return {
    login: (password: string) => {
      dispatch(authorizeActions.dbUpdatePassword(password))
    },
    homePage: () => {
      dispatch(push('/'))
    }
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: ISettingComponentProps) => {
  return {
    translate: getTranslate(state.get('locale'))
  }
}

// - Connect component to redux store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(SettingComponent as any) as any) as any)
