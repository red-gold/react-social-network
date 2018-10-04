// - Import react components
import React, { Component } from 'react'
import classNames from 'classnames'

// - Material UI
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import DoneIcon from '@material-ui/icons/Done'
import Slide from '@material-ui/core/Slide'
import Table from '@material-ui/core/Table/Table'
import TableBody from '@material-ui/core/TableBody/TableBody'
import TableCell from '@material-ui/core/TableCell/TableCell'
import TableHead from '@material-ui/core/TableHead/TableHead'
import TableRow from '@material-ui/core/TableRow/TableRow'

import { timelineStyles } from './timelineStyles'
import { ITimelineComponentProps } from './ITimelineComponentProps'
import { ITimelineComponentState } from './ITimelineComponentState'

function Transition(props: any) {
  return <Slide direction='up' {...props} />
}

/**
 * Create component class
 */
export class TimelineComponent extends Component<ITimelineComponentProps, ITimelineComponentState> {

  /**
   * Component constructor
   */
  constructor(props: ITimelineComponentProps) {
    super(props)

    // Defaul state

    this.state = {
      open: false,
    }

    // Binding functions to `this`

  }

  /**
   * Reneder component DOM
   */
  render() {
    const { classes, title, onClose, open } = this.props
        let id = 0
        function createData(rep: number, status: string, info: string, isActive: boolean) {
            id += 1
            return { id, rep, status, info, isActive }
        }

        const data = [
            createData(50, 'Trusted User', 'Creat more vote per day ', false),
            createData(15, 'Verified User', 'Able to vote', false),
            createData(5, 'Approved User', 'Creat more analysis', false),
            createData(1, 'Read Only', 'View a certain of polis result', true),
        ]
    return (
      <Dialog
      fullScreen
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
      >

        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color='inherit' onClick={onClose} aria-label='Close'>
              <VpnKeyIcon />
            </IconButton>
            <Typography variant='title' color='inherit' className={classes.flex}>
              {title}
            </Typography>
            <IconButton color='inherit' onClick={onClose} aria-label='Close'>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Typography variant='body2' color='inherit' className={classes.description}>
        Privileges manage your accessibility on features and what you can do on Poll Social . Following privileges guidline gaining more reputation and privileges.
            </Typography>
        <Table classes={{
                    root: this.props.classes.table}}>
                    <TableBody>
                        {data.map(item => {
                            return (
                                <TableRow className={classes.row} key={item.id}>
                                     <TableCell className={classes.cell} numeric>{item.isActive ? <DoneIcon className={classes.doneIcon}/> : null}</TableCell>
                                    <TableCell className={classNames(classes.cell, { [classes.notactiveColor]: !item.isActive }, { [classes.activeColor]: item.isActive })}>{item.rep}</TableCell>
                                    <TableCell className={classNames(classes.cell, { [classes.notactiveColor]: !item.isActive }, { [classes.activeColor]: item.isActive })}>{item.status}</TableCell>
                                    <TableCell className={classNames(classes.cell, { [classes.notactiveColor]: !item.isActive }, { [classes.activeColor]: item.isActive })}>{item.info}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
      </Dialog>

    )
  }
}

// - Connect component to redux store
export default withStyles(timelineStyles as any)(TimelineComponent as any) as typeof TimelineComponent
