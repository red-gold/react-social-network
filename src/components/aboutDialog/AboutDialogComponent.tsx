// - Impoer react components
import React, { Component } from 'react'
import PropTypes, { object } from 'prop-types'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import moment from 'moment/moment'
import uuid from 'uuid'

import { Map } from 'immutable'
import config from 'src/config'
import BackIcon from '@material-ui/icons/ArrowBack'
import { translate, Trans } from 'react-i18next'

// - Material-UI
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import StarBorder from '@material-ui/icons/StarBorder'
import MobileStepper from '@material-ui/core/MobileStepper'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'
import SvgUpload from '@material-ui/icons/CloudUpload'
import SvgAddImage from '@material-ui/icons/AddAPhoto'
import SvgDelete from '@material-ui/icons/Delete'
import { grey } from '@material-ui/core/colors'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import LinearProgress from '@material-ui/core/LinearProgress'
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate'
import TextField from '@material-ui/core/TextField'
import withMobileDialog from '@material-ui/core/withMobileDialog/withMobileDialog'
import CloseIcon from '@material-ui/icons/Close'
import PhoneIcon from '@material-ui/icons/Phone'
import LockIcon from '@material-ui/icons/VpnLock'
import CircularProgress from '@material-ui/core/CircularProgress'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

// - Import actions
import * as imageGalleryActions from 'store/actions/imageGalleryActions'
import * as globalActions from 'store/actions/globalActions'

// - Import app components
import Img from 'components/img'
import UserPermissionComponent from 'components/userPermission'
import UserAvatarComponent from 'components/userAvatar'

// - Import API
import { IAboutDialogProps } from './IAboutDialogProps'
import { IAboutDialogState } from './IAboutDialogState'
import { authorizeSelector } from 'store/reducers/authorize/authorizeSelector'
import { User } from 'core/domain/users'
import { aboutDialogStyles } from './aboutDialogStyles'
import StringAPI from 'api/StringAPI'

const tutorialSteps = [
  {
    label: '',
  },
  {
    label: ''
  }
]

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
    const { t, classes } = this.props
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

    const { t, classes, theme, open, onClose, targetUser, currentLanguage } = this.props

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
const translateWrraper = translate('translations')(AboutDialogComponent)
const componentWithStyles: any = withStyles(aboutDialogStyles as any, { withTheme: true })(translateWrraper as any)
export default connect(makeMapStateToProps, mapDispatchToProps)(componentWithStyles)
