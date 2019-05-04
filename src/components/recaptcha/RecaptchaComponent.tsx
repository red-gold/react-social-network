// - Import react components
import { withStyles } from '@material-ui/core/styles';
import { IAuthorizeService } from 'core/services';
import { SocialProviderTypes } from 'core/socialProviderTypes';
import { Map } from 'immutable';
import React, { Component } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { connect } from 'react-redux';
import { provider } from 'socialEngine';

import { IRecaptchaComponentProps } from './IRecaptchaComponentProps';
import { IRecaptchaComponentState } from './IRecaptchaComponentState';

// - Material UI
// - Import app components

// - Import API

// - Import actions
const styles = (theme: any) => ({
  dialogTitle: {
    padding: 0
  }
})

/**
 * React component class
 */
export class RecaptchaComponent extends Component<IRecaptchaComponentProps, IRecaptchaComponentState> {

  /**
   * Fields
   */
  captchaRef: any
  _authorizeService: IAuthorizeService

  /**
   * Component constructor
   *
   */
  constructor(props: IRecaptchaComponentProps) {
    super(props)
    this._authorizeService = provider.get<IAuthorizeService>(SocialProviderTypes.AuthorizeService)
    // Defaul state
    this.state = {

    }

    // Binding functions to `this`

  }

  /**
   * Captha element widget reference
   */
  setCaptchaRef = (ref: any) => {

  }

  /**
   * Reneder component DOM
   */
  render() {
    const { onExpired, onSuccess } = this.props
    return (
      <div className='recaptcha'>

        <ReCAPTCHA
          ref={((ref) => this.setCaptchaRef(ref))}
          sitekey='6LcO1EUUAAAAAK7tBHxyT1iNF0Oa_VbG6WSMnGyL'
          onChange={onSuccess}
          onExpired={onExpired}

        />
      </div>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IRecaptchaComponentProps) => {
  return {

  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IRecaptchaComponentProps) => {
  return {
    
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RecaptchaComponent as any) as any)
