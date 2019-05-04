// - Impoer react components
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BackIcon from '@material-ui/icons/ArrowBack';
import StringAPI from 'api/StringAPI';
import UserAvatarComponent from 'components/userAvatar';
import { User } from 'core/domain/users';
import { Map } from 'immutable';
import moment from 'moment/moment';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { authorizeSelector } from 'store/reducers/authorize/authorizeSelector';

import { aboutDialogStyles } from './aboutDialogStyles';
import { IAboutDialogProps } from './IAboutDialogProps';
import { IAboutDialogState } from './IAboutDialogState';

// - Material-UI
// - Import actions
// - Import app components
// - Import API

function Transition(props: any) {
  return <Slide direction='up' {...props} />
}

/**
 * Create component class
 */
export class AboutDialogComponent extends Component<IAboutDialogProps, IAboutDialogState> {

  /**
   * Component constructor
   *
   */
  constructor(props: IAboutDialogProps) {
    super(props)

    this.state = {

    }

    // Binding function to `this`

    this.closeDialog = this.closeDialog.bind(this)
    this.infoRender = this.infoRender.bind(this)
  }

  /**
   * Close dialog
   */
  closeDialog = () => {
    const { onClose } = this.props
    if (onClose) {
      onClose()
    }
  }

  /**
   * Infor render
   */
  infoRender = (title: string, content: string) => {
    const { classes } = this.props
    return (
      <div className={classes.infoItem}>
        <div className={classes.subtitleInfo}>
          {title}
        </div>
        <div className={classes.contentInfo}>
          {content}
        </div>
      </div>
    )
  }

  render() {

    const { t, classes,open, onClose, targetUser } = this.props

    const aboutElem = (
      <div className={classes.rootInfo}>

        <Typography variant='h6' color='inherit' className={classes.title}>
          {t!('profile.about')} {' '}  {targetUser.fullName}
        </Typography>
        <Paper className={classes.paperInfo}>

          {!StringAPI.isEmpty(targetUser.tagLine) && this.infoRender(t!('profile.tagline'), targetUser.tagLine)}
          {(targetUser.birthday && targetUser.birthday > 0)
            && this.infoRender(t!('profile.birthday'), moment.unix(targetUser.birthday).local().format('LL'))}
          {!StringAPI.isEmpty(targetUser.companyName) && this.infoRender(t!('profile.companyName'), targetUser.companyName!)}
        </Paper>

      </div>
    )

    const otherSocialElem = (
      <div className={classes.rootInfo}>
        <Typography variant='h6' color='inherit' className={classes.title}>
          {t!('profile.otherSocial')}
        </Typography>
        <Paper className={classes.paperInfo}>

          {!StringAPI.isEmpty(targetUser.twitterId) && this.infoRender(t!('profile.twitterId'), targetUser.twitterId!)}
          {!StringAPI.isEmpty(targetUser.facebookId) && this.infoRender(t!('profile.facebookId'), targetUser.facebookId!)}
          {!StringAPI.isEmpty(targetUser.instagramId) && this.infoRender(t!('profile.instagramId'), targetUser.instagramId!)}
        </Paper>
      </div>
    )

    return (
      <Dialog
        id={'album-dialog-'}
        open={open}
        classes={{ paper: classes.paper }}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <div className={classes.root}>
          <AppBar position='sticky' color='primary'>
            <Toolbar>
              <IconButton onClick={onClose}>
                <BackIcon />
              </IconButton>
              <Typography variant='h6' color='inherit' className={classes.flex}>
                {targetUser.fullName}
              </Typography>
              <UserAvatarComponent
                fullName={targetUser.fullName!}
                fileName={targetUser.avatar!}
                size={32}
                style={classes.avatar}
              />
            </Toolbar>
          </AppBar>
          <div className={classes.content}>

            {(StringAPI.isEmpty(targetUser.tagLine)
              || (targetUser.birthday && targetUser.birthday > 0)
              || !StringAPI.isEmpty(targetUser.companyName)) && aboutElem}

            {/* <div className={classes.rootInfo}>
              <Typography variant={'h6'} color='inherit' className={classes.title}>
                {translate!('profile.contactInfo')}
              </Typography>
            </div> */}

            {(!StringAPI.isEmpty(targetUser.twitterId)
              || !StringAPI.isEmpty(targetUser.facebookId)
              || !StringAPI.isEmpty(targetUser.instagramId)) && otherSocialElem}
          </div>
        </div>
      </Dialog>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IAboutDialogProps) => {
  return {
  }
}

/**
 * Map state to props
 */
const makeMapStateToProps = () => {
  const selectCurrentUser = authorizeSelector.selectCurrentUser()

  const mapStateToProps = (state: Map<string, any>, ownProps: IAboutDialogProps) => {
    const currentUser = selectCurrentUser(state).toJS() as User
    return {
      
      currentUser,
    }
  }
  return mapStateToProps
}

// - Connect component to redux store
const translateWrraper = withTranslation('translations')(AboutDialogComponent as any)
const componentWithStyles: any = withStyles(aboutDialogStyles as any, { withTheme: true })(translateWrraper as any)
export default connect(makeMapStateToProps, mapDispatchToProps)(componentWithStyles)
