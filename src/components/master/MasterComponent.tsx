/// <reference types="@types/material-ui" />
// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, NavLink, withRouter, Redirect } from 'react-router-dom'
import { push } from 'react-router-redux'
import Snackbar from 'material-ui/Snackbar'
import LinearProgress from 'material-ui/LinearProgress'

// - Import components
import Home from 'components/home'
import Signup from 'components/signup'
import EmailVerification from 'components/emailVerification'
import Login from 'components/login'
import ResetPassword from 'components/resetPassword'
import Setting from 'components/setting'
import MasterLoading from 'components/masterLoading'
import { IMasterComponentProps } from './IMasterComponentProps'
import { IMasterComponentState } from './IMasterComponentState'
import { ServiceProvide, IServiceProvider } from 'core/factories'
import { IAuthorizeService } from 'core/services/authorize'

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
} from 'actions'

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
    this.handleLoading = this.handleLoading.bind(this)
    this.handleMessage = this.handleMessage.bind(this)

  }

  // Handle click on message
  handleMessage = (evt: any) => {
    this.props.closeMessage()
  }

  // Handle loading
  handleLoading = (status: boolean) => {
    this.setState({
      loading: status,
      authed: false
    })
  }

  componentDidCatch (error: any, info: any) {
    console.log('===========Catched by React componentDidCatch==============')
    console.log(error, info)
    alert({error, info})
    console.log('====================================')
  }

  componentWillMount () {

    this._authourizeService.onAuthStateChanged((isVerifide: boolean, user: any) => {
      const {global, clearData, loadDataGuest, defaultDataDisable, defaultDataEnable, login, logout } = this.props
      if (user) {
        login(user.uid,isVerifide)
        this.setState({
          loading: false,
          isVerifide: true
        })

      } else {
        logout()
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
  public render (): React.ReactElement<{}> {

    const { progress, global, loaded, guest } = this.props
    const { loading, isVerifide } = this.state

    return (
      <div id='master'>

        <div className='master__progress' style={{ display: (progress.visible ? 'block' : 'none') }}>
          <LinearProgress mode='determinate' value={progress.percent} />
        </div>
        <div className='master__loading animate-fading2' style={{ display: (global.showTopLoading ? 'flex' : 'none') }}>
          <div className='title'>Loading ... </div>
        </div>
        <MasterLoading activeLoading={loading} handleLoading={this.handleLoading} />

        {(!loading) ? (<Switch>
                    <Route path='/signup' component={Signup} />
                    <Route path='/emailVerification' component={EmailVerification} />
                    <Route path='/settings' component={Setting} />
                    <Route path='/resetPassword' component={ResetPassword} />
                    <Route path='/login' render={() => {
                      return (
                        this.props.authed
                          ? <Redirect to='/' />
                          : <Login />
                      )
                    }
                    } />
                    <Route render={() => <Home uid={this.props.uid} />} />

                  </Switch>)
          : ''
        }
        <Snackbar
          open={this.props.global.messageOpen}
          message={this.props.global.message}
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
    }
  }

}

/**
 * Map state to props
 * @param {object} state
 */
const mapStateToProps = (state: any) => {
  const { authorize, global, user, post, comment, imageGallery, vote, notify, circle } = state
  return {
    guest: authorize.guest,
    uid: authorize.uid,
    authed: authorize.authed,
    progress: global.progress,
    global: global
  }

}
// - Connect commponent to redux store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MasterComponent as any))
