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
import { getTranslate, getActiveLanguage } from 'react-localize-redux'

// - Import actions
import * as authorizeActions from 'actions/authorizeActions'
import { IEmailVerificationComponentProps } from './IEmailVerificationComponentProps'
import { IEmailVerificationComponentState } from './IEmailVerificationComponentState'

/**
 * Create component class
 *
 * @export
 * @class EmailVerificationComponent
 * @extends {Component}
 */
export class EmailVerificationComponent extends Component<IEmailVerificationComponentProps,IEmailVerificationComponentState> {

  styles = {
    message: {
      fontWeight: 100
    },
    buttons: {
      marginTop: 60
    },
    homeButton: {
      marginRight: 10 
    }

  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IEmailVerificationComponentProps) {
    super(props)

    // Binding function to `this`

  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {
    const {translate} = this.props
    const paperStyle = {
      minHeight: 370,
      width: 450,
      textAlign: 'center',
      display: 'block',
      margin: 'auto'
    }
    return (
      <div>

        <h1 style={{
          textAlign: 'center',
          padding: '20px',
          fontSize: '30px',
          fontWeight: 500,
          lineHeight: '32px',
          margin: 'auto',
          color: 'rgba(138, 148, 138, 0.2)'
        }}>{config.settings.appName}</h1>

        <div className='animate-bottom'>
          <Paper style={paperStyle} elevation={1} >
            <div style={{ padding: '48px 40px 36px' }}>
              <div style={{
                paddingLeft: '40px',
                paddingRight: '40px'
              }}>

                <h2 style={{
                  textAlign: 'left',
                  paddingTop: '16px',
                  fontSize: '24px',
                  fontWeight: 400,
                  lineHeight: '32px',
                  margin: 0
                }} className='zoomOutLCorner animated'>{translate!('emailVerification.title')}</h2>
              </div>
              <p style={this.styles.message as any}>
              {translate!('emailVerification.description')}
                </p>
                <div style={this.styles.buttons}>
                  <Button raised style={this.styles.homeButton} color='primary' onClick={() => this.props.homePage()}> {translate!('emailVerification.homeButton')} </Button>
                  <Button raised color='primary' onClick={() => this.props.sendEmailVerification()}> {translate!('emailVerification.sendButton')} </Button>
                </div>
                <div>
                </div>

            </div>
          </Paper>
        </div>
      </div>
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
    translate: getTranslate(state.locale)
  }
}

// - Connect component to redux store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmailVerificationComponent as any) as any)
