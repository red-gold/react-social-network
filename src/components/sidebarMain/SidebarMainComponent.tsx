// - Import react components
import React, { Component } from 'react'
import { ISidebarMainComponentProps } from './ISidebarMainComponentProps'
import { ISidebarMainComponentState } from './ISidebarMainComponentState'

// - Import components

// - Import actions

// - Create component class
export default class SidebarMainComponent extends Component<ISidebarMainComponentProps,ISidebarMainComponentState> {

  static qcName = 'SidebarMain'

  /**
   * Component constructor
   *
   */
  constructor (props: ISidebarMainComponentProps) {
    super(props)

    // Default state
    this.state = {}
  }

  /**
   * Reneder component DOM
   * 
   */
  render () {
    return (
      <div className='home__main' style={this.props.cstyle} >
        <div style={{height: '80px', width: '100%'}}></div>
        {this.props.children}
        </div>
    )
  }
}
