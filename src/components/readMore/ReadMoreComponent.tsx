import Collapse from '@material-ui/core/Collapse';
import withStyles from '@material-ui/core/styles/withStyles';
import StringAPI from 'api/StringAPI';
import classNames from 'classnames';
import { IReadMoreProps } from 'components/readMore/IReadMoreProps';
import { IReadMoreState } from 'components/readMore/IReadMoreState';
import React, { Component } from 'react';

import { readMoreStyles } from './readMoreStyles';

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
      lines,
      classes,
      body
    } = this.props

    const {
      expanded,
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

export default withStyles(readMoreStyles as any)(ReadMoreComponent as any)