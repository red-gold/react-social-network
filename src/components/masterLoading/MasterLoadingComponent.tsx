// - Import react components
import React, { Component } from 'react'
import { CircularProgress } from 'material-ui/Progress'
import Dialog from 'material-ui/Dialog'
import { IMasterLoadingComponentProps } from './IMasterLoadingComponentProps'
import { IMasterLoadingComponentState } from './IMasterLoadingComponentState'

// - Import app components

// - Create MasterLoading component class
export default class MasterLoadingComponent extends Component<IMasterLoadingComponentProps, IMasterLoadingComponentState> {

  // Constructor
  constructor (props: IMasterLoadingComponentProps) {
    super(props)
    // Binding functions to `this`

  }

  // Render app DOM component
  render () {
    const {activeLoading} = this.props
    return (

      <div className='mLoading__loading' style={{ display: (activeLoading ? 'flex' : 'none') }}>
         <CircularProgress
        color='secondary'
        size={50}
        mode='determinate'
        value={25}
        min={0}
        max={50}
      />
      </div>

    )
  }

}
