// - Import react components
import React, { Component } from 'react'
import { teal } from '@material-ui/core/colors'
import CircularProgress from '@material-ui/core/CircularProgress'
import config from 'src/config'
import { withTheme } from '@material-ui/core'

/**
 * Create component class
 */
export class LoadMoreProgressComponent extends Component<any,{}> {

  /**
   * Reneder component DOM
   * 
   */
  render () {
    const {theme} = this.props
    return (
      <div key='load-more-progress' className='g-load-more'><CircularProgress size={30} thickness={5} style={{color: theme.palette.primary.light}} /></div>
    )
  }
}

export default withTheme()(LoadMoreProgressComponent)
