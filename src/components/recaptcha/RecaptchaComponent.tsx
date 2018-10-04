// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'

import ReCAPTCHA from 'react-google-recaptcha'
import {Map} from 'immutable'

// - Material UI
import Button from '@material-ui/core/Button'
import grey from '@material-ui/core/colors/grey'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

// - Import app components

// - Import API
import StringAPI from 'api/StringAPI'

// - Import actions
import { IRecaptchaComponentProps } from './IRecaptchaComponentProps'
import { IRecaptchaComponentState } from './IRecaptchaComponentState'
import { IAuthorizeService } from 'core/services'
import { SocialProviderTypes } from 'core/socialProviderTypes'
import { provider } from 'socialEngine'

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
    const { onSuccess, onExpired, onRenderError } = this.props

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
