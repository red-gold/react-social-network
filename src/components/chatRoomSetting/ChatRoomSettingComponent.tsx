// - Import react components
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BackIcon from '@material-ui/icons/ArrowBack';
import OutIcon from '@material-ui/icons/CallMade';
import InIcon from '@material-ui/icons/CallReceived';
import classNames from 'classnames';
import { Map } from 'immutable';
import * as Ramda from 'ramda';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as chatActions from 'store/actions/chatActions';

import { chatRoomSettingStyles } from './chatRoomSettingStyles';
import { IChatRoomSettingProps } from './IChatRoomSettingProps';
import { IChatRoomSettingState } from './IChatRoomSettingState';

// - Material UI
// - Import app components
// - Import API
// - Import actions
const languages = require('locales/languages.json')

/**
 * React component class
 */
export class ChatRoomSettingComponent extends Component<IChatRoomSettingProps, IChatRoomSettingState> {

  /**
   * Fields
   */
  handleDropdownClick: any

  /**
   * Component constructor
   */
  constructor(props: IChatRoomSettingProps) {
    super(props)

    // Defaul state
    this.state = {
      disabledOk: true,
      dropdownDisplayed: false
    }

    // Binding functions to `this`
    this.handleToggleDropdown = this.handleToggleDropdown.bind(this)
    this.selectInputLanguage = this.selectInputLanguage.bind(this)
    this.selectOutputLanguage = this.selectOutputLanguage.bind(this)
  }

  /**
   * Handle ok button
   */
  handleOkButton = () => {

  }

  /**
   * Handle toggle dropdown
   */
  handleToggleDropdown = (handler: any) => {
    this.handleDropdownClick = handler
    this.setState((prevState, props) => {
      return { dropdownDisplayed: !prevState.dropdownDisplayed }
    })
  }

  /**
   * Handle data on input change
   */
  handleInputChange = (event: any) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  /**
   * Handle select output language
   */
  selectOutputLanguage = (value: { language: string, name: string }) => {
    const { room, currentUser, setLanguage } = this.props
    const input = Ramda.path(['translation', currentUser.userId!, 'input'], room) as string
    if (setLanguage) {
      setLanguage(input, value.language, room.id)
      this.handleToggleDropdown(null)
    }
  }

  /**
   * Find language by code
   */
  findLanguage = (code: string) => {
   return (languages as Array<{ language: string, name: string }>)
    .filter((item) => item.language === code)[0].name
  }

  /**
   * Handle select input language
   */
  selectInputLanguage = (value: { language: string, name: string }) => {
    const { room, currentUser, setLanguage } = this.props
    const output = Ramda.path(['translation', currentUser.userId!, 'output'], room) as string
    if (setLanguage) {
      setLanguage(value.language, output, room.id)
      this.handleToggleDropdown(null)
    }
  }

  /**
   * Languages list element
   */
  languageList = () => {
    const { classes, t } = this.props
    let itemList = [(
      <li key={`chat-room-setting-drop-disable`}
        className={classNames(classes.dropdownItem)}
        onClick={() => this.handleDropdownClick({ language: null, name: null })}
      >
        <Typography className={classes.dropdownCaption} variant={'caption'}>
          {t!('chat.disable')}
        </Typography>
      </li>
    )];
    (languages as Array<{ language: string, name: string }>)
      .forEach((item) => {
        itemList = [
          ...itemList,
          (
            <li key={item.language} className={classNames(classes.dropdownItem)} onClick={() => this.handleDropdownClick(item)}>
              <Typography className={classes.dropdownCaption} variant={'caption'}>
                {item.name}
              </Typography>
            </li>
          )]
      }
      )
      return itemList
  }
  /**
   * Reneder component DOM
   */
  render() {

    const { classes, t, onClose, leftSideClose, rightSideDisabled, room , currentUser} = this.props
    const { dropdownDisplayed } = this.state
    let inputLang = Ramda.path(['translation', (currentUser.userId! || (currentUser as any).id!), 'input'], room) as string | null
    let outputLang = Ramda.path(['translation', (currentUser.userId! || (currentUser as any).id!), 'output'], room) as string | null
    inputLang  = inputLang ? this.findLanguage(inputLang) : null
    outputLang  = outputLang ? this.findLanguage(outputLang) : null
    const translateElement = (
      <div className={classes.settingBox}>
        <Typography variant='subtitle1'>
          {t!('chat.translationLabel')}
        </Typography>
        <Divider />
        <div className={classes.settingMenu} onClick={() => this.handleToggleDropdown(this.selectOutputLanguage)}>
          <div className={classes.settingMenuLabel}>
            <OutIcon className={classes.itemIcon} />
            <Typography variant={'caption'}>
              {t!('chat.outputLabel')}
            </Typography>

          </div>
          <div>
            <Typography variant={'caption'}>
            {outputLang || t!('chat.disabledLabel')}
            </Typography>

          </div>
        </div>
        <div className={classes.settingMenu} onClick={() => this.handleToggleDropdown(this.selectInputLanguage)}>
          <div className={classes.settingMenuLabel}>
            <InIcon className={classes.itemIcon} />
            <Typography variant={'caption'}>
              {t!('chat.inputLabel')}
            </Typography>
          </div>
          <div>
            <Typography variant={'caption'}>
              {inputLang || t!('chat.disabledLabel')}
            </Typography>

          </div>
        </div>
      </div>
    )

    const settigElements = (
      <li className={classes.settingItem}>
        {translateElement}
      </li>
    )

    const dropdown = (
      <ul className={classes.dropdown}>
        <li className={classNames(classes.dropdownItem, classes.dropdownClose)} onClick={this.handleToggleDropdown}>
          <Typography variant={'caption'}>
            {t!('chat.close')}
          </Typography>
        </li>
        {this.languageList()}
      </ul>
    )

    return (
      <Grid item xs={12} sm={leftSideClose ? 12 : 6} md={leftSideClose ? 12 : 6}
        lg={leftSideClose ? 12 : 6} xl={leftSideClose ? 12 : 6}
        className={classNames(classes.rightSideChatRoot, { [classes.noDisplay]: rightSideDisabled })}>
        <List className={classes.listContainer}>
          <ListItem className={classNames(classes.userItem, classes.receiverUserItem)}>
            <IconButton className={classes.backIcon} onClick={onClose}>
              <BackIcon />
            </IconButton>
            <Typography className={classes.header} variant='subtitle1'>
              {t!('chat.chatLabel')}
            </Typography>
          </ListItem>
          {dropdownDisplayed ? dropdown : settigElements}
        </List>

      </Grid>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IChatRoomSettingProps) => {
  return {
    setLanguage: (input: string, output: string, roomId: string) => dispatch(chatActions.dbSetChatLanguage(input, output, roomId))
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IChatRoomSettingProps) => {
  return {
    
  }
}

// - Connect component to redux store
const translateWrraper = withTranslation('translations')(ChatRoomSettingComponent as any)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(chatRoomSettingStyles as any)(translateWrraper as any) as any)
