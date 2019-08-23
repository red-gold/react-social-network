// - Import external components
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { push } from 'connected-react-router';
import Footer from 'layouts/footer';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import config from 'src/config';

import LoginComponent from '../login';
import { ILoginWrapperProps } from './ILoginWrapperProps';
import { ILoginWrapperState } from './ILoginWrapperState';
import { loginWrapperStyles } from './loginWrapperStyles';

// - Material-UI
// - Components
// - Import actions
// - Create Login component class
export class LoginWrapperComponent extends Component<ILoginWrapperProps, ILoginWrapperState> {

  /**
   * Component constructor
   */
  constructor(props: ILoginWrapperProps) {
    super(props)
    this.state = {
    }
  }

  /**
   * Reneder component DOM
   */
  render() {
    const { classes} = this.props

    return (
      <div className={classes.root}>
        <div className={classes.appbar}>
          <img src={config.settings.logo} alt={config.settings.appName} className={classes.logo}/>
        </div>
        <div className={classes.pageContainer}>
          <div className={classNames(classes.centerRoot, 'animate-bottom')}>
            <div className={classes.centerContainer}>
              <div className={classNames(classes.contain, classes.pageItem)}>
                <LoginComponent />
              </div>
             
            </div>
          </div>
          <div style={{height: 30}}></div>          
          <Footer />

        </div>
      </div>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: ILoginWrapperProps) => {
  return {
    signupPage: () => {
      dispatch(push('/signup'))
    }
  }
}

/**
 * Map state to props
 */
const mapStateToProps = () => {
  return {
    
  }
}

// - Connect component to redux store
const translateWrapper = withTranslation('translations')(LoginWrapperComponent as any)
const styleWrapper = withStyles(loginWrapperStyles as any, { withTheme: true })(translateWrapper as any)
export default withRouter<any, any>(connect(mapStateToProps, mapDispatchToProps)(styleWrapper as any))
