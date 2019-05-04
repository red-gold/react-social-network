// - Import react components
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import FollowDialogComponent from 'components/followDialog';
import UserAvatar from 'components/userAvatar';
import { push } from 'connected-react-router';
import { User } from 'core/domain/users';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { userSelector } from 'store/reducers/users/userSelector';

import { IUserBoxComponentProps } from './IUserBoxComponentProps';
import { IUserBoxComponentState } from './IUserBoxComponentState';

// - Material UI
// - Import app components
// - Import API
// - Import actions
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
            <FollowDialogComponent userId={userId} user={user && user.toJS() as User}/>
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


  const userBox = userSelector.getUserProfileById(state, { userId: ownProps.userId }).toJS() as User
  return {
    
    avatar: userBox.avatar || '',
    fullName: userBox.fullName || ''
  }
}

// - Connect component to redux store
const translateWrraper = withTranslation('translations')(UserBoxComponent as any)

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(translateWrraper as any))
