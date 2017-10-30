/// <reference types="@types/material-ui" />
// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, NavLink, withRouter, Redirect } from 'react-router-dom'
import { firebaseAuth, firebaseRef } from 'data/firebaseClient'
import { push } from 'react-router-redux'
import Snackbar from 'material-ui/Snackbar'
import LinearProgress from 'material-ui/LinearProgress'

// - Import components
import Home from 'components/home'
import Signup from 'components/signup'
import Login from 'components/login'
import Setting from 'components/setting'
import MasterLoading from 'components/masterLoading'
import { IMasterComponentProps } from './IMasterComponentProps'
import { IMasterComponentState } from './IMasterComponentState'

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
  // Constructor
  constructor (props: IMasterComponentProps) {
    super(props)
    this.state = {
      loading: true,
      authed: false,
      dataLoaded: false
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

    firebaseAuth().onAuthStateChanged((user: any) => {

      if (user) {
        this.props.login(user)
        this.setState({
          loading: false
        })
        if (!this.props.global.defaultLoadDataStatus) {
          this.props.clearData()
          this.props.loadData()
          this.props.defaultDataEnable()
        }
      } else {
        this.props.logout()
        this.setState({
          loading: false
        })
        if (this.props.global.defaultLoadDataStatus) {
          this.props.defaultDataDisable()
          this.props.clearData()
        }
        this.props.loadDataGuest()
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

    const { progress, global } = this.props

    return (
      <div id='master'>

        <div className='master__progress' style={{ display: (progress.visible ? 'block' : 'none') }}>
          <LinearProgress mode='determinate' value={progress.percent} />
        </div>
        <div className='master__loading animate-fading2' style={{ display: (global.showTopLoading ? 'flex' : 'none') }}>
          <div className='title'>Loading ... </div>
        </div>
        <MasterLoading activeLoading={this.state.loading || !(this.props.loaded || this.props.guest)} handleLoading={this.handleLoading} />

        {(!this.state.loading && (this.props.loaded || this.props.guest))
          ? (<Switch>
            <Route path='/signup' component={Signup} />
            <Route path='/settings' component={Setting} />
            <Route path='/login' render={() => {
              console.log('this.props.authed: ', this.props.authed, 'this.props: ', this.props)
              return (
                this.props.authed
                  ? <Redirect to='/' />
                  : <Login />
              )
            }
            } />
            <Route render={() => <Home uid={this.props.uid} />} />

          </Switch>) : ''
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
    loadData: () => {
      dispatch(commentActions.dbGetComments())
      dispatch(imageGalleryActions.dbGetImageGallery())
      dispatch(postActions.dbGetPosts())
      dispatch(userActions.dbGetUserInfo())
      dispatch(voteActions.dbGetVotes())
      dispatch(notifyActions.dbGetNotifications())
      dispatch(circleActions.dbGetCircles())

    },
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
    login: (user: any) => {
      dispatch(authorizeActions.login(user.uid))
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
    global: global,
    loaded: user.loaded && post.loaded && comment.loaded && imageGallery.loaded && vote.loaded && notify.loaded && circle.loaded
  }

}
// - Connect commponent to redux store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MasterComponent as any))
