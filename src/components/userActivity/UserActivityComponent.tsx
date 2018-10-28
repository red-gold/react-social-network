// - Import react components
import React, { Component, RefObject } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import debounce from 'lodash/debounce'

import { Map } from 'immutable'
import ReactResizeDetector from 'react-resize-detector'
import numbro from 'numbro'
import config from 'src/config'
import { translate, Trans } from 'react-i18next'

// - Material-UI
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItem from '@material-ui/core/ListItem'
import SvgShare from '@material-ui/icons/Share'
import SvgFavorite from '@material-ui/icons/Favorite'
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import SvgStar from '@material-ui/icons/Star'
import Flag from '@material-ui/icons/Flag'
import Extension from '@material-ui/icons/Extension'
import GroupAdd from '@material-ui/icons/GroupAdd'
import PersonPinIcon from '@material-ui/icons/PersonPin'
import MailIcon from '@material-ui/icons/Mail'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'

// - Import app components
import { userActivityStyles } from './userActivityStyles'
import ActivityProgress from 'layouts/activityProgress'
import TimelineComponent from 'layouts/timeline'
import CircleActivity from 'layouts/circleActivity'
import BountiesDialog from 'components/bountiesDialog'
import EditProfile from 'components/editProfile'
import WebPage from 'layouts/webPage'
import DiamondIcon from 'layouts/diamondIcon'
import FacebookIcon from 'layouts/facebookIcon'
import TwitterIcon from 'layouts/twitterIcon'

// - Import API

// - Import app components
import UserAvatar from 'components/userAvatar'

// - Import actions
import * as globalActions from 'store/actions/globalActions'
import * as userActions from 'store/actions/userActions'

import { IUserActivityComponentProps } from './IUserActivityComponentProps'
import { IUserActivityComponentState } from './IUserActivityComponentState'
import PictureDialogComponent from 'src/layouts/pictureDialog'
import StringAPI from 'api/StringAPI'
import FollowDialogComponent from 'components/followDialog'
import AboutDialogComponent from 'components/aboutDialog'

/**
 * Create component class
 */
export class UserActivityComponent extends Component<IUserActivityComponentProps, IUserActivityComponentState> {

    /**
     * Component constructor
     */
    constructor(props: IUserActivityComponentProps) {
        super(props)

        this.handleWidthChanged = debounce(this.handleWidthChanged, 200)

        // Defaul state
        this.state = {
            boxesStyle: [],
            privilegeOpen: false,
            storeOpen: false,
            storeRepOpen: false,
            picutreDialogOpen: false,
            pictureDialogURL: '',
            aboutOpen: false
        }

        // Binding functions to `this`
        this.handleOpenStore = this.handleOpenStore.bind(this)
        this.handleCloseStore = this.handleCloseStore.bind(this)
        this.handleOpenStoreRep = this.handleOpenStoreRep.bind(this)
        this.handleCloseStoreRep = this.handleCloseStoreRep.bind(this)
        this.closePictureDialog = this.closePictureDialog.bind(this)
        this.openPictureDialog = this.openPictureDialog.bind(this)
        this.handleCloseAbout = this.handleCloseAbout.bind(this)
        this.handleOpenAbout = this.handleOpenAbout.bind(this)

    }

    /**
     * Handle open privilege
     */
    handleOpenPrivileges = () => {
        this.setState({ privilegeOpen: true })
    }

    /**
     * Handle close privilege
     */
    handleClosePrivileges = () => {
        this.setState({ privilegeOpen: false })
    }

    /**
     * Handle open store dialog
     */
    handleOpenStore() {
        this.setState({
            storeOpen: true
        })
    }

    /**
     * Handle close store dialog
     */
    handleCloseStore() {
        this.setState({
            storeOpen: false
        })
    }

    /**
     * Handle open about dialog
     */
    handleOpenAbout() {
        this.setState({
            aboutOpen: true
        })
    }

    /**
     * Handle close about dialog
     */
    handleCloseAbout() {
        this.setState({
            aboutOpen: false
        })
    }

    /**
     * Handle open store dialog
     */
    handleOpenStoreRep() {
        this.setState({
            storeRepOpen: true
        })
    }

    /**
     * Handle close store dialog
     */
    handleCloseStoreRep() {
        this.setState({
            storeRepOpen: false
        })
    }

    /**
     * Open picture dialog
     */
    openPictureDialog = (url: string) => {
        if (!StringAPI.isEmpty(url)) {
            this.setState({
                pictureDialogURL: url,
                picutreDialogOpen: true
            })
        }
    }

    /**
     * Close picture dialog
     */
    closePictureDialog = () => {
        this.setState({
            pictureDialogURL: '',
            picutreDialogOpen: false
        })
    }

    /**
     * Handle resize
     */
    handleResize = (event: any) => {
        this.handleWidthChanged(event)
    }

    /**
     * Handle window width changed
     */
    handleWidthChanged = (value: number) => {
        this.transformBoxes(value, 280, 5)
    }

