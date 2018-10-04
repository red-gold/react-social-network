// - Import react components
import React, { Component, RefObject } from 'react'
import { connect, Dispatch } from 'react-redux'

import { Map } from 'immutable'
import moment from 'moment/moment'
import classNames from 'classnames'
import { translate, Trans } from 'react-i18next'

// - Material-UI
import { withStyles } from '@material-ui/core/styles'

// - Import app components
import ChatMessageComponent from 'components/chatMessage'

// - Import API

// - Import actions
import * as globalActions from 'store/actions/globalActions'
import * as chatActions from 'store/actions/chatActions'

import { IChatBodyProps } from './IChatBodyProps'
import { IChatBodyState } from './IChatBodyState'
import { chatBodyStyles } from './chatBodyStyles'

/**
 * Create component class
 */
export class ChatBodyComponent extends Component<IChatBodyProps, IChatBodyState> {

  /**
   * Feilds
   */
  messagesEnd: any
  lastMessagesCount: number = 0

  /**
   * Component constructor
   */
  constructor(props: IChatBodyProps) {
    super(props)

    // Defaul state
    this.state = {
    }
    this.messagesEnd = React.createRef<HTMLDivElement>()
    // Binding functions to `this`

  }

  /**
   * Scroll message list to bottom
   */
  scrollToBottom = () => {
    if (this.messagesEnd && this.messagesEnd.current) {
      this.messagesEnd.current.scrollTop = this.messagesEnd.current.scrollHeight
    }
  }

  componentDidUpdate() {
    const { chatMessages } = this.props
    if (chatMessages && this.lastMessagesCount !== chatMessages.length) {
      this.lastMessagesCount = chatMessages.length
      this.scrollToBottom()
    }
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  /**
   * Reneder component DOM
   */
  render() {

    const { t, classes, chatMessages, currentUser } = this.props

    return (
      <div className={classes.bodyMessageRoot} ref={this.messagesEnd}>
        {chatMessages ? chatMessages!
          .map((message) => <ChatMessageComponent
            key={message.id}
            rtl={message.isCurrentUser}
            text={message.isCurrentUser ? message.data : (message.translateMessage ? message.translateMessage : message.data)}
            avatar={message.receiverUser.avatar}
            ownerName={message.receiverUser.fullName}
            currentUser={currentUser!}
            loading={message.loading!}
          />)
          : ''}
      </div>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: IChatBodyProps) => {

  return {
  }
}

const makeMapStateToProps = () => {
  const mapStateToProps = (state: Map<string, any>, ownProps: IChatBodyProps) => {
    return {
    }
  }
  return mapStateToProps
}

// - Connect component to redux store
const translateWrraper = translate('translations')(ChatBodyComponent)

export default connect(makeMapStateToProps, mapDispatchToProps)(withStyles(chatBodyStyles as any)(translateWrraper as any) as any)
