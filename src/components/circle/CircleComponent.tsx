// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Map, List as ImuList } from 'immutable'

// - Material UI
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import SvgGroup from '@material-ui/icons/GroupWork'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import TextField from '@material-ui/core/TextField'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'
import { Manager, Target, Popper } from 'react-popper'
import Grow from '@material-ui/core/Grow'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import classNames from 'classnames'
import IconButtonElement from 'layouts/iconButtonElement'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import RaisedButton from '@material-ui/core/Button'
import SvgClose from '@material-ui/icons/Close'
import AppBar from '@material-ui/core/AppBar'
import Paper from '@material-ui/core/Paper'
import Collapse from '@material-ui/core/Collapse'
import Popover from '@material-ui/core/Popover'

// - Import app components
import UserAvatar from 'components/userAvatar'

// - Import API

// - Import actions
import * as circleActions from 'store/actions/circleActions'

import { ICircleComponentProps } from './ICircleComponentProps'
import { ICircleComponentState } from './ICircleComponentState'
import { Circle, UserTie } from 'core/domain/circles'
import { Profile } from 'core/domain/users/profile'

const styles = (theme: any) => ({
  root: {
    width: '100%',
    paddingRight: '0px',
    backgroundColor: theme.palette.background.paper
  },
  popperOpen: {
    zIndex: 10
  },
  popperClose: {
    pointerEvents: 'none',
    zIndex: 0
  },
  dialogPaper: {
    minWidth: 400
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
export class CircleComponent extends Component<ICircleComponentProps, ICircleComponentState> {

  styles = {
    userListItem: {
      backgroundColor: '#e2e2e2'
    },
    rightIconMenu: {
      display: 'block',
      position: 'absolute',
      top: '0px',
      right: '12px'
    },
    settingOverlay: {
      background: 'rgba(0,0,0,0.12)'
    },
    settingContent: {
      maxWidth: '400px'
    },
    listMenu: {
      color: 'rgba(0,0,0,0.87)',
      fontSize: '16px',
      marginRight: '8px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    }
  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props: ICircleComponentProps) {
    super(props)

    // Defaul state
    this.state = {
      /**
       * If is true circle is open to show users in circle list
       */
      open: false,
      /**
       * Circle name on change
       */
      circleName: this.props.circle.get('name', ''),
      /**
       * Save operation will be disable if user doesn't meet requirement
       */
      disabledSave: false,

      /**
       * Keep menu anchor
       */
      anchorElMenu: null
    }

    // Binding functions to `this`
    this.handleToggleCircle = this.handleToggleCircle.bind(this)
    this.handleDeleteCircle = this.handleDeleteCircle.bind(this)
    this.handleUpdateCircle = this.handleUpdateCircle.bind(this)
    this.handleChangeCircleName = this.handleChangeCircleName.bind(this)
  }

  /**
   * Handle chage circle name
   *
   *
   * @memberof CircleComponent
   */
  handleChangeCircleName = (evt: any) => {
    const { value } = evt.target
    this.setState({
      circleName: value,
      disabledSave: (!value || value.trim() === '')
    })
  }
  /**
   * Handle close menu
   */
  handleCloseMenu = () => {
    this.setState({
      anchorElMenu: null
    })
  }

  /**
   * Handle open menu
   */
  handleOpenMenu = (event: any) => {
    this.setState({
      anchorElMenu: event.currentTarget
    })
  }

  /**
   * Update user's circle
   *
   *
   * @memberof CircleComponent
   */
  handleUpdateCircle = () => {
    const { circleName } = this.state
    if (circleName && circleName.trim() !== '') {
      this.props.updateCircle!({ name: circleName, id: this.props.id })
    }
  }

  /**
   * Handle delete circle
   *
   *
   * @memberof CircleComponent
   */
  handleDeleteCircle = () => {
    this.props.deleteCircle!(this.props.id)
  }

  /**
   * Toggle circle to close/open
   *
   *
   * @memberof CircleComponent
   */
  handleToggleCircle = () => {
    this.setState({
      open: !this.state.open
    })
  }

  userList = () => {
    const { usersOfCircle } = this.props
    let usersParsed: any = []

    if (usersOfCircle) {
      usersOfCircle.forEach((user: Map<string, any>, userId) => {
        const fullName = user.get('fullName')
        let avatar = user.get('avatar', '')
        usersParsed.push(
          <ListItem
            button
            key={`${this.props.id}.${userId}`}
            style={this.styles.userListItem as any}
            value={2}
            onClick={() => this.props.goTo!(`/${userId}`)}
          >
            <UserAvatar fullName={fullName!} fileName={avatar} />
            <ListItemText inset primary={fullName} />
          </ListItem>)

      })
      return usersParsed
    }
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {

    const { circle, classes } = this.props
    const { anchorElMenu } = this.state
    /**
     * Right icon menue of circle
     *
     */
    // tslint:disable-next-line:member-ordering
    const rightIconMenu = (
      <div>

        <IconButton
          aria-owns={anchorElMenu! ? 'circle-menu' : ''}
          aria-haspopup='true'
          onClick={this.handleOpenMenu}
        >
          <MoreVertIcon />
        </IconButton>

        <Popover
          id='current-user-menu-root'
          anchorEl={anchorElMenu}
          open={Boolean(anchorElMenu)}
          onClose={this.handleCloseMenu}
          PaperProps={{
            style: {
              maxHeight: 200 * 4.5,
              boxShadow: '0 1px 4px 0 rgba(0,0,0,0.14)',

            },
          }}
        >
          <Paper>
            <MenuList role='menu'>
              <MenuItem onClick={this.handleDeleteCircle} > Delete Circle </MenuItem>
              <MenuItem onClick={this.props.openCircleSettings}> Setting </MenuItem>
            </MenuList>
          </Paper>
        </Popover>
      </div>
    )

    const circleTitle = (
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{ paddingRight: '10px' }}>
            <SvgClose onClick={this.props.closeCircleSettings} style={{ cursor: 'pointer' }} />
          </div>
          <div style={{
            color: 'rgba(0,0,0,0.87)',
            flex: '1 1',
            font: '500 20px Roboto,RobotoDraft,Helvetica,Arial,sans-serif'
          }}>
            Circle settings
        </div>
          <div style={{ marginTop: '-9px' }}>
            <Button color='primary' disabled={this.state.disabledSave} onClick={this.handleUpdateCircle} > SAVE </Button>
          </div>
        </div>
        <Divider />
      </div>
    )
    return (
      <div>
        <ListItem
          className={classes.root}
          key={this.props.id + '-CircleComponent'}
          onClick={this.handleToggleCircle}
        >
          <ListItemIcon className={classes.icon}>
            <SvgGroup />
          </ListItemIcon>
          <ListItemText inset primary={<span style={this.styles as any}>{this.props.circle.get('name')}</span>} />
          <ListItemSecondaryAction>
            {circle.get('isSystem') ? null : rightIconMenu}
          </ListItemSecondaryAction>
        </ListItem>
        <Collapse component='li' in={this.state.open} timeout='auto' unmountOnExit>
          <List disablePadding>
            {this.userList()}
          </List>
        </Collapse>
        <Dialog
          PaperProps={{ className: classes.fullPageXs }}
          key={this.props.id}
          open={this.props.openSetting!}
          onClose={this.props.closeCircleSettings}
          classes={{
            paper: classes.dialogPaper
          }}
        >
          <DialogTitle >{circleTitle}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              autoFocus
              placeholder='Circle name'
              label='Circle name'
              onChange={this.handleChangeCircleName}
              value={this.state.circleName}
            />
          </DialogContent>
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
const mapDispatchToProps = (dispatch: any, ownProps: ICircleComponentProps) => {
  let { uid } = ownProps
  return {
    deleteCircle: (id: string) => dispatch(circleActions.dbDeleteCircle(id)),
    updateCircle: (circle: Circle) => dispatch(circleActions.dbUpdateCircle(circle)),
    closeCircleSettings: () => dispatch(circleActions.closeCircleSettings(ownProps.id)),
    openCircleSettings: () => dispatch(circleActions.openCircleSettings(ownProps.id)),
    goTo: (url: string) => dispatch(push(url))

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: Map<string, any>, ownProps: ICircleComponentProps) => {
  const userTies: Map<string, any> = state.getIn(['circle', 'userTies'])
  const uid = state.getIn(['authorize', 'uid'])
  const circles: Map<string, Map<string, any>> = state.getIn(['circle', 'circleList'], {})
  const currentCircle: Map<string, any> = circles.get(ownProps.id, Map({}))
  const circleId = ownProps.circle.get('id')
  let usersOfCircle: Map<string, any> = Map({})
  userTies.forEach((userTie, userTieId) => {
    const theUserTie: Map<string, any> = userTie
    const circleList: ImuList<string> = theUserTie.getIn(['circleIdList'])
    if (circleList.indexOf(ownProps.id) > -1) {
      usersOfCircle = usersOfCircle.set(userTieId!, theUserTie)
    }
  })
  return {
    usersOfCircle,
    openSetting: state.getIn(['circle', 'openSetting', circleId], false),
    userInfo: state.getIn(['user', 'info'])

  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(CircleComponent as any) as any)
