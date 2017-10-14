// - Import react components
import React, {Component} from 'react'

// - Import components

// - Import actions

// - Create component class
export default class SidebarMain extends Component {

  static qcName = 'SidebarMain'

  /**
 * Component constructor
 * @param  {object} props is an object properties of component
 */
  constructor(props) {
    super(props)

    // Default state
    this.state = {}
  }

  /**
 * Reneder component DOM
 * @return {react element} return the DOM which rendered by component
 */
  render() {
    return (
      <div className="home__main" style={this.props.cstyle} >
        <div style={{height:"64px", width:"100%"}}></div>
        {this.props.children}
        </div>
    )
  }
}
