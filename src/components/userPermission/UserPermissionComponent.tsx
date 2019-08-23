// - Import react components
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BackIcon from '@material-ui/icons/ArrowBack';
import { userPermissionStyles } from 'components/userPermission/userPermissionStyles';
import { UserPermissionType } from 'core/domain/common/userPermissionType';
import { Map } from 'immutable';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { authorizeSelector } from 'store/reducers/authorize';
import { circleSelector } from 'store/reducers/circles/circleSelector';

import { IUserPermissionProps } from './IUserPermissionProps';
import { IUserPermissionState } from './IUserPermissionState';

// - Material UI
// - Import app components

// - Import API
// - Import actions
/**
 * React component class
 */
export class UserPermissionComponent extends Component<IUserPermissionProps, IUserPermissionState> {

  /**
   * Component constructor
   *
   */
  constructor(props: IUserPermissionProps) {
    super(props)
    const { access } = props
    // Defaul state
    this.state = {
      selectedValue: access,
      disabledOk: true

    }

    // Binding functions to `this`

  }

  /**
   * Handle add link
   */
  handleSetPermission = (selectedValue: UserPermissionType) => {
    const { onAddAccessList, followingIds, currentUser } = this.props
    let accessList: string[] = []
    if (selectedValue === UserPermissionType.Circles && followingIds && currentUser && currentUser.userId) {
      accessList = followingIds
      accessList.push(currentUser.userId)
    }
    onAddAccessList(accessList, selectedValue)
  }

  /**
   * Handle data on input change
   */
  handleInputChange = (event: any) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  /**
   * Reneder component DOM
   */
  render() {

    const { classes, t, open, onClose } = this.props
    const { selectedValue } = this.state
    return (
      <Dialog
        PaperProps={{ className: classes.fullPageXs }}
        open={open}
        onClose={onClose}
        maxWidth='md'
      >
        <DialogActions className={classes.dialogAction}>
          <Typography variant={'h6'} component={'div'} className={classes.galleryDialogTitle}>
            <IconButton className={classes.header} onClick={onClose}>
              <BackIcon />
            </IconButton>
            {t!('permission.titleLabel')}
          </Typography>
        </DialogActions>
        <DialogContent className={classes.dialogContent}>
          <FormControl component='div' required className={classes.formControl}>
            <RadioGroup
              aria-label='selectedValue'
              name='selectedValue'
              className={classes.group}
              value={selectedValue}
              onChange={this.handleInputChange}
            >
              <FormControlLabel
                className={classes.permissionItem}
                onClick={() => this.handleSetPermission(UserPermissionType.OnlyMe)}
                value={UserPermissionType.OnlyMe}
                control={<Radio />}
                label={t!('permission.onlyMe')} />

              <FormControlLabel
                className={classes.permissionItem}
                onClick={() => this.handleSetPermission(UserPermissionType.Public)}
                value={UserPermissionType.Public} control={<Radio />}
                label={t!('permission.public')} />

              <FormControlLabel
                className={classes.permissionItem}
                onClick={() => this.handleSetPermission(UserPermissionType.Circles)}
                value={UserPermissionType.Circles}
                control={<Radio />}
                label={t!('permission.circles')} />

              <FormControlLabel
                className={classes.permissionItem}
                value={UserPermissionType.Custom}
                disabled
                control={<Radio />}
                label={t!('permission.custom')}
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>

      </Dialog >
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IUserPermissionProps) => {
  return {

  }
}
/**
 * Make map state to props
 */
const makeMapStateToProps = () => {
  const selectFollowingIds = circleSelector.selectFollowingIds()
  const selectCurrentUser = authorizeSelector.selectCurrentUser()
  const mapStateToProps = (state: Map<string, any>) => {
    const followingIds = selectFollowingIds(state)
    const currentUser = selectCurrentUser(state).toJS()
    return {
      
      followingIds,
      currentUser
    }
  }
  return mapStateToProps
}

// - Connect component to redux store
const translateWrapper = withTranslation('translations')(UserPermissionComponent as any)

export default connect(makeMapStateToProps, mapDispatchToProps)(withStyles(userPermissionStyles as any)(translateWrapper as any) as any)
