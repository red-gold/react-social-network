// - Import react components
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Map } from 'immutable';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { SignupStepEnum } from 'src/models/authorize/signupStepEnum';
import * as authorizeActions from 'src/store/actions/authorizeActions';

import { ISignupMessageProps } from './ISignupMessageProps';
import { ISignupMessageState } from './ISignupMessageState';
import { signupMessageStyles } from './signupMessageStyles';

// - Components

// - Import actions
// - Import app API
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
const translateWrraper = withTranslation('translations')(SignupMessageComponent as any)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(signupMessageStyles as any)(translateWrraper as any) as any) as any)