    /**
     * Transform boxes
     */
    transformBoxes = (documentWidth: number, boxSize: number, numberOfBox: number, boxMargin = 5) => {
        const boxStyles = []
        const minSpace = 70
        let boxCounter = numberOfBox
        let boxContainer = (boxSize * boxCounter) + (boxCounter * (boxMargin * 2))
        let windowContainer = boxContainer + (minSpace * 2)
        while (windowContainer > documentWidth && boxCounter > 1) {
            --boxCounter
            boxContainer = (boxSize * boxCounter) + (boxCounter * (boxMargin * 2))
            windowContainer = boxContainer + (minSpace * 2)
        }
        let rowCounter = 0
        let columnCounter = 0
        const leftSpace = (documentWidth - boxContainer) / 2
        for (let index = 0; index < numberOfBox; index++) {
            if (columnCounter > boxCounter - 1) {
                columnCounter = 0
                ++rowCounter
            }
            const x = leftSpace + (columnCounter * (boxSize + (boxMargin * 2)))
            const y = rowCounter * (boxSize + (boxMargin * 2))

            boxStyles[index] = { width: boxSize, height: boxSize, transform: `translate(${x}px, ${y}px)`, visibility: 'visible' }
            ++columnCounter

        }

        this.setState({
            boxesStyle: boxStyles,
            parentHeight: ((rowCounter + 1) * (boxSize + (boxMargin * 2)))
        })
    }

    getReputation() {
        const { profile } = this.props
        const rep = ((profile.postCount || 0) * 10) + ((profile.voteCount || 0) * 10) +
            ((profile.shareCount || 0) * 10) + ((profile.followCount || 0) * 10)
        return numbro(rep).format({
            spaceSeparated: false,
            average: true
        })
    }

    componentDidMount() {
        this.handleWidthChanged(window.innerWidth)
    }

