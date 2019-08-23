// - Import react components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SvgCamera from '@material-ui/icons/PhotoCamera';
import ImageEditor from 'components/ImageEditor';
import ImageGallery from 'components/imageGallery';
import ImgCover from 'components/imgCover';
import UserAvatarComponent from 'components/userAvatar';
import { UserPermissionType } from 'core/domain/common/userPermissionType';
import { User } from 'core/domain/users';
import { Map } from 'immutable';
import AppInput from 'layouts/appInput';
import AppDialogTitle from 'layouts/dialogTitle';
import moment from 'moment/moment';
import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import EventListener from 'react-event-listener';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import config from 'src/config';
import * as imageGalleryActions from 'store/actions/imageGalleryActions';
import * as userActions from 'store/actions/userActions';
import { authorizeSelector } from 'store/reducers/authorize/authorizeSelector';
import { gallerySelector } from 'store/reducers/imageGallery/gallerySelector';

import { IEditProfileComponentProps } from './IEditProfileComponentProps';
import { IEditProfileComponentState } from './IEditProfileComponentState';

// - Import app components
// - Import API
// - Import actions
const styles = (theme: any) => ({
  dialogTitle: {
    padding: 0
  },
  dialogContentRoot: {
    maxHeight: 400,
    minWidth: 500,
    [theme.breakpoints.down('xs')]: {
      maxHeight: '100%',
      minWidth: '100%',
    }

  },
  fullPageXs: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
      margin: 0
    }
  },
  fixedDownStickyXS: {
    [theme.breakpoints.down('xs')]: {
      position: 'fixed',
      bottom: 0,
      right: 0,
      background: 'white',
      width: '100%'
    }
  },
  bottomPaperSpace: {
    height: 16,
    [theme.breakpoints.down('xs')]: {
      height: 90
    }
  },
  box: {
    padding: '0px 24px 0px',
    display: 'flex'

  },
  bottomTextSpace: {
    marginBottom: 15
  },
  dayPicker: {
    width: '100%',
    padding: '13px 0px 8px'
  }
})

/**
 * Create component class
 */
export class EditProfileComponent extends Component<IEditProfileComponentProps, IEditProfileComponentState> {

