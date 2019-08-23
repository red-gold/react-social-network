// - Import react components
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { grey } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import SvgAdd from '@material-ui/icons/Add';
import StringAPI from 'api/StringAPI';
import { followDialogStyles } from 'components/followDialog/followDialogStyles';
import { push } from 'connected-react-router';
import { ServerRequestType } from 'constants/serverRequestType';
import { UserTie } from 'core/domain/circles';
import { User } from 'core/domain/users';
import { List as ImuList, Map } from 'immutable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as circleActions from 'store/actions/circleActions';
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType';
import { userSelector } from 'store/reducers/users/userSelector';

import { IFollowDialogProps } from './IFollowDialogProps';
import { IFollowDialogState } from './IFollowDialogState';

// - Material UI
// - Import app components
// - Import API
// - Import actions
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
    const { userId, addUserToCircle, selectedCircles, deleteFollowingUser, avatar, fullName } = this.props
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
    const { isFollowed, followUser, followingCircle, userId, followRequest, avatar, fullName } = this.props

    if (followRequest && followRequest.status === ServerRequestStatusType.Sent) {
      return
    } else if (isFollowed) {
      this.onRequestOpenAddCircle()
    } else if (followingCircle!) {
      followUser!(followingCircle!.get('id'), { avatar, userId, fullName })
    } else {
      followUser!(userId, { avatar, userId, fullName })
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
    const { openSelectCircles, userId, followingCircle } = this.props
    if (followingCircle!){
      openSelectCircles!(userId)
    }
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
    const { setSelectedCircles, selectedCircles, userId } = this.props
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
    let { circles, userId, selectedCircles, classes, t } = this.props
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
    const { userBelongCircles } = this.props

    if (selectedCircles.count() === userBelongCircles!.count()) {
      for (let circleIndex: number = 0; circleIndex < selectedCircles.count(); circleIndex++) {
        const selectedCircleId = selectedCircles.get(circleIndex)
        if (!(userBelongCircles!.indexOf(selectedCircleId!) > -1)) {
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
const mapDispatchToProps = (dispatch: Function) => {
  return {
    createCircle: (name: string) => dispatch(circleActions.dbAddCircle(name)),
    addUserToCircle: (circleIds: ImuList<string>, user: UserTie) => dispatch(circleActions.dbUpdateUserInCircles(circleIds, user)),
    followUser: (circleId: string, userFollowing: UserTie) => dispatch(circleActions.dbFollowUser(circleId, userFollowing)),
    deleteFollowingUser: (followingId: string) => dispatch(circleActions.dbDeleteFollowingUser(followingId)),
    setSelectedCircles: (userId: string, circleList: string[]) => dispatch(circleActions.setSelectedCircles(userId, circleList)),
    removeSelectedCircles: (userId: string) => dispatch(circleActions.removeSelectedCircles(userId)),
    openSelectCircles: (userId: string) => dispatch(circleActions.openSelectCircleBox(userId)),
    closeSelectCircles: (userId: string) => dispatch(circleActions.closeSelectCircleBox(userId)),
    goTo: (url: string) => dispatch(push(url))

  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IFollowDialogProps) => {


  const circles: Map<string, Map<string, any>> = state.getIn(['circle', 'circleList'], Map({}))
  const userBelongCircles: ImuList<any> = state.getIn(['circle', 'userTies', ownProps.userId, 'circleIdList'], ImuList())
  const isFollowed = userBelongCircles.count() > 0
  const followingCircle = circles
    .filter((followingCircle) => followingCircle!.get('isSystem', false) && followingCircle!.get('name') === `Following`)
    .toArray()[0]
  const followRequestId = StringAPI.createServerRequestId(ServerRequestType.CircleFollowUser, ownProps.userId)
  const followRequest = state.getIn(['server', 'request', followRequestId])
  const selectedCircles = state.getIn(['circle', 'selectedCircles', ownProps.userId], [])

  const isSelecteCirclesOpen = state.getIn(['circle', 'openSelecteCircles', ownProps.userId], [])
  const userBox = userSelector.getUserProfileById(state, { userId: ownProps.userId }).toJS() as User
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
const translateWrapper = withTranslation('translations')(FollowDialogComponent as any)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(followDialogStyles as any)(translateWrapper as any))
