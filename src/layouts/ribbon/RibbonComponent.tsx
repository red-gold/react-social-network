// - Import react components
import React, { Component } from 'react'
import classNames from 'classnames'

// - Material-UI
import { withStyles } from '@material-ui/core/styles'
import Extension from '@material-ui/icons/Extension'

import { IRibbonComponentProps } from './IRibbonComponentProps'
import { IRibbonComponentState } from './IRibbonComponentState'
import { ribbonStyles } from './ribbonStyles'

/**
 * Create component class
 */
export class RibbonComponent extends Component<IRibbonComponentProps, IRibbonComponentState> {

  /**
   * Component constructor
   */
  constructor(props: IRibbonComponentProps) {
    super(props)

    // Defaul state
    this.state = {
    }
    // Binding functions to `this`

  }

  /**
   * Get icon
   */
  getIcon() {
    const { icon, classes } = this.props
    if (icon) {
      const iconProps = icon.props.className ? classNames(classes.icon, icon.props.className) : classNames(classes.icon)
      const newIcon = React.cloneElement(icon, {...icon.props, className: iconProps})
      return newIcon
    }
  }

  /**
   * Reneder component DOM
   */
  render() {

    const { classes, small, icon, className, label } = this.props
    return (
      <span className={classNames(small ? classes.smallRibbon : classes.ribbon, className)}>
        {' '}
        {this.getIcon()}
        <span className={small ? classes.smallLabel : classes.label}>{label}</span>
      </span>
    )
  }
}

// - Connect component to redux store
export default withStyles(ribbonStyles as any)(RibbonComponent as any) as typeof RibbonComponent
