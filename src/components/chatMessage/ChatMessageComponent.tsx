// - Import react components
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import UserAvatar from 'components/userAvatar';
import { Map } from 'immutable';
import React, { Component } from 'react';
import { emojify } from 'react-emojione';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { chatMessageStyles } from './chatMessageStyles';
import { IChatMessageProps } from './IChatMessageProps';
import { IChatMessageState } from './IChatMessageState';

// - Material-UI
// - Import app components
// - Import API

// - Import actions
const emojiOptions = {
  style: {
    height: 15,
    margin: 2,
  }
}

/**
 * Create component class
 */
export class ChatMessageComponent extends Component<IChatMessageProps, IChatMessageState> {

  /**
   * Component constructor
   */
  constructor(props: IChatMessageProps) {
    super(props)

    // Defaul state
    this.state = {
    }

    // Binding functions to `this`
  }

  /**
   * Reneder component DOM
   */
  render() {
    const { rtl, text, avatar, ownerName, classes, currentUser, loading } = this.props

    const loadingElement = (
      <div className={classNames('simile-loading', classes.loading)}>
      <div className='leftEye'></div>
      <div className='rightEye'></div>
      <div className='mouth'></div>
    </div>
    )
    return (
      <div className={classNames(classes.messageRoot, { [classes.messageRootRight]: rtl })}>
        {!rtl ? <UserAvatar className={classes.messageAvatar} fullName={ownerName} size={30} fileName={avatar} />
          : <UserAvatar className={classes.messageAvatar} fullName={currentUser!.fullName} size={30} fileName={currentUser!.avatar} />}
        <div className={classNames(classes.messageText, { [classes.messageTextRight]: rtl })}>
          <Typography variant={'caption'}>
            {emojify(text, emojiOptions)}
          </Typography>
          {loading ? loadingElement : ''}
        </div>
      </div>
    )

  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IChatMessageProps) => {

  return {
  }
}

const makeMapStateToProps = () => {
  const mapStateToProps = (state: Map<string, any>, ownProps: IChatMessageProps) => {

    return {

    }
  }
  return mapStateToProps
}

// - Connect component to redux store
const translateWrapper = withTranslation('translations')(ChatMessageComponent as any)

export default connect(makeMapStateToProps, mapDispatchToProps)(withStyles(chatMessageStyles as any)(translateWrapper as any) as any)
