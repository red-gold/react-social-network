// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {Map} from 'immutable'
import { translate, Trans } from 'react-i18next'

// - Material-UI
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'

// - Import app components
import {bountiesDialogStyles} from './bountiesDialogStyles'

// - Import API

// - Import actions
import * as globalActions from 'store/actions/globalActions'

import { IBountiesDialogComponentProps } from './IBountiesDialogComponentProps'
import { IBountiesDialogComponentState } from './IBountiesDialogComponentState'
import BountyBox from 'components/bountyBox'
import classNames from 'classnames'
import Button from '@material-ui/core/Button/Button'
import Grid from '@material-ui/core/Grid/Grid'
import Paper from '@material-ui/core/Paper/Paper'
import Dialog from '@material-ui/core/Dialog/Dialog'
import AppBar from '@material-ui/core/AppBar/AppBar'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import IconButton from '@material-ui/core/IconButton/IconButton'
import Typography from '@material-ui/core/Typography/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

const image1 = 'https://i.stack.imgur.com/rp3Cv.png'
const image2 = 'https://i.stack.imgur.com/EN0AX.png'
const image3 = 'https://i.stack.imgur.com/SqKnG.png'

/**
 * Create component class
 */
export class BountiesDialogComponent extends Component<IBountiesDialogComponentProps,IBountiesDialogComponentState> {

  /**
   * Component constructor
   */
  constructor (props: IBountiesDialogComponentProps) {
        super(props)
        this.state = {
            completed: 50,
            open: false,
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    Transition = (props: any) => {
        return <Slide direction='up' {...props} />
    }

  /**
   * Reneder component DOM
   */
  render () {

    const { setHeaderTitle, t, classes, text} = this.props
    return (
        <div>
                <Button
                    onClick={this.handleClickOpen}
                    classes={{ root: classes.buttonBounties }}>{text}</Button>
                <Dialog
                    maxWidth={'md'}
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={this.Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color='inherit' onClick={this.handleClose} aria-label='Close' className={classes.iconClose}>
                                <CloseIcon />
                            </IconButton>
                            <Typography variant='h6' color='inherit' className={classNames(classes.flex, classes.dialogTitle)}>
                                All Your Bounties
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Grid container spacing={8} justify={'center'} className={classes.gridContainer} >
                        <BountyBox
                            value={20}
                            caption={'Cinema Ticket 10/50'}
                            text={'Visit the site each day for 100 consecutive days (Days are counted in UTC'}
                            image={image1}
                            subheader={'Cooperation'} />
                        <BountyBox
                            value={70}
                            caption={'Voucher $100 14/20'}
                            text={'Take part in at least 100 surveys of company'}
                            image={image2}
                            subheader={'Joint Stock Company'} />
                        <BountyBox
                            value={40}
                            caption={'A trip to Asia 32/80'}
                            text={'Have bills with total amount of $5000'}
                            image={image3}
                            subheader={'Limited Company'} />
                            <BountyBox
                            value={20}
                            caption={'Cinema Ticket 10/50'}
                            text={'Visit the site each day for 100 consecutive days (Days are counted in UTC'}
                            image={image1}
                            subheader={'Cooperation'} />
                        <BountyBox
                            value={70}
                            caption={'Voucher $100 14/20'}
                            text={'Take part in at least 100 surveys of company'}
                            image={image2}
                            subheader={'Joint Stock Company'} />
                        <BountyBox
                            value={40}
                            caption={'A trip to Asia 32/80'}
                            text={'Have bills with total amount of $5000'}
                            image={image3}
                            subheader={'Limited Company'} />
                            <BountyBox
                            value={20}
                            caption={'Cinema Ticket 10/50'}
                            text={'Visit the site each day for 100 consecutive days (Days are counted in UTC'}
                            image={image1}
                            subheader={'Cooperation'} />
                        <BountyBox
                            value={70}
                            caption={'Voucher $100 14/20'}
                            text={'Take part in at least 100 surveys of company'}
                            image={image2}
                            subheader={'Joint Stock Company'} />
                        <BountyBox
                            value={40}
                            caption={'A trip to Asia 32/80'}
                            text={'Have bills with total amount of $5000'}
                            image={image3}
                            subheader={'Limited Company'} />
                            <BountyBox
                            value={20}
                            caption={'Cinema Ticket 10/50'}
                            text={'Visit the site each day for 100 consecutive days (Days are counted in UTC'}
                            image={image1}
                            subheader={'Cooperation'} />
                        <BountyBox
                            value={70}
                            caption={'Voucher $100 14/20'}
                            text={'Take part in at least 100 surveys of company'}
                            image={image2}
                            subheader={'Joint Stock Company'} />
                        <BountyBox
                            value={40}
                            caption={'A trip to Asia 32/80'}
                            text={'Have bills with total amount of $5000'}
                            image={image3}
                            subheader={'Limited Company'} />
                    </Grid>
                </Dialog>
            </div>
    )
  }
}

/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IBountiesDialogComponentProps) => {

  return {
    setHeaderTitle : (title: string) => dispatch(globalActions.setHeaderTitle(title))

  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IBountiesDialogComponentProps) => {

  return {

  }
}

// - Connect component to redux store
const translateWrraper = translate('translations')(BountiesDialogComponent as any)

export default withRouter<any>(connect<any>(mapStateToProps, mapDispatchToProps)
(withStyles(bountiesDialogStyles as any)(translateWrraper as any))) as typeof BountiesDialogComponent
