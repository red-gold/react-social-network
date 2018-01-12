// - Import react components
import React, { Component } from 'react'
import { grey400, grey800, darkBlack, lightBlack,tealA400 } from 'material-ui/styles/colors'
import CircularProgress from 'material-ui/CircularProgress'

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
      <div className='g-load-more'><CircularProgress size={30} thickness={5} color={tealA400} /></div>
    )
  }
}
