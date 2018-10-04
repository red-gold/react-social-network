// - Import external components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import RaisedButton from '@material-ui/core/Button'
import Button from '@material-ui/core/Button'
import config from 'src/config'
import { withStyles } from '@material-ui/core/styles'

import { translate, Trans } from 'react-i18next'

// - Import actions
import * as authorizeActions from 'src/store/actions/authorizeActions'
import { IEmailVerificationComponentProps } from './IEmailVerificationComponentProps'
import { IEmailVerificationComponentState } from './IEmailVerificationComponentState'
import { Grid } from '@material-ui/core'

const styles = (theme: any) => ({
  textField: {
    minWidth: 280,
    marginTop: 20

  },
  contain: {
    margin: '0 auto'
  },
  boxRoot: {
    padding: '20px 40px 36px'
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
   *
   */
  constructor(props: IEmailVerificationComponentProps) {
    super(props)

    // Binding function to `this`

  }

  /**
   * Reneder component DOM
   * 
   */
  render() {
    const { t, classes } = this.props
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} className={classes.contain}>

          <h1 className='g__app-name'>{config.settings.appName}</h1>

          <div className='animate-bottom'>
            <Paper className={classes.paper} elevation={1} >
              <div className={classes.boxRoot}>
                <div style={{
                  paddingLeft: '40px',
                  paddingRight: '40px'
                }}>

                  <h2 className='zoomOutLCorner animated g__paper-title'>{t!('emailVerification.title')}</h2>
                </div>
                <p style={this.styles.message as any}>
                  {t!('emailVerification.description')}
                </p>
                <div style={this.styles.buttons}>
                  <Button variant='raised' style={this.styles.homeButton} color='primary' onClick={() => this.props.homePage()}> {t!('emailVerification.homeButton')} </Button>
                  <Button variant='raised' color='primary' onClick={() => this.props.sendEmailVerification()}> {t!('emailVerification.sendButton')} </Button>
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
 */
const mapStateToProps = (state: any, ownProps: IEmailVerificationComponentProps) => {
  return {
    
  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(EmailVerificationComponent)

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(translateWrraper as any) as any)) as typeof EmailVerificationComponent
