
// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, NavLink, withRouter, Redirect } from 'react-router-dom'
import { push } from 'react-router-redux'
import Snackbar from 'material-ui/Snackbar'
import { LinearProgress } from 'material-ui/Progress'
import {Helmet} from 'react-helmet'
import {Map} from 'immutable'

// - Import components

import MasterLoading from 'src/components/masterLoading'
import SendFeedback from 'src/components/sendFeedback'
import MasterRouter from 'src/routes/MasterRouter'
import { IMasterComponentProps } from './IMasterComponentProps'
import { IMasterComponentState } from './IMasterComponentState'
import { ServiceProvide, IServiceProvider } from 'src/core/factories'
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

/* ------------------------------------ */

// - Create Master component class
export class MasterComponent extends Component<IMasterComponentProps, IMasterComponentState> {

  static isPrivate = true

  private readonly _serviceProvider: IServiceProvider
  private readonly _authourizeService: IAuthorizeService
  // Constructor
  constructor (props: IMasterComponentProps) {
    super(props)

    this._serviceProvider = new ServiceProvide()
    this._authourizeService = this._serviceProvider.createAuthorizeService()
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

  componentDidCatch (error: any, info: any) {
    console.log('===========Catched by React componentDidCatch==============')
    console.log(error, info)
    console.log('====================================')
  }

  componentDidMount () {

    this._authourizeService.onAuthStateChanged((isVerifide: boolean, user: any) => {
      const {
        global,
        clearData,
        loadDataGuest,
        defaultDataDisable,
        defaultDataEnable,
        login,
        logout,
        showMasterLoading,
        hideMasterLoading
      } = this.props
      if (user) {
        login(user.uid,isVerifide)
        hideMasterLoading!()
        this.setState({
          loading: false,
          isVerifide: true
        })

      } else {
        logout()
        hideMasterLoading!()
        this.setState({
          loading: false,
          isVerifide: false
        })
        if (global.defaultLoadDataStatus) {
          defaultDataDisable()
          clearData()
        }
        loadDataGuest()
      }
    })

  }

  /**
   * Render app DOM component
   *
   * @returns
   *
   * @memberof Master
   */
  public render () {

    const { progress, global, loaded, guest, uid, sendFeedbackStatus, hideMessage } = this.props
    const { loading, isVerifide } = this.state

    return (
      <div id='master'>
      <Helmet>
                <meta charSet='utf-8' />
                <title>React Social Network</title>
                <link rel='canonical' href='https://github.com/Qolzam/react-social-network' />
            </Helmet>
       {sendFeedbackStatus ? <SendFeedback /> : ''}
        <div className='master__progress' style={{ display: (progress.visible ? 'block' : 'none') }}>
          <LinearProgress variant='determinate' value={progress.percent} />
        </div>
        <div className='master__loading animate-fading2' style={{ display: (global.showTopLoading ? 'flex' : 'none') }}>
          <div className='title'>Loading ... </div>
        </div>
       {progress.visible ? <MasterLoading /> : ''}
      <MasterRouter enabled={!loading} data={{uid}} />
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
    clearData: () => {
      dispatch(imageGalleryActions.clearAllData())
      dispatch(postActions.clearAllData())
      dispatch(userActions.clearAllData())
      dispatch(commentActions.clearAllData())
      dispatch(voteActions.clearAllvotes())
      dispatch(notifyActions.clearAllNotifications())
      dispatch(circleActions.clearAllCircles())
      dispatch(globalActions.clearTemp())

    },
    login: (userId: string, isVerifide: boolean) => {
      dispatch(authorizeActions.login(userId, isVerifide))
    },
    logout: () => {
      dispatch(authorizeActions.logout())
    },
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
  const  authorize = Map(state.get('authorize', {})).toJS()
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
