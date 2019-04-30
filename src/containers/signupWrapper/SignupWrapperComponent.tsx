// - Import external components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { push } from 'connected-react-router'
import config from 'src/config'

import { Map } from 'immutable'
import { translate, Trans } from 'react-i18next'

// - Material-UI
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

// - Components
import Footer from 'layouts/footer'
import SignupComponent from '../signup'

// - Import actions
import * as authorizeActions from 'src/store/actions/authorizeActions'
import { ISignupWrapperProps } from './ISignupWrapperProps'
import { ISignupWrapperState } from './ISignupWrapperState'
import { signupWrapperStyles } from './signupWrapperStyles'
import { authorizeSelector } from 'src/store/reducers/authorize/authorizeSelector'
import VerifySignupComponent from 'src/components/verifySignup/VerifySignupComponent';

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
const translateWrraper = translate('translations')(SignupWrapperComponent as any)

export default withRouter<any>(connect(makeMapStateToProps, mapDispatchToProps)(withStyles(signupWrapperStyles as any, { withTheme: true })(SignupWrapperComponent as any) as any))
