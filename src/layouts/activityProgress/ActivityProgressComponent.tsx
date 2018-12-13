// - Import react components
import React, { Component } from 'react'

// - Material-UI
import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import {activityProgressStyles} from './activityProgressStyles'

import { IActivityProgressComponentProps } from './IActivityProgressComponentProps'
import { IActivityProgressComponentState } from './IActivityProgressComponentState'

/**
 * Create component class
 */
export class ActivityProgressComponent extends Component<IActivityProgressComponentProps, IActivityProgressComponentState> {

  /**
   * Component constructor
   */
  constructor(props: IActivityProgressComponentProps) {
    super(props)

    // Defaul state
    this.state = {
    }

    // Binding functions to `this`

  }

  /**
   * Reneder component DOM
   */
  render() {

      const { classes, caption, value } = this.props
        return (
            <div className={classes.progressLineContainer}>
                <Typography
                    variant='caption'
                    className={classes.progressLineText}>
                    {caption}
                </Typography>
                <LinearProgress
                    variant='determinate'
                    className={classes.progressLine}
                    value={value}/>
            </div>
    )
  }
}

// - Connect component to redux store
export default withStyles(activityProgressStyles as any)(ActivityProgressComponent as any)
