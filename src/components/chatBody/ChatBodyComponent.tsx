// - Import react components
import { withStyles } from '@material-ui/core/styles';
import ChatMessageComponent from 'components/chatMessage';
import { Map } from 'immutable';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { chatBodyStyles } from './chatBodyStyles';
import { IChatBodyProps } from './IChatBodyProps';
import { IChatBodyState } from './IChatBodyState';

// - Material-UI
// - Import app components
// - Import API

// - Import actions
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

    const { classes, chatMessages, currentUser } = this.props

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
const mapDispatchToProps = (dispatch: any, ownProps: IChatBodyProps) => {

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
const translateWrapper = withTranslation('translations')(ChatBodyComponent as any)

export default connect(makeMapStateToProps, mapDispatchToProps)(withStyles(chatBodyStyles as any)(translateWrapper as any) as any)