  styles = {
    avatar: {
      border: '2px solid rgb(255, 255, 255)'
    },
    paper: {
      width: '90%',
      height: '100%',
      margin: '0 auto',
      display: 'block'
    },
    title: {
      padding: '24px 24px 20px 24px',
      font: '500 20px Roboto,RobotoDraft,Helvetica,Arial,sans-serif',
      display: 'flex',
      wordWrap: 'break-word',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      flexGrow: 1
    },
    actions: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '24px 24px 20px'
    },
    updateButton: {
      marginLeft: '10px'
    },
    dialogGallery: {
      width: '',
      maxWidth: '530px',
      borderRadius: '4px'
    },
    iconButtonSmall: {
    },
    iconButton: {
    }

  }

  /**
   * Component constructor
   *
   */
  constructor(props: IEditProfileComponentProps) {
    super(props)
    // Defaul state
    this.state = {
      /**
       * If it's true the winow is in small size
       */
      isSmall: false,
      /**
       * User tag line input value
       */
      tagLineInput: props.info!.tagLine || '',
      /**
       * User full name input value
       */
      fullNameInput: props.info!.fullName || '',
      /**
       * Error message of full name input
       */
      fullNameInputError: '',
      /**
       * User banner address
       */
      banner: props.banner || config.settings.defaultProfileCover,
      /**
       * User avatar address
       */
      avatar: props.avatar || '',
      /**
       * It's true if the image galley for banner is open
       */
      openBanner: false,
      /**
       * It's true if the image gallery for avatar is open
       */
      openAvatar: false,
      /**
       * Whether image editor is open
       */
      isImageEditorOpen: false,
      /**
       * Image URL of image editor
       */
      imageEditorUrl: '',
      /**
       * User's original banner URL
       */
      originalBanner: '',
      /**
       * Default birth day
       */
      defaultBirthday: (props.info && props.info.birthday) ? moment.unix(props.info!.birthday!).toDate() : '',
      /**
       * Seleted birth day
       */
      selectedBirthday: 0,
      /**
       * Web URL
       */
      webUrl: (props.info && props.info.webUrl) ? props.info.webUrl : '',
      /**
       * User company name
       */
      companyName: (props.info && props.info.companyName) ? props.info.companyName : '',
      /**
       * User twitter id
       */
      twitterId: (props.info && props.info.twitterId) ? props.info.twitterId : '',
      /**
       * User facebook id
       */
      facebookId: (props.info && props.info.facebookId) ? props.info.facebookId : '',
      /**
       * User facebook id
       */
      permission: (props.info && props.info.permission) ? props.info.permission : UserPermissionType.Public,
      /**
       * User facebook id
       */
      accessUserList: (props.info && props.info.accessUserList) ? props.info.accessUserList : []

    }

    // Binding functions to `this`
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleRequestSetAvatar = this.handleRequestSetAvatar.bind(this)
    this.handleRequestSetBanner = this.handleRequestSetBanner.bind(this)
    this.loadAvatarList = this.loadAvatarList.bind(this)
    this.loadCoverList = this.loadCoverList.bind(this)

  }

  /**
   * Close image gallery of banner
   */
  handleCloseBannerGallery = () => {
    this.setState({
      openBanner: false
    })
  }

  /**
   * Open image gallery of banner
   */
  handleOpenBannerGallery = () => {
    this.setState({
      openBanner: true
    })
  }

  /**
   * Close image gallery of avatar
   */
  handleCloseAvatarGallery = () => {
    this.setState({
      openAvatar: false
    })
  }

  /**
   * Open image gallery of avatar
   */
  handleOpenAvatarGallery = () => {
    this.setState({
      openAvatar: true
    })
  }

  /**
   * Set banner edited image url
   */
  handleRequestSetEditedBanner = (url: string) => {
    this.setState({
      banner: url
    })
  }

  /**
   * Set banner image url
   */
  handleRequestSetBanner = (url: string) => {
    this.setState({
      originalBanner: url
    })
    this.handleOpenImageEditor()
  }

  /**
   * Open image image editor
   */
  handleOpenImageEditor = () => {
    this.setState({
      isImageEditorOpen: true
    })
  }

  /**
   * Close image image editor
   */
  handleCloseImageEditor = () => {
    this.setState({
      isImageEditorOpen: false
    })
  }

  /**
   * Set avatar image url
   */
  handleRequestSetAvatar = (fileName: string) => {
    this.setState({
      avatar: fileName
    })
  }

  /**
   * Update profile on the server
   */
  handleUpdate = () => {
    const {
      fullNameInput,
      tagLineInput,
      avatar,
      banner,
      selectedBirthday,
      companyName,
      webUrl,
      twitterId,
      facebookId,
      accessUserList,
      permission
    } = this.state
    const { info, update } = this.props

    if (fullNameInput.trim() === '') {
      this.setState({
        fullNameInputError: 'This field is required'
      })
    } else {
      this.setState({
        fullNameInputError: ''
      })

      update!({
        fullName: fullNameInput,
        tagLine: tagLineInput,
        avatar: avatar,
        banner: banner,
        companyName: companyName,
        webUrl: webUrl,
        twitterId: twitterId,
        facebookId: facebookId,
        creationDate: this.props.info!.creationDate,
        birthday: selectedBirthday > 0 ? selectedBirthday : ((info && info.birthday) ? info!.birthday! : 0),
        permission,
        accessUserList,
        userId: info!.userId
      })
    }
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
   * Handle resize event for window to change sidebar status
   * @param  {any} event is the event is passed by winodw resize event
   */
  handleResize = (event: any) => {

    // Set initial state
    let width = window.innerWidth

    if (width > 900) {
      this.setState({
        isSmall: false
      })

    } else {
      this.setState({
        isSmall: true
      })
    }
  }

  /**
   * Load cover image list
   */
  loadCoverList = () => {
    const {loadCoverList, info} = this.props
    if (loadCoverList && info && info.userId) {
      loadCoverList(info.userId)
    }
  }

  /**
   * Load avatar image list
   */
  loadAvatarList = () => {
    const {loadAvatarList, info} = this.props
    if (loadAvatarList && info && info.userId) {
      loadAvatarList(info.userId)
    }
  }

  /**
   * Handle birthday date changed
   */
  handleBirthdayDateChange = (date: any) => {
    this.setState({ selectedBirthday: moment(date).unix() })
  }

  componentDidMount() {
    this.handleResize(null)
  }

  /**
   * Reneder component DOM
   * 
   */
  render() {

    const { classes, t, currentLanguage, uploadAvatar, uploadCover, coverImages, avatarImages } = this.props
    const { defaultBirthday, webUrl, twitterId, companyName, isImageEditorOpen, originalBanner, facebookId } = this.state
  

    return (

      <div>
        {/* Edit profile dialog */}
        <Dialog
          PaperProps={{ className: classes.fullPageXs }}
          key='Edit-Profile'
          open={this.props.open!}
          onClose={this.props.onRequestClose}
          maxWidth='md'
          scroll={'paper'}
        >
          <DialogContent className={classes.dialogContentRoot}>
            {/* Banner */}
            <div style={{ position: 'relative' }}>
              <ImgCover width='100%' height='250px' borderRadius='2px' src={this.state.banner} />
              <div className='g__circle-black' onClick={this.handleOpenBannerGallery} style={{ position: 'absolute', right: '10px', top: '10px' }}>
                <SvgCamera style={{ fill: 'rgba(255, 255, 255, 0.88)', transform: 'translate(6px, 6px)' }} />
              </div>
            </div>
            <div className='profile__edit'>
              <EventListener
                target='window'
                onResize={this.handleResize}
              />
              <div className='left'>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {/* Avatar */}
                  <div className='g__circle-black' onClick={this.handleOpenAvatarGallery} style={{ zIndex: 1, position: 'absolute', left: '50%', display: 'inline-block', top: '52px', margin: '-18px' }}>
                    <SvgCamera style={{ fill: 'rgba(255, 255, 255, 0.88)', transform: 'translate(6px, 6px)' }} />

                  </div>
                  <UserAvatarComponent fullName={(this.props.info ? this.props.info.fullName : '')} fileName={this.state.avatar} size={90} style={this.styles.avatar} />
                </div>
                <div className='info'>
                  <div className='fullName'>
                    {this.props.fullName}
                  </div>

                </div>
              </div>

            </div>

            {/* Edit user information box*/}
            <Paper style={this.styles.paper} elevation={1}>
              <div style={this.styles.title as any}>{t!('profile.personalInformationLabel')}</div>
              <div className={classes.box}>
                <FormControl fullWidth aria-describedby='fullNameInputError'>
                  <InputLabel htmlFor='fullNameInput'>{t!('profile.fullName')}</InputLabel>
                  <Input id='fullNameInput'
                    onChange={this.handleInputChange}
                    name='fullNameInput'
                    value={this.state.fullNameInput}
                  />
                  <FormHelperText id='fullNameInputError'>{this.state.fullNameInputError}</FormHelperText>
                </FormControl>
              </div>
              <div className={classes.box}>
                <FormControl fullWidth aria-describedby='tagLineInputError'>
                  <InputLabel htmlFor='tagLineInput'>{t!('profile.tagline')}</InputLabel>
                  <Input id='tagLineInput'
                    onChange={this.handleInputChange}
                    name='tagLineInput'
                    value={this.state.tagLineInput}
                  />
                  <FormHelperText id='tagLineInputError'>{this.state.fullNameInputError}</FormHelperText>
                </FormControl>
              </div>
              <div className={classes.box}>
                <TextField
                  className={classes.bottomTextSpace}
                  onChange={this.handleInputChange}
                  name='companyName'
                  value={companyName}
                  label={t!('profile.companyName')}
                  fullWidth
                />
              </div>
              <div className={classes.box}>
                <TextField
                  className={classes.bottomTextSpace}
                  onChange={this.handleInputChange}
                  name='twitterId'
                  value={twitterId}
                  label={t!('profile.twitterId')}
                  fullWidth
                  placeholder={t!('profile.twitterExampleLabel')}
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>@</InputAdornment>,
                  }}
                />
              </div>
              <div className={classes.box}>
                <TextField
                  className={classes.bottomTextSpace}
                  onChange={this.handleInputChange}
                  name='facebookId'
                  value={facebookId}
                  label={t!('profile.facebookId')}
                  fullWidth
                  placeholder={t!('profile.facebookExampleLabel')}
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>@</InputAdornment>,
                  }}
                />
              </div>
              <div className={classes.box}>
                <TextField
                  placeholder={window.location.origin}
                  className={classes.bottomTextSpace}
                  onChange={this.handleInputChange}
                  name='webUrl'
                  value={webUrl}
                  label={t!('profile.webUrl')}
                  fullWidth
                />
              </div>
              <div className={classes.box}>
                <DayPickerInput
                  classNames={{ container: classes.dayPicker, overlay: '' }}
                  value={defaultBirthday}
                  onDayChange={this.handleBirthdayDateChange}
                  formatDate={formatDate}
                  parseDate={parseDate}
                  component={AppInput}
                  format='LL'
                  placeholder={`${moment().format('LL')}`}
                  dayPickerProps={{
                    locale: currentLanguage,
                    localeUtils: MomentLocaleUtils,
                  }}
                />
              </div>
              <br />

            </Paper>
            <div className={classes.bottomPaperSpace}></div>
          </DialogContent>
          <DialogActions className={classes.fixedDownStickyXS}>
            <Button onClick={this.props.onRequestClose} > {t!('profile.cancelButton')} </Button>
            <Button variant='contained' color='primary' onClick={this.handleUpdate} style={this.styles.updateButton}> {t!('profile.updateButton')} </Button>
          </DialogActions>
        </Dialog>

        {/* Image gallery for banner*/}
        {this.state.openBanner
          && (<Dialog
          PaperProps={{ className: classes.fullPageXs }}
          open={this.state.openBanner}
          onClose={this.handleCloseBannerGallery}

        >
          <DialogTitle className={classes.dialogTitle}>
            <AppDialogTitle title={t!('profile.chooseBanerDialogTitle')} onRequestClose={this.handleCloseBannerGallery} />
          </DialogTitle>
          <ImageGallery set={this.handleRequestSetBanner} folder='cover' images={coverImages} loadData={this.loadCoverList} close={this.handleCloseBannerGallery} uploadImage={uploadCover} />
        </Dialog>)}
        <ImageEditor
          open={isImageEditorOpen}
          onClose={this.handleCloseImageEditor}
          onSetUrl={this.handleRequestSetEditedBanner}
          originalPhotoUrl={originalBanner}
        />

        {/* Image gallery for avatar */}
       {
        this.state.openAvatar && ( <Dialog
          PaperProps={{ className: classes.fullPageXs }}
          open={this.state.openAvatar}
          onClose={this.handleCloseAvatarGallery}
        >
          <DialogTitle className={classes.dialogTitle}>
            <AppDialogTitle title={t!('profile.chooseAvatarDialogTitle')} onRequestClose={this.handleCloseAvatarGallery} />
          </DialogTitle>
          <ImageGallery set={this.handleRequestSetAvatar} folder='avatar' images={avatarImages} loadData={this.loadAvatarList} close={this.handleCloseAvatarGallery} uploadImage={uploadAvatar} />
        </Dialog>)}

      </div>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IEditProfileComponentProps) => {
  return {
    uploadAvatar: (image: any, imageName: string) => dispatch(imageGalleryActions.dbUploadAvatar(image, imageName)),
    uploadCover: (image: any, imageName: string) => dispatch(imageGalleryActions.dbUploadCover(image, imageName)),
    loadAvatarList: (userId: string) => dispatch(imageGalleryActions.dbFetchAvatarImages(userId)),
    loadCoverList: (userId: string) => dispatch(imageGalleryActions.dbFetchCoverImages(userId)),
    update: (info: User) => dispatch(userActions.dbUpdateUserInfo(info)),
    onRequestClose: () => dispatch(userActions.closeEditProfile())

  }
}

const makeMapStateToProps = () => {
  const selectCurrentUser = authorizeSelector.selectCurrentUser()
  const selectAvatarImages = gallerySelector.selectAvatarImages()
  const selectCoverImages = gallerySelector.selectCoverImages()

  const mapStateToProps = (state: Map<string, any>, ownProps: IEditProfileComponentProps) => {
    const info = selectCurrentUser(state).toJS() as User
    const avatarImages = selectAvatarImages(state, { userId: info.userId! })
    const coverImages = selectCoverImages(state, { userId: info.userId! })
    return {
      open: state.getIn(['user', 'openEditProfile'], false),
      info,
      avatarImages,
      coverImages
    }
  }
  return mapStateToProps
}

// - Connect component to redux store
const translateWrapper = withTranslation('translations')(EditProfileComponent as any)

export default connect(makeMapStateToProps, mapDispatchToProps)(withStyles(styles as any)(translateWrapper as any) as any)
