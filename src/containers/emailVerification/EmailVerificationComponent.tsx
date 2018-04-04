// - Import external components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/Button'
import Button from 'material-ui/Button'
import config from 'src/config'
import { withStyles } from 'material-ui/styles'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'

// - Import actions
import * as authorizeActions from 'src/store/actions/authorizeActions'
import { IEmailVerificationComponentProps } from './IEmailVerificationComponentProps'
import { IEmailVerificationComponentState } from './IEmailVerificationComponentState'
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
  }
})

/**
 * Create component class
 *
 * @export
 * @class EmailVerificationComponent
 * @extends {Component}
 */
export class EmailVerificationComponent extends Component<IEmailVerificationComponentProps, IEmailVerificationComponentState> {

  styles = {
    message: {
      fontWeight: 400
    },
    buttons: {
      marginTop: 60
    },
    homeButton: {
      marginRight: 10
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

  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props: IEmailVerificationComponentProps) {
    super(props)

    // Binding function to `this`

  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {
    const { translate, classes } = this.props
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

                  <h2 className='zoomOutLCorner animated g__paper-title'>{translate!('emailVerification.title')}</h2>
                </div>
                <p style={this.styles.message as any}>
                  {translate!('emailVerification.description')}
                </p>
                <div style={this.styles.buttons}>
                  <Button variant='raised' style={this.styles.homeButton} color='primary' onClick={() => this.props.homePage()}> {translate!('emailVerification.homeButton')} </Button>
                  <Button variant='raised' color='primary' onClick={() => this.props.sendEmailVerification()}> {translate!('emailVerification.sendButton')} </Button>
                </div>
                <div>
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
const mapDispatchToProps = (dispatch: Function, ownProps: IEmailVerificationComponentProps) => {
  return {
    homePage: () => {
      dispatch(push('/'))
    },
    sendEmailVerification: () => dispatch(authorizeActions.dbSendEmailVerfication())
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: IEmailVerificationComponentProps) => {
  return {
    translate: getTranslate(state.get('locale'))
  }
}

// - Connect component to redux store
export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(EmailVerificationComponent as any) as any)) as typeof EmailVerificationComponent
