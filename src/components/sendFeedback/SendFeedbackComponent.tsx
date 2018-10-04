// - Import react components
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import {Map} from 'immutable'
import config from 'src/config'
import { translate, Trans } from 'react-i18next'

// - Material UI
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import SvgHappy from '@material-ui/icons/TagFaces'
import SvgSad from '@material-ui/icons/Face'
import SvgClose from '@material-ui/icons/Clear'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tooltip from '@material-ui/core/Tooltip'

import { withStyles } from '@material-ui/core/styles'

// - Import app components

// - Import API

// - Import actions
import { globalActions } from 'store/actions'

import { Feed } from 'core/domain/common'
import { ISendFeedbackComponentProps } from './ISendFeedbackComponentProps'
import { ISendFeedbackComponentState } from './ISendFeedbackComponentState'
import { FeedType } from 'core/domain/common/feedType'
import { ServerRequestModel } from 'models/server'
import StringAPI from 'api/StringAPI'
import { ServerRequestType } from 'constants/serverRequestType'
import { User } from 'core/domain/users'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'
import { userSelector } from 'store/reducers/users/userSelector'

const styles = (theme: any) => ({
  fullPageXs: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
      margin: 0,
      overflowY: 'auto'
    }
  }
})

/**
 * Create component class
 */
export class SendFeedbackComponent extends Component<ISendFeedbackComponentProps, ISendFeedbackComponentState> {

  /**
   * Component constructor
   *
   */
  constructor (props: ISendFeedbackComponentProps) {
    super(props)

    // Defaul state
    this.state = {
      feedText: ''
    }

    // Binding functions to `this`
    this.handleFeedText = this.handleFeedText.bind(this)
    this.getFeedbackForm = this.getFeedbackForm.bind(this)
    this.mainForm = this.mainForm.bind(this)
    this.loadingForm = this.loadingForm.bind(this)
    this.successForm = this.successForm.bind(this)
    this.errorForm = this.errorForm.bind(this)
  }

  handleFeedText = (event: any) => {
    const target = event ? event.target : {}
    const value = target ? target.value : ''
    if (value) {
      this.setState({
        feedText: value
      })

    }
  }

  handleSendFeed = (feedType: FeedType) => {
    const { sendFeed, currentUser } = this.props
    const { feedText } = this.state
    sendFeed!(new Feed('', feedText, feedType, currentUser as any))
  }

  mainForm = () => {
    const { sendFeedbackStatus, hideFeedback, sendFeed, sendFeedbackRequestType, t } = this.props
    const { feedText } = this.state
    return (
      <div className='main-box'>
        <TextField
          placeholder={t!('feedback.textareaPlaceholder')}
          multiline
          onChange={this.handleFeedText}
          rows={2}
          rowsMax={4}
          autoFocus
          fullWidth
        />
        <br />
        <div className='buttons'>
        <Tooltip title={t!('feedback.sadTooltip')} placement='bottom-start'>
          <IconButton
            className='flaticon-sad-2 icon__svg'
            onClick={() => this.handleSendFeed(FeedType.Sad)}
          >
          </IconButton>
          </Tooltip>

          <Tooltip title={t!('feedback.acceptableTooltip')} placement='bottom-start'>
          <IconButton
            className='flaticon-neutral icon__svg'
            onClick={() => this.handleSendFeed(FeedType.Acceptable)}
          >
          </IconButton>
          </Tooltip>
          <Tooltip title={t!('feedback.happyTooltip')} placement='bottom-start'>
          <IconButton
            className='flaticon-happy-2 icon__svg'
            onClick={() => this.handleSendFeed(FeedType.Happy)}
          >
          </IconButton>
          </Tooltip>
          <Tooltip title={t!('feedback.awesomeTooltip')} placement='bottom-start'>
          <IconButton
            className='flaticon-happy icon__svg'
            onClick={() => this.handleSendFeed(FeedType.Awesome)}
          >
          </IconButton>
          </Tooltip>
        </div>
      </div >)
  }

  loadingForm = () => {
    const {t, theme} = this.props
    return (
    <div className='loading'>
    <p>
    {t!('feedback.sendingMessage')}
      </p>
      <div className='icon'>
      <CircularProgress
      style={{color: theme.palette.primary.light}}
        color='secondary'
        size={50}
        variant='determinate'
        value={(25 - 0) / (50 - 0) * 100}
      />
      </div>
    </div>)
  }

  successForm = () => {
    const {t} = this.props
    return (<div className='success'>{t!('feedback.appreciateMessage')}</div>)
  }

  errorForm = () => {
    const {t} = this.props
    return (<div className='error'>{t!('feedback.errorMessage')}</div>)
  }

  getFeedbackForm = () => {
    const { sendFeedbackStatus, hideFeedback, sendFeed, sendFeedbackRequestType } = this.props
    const { feedText } = this.state

    if (sendFeedbackRequestType) {
      switch (sendFeedbackRequestType) {
        case ServerRequestStatusType.Sent:
          return this.loadingForm()

        case ServerRequestStatusType.OK:
          return this.successForm()

        case ServerRequestStatusType.Error:
          return this.errorForm()

        default:
          return this.mainForm()
      }
    } else {
      return this.mainForm()
    }
  }

  /**
   * Reneder component DOM
   * 
   */
  render () {
    const { sendFeedbackStatus, hideFeedback, sendFeed, sendFeedbackRequestType, classes } = this.props
    const { feedText } = this.state

    return (
      <div className={classNames('sendFeedback__content', 'animate__up',classes.fullPageXs)}>
        <Paper className='paper' >
          <div className='close'>
          <Tooltip title='Cancel' placement='bottom-start'>
            <IconButton
              onClick={() => hideFeedback!()}
            >
              <SvgClose />
            </IconButton>
            </Tooltip >
          </div>
          {this.getFeedbackForm()}

        </Paper>
      </div>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: Function, ownProps: ISendFeedbackComponentProps) => {
  return {
    sendFeed: (feed: Feed) => (dispatch(globalActions.dbSendFeed(feed))),
    hideFeedback: () => dispatch(globalActions.hideSendFeedback())
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: ISendFeedbackComponentProps) => {

  const request = state.getIn(['server', 'request'])
  const uid = state.getIn(['authorize', 'uid'])
  const requestId = StringAPI.createServerRequestId(ServerRequestType.CommonSendFeedback, uid)
  const currentUser: User =  { ...userSelector.getUserProfileById(state, {userId: uid}).toJS(), userId: uid }
  const sendFeedbackStatus = state.getIn(['global', 'sendFeedbackStatus'])
  const sendFeedbackRequestType = state.getIn(['server', 'request', requestId])

  return {
    
    sendFeedbackStatus,
    sendFeedbackRequestType: sendFeedbackRequestType ? sendFeedbackRequestType.status : ServerRequestStatusType.NoAction,
    currentUser
  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(SendFeedbackComponent)

export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles as any, {withTheme: true})(translateWrraper as any)) as any)
