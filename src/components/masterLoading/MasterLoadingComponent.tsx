// - Import react components
import React, { Component } from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import Dialog from 'material-ui/Dialog'
import RefreshIndicator from 'material-ui/RefreshIndicator'
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
        <RefreshIndicator
          size={50}
          left={70}
          top={0}
          status='loading'
        />
      </div>



    )
  }

}
