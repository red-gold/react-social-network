// - Import react components
import React, { Component } from 'react'
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
import CircleAPI from 'api/CircleAPI'
import StringAPI from 'api/StringAPI'

// - Import actions
import * as circleActions from 'actions/circleActions'

import { IUserBoxComponentProps } from './IUserBoxComponentProps'
import { IUserBoxComponentState } from './IUserBoxComponentState'
import { User } from 'core/domain/users'
import { UserTie, Circle } from 'core/domain/circles'
import { ServerRequestType } from 'constants/serverRequestType'

/**
 * Create component class
 */
export class UserBoxComponent extends Component<IUserBoxComponentProps, IUserBoxComponentState> {

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

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IUserBoxComponentProps) {
    super(props)
    const { userBelongCircles, circles } = this.props
    // Defaul state
    this.state = {
      /**
       * It will be true if user follow popover is open
       */
      open: false,
      /**
       * The value of circle input
       */
      circleName: '',
      /**
       * It will be true if the text field for adding group is empty
       */
      disabledCreateCircle: true,
      /**
       * The button of add user in a circle is disabled {true} or not {false}
       */
      disabledAddToCircle: true,
      /**
       * Keep selected circles for refere user
       */
      selectedCircles: userBelongCircles ? userBelongCircles!.slice() : [],
      /**
       * Whether current user changed the selected circles for referer user
       */
      disabledDoneCircles: true
    }

    // Binding functions to `this`
    this.handleChangeName = this.handleChangeName.bind(this)
    this.onCreateCircle = this.onCreateCircle.bind(this)
    this.handleFollowUser = this.handleFollowUser.bind(this)
    this.handleFollowUser = this.handleFollowUser.bind(this)

  }

  /**
   * Handle follow user
   */
  handleFollowUser = (checked: boolean, cid: string) => {
    const { userId, user } = this.props
    const { avatar, fullName } = user
    if (checked) {
      this.props.addFollowingUser!(cid, { avatar, userId, fullName })
    } else {
      this.props.deleteFollowingUser!(cid, userId)
    }
  }

  /**
   * Handle request close for add circle box
   */
  onRequestCloseAddCircle = () => {
    this.setState({
      open: false
    })
  }

  /**
   * Handle request open for add circle box
   */
  onRequestOpenAddCircle = () => {
    this.setState({
      open: true
    })
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
    const { userBelongCircles, circles } = this.props
    let selectedCircles = this.state.selectedCircles
    if (isInputChecked) {
      selectedCircles = [
        ...selectedCircles,
        circleId
      ]

    } else {
      const circleIndex = selectedCircles.indexOf(circleId)
      selectedCircles.splice(circleIndex, 1)
    }
    this.setState({
      selectedCircles: selectedCircles,
      disabledDoneCircles: !this.selectedCircleChange(selectedCircles)
    })
  }

  /**
   * Handle follow user
   */
  onFollowUser = (event: any) => {
    // This prevents ghost click
    event.preventDefault()
    this.onRequestOpenAddCircle()
  }

  /**
   * Add user to the circle/circles
   */
  onAddToCircle = () => {

  }

  /**
   * Create a circle list of user which belong to
   */
  circleList = () => {
    let { circles, userId, userBelongCircles } = this.props

    if (circles) {

      return Object.keys(circles).map((circleId, index) => {
        const {selectedCircles} = this.state
        let isBelong = selectedCircles!.indexOf(circleId) > -1
        // Create checkbox for selected/unselected circle
        return <Checkbox
          key={circleId}
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
        disabled={disabledDoneCircles}
        onTouchTap={this.onCreateCircle}
      />
    ]

    const { isFollowed } = this.props

    return (
      <Paper style={this.styles.paper} zDepth={1} className='grid-cell'>
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
            />
          </div>
        </div>
        <Dialog
          key={this.props.userId || 0}
          actions={writeActions}
          modal={false}
          open={this.state.open}
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
    addFollowingUser: (circleIds: string[], user: UserTie) => dispatch(circleActions.dbUpdateUserInCircles(circleIds, user)),
    deleteFollowingUser: (cid: string, followingId: string) => dispatch(circleActions.dbDeleteFollowingUser(followingId)),
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
  return {
    isFollowed,
    circles,
    userBelongCircles,
    belongCirclesCount: userBelongCircles.length || 0,
    firstBelongCircle: userBelongCircles ? (circles ? circles[userBelongCircles[0]] : {}) : {},
    avatar: state.user.info && state.user.info[ownProps.userId] ? state.user.info[ownProps.userId].avatar || '' : '',
    fullName: state.user.info && state.user.info[ownProps.userId] ? state.user.info[ownProps.userId].fullName || '' : ''
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(UserBoxComponent as any)
