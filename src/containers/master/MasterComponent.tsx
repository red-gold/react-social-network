import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import { Map } from 'immutable';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MasterLoading from 'src/components/masterLoading';
import SendFeedback from 'src/components/sendFeedback';
import config from 'src/config';
import MasterRouter from 'src/routes/MasterRouter';
import { globalActions } from 'src/store/actions';

import { IMasterComponentProps } from './IMasterComponentProps';
import { IMasterComponentState } from './IMasterComponentState';


// - Import react components
// - Import components

// - Import actions
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

    const { progress, global, uid, sendFeedbackStatus, hideMessage } = this.props

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
  const authorize = Map(state.get('authorize', {})).toJS() as any
  const global = Map(state.get('global', {})).toJS()
  const { sendFeedbackStatus, progress } = global as any
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
