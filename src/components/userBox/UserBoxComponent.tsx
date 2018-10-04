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

import { IUserBoxComponentProps } from './IUserBoxComponentProps'
import { IUserBoxComponentState } from './IUserBoxComponentState'
import { User } from 'core/domain/users'
import { UserTie, Circle } from 'core/domain/circles'
import { ServerRequestType } from 'constants/serverRequestType'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'
import { ServerRequestModel } from 'models/server'
import { userSelector } from 'store/reducers/users/userSelector'
import FollowDialogComponent from 'components/followDialog'

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
   *
   */
  constructor(props: IUserBoxComponentProps) {
    super(props)
    const { userId } = this.props
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

  }

  /**
   * Reneder component DOM
   * 
   */
  render() {
    const {
      userId,
      classes,
      t,
      user
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
            <FollowDialogComponent userId={userId} user={user && user.toJS()}/>
          </div>
        </div>
      </Paper>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: Function, ownProps: IUserBoxComponentProps) => {
  return {
    goTo: (url: string) => dispatch(push(url))

  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IUserBoxComponentProps) => {

  const uid = state.getIn(['authorize', 'uid'])
  const request = state.getIn(['server', 'request'])

  const userBox = userSelector.getUserProfileById(state, { userId: ownProps.userId }).toJS()
  return {
    
    avatar: userBox.avatar || '',
    fullName: userBox.fullName || ''
  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(UserBoxComponent)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(translateWrraper as any) as any)
