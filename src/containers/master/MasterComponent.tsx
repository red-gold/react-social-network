
// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, NavLink, withRouter, Redirect } from 'react-router-dom'
import { push } from 'react-router-redux'
import Snackbar from '@material-ui/core/Snackbar'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Helmet } from 'react-helmet'
import { Map } from 'immutable'
import config from 'src/config'

// - Import components

import MasterLoading from 'src/components/masterLoading'
import SendFeedback from 'src/components/sendFeedback'
import MasterRouter from 'src/routes/MasterRouter'
import { IMasterComponentProps } from './IMasterComponentProps'
import { IMasterComponentState } from './IMasterComponentState'
import { IAuthorizeService } from 'src/core/services/authorize'

// - Import actions
import {
  authorizeActions,
  imageGalleryActions,
  postActions,
  commentActions,
  voteActions,
  userActions,
  globalActions,
  circleActions,
  notifyActions
} from 'src/store/actions'
import { UserClaim } from 'core/domain/authorize/userClaim'
import { LoginUser } from 'core/domain/authorize/loginUser'

/* ------------------------------------ */

// - Create Master component class
export class MasterComponent extends Component<IMasterComponentProps, IMasterComponentState> {

  static isPrivate = true

  // Constructor
  constructor(props: IMasterComponentProps) {
    super(props)

    this.state = {
      loading: true,
      authed: false,
      dataLoaded: false,
      isVerifide: false
    }

    // Binding functions to `this`
    this.handleMessage = this.handleMessage.bind(this)

  }

  // Handle click on message
  handleMessage = (evt: any) => {
    this.props.closeMessage()
  }

  componentDidCatch(error: any, info: any) {
    console.log('===========Catched by React componentDidCatch==============')
    console.log(error, info)
    console.log('====================================')
  }

  componentDidMount() {
  }
  /**
   * Render app DOM component
   *
   * @returns
   *
   * @memberof Master
   */
  public render() {

    const { progress, global, loaded, guest, uid, sendFeedbackStatus, hideMessage } = this.props
    const { loading, isVerifide } = this.state

    const header = (
      <Helmet>
        <meta charSet='utf-8' />
        <title>{config.header.title}</title>
        {config.header.meta && config.header.meta.length > 0
          ? config.header.meta.map((metaData) => <meta key={metaData.name} name={metaData.name} content={metaData.content} />)
          : ''
        }
      </Helmet>
    )

    return (
      <div id='master'>
        {
          header
        }
        {sendFeedbackStatus ? <SendFeedback /> : ''}
        <div className='master__progress' style={{ display: (progress.visible ? 'block' : 'none') }}>
          <LinearProgress variant='determinate' value={progress.percent} />
        </div>
        <div className='master__loading animate-fading2' style={{ display: (global.showTopLoading ? 'flex' : 'none') }}>
          <div className='title'>Loading ... </div>
        </div>
        {progress.visible ? <MasterLoading /> : ''}
        <MasterRouter data={{ uid }} />
        <Snackbar
          open={this.props.global.messageOpen}
          message={this.props.global.message}
          onClose={hideMessage}
          autoHideDuration={4000}
          style={{ left: '1%', transform: 'none' }}
        />
      </div>

    )
  }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch: any, ownProps: IMasterComponentProps) => {

  return {
    defaultDataDisable: () => {
      dispatch(globalActions.defaultDataDisable())
    },
    defaultDataEnable: () => {
      dispatch(globalActions.defaultDataEnable())
    },
    closeMessage: () => {
      dispatch(globalActions.hideMessage())
    },
    loadDataGuest: () => {
      dispatch(globalActions.loadDataGuest())
    },
    showMasterLoading: () => dispatch(globalActions.showMasterLoading()),
    hideMasterLoading: () => dispatch(globalActions.hideMasterLoading()),
    hideMessage: () => dispatch(globalActions.hideMessage())
  }

}

/**
 * Map state to props
 * @param {object} state
 */
const mapStateToProps = (state: Map<string, any>) => {
  const authorize = Map(state.get('authorize', {})).toJS()
  const global = Map(state.get('global', {})).toJS()
  const { sendFeedbackStatus, progress } = global
  return {
    sendFeedbackStatus,
    progress,
    guest: authorize.guest,
    uid: authorize.uid,
    authed: authorize.authed,
    global: global
  }

}
// - Connect commponent to redux store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MasterComponent as any) as any)
