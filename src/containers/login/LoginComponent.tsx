// - Import external components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/Button'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
import ActionAndroid from 'material-ui-icons/Android'
import { withStyles } from 'material-ui/styles'
import config from 'src/config'
import { localize } from 'react-localize-redux'

// - Import actions
import * as authorizeActions from 'src/store/actions/authorizeActions'
import { ILoginComponentProps } from './ILoginComponentProps'
import { ILoginComponentState } from './ILoginComponentState'
import { OAuthType } from 'src/core/domain/authorize'
import Grid from 'material-ui/Grid/Grid'
import CommonAPI from 'api/CommonAPI'

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
  bottomPaper: {
    display: 'inherit',
    fontSize: 'small',
    marginTop: '50px'
  },
  link: {
    color: '#0095ff',
    display: 'inline-block'
  }
})

// - Create Login component class
export class LoginComponent extends Component<ILoginComponentProps, ILoginComponentState> {

  styles = {
    singinOptions: {
      paddingBottom: 10,
      justifyContent: 'space-around',
      display: 'flex'
    },
    divider: {
      marginBottom: 10,
      marginTop: 15
    }
  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props: ILoginComponentProps) {
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
    const { translate } = this.props
    let error = false
    if (this.state.emailInput === '') {
      this.setState({
        emailInputError: translate!('login.emailRequiredError')
      })
      error = true

    }
    if (this.state.passwordInput === '') {
      this.setState({
        passwordInputError: translate!('login.passwordRequiredError')
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
  render() {
    const { classes, loginWithOAuth, translate } = this.props

    const OAuthLogin = (
      <div style={this.styles.singinOptions as any}>
        <IconButton
          onClick={() => loginWithOAuth!(OAuthType.FACEBOOK)}
        ><div className='icon-fb icon'></div></IconButton>
        <IconButton
          onClick={() => loginWithOAuth!(OAuthType.GOOGLE)}
        > <div className='icon-google icon'></div> </IconButton>
        <IconButton
          onClick={() => loginWithOAuth!(OAuthType.GITHUB)}
        > <div className='icon-github icon'></div> </IconButton>
  
      </div>
    )

    return (
      <Grid container spacing={24}>
        <Grid item xs={12} className={classes.contain}>

          <h1 className='g__app-name'>{config.settings.appName}</h1>

          <div className='animate-bottom'>
            <Paper className={classes.paper} elevation={1} >
              <form>
                <div style={{ padding: '48px 40px 36px' }}>
                  <div style={{
                    paddingLeft: '40px',
                    paddingRight: '40px'
                  }}>

                    <h2 className='zoomOutLCorner animated g__paper-title'>{translate!('login.title')}</h2>
                  </div>
                  {config.settings.enabledOAuthLogin ? OAuthLogin : ''}
                
                  <Divider style={this.styles.divider} />
                  <TextField
                    className={classes.textField}
                    autoFocus
                    onChange={this.handleInputChange}
                    helperText={this.state.emailInputError}
                    error={this.state.emailInputError.trim() !== ''}
                    name='emailInput'
                    label={translate!('login.emailLabel')}
                    type='email'
                    tabIndex={1}
                  /><br />
                  <TextField
                    className={classes.textField}
                    onChange={this.handleInputChange}
                    helperText={this.state.passwordInputError}
                    error={this.state.passwordInputError.trim() !== ''}
                    name='passwordInput'
                    label={translate!('login.passwordLabel')}
                    type='password'
                    tabIndex={2}
                  /><br />
                  <br />
                  <br />
                  <div className='login__button-box'>
                    <div>
                      <Button onClick={this.props.signupPage} tabIndex={4}>{translate!('login.createAccountButton')}</Button>
                    </div>
                    <div >
                      <Button variant='raised' color='primary' onClick={this.handleForm} tabIndex={3} >{translate!('login.loginButton')}</Button>
                    </div>
                  </div>
                  <span className={classes.bottomPaper}>{translate!('login.forgetPasswordMessage')} <NavLink to='/resetPassword' className={classes.link}>{translate!('login.resetPasswordLabel')}</NavLink></span>
                </div>
              </form>
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
 */
const mapStateToProps = (state: any, ownProps: ILoginComponentProps) => {
  return {
  }
}

// - Connect component to redux store
export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(localize(LoginComponent, 'locale', CommonAPI.getStateSlice) as any) as any)) as typeof LoginComponent
