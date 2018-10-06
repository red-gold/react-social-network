// - Import react components
import React, { Component } from 'react'
import moment from 'moment/moment'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'

import classNames from 'classnames'
import { Map, List as ImuList } from 'immutable'
import { translate, Trans } from 'react-i18next'

// - Material UI
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import RaisedButton from '@material-ui/core/Button'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Divider from '@material-ui/core/Divider'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'
import SvgAdd from '@material-ui/icons/Add'
import MessageIcon from '@material-ui/icons/Message'
import IconButton from '@material-ui/core/IconButton'
import { grey } from '@material-ui/core/colors'

// - Import app components
import UserAvatar from 'components/userAvatar'

// - Import API
import StringAPI from 'api/StringAPI'

// - Import actions
import * as circleActions from 'store/actions/circleActions'

import { IFollowDialogProps } from './IFollowDialogProps'
import { IFollowDialogState } from './IFollowDialogState'
import { User } from 'core/domain/users'
import { UserTie, Circle } from 'core/domain/circles'
import { ServerRequestType } from 'constants/serverRequestType'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'
import { ServerRequestModel } from 'models/server'
import { userSelector } from 'store/reducers/users/userSelector'
import { followDialogStyles } from 'components/followDialog/followDialogStyles'

/**
 * Create component class
 */
export class FollowDialogComponent extends Component<IFollowDialogProps, IFollowDialogState> {
  /**
   * Fields
   */
  static propTypes = {
    /**
     * User identifier
     */
    userId: PropTypes.string,
    /**
     * User information
     */
    user: PropTypes.object

  }

  /**
   * Component constructor
   *
   */
  constructor(props: IFollowDialogProps) {
    super(props)
    const { userBelongCircles, circles, userId } = this.props
    // Defaul state
    this.state = {
      /**
       * The value of circle input
       */
      circleName: ``,
      /**
       * It will be true if the text field for adding group is empty
       */
      disabledCreateCircle: true,
      /**
       * The button of add user in a circle is disabled {true} or not {false}
       */
      disabledAddToCircle: true,
      /**
       * Whether current user changed the selected circles for referer user
       */
      disabledDoneCircles: true
    }
    // Binding functions to `this`
    this.handleChangeName = this.handleChangeName.bind(this)
    this.onCreateCircle = this.onCreateCircle.bind(this)
    this.handleDoneAddCircle = this.handleDoneAddCircle.bind(this)
    this.circleList = this.circleList.bind(this)

  }

  /**
   * Handle follow user
   */
  handleDoneAddCircle = () => {
    const { userId, user, addUserToCircle, selectedCircles, deleteFollowingUser, avatar, fullName } = this.props
    const { disabledDoneCircles } = this.state
    if (!disabledDoneCircles) {
      if (selectedCircles!.count() > 0) {
        addUserToCircle!(selectedCircles!, { avatar, userId, fullName })
      } else {
        deleteFollowingUser!(userId)
      }
    }
  }

  /**
   * Handle follow user
   */
  onFollowUser = (event: any) => {
    // This prevents ghost click
    event.preventDefault()
    const { isFollowed, followUser, followingCircle, userId, user, followRequest, avatar, fullName } = this.props

    if (followRequest && followRequest.status === ServerRequestStatusType.Sent) {
      return
    }
    if (!isFollowed) {
      followUser!(followingCircle!.get('id'), { avatar, userId, fullName })
    } else {
      this.onRequestOpenAddCircle()
    }
  }

  /**
   * Handle request close for add circle box
   */
  onRequestCloseAddCircle = () => {
    const { setSelectedCircles, userId, userBelongCircles, closeSelectCircles } = this.props
    setSelectedCircles!(userId, userBelongCircles!)
    closeSelectCircles!(userId)
    this.setState({
      circleName: ``,
      disabledCreateCircle: true,
      disabledAddToCircle: true,
      disabledDoneCircles: true
    })
  }

  /**
   * Handle request open for add circle box
   */
  onRequestOpenAddCircle = () => {
    const { openSelectCircles, userId } = this.props
    openSelectCircles!(userId)
  }

  /**
   * Create a new circle
   */
  onCreateCircle = () => {
    const { circleName } = this.state
    if (circleName && circleName.trim() !== '') {
      this.props.createCircle!(this.state.circleName)
      this.setState({
        circleName: '',
        disabledCreateCircle: true
      })
    }
  }

