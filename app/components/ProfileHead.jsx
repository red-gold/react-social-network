// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import EventListener, { withOptions } from 'react-event-listener'
import { Parallax, Background } from 'react-parallax'


// - Import app components
import ImgCover from 'ImgCover'
import EditProfile from 'EditProfile'
import UserAvatar from 'UserAvatar'


// - Import API


// - Import actions
import * as globalActions from 'globalActions'
import * as userActions from 'userActions'

/**
* Create component class
 */
export class ProfileHead extends Component {

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
        fullName: PropTypes.string.isRequired,
        /**
         * The number of followers
         */
        followerCount: PropTypes.number,
        /**
         * User identifier
         */
        userId: PropTypes.string,
        /**
         * If the user profile identifier of param is equal to the user authed identifier 
         */
        isAuthedUser: PropTypes.bool



    }

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
    constructor(props) {
        super(props)

        /**
         * Defaul state
         */
        this.state = {
            /**
             * If it's true , the window is in small size
             */
            isSmall: false,


        }

        // Binding functions to `this`

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
            iconButton: {
                fill: 'rgb(255, 255, 255)',
                height: '24px',
                width: '24px',

            },
            iconButtonSmall: {
                fill: 'rgb(0, 0, 0)',
                height: '24px',
                width: '24px',
            },

            editButton: {

                marginLeft: '20px'

            },
            editButtonSmall: {

                marginLeft: '20px',
                color: 'white',
                fill: 'blue'

            },
            aboutButton: {
                color: 'white'
            },
            aboutButtonSmall: {
                color: 'black'
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


        const {isAuthedUser} = this.props

        return (

            <div>
                <Parallax strength={500} className="profile__parallax" bgStyle={{ position: 'relative' }}>
                    <Background>
                        <ImgCover width='100%' height='510px' borderRadius='2px' 
                        fileName={this.props.banner || "https://firebasestorage.googleapis.com/v0/b/open-social-33d92.appspot.com/o/images%2F751145a1-9488-46fd-a97e-04018665a6d3.JPG?alt=media&token=1a1d5e21-5101-450e-9054-ea4a20e06c57"} />
                    </Background>

                </Parallax>
                <div className={this.state.isSmall ? 'profile__head-info-s' : 'profile__head-info'}>
                    <EventListener
                        target="window"
                        onResize={this.handleResize}
                    />
                    <div className='left'>
                        {/* User avatar*/}
                        <div style={{ display: 'flex', justifyContent: 'center' }}><UserAvatar fullName={this.props.fullName} fileName={this.props.avatar} size={60} style={styles.avatar} /></div>
                        <div className='info'>
                            <div className='fullName'>
                                {this.props.fullName}
                            </div>
                            {/*<div className='followers'>
                                {this.props.followerCount} Followers
                </div>*/}
                        </div>
                    </div>
                    <div className='right'>
                        {isAuthedUser ? (<div style={this.state.isSmall ? styles.editButtonSmall : styles.editButton}><RaisedButton label="EDIT PROFILE" onClick={this.props.openEditor} /></div>) : ''}
                    </div>
                </div>
                {isAuthedUser ? (<EditProfile
                    onRequestClose={this.handleCloseEditor}
                    avatar={this.props.avatar}
                    banner={this.props.banner}
                    fullName={this.props.fullName}
                />): ''}
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
        openEditor: () => dispatch(userActions.openEditProfile())
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
    }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(ProfileHead)