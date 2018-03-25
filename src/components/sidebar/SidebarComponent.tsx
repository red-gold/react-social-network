// - Import react components
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import EventListener, { withOptions } from 'react-event-listener'
import keycode from 'keycode'

// - Import app components

// - Import API

// - Import actions
import * as authorizeActions from 'store/actions/authorizeActions'
import * as globalActions from 'store/actions/globalActions'
import { ISidebarComponentProps } from './ISidebarComponentProps'
import { ISidebarComponentState } from './ISidebarComponentState'

// - Feilds
const color: string = 'teal'
const colorKey: string = 'blue'
const sizeCondition = (width: number) => (width >= 750)

// - Create Sidebar component class
export class SidebarComponent extends Component<ISidebarComponentProps,ISidebarComponentState> {

  /**
   * Component constructor
   * @param  {ISidebarComponentProps} props is an object properties of component
   */
  constructor (props: ISidebarComponentProps) {
    super(props)

    // Binding functions to `this`
    this.open = this.open.bind(this)
    this.getChildren = this.getChildren.bind(this)

    // Default state
    this.state = {
      sidebarClass: '',
      overlay: false,
      mainStyle: { marginLeft: '210px' },
      // Is sidebar open or not
      open: true,
      // If sidebar is closed by resizing or not
      auto: false,
      // If overlay should be open or not
      overlayOpen: false,
      // If side bar should be closed
      shouldBeClosed: false

    }

  }

  /**
   * Handle open sidebar
   * @param  {boolean} status if is true, sidebar will be open
   * @param  {string} source is the element that fired the function
   */
  open = (status: boolean, source: string) => {

    const width = window.innerWidth

    if (status) {
      // Sidebar style when it's open
      const openStyle = {
        width: '210px',
        transform: 'translate(0px, 0px)',
        transition: 'transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
      }
      this.setState({
        open: true,
        mainStyle: { marginLeft: '210px' },
        sidebarStyle: openStyle,
        sidebarClass: (sizeCondition(width)) ? 'sidebar  sidebar__large' : 'sidebar  sidebar__over',
        overlay: (sizeCondition(width)) ? false : true

      })

      if (sizeCondition(width)) {
        this.setState({
          auto: false,
          shouldBeClosed: false
        })

      } else {
        this.setState({
          overlayOpen: true
        })
      }

      /**
       * Callback function fired to determine sidebar and overlay sidebar status
       * @param {boolean} if true, the sidebar is open
       */
      this.props.status(true)

    } else { // If it's false sidebar should be closed
      // Sidebar style when it's closed
      const closeStyle = {
        transform: 'translate(-100%, 0px)',
        transition: 'transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
      }
      this.setState({
        open: false,
        mainStyle: { marginLeft: '0px' },
        sidebarStyle: closeStyle,
        sidebarClass: (sizeCondition(width)) ? 'sidebar  sidebar__large'
          : ((source === 'auto') ? 'sidebar ' : 'sidebar  sidebar__over'),
        overlay: false

      })

      switch (source) {
        case 'auto':
          this.setState({
            auto: true
          })
          break
        case 'overlay':
          this.setState({
            shouldBeClosed: true
          })
          break
        default:

      }

      if (sizeCondition(width)) {
        // TODO: Get ride of this
      } else {
        this.setState({
          overlayOpen: false
        })
      }

      /**
       * Callback function fired to determine sidebar and overlay sidebar status
       * @param {boolean} if true, the sidebar is open
       */
      this.props.status(false)

    }
    this.props.overlay(!(sizeCondition(width)) && this.state.open ? true : false)
  }

  /**
   * Handle resize event for window to change sidebar status
   * @param  {event} evt is the event is passed by winodw resize event
   */
  handleResize = () => {

    // Set initial state
    let width = window.innerWidth

    if (sizeCondition(width)) {

      this.setState({
        sidebarClass: 'sidebar  sidebar__large',
        overlay: false,
        overlayOpen: false
      })

      this.props.overlay(false)
      if (this.state.auto && !this.state.shouldBeClosed) {
        this.open(true,'large')
        this.setState({ auto: false })
      }
    } else {
      if (!this.state.overlayOpen) {
        if (!this.state.auto && this.state.open) {
          this.open(false, 'auto')

        } else {
          this.setState({
            overlayOpen: true,
            overlay: this.state.open
          })
        }
      } else {
        this.setState({ sidebarClass: 'sidebar  sidebar__over', overlay: this.state.open })
        this.props.overlay(this.state.open!)
      }

    }
  }

  /**
   * Handle keyup event for window to close sidebar
   * @param  {event} evt is the event is passed by winodw key event
   */
  handleKeyUp = (event: Event) => {
    if (this.state.overlayOpen) {
      if (this.state.open && keycode(event) === 'esc') {
        this.open(false,'keyup')
      }
    }
  }

  componentWillMount () {
    this.props.open(this.open)
  }

  getChildren = () => {
    return React.Children.map(this.props.children, (childe: any) => {
      if (childe.type.qcName === 'SidebarContent') {
        const sideBarContent = React.cloneElement(childe, {
          className: this.state.sidebarClass,
          cstyle: this.state.sidebarStyle,
          sidebar: this.open,
          overlay: this.state.overlay
        })
        return sideBarContent
      } else if (childe.type.qcName === 'SidebarMain') {
        return React.cloneElement(childe, { cstyle: this.state.mainStyle })
      }

    })

  }

  componentDidMount () {
    this.handleResize()
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render () {

    return (
      <div id='sidebar'>
        <EventListener
          target='window'
          onResize={this.handleResize}
          onKeyUp={this.handleKeyUp}
        />
        {this.getChildren()}

      </div>

    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: any, ownProps: ISidebarComponentProps) => {
  return {
    logout: () => dispatch(authorizeActions.dbLogout())
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: ISidebarComponentProps) => {
  return {
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(SidebarComponent as any)
