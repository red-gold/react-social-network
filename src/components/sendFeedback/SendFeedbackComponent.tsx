// - Import react components
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import {Map} from 'immutable'

// - Material UI
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import SvgHappy from 'material-ui-icons/TagFaces'
import SvgSad from 'material-ui-icons/Face'
import SvgClose from 'material-ui-icons/Clear'
import { CircularProgress } from 'material-ui/Progress'
import Tooltip from 'material-ui/Tooltip'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import { withStyles } from 'material-ui/styles'

// - Import app components

// - Import API

// - Import actions
import { globalActions } from 'store/actions'

import { Feed } from 'core/domain/common'
import { ISendFeedbackComponentProps } from './ISendFeedbackComponentProps'
import { ISendFeedbackComponentState } from './ISendFeedbackComponentState'
import { FeedType } from 'core/domain/common/feedType'
import { ServerRequestModel } from 'models/server'
import { Profile } from 'core/domain/users'
import StringAPI from 'api/StringAPI'
import { ServerRequestType } from 'constants/serverRequestType'
import { User } from 'core/domain/users'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'

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
   * @param  {object} props is an object properties of component
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
    sendFeed!(new Feed('', feedText, feedType, currentUser))
  }

  mainForm = () => {
    const { sendFeedbackStatus, hideFeedback, sendFeed, sendFeedbackRequestType, translate } = this.props
    const { feedText } = this.state
    return (
      <div className='main-box'>
        <TextField
          placeholder={translate!('feedback.textareaPlaceholder')}
          multiline
          onChange={this.handleFeedText}
          rows={2}
          rowsMax={4}
          autoFocus
          fullWidth
        />
        <br />
        <div className='buttons'>
        <Tooltip title={translate!('feedback.sadTooltip')} placement='bottom-start'>
          <IconButton
            className='flaticon-sad-2 icon__svg'
            onClick={() => this.handleSendFeed(FeedType.Sad)}
          >
          </IconButton>
          </Tooltip>

          <Tooltip title={translate!('feedback.acceptableTooltip')} placement='bottom-start'>
          <IconButton
            className='flaticon-neutral icon__svg'
            onClick={() => this.handleSendFeed(FeedType.Acceptable)}
          >
          </IconButton>
          </Tooltip>
          <Tooltip title={translate!('feedback.happyTooltip')} placement='bottom-start'>
          <IconButton
            className='flaticon-happy-2 icon__svg'
            onClick={() => this.handleSendFeed(FeedType.Happy)}
          >
          </IconButton>
          </Tooltip>
          <Tooltip title={translate!('feedback.awesomeTooltip')} placement='bottom-start'>
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
    const {translate} = this.props
    return (
    <div className='loading'>
    <p>
    {translate!('feedback.sendingMessage')}
      </p>
      <div className='icon'>
      <CircularProgress
        color='secondary'
        size={50}
        variant='determinate'
        value={25}
        min={0}
        max={50}
      />
      </div>
    </div>)
  }

  successForm = () => {
    const {translate} = this.props
    return (<div className='success'>{translate!('feedback.appreciateMessage')}</div>)
  }

  errorForm = () => {
    const {translate} = this.props
    return (<div className='error'>{translate!('feedback.errorMessage')}</div>)
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
   * @return {react element} return the DOM which rendered by component
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
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: Function, ownProps: ISendFeedbackComponentProps) => {
  return {
    sendFeed: (feed: Feed) => (dispatch(globalActions.dbSendFeed(feed))),
    hideFeedback: () => dispatch(globalActions.hideSendFeedback())
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: Map<string, any>, ownProps: ISendFeedbackComponentProps) => {

  const request = state.getIn(['server', 'request'])
  const uid = state.getIn(['authorize', 'uid'])
  const requestId = StringAPI.createServerRequestId(ServerRequestType.CommonSendFeedback, uid)
  const currentUser: User =  { ...state.getIn(['user', 'info', uid], {}), userId: uid }
  const sendFeedbackStatus = state.getIn(['global', 'sendFeedbackStatus'])
  const sendFeedbackRequestType = state.getIn(['server', 'request', requestId])

  return {
    translate: getTranslate(state.get('locale')),
    sendFeedbackStatus,
    sendFeedbackRequestType: sendFeedbackRequestType ? sendFeedbackRequestType.status : ServerRequestStatusType.NoAction,
    currentUser
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles as any)(SendFeedbackComponent as any)) as any)
