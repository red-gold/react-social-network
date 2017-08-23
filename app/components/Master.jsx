// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, NavLink, withRouter, Redirect } from 'react-router-dom'
import { firebaseAuth, firebaseRef } from 'app/firebase/'
import { push } from 'react-router-redux'
import Snackbar from 'material-ui/Snackbar';
import LinearProgress from 'material-ui/LinearProgress'


// - Import components
import Home from 'Home'
import Signup from 'Signup'
import Login from 'Login'
import Settings from 'Settings'

import MasterLoading from 'MasterLoading'


// - Import API
import { PrivateRoute, PublicRoute } from 'AuthRouterAPI'


// - Import actions
import * as authorizeActions from 'authorizeActions'
import * as imageGalleryActions from 'imageGalleryActions'
import * as postActions from 'postActions'
import * as commentActions from 'commentActions'
import * as voteActions from 'voteActions'
import * as userActions from 'userActions'
import * as globalActions from 'globalActions'
import * as circleActions from 'circleActions'
import * as notifyActions from 'notifyActions'


/* ------------------------------------ */


// - Create Master component class
export class Master extends Component {

  static isPrivate = true
  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      authed: false,
      dataLoaded: false
    };

    // Binding functions to `this`
    this.handleLoading = this.handleLoading.bind(this)
    this.handleMessage = this.handleMessage.bind(this)


  }

  // Handle click on message
  handleMessage = (evt) => {
    this.props.closeMessage()
  }

  // Handle loading
  handleLoading = (status) => {
    this.setState({
      loading: status,
      authed: false
    })
  }

  componentWillMount = () => {

    firebaseAuth().onAuthStateChanged((user) => {

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
  render() {

    const {progress, global} = this.props

    return (
      <div id="master">

 <div className='master__progress' style={{display: (progress.visible ? 'block' : 'none' )}}>
            <LinearProgress mode="determinate" value={progress.percent} />
            </div>
  <div className='master__loading animate-fading2' style={{display: ( global.showTopLoading ? 'flex' : 'none' )}}>
   <div className='title'>  Loading ... </div>
    </div>
        <MasterLoading activeLoading={this.state.loading || !(this.props.loaded || this.props.guest)} handleLoading={this.handleLoading} />

        {(!this.state.loading && (this.props.loaded || this.props.guest))
        ?(<Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/settings" component={Settings} />
          <Route path="/login" render={() => {
            console.log('this.props.authed: ', this.props.authed, "this.props: ", this.props)
            return (
              this.props.authed
                ? <Redirect to="/" />
                : <Login />
            )
          }
          } />
            <Route render={() =><Home uid={this.props.uid}/>} />

        </Switch>) : ''
        }
        <Snackbar
          open={this.props.global.messageOpen}
          message={this.props.global.message}
          autoHideDuration={4000}
          style={{left: '1%', transform: 'none'}}
        />
      </div>


    )
  }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    loadData: () => {
      dispatch(commentActions.dbGetComments())
      dispatch(imageGalleryActions.downloadForImageGallery())
      dispatch(postActions.dbGetPosts())
      dispatch(userActions.dbGetUserInfo())
      dispatch(voteActions.dbGetVotes())
      dispatch(notifyActions.dbGetNotifies())
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
      
    },
    login: (user) => {
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
const mapStateToProps = ({authorize, global, user, post, comment, imageGallery , vote, notify,circle  }) => {
  
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Master))