  /**
   * Handle change group name input to the state
   */
  handleChangeName = (event: any) => {
    this.setState({
      circleName: event.target.value,
      disabledCreateCircle: (event.target.value === undefined || event.target.value.trim() === '')

    })
  }

  handleSelectCircle = (event: object, isInputChecked: boolean, circleId: string) => {
    const { userBelongCircles, circles, setSelectedCircles, selectedCircles, userId } = this.props
    let newSelectedCircles = selectedCircles!
    if (isInputChecked) {
      newSelectedCircles = selectedCircles!.push(circleId)

    } else {
      const circleIndex = selectedCircles!.indexOf(circleId)
      newSelectedCircles = newSelectedCircles.remove(circleIndex)
    }

    setSelectedCircles!(userId, newSelectedCircles)
    this.setState({
      disabledDoneCircles: !this.selectedCircleChange(newSelectedCircles)
    })
  }

  /**
   * Create a circle list of user which belong to
   */
  circleList = () => {
    let { circles, userId, userBelongCircles, selectedCircles, classes, t } = this.props
    const circleDomList: any[] = []
    if (circles) {

      circles.forEach((circle, circleId) => {
        let isBelong = selectedCircles ? selectedCircles!.indexOf(circleId!) > -1 : false
        const circleName = circle!.get('name')
        // Create checkbox for selected/unselected circle
        circleDomList.push(
          <ListItem key={`${circleId}-${userId}`} dense className={classes.listItem}>
            <ListItemText className={classes.circleName}
              primary={circleName === 'Following' ? t!('userBox.followingLabel') : circleName} />
            <ListItemSecondaryAction>
              <Checkbox
                onChange={(event: object, isInputChecked: boolean) => this.handleSelectCircle(event, isInputChecked, circleId!)}
                checked={isBelong}
              />
            </ListItemSecondaryAction>
          </ListItem>)
      })

      return circleDomList
    }
  }

  /**
   * Check if the the selected circles changed
   */
  selectedCircleChange = (selectedCircles: ImuList<string>) => {
    let isChanged = false
    const { userBelongCircles, circles } = this.props

    if (selectedCircles.count() === userBelongCircles!.count()) {
      for (let circleIndex: number = 0; circleIndex < selectedCircles.count(); circleIndex++) {
        const selectedCircleId = selectedCircles.get(circleIndex)
        if (!(userBelongCircles!.indexOf(selectedCircleId) > -1)) {
          isChanged = true
          break
        }
      }
    } else {
      isChanged = true
    }
    return isChanged
  }

