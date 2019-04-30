// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Map} from 'immutable'
import { NavLink, withRouter } from 'react-router-dom'
import { translate, Trans } from 'react-i18next'
import config from 'src/config'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';

// - Components

// - Import actions
import * as authorizeActions from 'src/store/actions/authorizeActions'
import * as globalActions from 'src/store/actions/globalActions'

// - Import app API
import { signupMessageStyles } from './signupMessageStyles'
import RecaptchaComponent from 'src/components/recaptcha'
import { ISignupMessageProps } from './ISignupMessageProps'
import { ISignupMessageState } from './ISignupMessageState'
import { SignupStepEnum } from 'src/models/authorize/signupStepEnum';

// - Create Verify Signup component class
export class SignupMessageComponent extends Component<ISignupMessageProps, ISignupMessageState> {

  /**
   * Component constructor
   *
   */
  constructor(props: ISignupMessageProps) {
    super(props)

    this.handleResetStep = this.handleResetStep.bind(this)
  }

  /**
   * Handle reset step
   */
  handleResetStep = () => {
    const {resetStep} = this.props
    resetStep!()
  }

  /**
   * Reneder component DOM
   * 
   */
  render() {

    const { classes, t } = this.props
    return (
      <div className={classes.root}>
      
        <Typography className={classes.caption} variant='caption' component='p'>
            {t!('signup.termCaption')} <NavLink to='/terms'> {t!('signup.termCaptionLink')} </NavLink>
        </Typography>
        <Button
                variant='contained'
                className={classes.signupButton}
                color='secondary'
                onClick={this.handleResetStep}
                fullWidth
                tabIndex={3}
              >
                {t!('signup.resetButton')}
              </Button>
      </div>

    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: ISignupMessageProps) => {
  return {
    resetStep: () => dispatch(authorizeActions.setSignupStep(SignupStepEnum.UserInformation))
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: ISignupMessageProps) => {
  return {
    
  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(SignupMessageComponent as any)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(signupMessageStyles as any)(translateWrraper as any) as any) as any)
