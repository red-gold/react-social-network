// - Import react components
import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import { Dialog } from 'material-ui'
import SvgAdd from 'material-ui/svg-icons/content/add'
import IconButton from 'material-ui/IconButton'
import { grey400, grey800, darkBlack, lightBlack } from 'material-ui/styles/colors'

// - Import app components
import UserAvatar from 'components/userAvatar'

// - Import API
import StringAPI from 'api/StringAPI'

// - Import actions
import * as circleActions from 'actions/circleActions'

import { IUserBoxComponentProps } from './IUserBoxComponentProps'
import { IUserBoxComponentState } from './IUserBoxComponentState'
import { User } from 'core/domain/users'
import { UserTie, Circle } from 'core/domain/circles'
import { ServerRequestType } from 'constants/serverRequestType'
import { ServerRequestStatusType } from 'actions/serverRequestStatusType'
import { ServerRequestModel } from 'models/server'

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
    paper: {
      height: 254,
      width: 243,
      margin: 10,
      textAlign: 'center',
      maxWidth: '257px'
    },
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
  selectedCircles: string[]

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IUserBoxComponentProps) {
    super(props)
    const { userBelongCircles, circles,userId } = this.props
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
    this.selectedCircles = userBelongCircles!.slice()
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
    const { userId, user , addUserToCircle, selectedCircles, deleteFollowingUser} = this.props
    const { avatar, fullName } = user
    const {disabledDoneCircles} = this.state
    if (!disabledDoneCircles) {
      if (selectedCircles!.length > 0) {
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
    const {isFollowed, followUser, followingCircleId, userId, user, followRequest } = this.props

    if (followRequest && followRequest.status === ServerRequestStatusType.Sent) {
      return
    }
    const { avatar, fullName } = user
    if (!isFollowed) {
      followUser!(followingCircleId!, { avatar, userId, fullName })
    } else {
      this.onRequestOpenAddCircle()
    }
  }

  /**
   * Handle request close for add circle box
   */
  onRequestCloseAddCircle = () => {
    const {setSelectedCircles, userId, userBelongCircles, closeSelectCircles} = this.props
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
    const { openSelectCircles, userId} = this.props
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
    let newSelectedCircles = selectedCircles!.slice()
    if (isInputChecked) {

      newSelectedCircles = [
        ...selectedCircles!,
        circleId
      ]

    } else {
      const circleIndex = selectedCircles!.indexOf(circleId)
      newSelectedCircles.splice(circleIndex, 1)
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
    let { circles, userId, userBelongCircles, selectedCircles } = this.props

    if (circles) {

      const parsedDate = Object.keys(circles).map((circleId, index) => {
        let isBelong = selectedCircles ? selectedCircles!.indexOf(circleId) > -1 : false

        // Create checkbox for selected/unselected circle
        return <Checkbox
          key={`${circleId}-${userId}`}
          style={{ padding: '10px' }}
          label={circles![circleId].name}
          labelStyle={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '100%'
          }}
          onCheck={(event: object, isInputChecked: boolean) => this.handleSelectCircle(event, isInputChecked, circleId)}
          checked={isBelong}
        />
      })

      return parsedDate
    }
  }

  /**
   * Check if the the selected circles changed
   */
  selectedCircleChange = (selectedCircles: string[]) => {
    let isChanged = false
    const { userBelongCircles, circles } = this.props

    if (selectedCircles.length === userBelongCircles!.length) {
      for (let circleIndex: number = 0; circleIndex < selectedCircles.length; circleIndex++) {
        const selectedCircleId = selectedCircles[circleIndex]
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
    const {disabledDoneCircles} = this.state
    const { isFollowed, followRequest, userId, isSelecteCirclesOpen, addToCircleRequest, deleteFollowingUserRequest } = this.props
    const writeActions = [
      <FlatButton
        label='Cancel'
        primary={true}
        keyboardFocused={false}
        onTouchTap={this.onRequestCloseAddCircle}
        style={{ color: grey800 }}
      />,
      <FlatButton
        label='Done'
        primary={true}
        keyboardFocused={false}
        disabled={disabledDoneCircles || (addToCircleRequest ? addToCircleRequest!.status === ServerRequestStatusType.Sent : false)}
        onTouchTap={this.handleDoneAddCircle}
      />
    ]


    return (
      <Paper key={userId} style={this.styles.paper} zDepth={1} className='grid-cell'>
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
              {this.props.user.fullName}
            </div>
          </div>
          <div style={this.styles.followButton as any}>
            <FlatButton
              label={!isFollowed ? 'Follow'
                : (this.props.belongCirclesCount! > 1 ? `${this.props.belongCirclesCount} Circles` : ((this.props.firstBelongCircle) ? this.props.firstBelongCircle.name : 'Follow'))}
              primary={true}
              onTouchTap={this.onFollowUser}
              disabled={
                (followRequest ? followRequest.status === ServerRequestStatusType.Sent : false) ||
                (deleteFollowingUserRequest ? deleteFollowingUserRequest.status === ServerRequestStatusType.Sent : false)
              }
            />
          </div>
        </div>
        <Dialog
          key={this.props.userId || 0}
          actions={writeActions}
          modal={false}
          open={isSelecteCirclesOpen === true}
          contentStyle={this.styles.dialog}
          onRequestClose={this.onRequestCloseAddCircle}
          overlayStyle={{ background: 'rgba(0,0,0,0.12)' }}
          bodyStyle={{ padding: 0 }}
          autoDetectWindowHeight={false}
          actionsContainerStyle={{ borderTop: '1px solid rgb(224, 224, 224)' }}

        >
          <div style={{
            position: 'relative',
            display: 'block',
            maxHeight: '220px'
          }}>
            <div style={{ overflowY: 'auto', height: '100%' }}>
              {this.circleList()}

            </div>
          </div>
          <div style={{ padding: '10px' }}>
            <TextField
              hintText='Group name'
              onChange={this.handleChangeName}
              value={this.state.circleName}
            />
            <div className='user-box__add-circle'>
              <IconButton onClick={this.onCreateCircle} tooltip='Create circle' disabled={this.state.disabledCreateCircle}>
                <SvgAdd />
              </IconButton>
            </div>
            <br />
          </div>
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
    addUserToCircle: (circleIds: string[], user: UserTie) => dispatch(circleActions.dbUpdateUserInCircles(circleIds, user)),
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
const mapStateToProps = (state: any, ownProps: IUserBoxComponentProps) => {

  const { circle, authorize, server } = state
  const { uid } = authorize
  const { request } = server

  const circles: { [circleId: string]: Circle } = circle ? (circle.circleList || {}) : {}
  const userBelongCircles = circle ? (circle.userTies[ownProps.userId] ? circle.userTies[ownProps.userId].circleIdList : []) : []
  const isFollowed = userBelongCircles.length > 0
  const followingCircleId = circles ? Object.keys(circles)
  .filter((circleId) => circles[circleId].isSystem && circles[circleId].name === `Following`)[0] : ''
  const followRequest: ServerRequestModel = request ? request[StringAPI.createServerRequestId(ServerRequestType.CircleFollowUser, ownProps.userId)] : null
  const addToCircleRequest: ServerRequestModel = request ? request[StringAPI.createServerRequestId(ServerRequestType.CircleAddToCircle, ownProps.userId)] : null
  const deleteFollowingUserRequest: ServerRequestModel = request ? request[StringAPI.createServerRequestId(ServerRequestType.CircleDeleteFollowingUser, ownProps.userId)] : null
  const selectedCircles = circle.selectedCircles ? circle.selectedCircles[ownProps.userId] : []
  const isSelecteCirclesOpen = circle.openSelecteCircles ? circle.openSelecteCircles[ownProps.userId] : []

  return {
    isSelecteCirclesOpen,
    isFollowed,
    selectedCircles,
    circles,
    followingCircleId,
    userBelongCircles,
    followRequest,
    belongCirclesCount: userBelongCircles.length || 0,
    firstBelongCircle: userBelongCircles ? (circles ? circles[userBelongCircles[0]] : {}) : {},
    avatar: state.user.info && state.user.info[ownProps.userId] ? state.user.info[ownProps.userId].avatar || '' : '',
    fullName: state.user.info && state.user.info[ownProps.userId] ? state.user.info[ownProps.userId].fullName || '' : ''
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(UserBoxComponent as any)
