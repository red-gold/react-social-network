// - Import react components
import React, { Component } from 'react'
import moment from 'moment/moment'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import classNames from 'classnames'
import {Map, List as ImuList} from 'immutable'

// - Material UI
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import RaisedButton from 'material-ui/Button'
import Menu, { MenuItem } from 'material-ui/Menu'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import Tooltip from 'material-ui/Tooltip'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog
} from 'material-ui/Dialog'
import SvgAdd from 'material-ui-icons/Add'
import IconButton from 'material-ui/IconButton'
import { grey } from 'material-ui/colors'

// - Import app components
import UserAvatar from 'components/userAvatar'

// - Import API
import StringAPI from 'api/StringAPI'

// - Import actions
import * as circleActions from 'store/actions/circleActions'

import { IUserBoxComponentProps } from './IUserBoxComponentProps'
import { IUserBoxComponentState } from './IUserBoxComponentState'
import { User } from 'core/domain/users'
import { UserTie, Circle } from 'core/domain/circles'
import { ServerRequestType } from 'constants/serverRequestType'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'
import { ServerRequestModel } from 'models/server'

const styles = (theme: any) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    height: 254,
    width: 243,
    margin: 10,
    textAlign: 'center',
    minWidth: 230,    
    maxWidth: '257px'
  },
  dialogContent: {
    paddingTop: '5px',
    padding: '0px 5px 5px 5px'
  },
  circleName: {
    fontSize: '1rem'
  },
  space: {
    height: 20
  },
  fullPageXs: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
      margin: 0,
      overflowY: 'auto'
    }
  }
})

/**
 * Create component class
 */
export class UserBoxComponent extends Component<IUserBoxComponentProps, IUserBoxComponentState> {
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

  styles = {
    followButton: {
      position: 'absolute',
      bottom: '30px',
      left: 0,
      right: 0
    },
    dialog: {
      width: '',
      maxWidth: '280px',
      borderRadius: '4px'
    }
  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IUserBoxComponentProps) {
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
    const { userId, user, addUserToCircle, selectedCircles, deleteFollowingUser, avatar, fullName  } = this.props
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
    let { circles, userId, userBelongCircles, selectedCircles, classes } = this.props
    const circleDomList: any[] = []
    if (circles) {

      circles.forEach((circle, circleId) => {
        let isBelong = selectedCircles ? selectedCircles!.indexOf(circleId!) > -1 : false

        // Create checkbox for selected/unselected circle
        circleDomList.push(
          <ListItem key={`${circleId}-${userId}`} dense className={classes.listItem}>
            <ListItemText className={classes.circleName} primary={circle!.get('name')} />
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
   * @return {react element} return the DOM which rendered by component
   */
  render () {
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
      translate 
    } = this.props

    return (
      <Paper key={userId} elevation={1} className={classNames('grid-cell', classes.paper)}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          height: '100%',
          position: 'relative',
          paddingTop: 20

        }}>
          <div onClick={() => this.props.goTo!(`/${this.props.userId}`)} style={{ cursor: 'pointer' }}>
            <UserAvatar
              fullName={this.props.fullName!}
              fileName={this.props.avatar!}
              size={90}
            />
          </div>
          <div onClick={() => this.props.goTo!(`/${this.props.userId}`)} className='people__name' style={{ cursor: 'pointer' }}>
            <div>
              {this.props.fullName}
            </div>
          </div>
          <div style={this.styles.followButton as any}>
            <Button
              color='primary'
              onClick={this.onFollowUser}
              disabled={
                (followRequest ? followRequest.status === ServerRequestStatusType.Sent : false) ||
                (deleteFollowingUserRequest ? deleteFollowingUserRequest.status === ServerRequestStatusType.Sent : false)
              }
            >
              {!isFollowed ? translate!('userBox.followButton')
                : (belongCirclesCount! > 1 ? translate!('userBox.numberOfCircleButton', {circlesCount: belongCirclesCount}) : ((firstBelongCircle) ? firstBelongCircle.get('name', 'Followed') : translate!('userBox.followButton')))}
            </Button>
          </div>
        </div>
        <Dialog
        PaperProps={{className: classes.fullPageXs}}
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
                    placeholder={translate!('userBox.groupNamePlaceholder')}
                    onChange={this.handleChangeName}
                    value={this.state.circleName}
                  />
                } />
                <ListItemSecondaryAction>
                  <IconButton onClick={this.onCreateCircle} disabled={this.state.disabledCreateCircle}>
                    <Tooltip title={translate!('userBox.createCircleTooltip')}>
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
              {translate!('userBox.cancelButton')}
        </Button>
            <Button
              color='primary'
              disableFocusRipple={true}
              disableRipple={true}
              disabled={disabledDoneCircles || (addToCircleRequest ? addToCircleRequest!.status === ServerRequestStatusType.Sent : false)}
              onClick={this.handleDoneAddCircle}
            >
              {translate!('userBox.doneButton')}
        </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: Function, ownProps: IUserBoxComponentProps) => {
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
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IUserBoxComponentProps) => {

  const uid = state.getIn(['authorize', 'uid'])
  const request = state.getIn(['server', 'request'])

  const circles: Map<string, Map<string, any>> = state.getIn(['circle', 'circleList'], {})
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
  const userBox = state.getIn(['user', 'info', ownProps.userId])

  return {
    translate: getTranslate(state.get('locale')),
    isSelecteCirclesOpen,
    isFollowed,
    selectedCircles,
    circles,
    followingCircle,
    userBelongCircles,
    followRequest,
    belongCirclesCount: userBelongCircles.count() || 0,
    firstBelongCircle: userBelongCircles ?  circles.get(userBelongCircles.get(0), Map({})) : Map({}),
    avatar: userBox.avatar || '' ,
    fullName: userBox.fullName || ''
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(UserBoxComponent as any) as any)
