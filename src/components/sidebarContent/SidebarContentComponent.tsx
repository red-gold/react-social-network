// - Import react components
import React, { Component } from 'react'
import { ISidebarContentComponentProps } from './ISidebarContentComponentProps'
import { ISidebarContentComponentState } from './ISidebarContentComponentState'

// - Import components

// - Import actions

// - Create component class
export default class SidebarContentComponent extends Component<ISidebarContentComponentProps,ISidebarContentComponentState> {

  static qcName = 'SidebarContent'

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: ISidebarContentComponentProps) {
    super(props)

    // Default state
    this.state = {}

    // Binding function to `this`
    this.handleClickCover = this.handleClickCover.bind(this)
  }

/**
 * Handle click on cover of sidebar
 * @param  {event} evt is a click event passed to funciton
 */
  handleClickCover = (event: any) => {
    this.props.sidebar!(false,'overlay')

  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {
    let showCoverStyle = {position: 'fixed', height: '100%', width: '100%', top: '0px', left: '0px', opacity: 1, backgroundColor: 'rgba(255, 255, 255, 0.54)', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', willChange: 'opacity', transform: 'translateZ(0px)', transition: 'left 0ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', zIndex: '1111', pointerEvents: 'auto'}
    let hideCoverStyle = {position: 'fixed', height: '100%', width: '100%', top: '0px', left: '-100%', opacity: 0, backgroundColor: 'rgba(255, 255, 255, 0.54)', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', willChange: 'opacity', transform: 'translateZ(0px)', transition: 'left 0ms cubic-bezier(0.23, 1, 0.32, 1) 400ms, opacity 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', zIndex: '1111', pointerEvents: 'none'}
    return (
      <div id='sidebar-content'>
      <div style={Object.assign({},{overflow: 'hidden'},this.props.overlay ? showCoverStyle : hideCoverStyle) as any} onClick={this.handleClickCover}></div>
      <div className={this.props.className} style={this.props.cstyle}>
        {this.props.children}
      </div>
    </div>
    )
  }
}