  /**
   * Reneder component DOM
   * 
   */
  render() {
    const { disabledDoneCircles } = this.state
    const {
      isFollowed,
      firstBelongCircle,
      belongCirclesCount,
      followRequest,
      userId,
      isSelecteCirclesOpen,
      addToCircleRequest,
      deleteFollowingUserRequest,
      classes,
      t
    } = this.props

    const followButtonLable = !isFollowed ? t!('userBox.followButton')
      : (belongCirclesCount! > 1 ? t!('userBox.numberOfCircleButton', { circlesCount: belongCirclesCount }) : ((firstBelongCircle) ? firstBelongCircle.get('name', t!('userBox.followedLabel')) : t!('userBox.followButton')))
    return (
      <>
        <Button
          color='primary'
          onClick={this.onFollowUser}
          disabled={
            (followRequest ? followRequest.status === ServerRequestStatusType.Sent : false) ||
            (deleteFollowingUserRequest ? deleteFollowingUserRequest.status === ServerRequestStatusType.Sent : false)
          }
        >
          {followButtonLable === 'Following' ? t!('userBox.followingLabel') : followButtonLable}
        </Button>

        <Dialog
          PaperProps={{ className: classes.fullPageXs }}
          key={this.props.userId || 0}
          open={isSelecteCirclesOpen === true}
          onClose={this.onRequestCloseAddCircle}

        >
          <DialogContent className={classes.dialogContent}>
            <List>
              {this.circleList()}
              <div className={classes.space}></div>
              <Divider />
              <ListItem key={`'circleName'-${userId}`} dense className={classes.listItem}>
                <ListItemText primary={
                  <TextField
                    autoFocus
                    placeholder={t!('userBox.groupNamePlaceholder')}
                    onChange={this.handleChangeName}
                    value={this.state.circleName}
                  />
                } />
                <ListItemSecondaryAction>
                  <IconButton onClick={this.onCreateCircle} disabled={this.state.disabledCreateCircle}>
                    <Tooltip title={t!('userBox.createCircleTooltip')}>
                      <SvgAdd />
                    </Tooltip>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button
              color='primary'
              disableFocusRipple={true}
              disableRipple={true}
              onClick={this.onRequestCloseAddCircle}
              style={{ color: grey[800] }}
            >
              {t!('userBox.cancelButton')}
            </Button>
            <Button
              color='primary'
              disableFocusRipple={true}
              disableRipple={true}
              disabled={disabledDoneCircles || (addToCircleRequest ? addToCircleRequest!.status === ServerRequestStatusType.Sent : false)}
              onClick={this.handleDoneAddCircle}
            >
              {t!('userBox.doneButton')}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: Function, ownProps: IFollowDialogProps) => {
  return {
    createCircle: (name: string) => dispatch(circleActions.dbAddCircle(name)),
    addUserToCircle: (circleIds: ImuList<string>, user: UserTie) => dispatch(circleActions.dbUpdateUserInCircles(circleIds, user)),
    followUser: (circleId: string, userFollowing: UserTie) => dispatch(circleActions.dbFollowUser(circleId, userFollowing)),
    deleteFollowingUser: (followingId: string) => dispatch(circleActions.dbDeleteFollowingUser(followingId)),
    setSelectedCircles: (userId: string, circleList: string[]) => dispatch(circleActions.setSelectedCircles(userId, circleList)),
    removeSelectedCircles: (userId: string, circleList: string[]) => dispatch(circleActions.removeSelectedCircles(userId)),
    openSelectCircles: (userId: string) => dispatch(circleActions.openSelectCircleBox(userId)),
    closeSelectCircles: (userId: string) => dispatch(circleActions.closeSelectCircleBox(userId)),
    goTo: (url: string) => dispatch(push(url))

  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IFollowDialogProps) => {

  const uid = state.getIn(['authorize', 'uid'])
  const request = state.getIn(['server', 'request'])

  const circles: Map<string, Map<string, any>> = state.getIn(['circle', 'circleList'], Map({}))
  const userBelongCircles: ImuList<any> = state.getIn(['circle', 'userTies', ownProps.userId, 'circleIdList'], ImuList())
  const isFollowed = userBelongCircles.count() > 0
  const followingCircle = circles
    .filter((followingCircle) => followingCircle!.get('isSystem', false) && followingCircle!.get('name') === `Following`)
    .toArray()[0]
  const followRequestId = StringAPI.createServerRequestId(ServerRequestType.CircleFollowUser, ownProps.userId)
  const followRequest = state.getIn(['server', 'request', followRequestId])
  const addToCircleRequestId = StringAPI.createServerRequestId(ServerRequestType.CircleAddToCircle, ownProps.userId)
  const addToCircleRequest = state.getIn(['server', 'request', addToCircleRequestId])
  const deleteFollowingUserRequestId = StringAPI.createServerRequestId(ServerRequestType.CircleDeleteFollowingUser, ownProps.userId)
  const deleteFollowingUserRequest = state.getIn(['server', 'request', deleteFollowingUserRequestId])
  const selectedCircles = state.getIn(['circle', 'selectedCircles', ownProps.userId], [])

  const isSelecteCirclesOpen = state.getIn(['circle', 'openSelecteCircles', ownProps.userId], [])
  const userBox = userSelector.getUserProfileById(state, { userId: ownProps.userId }).toJS()
  return {
    
    isSelecteCirclesOpen,
    isFollowed,
    selectedCircles,
    circles,
    followingCircle,
    userBelongCircles,
    followRequest,
    belongCirclesCount: userBelongCircles.count() || 0,
    firstBelongCircle: userBelongCircles ? circles.get(userBelongCircles.get(0), Map({})) : Map({}),
    avatar: userBox.avatar || '',
    fullName: userBox.fullName || ''
  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(FollowDialogComponent as any)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(followDialogStyles as any)(translateWrraper as any))
