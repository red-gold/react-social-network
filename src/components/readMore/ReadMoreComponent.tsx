import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IReadMoreProps } from 'components/readMore/IReadMoreProps'
import { IReadMoreState } from 'components/readMore/IReadMoreState'
import classNames from 'classnames'
import withStyles from '@material-ui/core/styles/withStyles'
import { readMoreStyles } from './readMoreStyles'

import Collapse from '@material-ui/core/Collapse'
import StringAPI from 'api/StringAPI'

class ReadMoreComponent extends Component<IReadMoreProps, IReadMoreState> {

  public static defaultProps: Partial<IReadMoreProps> = {
    lines: 3,
    more: 'Read more',
    less: 'Show less'
  }

  constructor(props: IReadMoreProps) {
    super(props)

    this.state = {
      expanded: false,
      truncated: false
    }

    this.toggleLines = this.toggleLines.bind(this)
  }

  toggleLines(event: any) {
    event.preventDefault()

    this.setState({
      expanded: !this.state.expanded
    })
  }

  render() {
    const {
      children,
      more,
      less,
      lines,
      classes,
      body
    } = this.props

    const {
      expanded,
      truncated
    } = this.state

    const readMoreElem = (
      <div onClick={this.toggleLines} className={classNames(classes.root, { [classes.expanded]: !expanded })}>
        <Collapse in={expanded} collapsedHeight='173px'>
          {children}
        </Collapse>
      </div>
    )
    const numberOfLines = !StringAPI.isEmpty(body) ? StringAPI.getNumberOfLines(body) : 0
    if (numberOfLines > lines!) {
      return readMoreElem
    }
    return (
           children
        )
  }
}

export default withStyles(readMoreStyles as any)(ReadMoreComponent as any) as typeof ReadMoreComponent