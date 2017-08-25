

// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import SvgCamera from 'material-ui/svg-icons/image/photo-camera'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import EventListener, { withOptions } from 'react-event-listener'
import Dialog from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'


// - Import app components
import ImgCover from 'ImgCover'
import DialogTitle from 'DialogTitle'
import ImageGallery from 'ImageGallery'
import FileAPI from 'FileAPI'
import UserAvatar from 'UserAvatar'




// - Import API


// - Import actions
import * as userActions from 'userActions'
import * as globalActions from 'globalActions'
import * as imageGalleryActions from 'imageGalleryActions'

/**
* Create component class
 */
export class EditProfile extends Component {

    static propTypes = {

        /**
         * User avatar address
         */
        avatar: PropTypes.string,
        /**
         * User avatar address
         */
        banner: PropTypes.string,
        /**
         * User full name
         */
        fullName: PropTypes.string.isRequired



    }

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
    constructor(props) {
        super(props)
        //Defaul state
        this.state = {
            /**
             * If it's true the winow is in small size
             */
            isSmall: false,
            /**
             * User tag line input value
             */
            tagLineInput: props.info.tagLine || '',
            /**
             * User full name input value
             */
            fullNameInput: props.info.fullName || '',
            /**
             * Error message of full name input
             */
            fullNameInputError: '',
            /**
             * User banner address
             */
            banner: this.props.banner || 'https://firebasestorage.googleapis.com/v0/b/open-social-33d92.appspot.com/o/images%2F751145a1-9488-46fd-a97e-04018665a6d3.JPG?alt=media&token=1a1d5e21-5101-450e-9054-ea4a20e06c57',
            /**
             * User avatar address
             */
            avatar: this.props.avatar || '',
            /**
             * It's true if the image galley for banner is open
             */
            openBanner: false,
            /**
             * It's true if the image gallery for avatar is open
             */
            openAvatar: false

        }

        // Binding functions to `this`
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleRequestSetAvatar = this.handleRequestSetAvatar.bind(this)
        this.handleRequestSetBanner = this.handleRequestSetBanner.bind(this)

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
    * Set banner image url
    */
    handleRequestSetBanner = (url) => {
        console.log('==========Banner==================');
        console.log(url);
        console.log('====================================');
        this.setState({
            banner: url
        })
    }

    /**
    * Set avatar image url
    */
    handleRequestSetAvatar = (fileName) => {
        this.setState({
            avatar: fileName
        })
    }

    /**
     * Update profile on the server
     * 
     * 
     * @memberof EditProfile
     */
    handleUpdate = () => {
            const {fullNameInput, tagLineInput, avatar, banner} = this.state
        
        if (this.state.fullNameInput.trim() === '') {
            this.setState({
                fullNameInputError: 'This field is required'
            })
        }
        else {
            this.setState({
                fullNameInputError: ''
            })

            this.props.update({
                fullName: fullNameInput,
                tagLine: tagLineInput,
                avatar: avatar,
                banner: banner
            })
        }
    }

    /**
     * Handle data on input change
     * @param  {event} evt is an event of inputs of element on change
     */
    handleInputChange = (evt) => {
        const target = evt.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        this.setState({
            [name]: value
        })
    }
    /**
     * Handle change date
     */
    handleChangeDate = (evt, date) => {
        this.setState({
            birthdayInput: date,
        })
    }

    /**
      * Handle resize event for window to change sidebar status
      * @param  {event} evt is the event is passed by winodw resize event
      */
    handleResize = (evt) => {

        // Set initial state
        var width = window.innerWidth

        if (width > 900) {
            this.setState({
                isSmall: false
            })

        }
        else {
            this.setState({
                isSmall: true
            })
        }
    }


    componentDidMount = () => {
        this.handleResize()
    }


    /**
     * Reneder component DOM
     * @return {react element} return the DOM which rendered by component
     */
    render() {

        const styles = {
            avatar: {
                border: '2px solid rgb(255, 255, 255)'
            },
            paper: {
                width: '90%',
                height: '100%',
                margin: '0 auto',
                display: 'block',
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
                justifyContent: "flex-end",
                padding: '24px 24px 20px'
            },
            updateButton: {
                marginLeft: '10px'
            },
            box: {
                padding: '0px 24px 20px 24px',
                display: 'flex'

            },
            dialogGallery: {
                width: '',
                maxWidth: '530px',
                borderRadius: "4px"
            }

        }


        const iconButtonElement = (
            <IconButton style={this.state.isSmall ? styles.iconButtonSmall : styles.iconButton} iconStyle={this.state.isSmall ? styles.iconButtonSmall : styles.iconButton}
                touch={true}
            >
                <MoreVertIcon color={grey400} viewBox='10 0 24 24' />
            </IconButton>
        )


        const RightIconMenu = () => (
            <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem style={{ fontSize: "14px" }}>Reply</MenuItem>
                <MenuItem style={{ fontSize: "14px" }}>Edit</MenuItem>
                <MenuItem style={{ fontSize: "14px" }}>Delete</MenuItem>
            </IconMenu>
        )



        return (

            <div>
                {/* Edit profile dialog */}
                <Dialog
                    id='Edit-Profile'
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.onRequestClose}
                    autoScrollBodyContent={true}
                    bodyStyle={{ backgroundColor: "none", padding: 'none', borderTop: 'none', borderBottom: 'none' }}
                    overlayStyle={{ background: "rgba(0,0,0,0.12)" }}
                    contentStyle={{ backgroundColor: "none", maxWidth: '450px', maxHeight: 'none', height: '100%' }}
                    style={{ backgroundColor: "none", maxHeight: 'none', height: '100%' }}
                >
                    {/* Banner */}
                    <div style={{ position: 'relative' }}>
                        <ImgCover width='100%' height='250px' borderRadius='2px' fileName={this.state.banner} />
                        <div className='g__circle-black' onClick={this.handleOpenBannerGallery} style={{ position: 'absolute', right: '10px', top: '10px' }}>
                            <SvgCamera style={{ fill: 'rgba(255, 255, 255, 0.88)', transform: 'translate(6px, 6px)' }} />
                        </div>
                    </div>
                    <div className='profile__edit'>
                        <EventListener
                            target="window"
                            onResize={this.handleResize}
                        />
                        <div className='left'>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                {/* Avatar */}
                                <div className='g__circle-black' onClick={this.handleOpenAvatarGallery} style={{ position: 'absolute', left: '50%', display: 'inline-block', top: '52px', margin: '-18px' }}>
                                    <SvgCamera style={{ fill: 'rgba(255, 255, 255, 0.88)', transform: 'translate(6px, 6px)' }} />

                                </div>
                                <UserAvatar fullName={(this.props.info ? this.props.info.fullName : '')} fileName={this.state.avatar} size={90} style={styles.avatar} />
                            </div>
                            <div className='info'>
                                <div className='fullName'>
                                    {this.props.fullName}
                                </div>


                            </div>
                        </div>

                    </div>

                    {/* Edit user information box*/}
                    <Paper style={styles.paper} zDepth={1}>
                        <div style={styles.title}>Personal Information</div>
                        <div style={styles.box}>
                            <TextField
                                floatingLabelText="Full name"
                                onChange={this.handleInputChange}
                                name='fullNameInput'
                                errorText={this.state.fullNameInputError}
                                value={this.state.fullNameInput}
                            />
                        </div>
                        <br />
                        <div style={styles.box}>
                            <TextField
                                floatingLabelText="Tag Line"
                                onChange={this.handleInputChange}
                                name='tagLineInput'
                                value={this.state.tagLineInput}
                            />
                        </div>
                        <br />
                        <div style={styles.actions}>
                            <FlatButton label="CANCEL" onClick={this.props.onRequestClose} />
                            <RaisedButton label="UPDATE" primary={true} onClick={this.handleUpdate} style={styles.updateButton} />
                        </div>
                    </Paper>
                    <div style={{ height: '16px' }}></div>


                </Dialog>

                {/* Image gallery for banner*/}
                <Dialog
                    title={<DialogTitle title='Choose an banner image' onRequestClose={this.handleCloseBannerGallery} />}
                    modal={false}
                    open={this.state.openBanner}
                    contentStyle={styles.dialogGallery}
                    onRequestClose={this.handleCloseBannerGallery}
                    overlayStyle={{ background: "rgba(0,0,0,0.12)" }}
                    autoDetectWindowHeight={false}

                >
                    <ImageGallery set={this.handleRequestSetBanner} close={this.handleCloseBannerGallery} />
                </Dialog>

                {/* Image gallery for avatar */}
                <Dialog
                    title={<DialogTitle title='Choose an avatar image' onRequestClose={this.handleCloseAvatarGallery} />}
                    modal={false}
                    open={this.state.openAvatar}
                    contentStyle={styles.dialogGallery}
                    onRequestClose={this.handleCloseAvatarGallery}
                    overlayStyle={{ background: "rgba(0,0,0,0.12)" }}
                    autoDetectWindowHeight={false}

                >
                    <ImageGallery set={this.handleRequestSetAvatar} close={this.handleCloseAvatarGallery} />
                </Dialog>

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
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        update: (info) => dispatch(userActions.dbUpdateUserInfo(info)),
        onRequestClose: () => dispatch(userActions.closeEditProfile())

    }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state, ownProps) => {
    return {
        open: state.user.openEditProfile,
        info: state.user.info[state.authorize.uid],
        avatarURL: state.imageGallery.imageURLList

    }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)