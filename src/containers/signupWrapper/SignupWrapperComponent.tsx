// - Import external components
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { push } from 'connected-react-router';
import { Map } from 'immutable';
import Footer from 'layouts/footer';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import VerifySignupComponent from 'src/components/verifySignup/VerifySignupComponent';
import config from 'src/config';
import { authorizeSelector } from 'src/store/reducers/authorize/authorizeSelector';

import SignupComponent from '../signup';
import { ISignupWrapperProps } from './ISignupWrapperProps';
import { ISignupWrapperState } from './ISignupWrapperState';
import { signupWrapperStyles } from './signupWrapperStyles';

// - Material-UI
// - Components
// - Import actions
// - Create Login component class
export class SignupWrapperComponent extends Component<ISignupWrapperProps, ISignupWrapperState> {

  /**
   * Component constructor
   */
  constructor(props: ISignupWrapperProps) {
    super(props)
    this.state = {
    }
  }

  /**
   * Reneder component DOM
   */
  render() {
    const { classes, currentStep} = this.props

    return (
      <div className={classes.root}>
        <div className={classes.appbar}>
          <img src={config.settings.logo} alt={config.settings.appName} className={classes.logo} />
        </div>
        <div className={classes.pageContainer}>
          <div className={classNames(classes.centerRoot, 'animate-bottom')}>
            <div className={classes.centerContainer}>
              <div className={classNames(classes.contain, classes.pageItem)}>
              {
                currentStep === 0 
                ? <SignupComponent />
                : <VerifySignupComponent />
              }
                
              </div>
            </div>
          </div>
          <div style={{height: 130}}></div>
          <Footer />

        </div>
      </div>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: ISignupWrapperProps) => {
  return {
    loginPage: () => {
      dispatch(push('/login'))
    }
  }
}


const makeMapStateToProps = () => {
  const selectSignupStep = authorizeSelector.selectSignupStep()
  const mapStateToProps = (state: Map<string, any>, ownProps: ISignupWrapperProps) => {

    return {
      currentStep: selectSignupStep(state)
    }
  }
  return mapStateToProps
}

// - Connect component to redux store
const translateWrraper = withTranslation('translations')(SignupWrapperComponent as any)

export default withRouter<any>(connect(makeMapStateToProps, mapDispatchToProps)(withStyles(signupWrapperStyles as any, { withTheme: true })(translateWrraper as any) as any))
