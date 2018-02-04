// - Import react components
import React, { Component } from 'react'
import { teal } from 'material-ui/colors'
import { CircularProgress } from 'material-ui/Progress'

/**
 * Create component class
 */
export default class LoadMoreProgressComponent extends Component<{},{}> {

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {
    return (
      <div key='load-more-progress' className='g-load-more'><CircularProgress size={30} thickness={5} style={{color: teal['A400'] }} /></div>
    )
  }
}
