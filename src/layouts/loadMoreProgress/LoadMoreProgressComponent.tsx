// - Import react components
import { withTheme } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { Component } from 'react';

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

export default withTheme(LoadMoreProgressComponent)
