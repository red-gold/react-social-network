// - Import react components
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Popover from '@material-ui/core/Popover';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SvgClose from '@material-ui/icons/Close';
import SvgGroup from '@material-ui/icons/GroupWork';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import UserAvatar from 'components/userAvatar';
import { push } from 'connected-react-router';
import { Circle } from 'core/domain/circles';
import { List as ImuList, Map } from 'immutable';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as circleActions from 'store/actions/circleActions';

import { ICircleComponentProps } from './ICircleComponentProps';
import { ICircleComponentState } from './ICircleComponentState';

// - Material UI
// - Import app components
// - Import API

// - Import actions
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
   *
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
   * 
   */
  render() {

    const { circle, classes, t } = this.props
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
            <MenuList role='menu'>
              <MenuItem onClick={this.handleDeleteCircle} > {t!('circle.deleteCircleButton')} </MenuItem>
              <MenuItem onClick={this.props.openCircleSettings}> {t!('circle.settingLable')} </MenuItem>
            </MenuList>
        </Popover>
      </div>

    )
    let circleName = this.props.circle.get('name')
    circleName = circleName === 'Following' ? t!('userBox.followingLabel') : circleName
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
            {t!('circle.settingLable')}
          </div>
          <div style={{ marginTop: '-9px' }}>
            <Button color='primary' disabled={this.state.disabledSave} onClick={this.handleUpdateCircle} > {t!('circle.saveButton')} </Button>
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
          <ListItemText inset primary={<span style={this.styles as any}>{circleName}</span>} />
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
              placeholder={t!('circle.circleName')}
              label={t!('circle.circleName')}
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
 */
const mapDispatchToProps = (dispatch: any, ownProps: ICircleComponentProps) => {
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
 */
const mapStateToProps = (state: Map<string, any>, ownProps: ICircleComponentProps) => {
  const userTies: Map<string, any> = state.getIn(['circle', 'userTies'])
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
    openSetting: state.getIn(['circle', 'openSetting', circleId], false)

  }
}

// - Connect component to redux store
const translateWrraper = withTranslation('translations')(CircleComponent as any)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(translateWrraper as any) as any)
