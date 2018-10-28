// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Map } from 'immutable'
import config from 'src/config'
import { translate, Trans } from 'react-i18next'

// - Material UI
import Button from '@material-ui/core/Button'
import { grey } from '@material-ui/core/colors'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import BackIcon from '@material-ui/icons/ArrowBack'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'
import Typography from '@material-ui/core/Typography'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

// - Import app components

// - Import API
import StringAPI from 'api/StringAPI'

// - Import actions
import { IUserPermissionProps } from './IUserPermissionProps'
import { IUserPermissionState } from './IUserPermissionState'
import { userPermissionStyles } from 'components/userPermission/userPermissionStyles'
import { UserPermissionType } from 'core/domain/common/userPermissionType'
import { circleSelector } from 'store/reducers/circles/circleSelector'
import { authorizeSelector } from 'store/reducers/authorize'

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
    const { onAddAccessList, onClose, followingIds, currentUser } = this.props
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
    const { t } = this.props
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
    const { disabledOk, selectedValue } = this.state
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
          <FormControl component='fieldset' required className={classes.formControl}>
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
  const mapStateToProps = (state: Map<string, any>, ownProps: IUserPermissionProps) => {
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
const translateWrraper = translate('translations')(UserPermissionComponent as any)

export default connect(makeMapStateToProps, mapDispatchToProps)(withStyles(userPermissionStyles as any)(translateWrraper as any) as any)
