// - Import react components
import React, { Component } from 'react'

// - Material-UI
import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import {circleActivityStyles} from './circleActivityStyles'
import CircularProgress from '@material-ui/core/CircularProgress'

import { ICircleActivityComponentProps } from './ICircleActivityComponentProps'
import { ICircleActivityComponentState } from './ICircleActivityComponentState'

/**
 * Create component class
 */
export class CircleActivityComponent extends Component<ICircleActivityComponentProps, ICircleActivityComponentState> {

  /**
   * Component constructor
   */
  constructor(props: ICircleActivityComponentProps) {
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

      const { classes, value, percent, title, guideline } = this.props
        return (
          <div>
          <div className={classes.progressContainer}>
              <CircularProgress
                  className={classes.progress}
                  variant='static'
                  value={100}
                  size={120}
                  thickness={3}
                  classes={{ circle: classes.circle }} />
              <CircularProgress
                  className={classes.progress}
                  variant='static'
                  value={value}
                  size={120}
                  thickness={3}
              />
              <div className={classes.textProgress}>
                  <Typography
                      variant='h5'
                      color='secondary'>{percent}</Typography>
                  <Typography
                      variant='caption'
                      color='secondary'>{title}</Typography>
              </div>
          </div>
          <Typography
              variant='caption'
              className={classes.guideline}>
              {guideline}
          </Typography>
      </div>
    )
  }
}

// - Connect component to redux store
export default withStyles(circleActivityStyles as any)(CircleActivityComponent as any) as typeof CircleActivityComponent