    /**
     * Reneder component DOM
     */
    render() {

        const { t, classes, profile, isCurrentUser, editProfileOpen, openEditor } = this.props
        const { boxesStyle, parentHeight, privilegeOpen, storeOpen, storeRepOpen, pictureDialogURL, picutreDialogOpen, aboutOpen } = this.state
        return (
            <>
                <ReactResizeDetector handleWidth onResize={this.handleResize} />
                <div className={classes.container} style={{ height: parentHeight }} >
                    <div className={classes.card} style={boxesStyle ? boxesStyle[0] : {}}>
                        <Paper className={classNames(classes.paperContainer, classes.paperBackground)}>
                            <div onClick={() => this.openPictureDialog(profile.avatar)}>
                                <UserAvatar
                                    className={classes.userAvatar}
                                    fullName={profile.fullName}
                                    fileName={profile.avatar}
                                    size={140}
                                />
                            </div>
                            <Typography
                                variant='h5'
                                className={classes.userNameText}>
                                {profile.fullName}
                            </Typography>

                            <div className={classes.editButtonContainer}>
                                {isCurrentUser
                                    ? (<Button color={'primary'} onClick={openEditor}> {t!('profile.editProfileButton')} </Button>)
                                    :
                                    <div>
                                        <FollowDialogComponent userId={profile.userId!} user={profile} />
                                        <IconButton>
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Button color={'primary'} onClick={this.handleOpenAbout}> {t!('profile.aboutButton')} </Button>
                                    </div>}

                            </div>
                            {isCurrentUser && editProfileOpen ? (
                                <EditProfile
                                    avatar={profile.avatar}
                                    banner={profile.banner}
                                    fullName={profile.fullName}
                                />
                            ) : ''}
                        </Paper>
                    </div>

                    <AboutDialogComponent targetUser={profile} open={aboutOpen} onClose={this.handleCloseAbout} />

                    {/* <div className={classes.card} style={boxesStyle ? boxesStyle[1] : {}}>
                        <Paper className={classes.paperContainer}>
                            <Typography variant='h6'
                                className={classes.title}>
                                {translate!('userActivity.privilegesTitle')}
                            </Typography>
                            <div className={classes.content}>
                                <ActivityProgress
                                    value={20}
                                    caption={'20% completed'} />
                                <List component='nav' dense>
                                    <ListItem button className={classes.listItem}>
                                        <ListItemText primary='Complete Profile' />
                                    </ListItem>
                                    <ListItem button className={classes.listItem}>
                                        <ListItemText primary='Connect Social Account' />
                                    </ListItem> <ListItem button className={classes.listItem}>
                                        <ListItemText primary='Verify Phone Number' />
                                    </ListItem> <ListItem button className={classes.listItem}>
                                        <ListItemText primary='Verify Bank Account' />
                                    </ListItem>
                                </List>
                            </div>
                           
                        </Paper>
                    </div> */}

                    <div className={classes.card} style={boxesStyle ? boxesStyle[1] : {}}>
                        <Paper className={classNames(classes.paperContainer, classes.paperBackground1)}>
                            <Typography variant='h6'
                                className={classNames(classes.title, classes.titleSpecial)}>
                                {t!('userActivity.reputationTitle')}
                            </Typography>
                            <Typography
                                // onClick={this.handleOpenStoreRep}
                                className={classes.repText}>
                                {this.getReputation()}
                                <span className={classes.repCaption}>{t!('userActivity.reputationCaption')}</span>
                            </Typography>
                            {/* <Typography component='div'
                                className={classes.repLabel}>
                                <ListItem button className={classes.listItem} onClick={this.handleOpenStore}>
                                    <SvgStar /> 
                                <DiamondIcon className={classes.diamond} viewBox='0 0 60 60' />
                                </ListItem>
                            </Typography> */}
                        </Paper>
                    </div>

                    <div className={classes.card} style={boxesStyle ? boxesStyle[2] : {}}>
                        <Paper className={classes.paperContainer}>
                            <Typography variant='h6'
                                className={classes.title}>
                                {t!('userActivity.impactTitle')}
                            </Typography>
                            <div className={classes.content}>
                                <List component='nav'>
                                    <ListItem button className={classes.listItem}>
                                        <ListItemIcon>
                                            <SvgFavorite className={classes.impactIcon} />
                                        </ListItemIcon>
                                        <ListItemText primary={`${profile.voteCount || 0} ${t!('userActivity.likeCaption')}`} />
                                    </ListItem>
                                    <ListItem button className={classes.listItem}>
                                        <ListItemIcon>
                                            <SvgShare className={classes.impactIcon} />
                                        </ListItemIcon>
                                        <ListItemText primary={`${profile.shareCount || 0} ${t!('userActivity.shareCaption')}`} />
                                    </ListItem>
                                    <ListItem button className={classes.listItem}>
                                        <ListItemIcon>
                                            <MailIcon className={classes.impactIcon} />
                                        </ListItemIcon>
                                        <ListItemText primary={`${profile.postCount || 0} ${t!('userActivity.publishCaption')}`} />
                                    </ListItem>
                                    <ListItem button className={classes.listItem}>
                                        <ListItemIcon>
                                            <GroupAdd className={classes.impactIcon} />
                                        </ListItemIcon>
                                        <ListItemText primary={`${profile.followCount || 0} ${t!('userActivity.followingCaption')}`} />
                                    </ListItem>
                                    <ListItem button className={classes.listItem}>
                                        <ListItemIcon>
                                            <PersonPinIcon className={classes.impactIcon} />
                                        </ListItemIcon>
                                        <ListItemText primary={`${profile.followerCount || 0} ${t!('userActivity.followersCaption')}`} />
                                    </ListItem>
                                </List>
                            </div>
                        </Paper>
                    </div>

                    <div className={classes.card} style={boxesStyle ? boxesStyle[3] : {}}>
                        <Paper className={classes.paperContainer}>
                            <Typography variant='h6'
                                className={classes.title}>
                                {t!('userActivity.privilegesTitle')}
                            </Typography>
                            <div className={classes.content}>
                                <Typography variant='caption'>
                                    {t!('userActivity.currentPrivilegeCaption')} : {t!('privilege.normal')}
                                </Typography>
                                <Typography
                                    variant='caption'>
                                    {t!('userActivity.nextPrivilegeCaption')}  : {t!('privilege.newUser')}
                                </Typography>
                                <CircleActivity
                                    value={20}
                                    percent={'20%'}
                                    title={t!('userActivity.goal', { rep: 100 })}
                                    guideline={t!('privilege.approvedUser')}
                                />
                            </div>

                            <Button color={'primary'} disabled onClick={this.handleOpenPrivileges}> {t!('userActivity.allPrivilegesButton')}</Button>

                        </Paper>
                    </div>

                    <div className={classes.card} style={boxesStyle ? boxesStyle[4] : {}}>
                        <Paper className={classes.paperContainer}>
                            <Typography variant='h6'
                                className={classes.title}>
                                {t!('userActivity.bountiesTitle')}
                            </Typography>
                            <div className={classes.content}>
                                <BountiesDialog text={t!('userActivity.allBounties')} />
                                <Button classes={{ root: classes.buttonBounties }}>
                                    {t!('userActivity.nextBountiesButton')}
                                </Button>
                                <CircleActivity
                                    value={20}
                                    percent={'10/50'}
                                    title={t!('userActivity.bountyCommingSoon')}
                                    guideline={t!('userActivity.bountyFrom', { company: config.settings.companyName })}
                                />
                            </div>
                        </Paper>
                    </div>

                </div>
                <TimelineComponent
                    title={t!('userActivity.privileges')}
                    open={privilegeOpen!}
                    onClose={this.handleClosePrivileges}
                />
                <PictureDialogComponent open={picutreDialogOpen} onClose={this.closePictureDialog} images={[pictureDialogURL]} />
            </>
        )
    }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IUserActivityComponentProps) => {

    return {
        setHeaderTitle: (title: string) => dispatch(globalActions.setHeaderTitle(title)),
        openEditor: () => dispatch(userActions.openEditProfile())

    }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IUserActivityComponentProps) => {

    return {
        
        editProfileOpen: state.getIn(['user', 'openEditProfile'])

    }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(UserActivityComponent as any)

export default connect(mapStateToProps, mapDispatchToProps)
    (withStyles(userActivityStyles as any)(translateWrraper as any) as any)
