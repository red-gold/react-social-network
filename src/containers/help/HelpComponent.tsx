// - Import react components
import withStyles from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import { connectHelp } from './connectHelp';
import { helpStyles } from './helpStyles';
import { IHelpProps } from './IHelpProps';
import { IHelpState } from './IHelpState';

// - Material UI
// - Import app components
// - Import API

// - Import actions
/**
 * Create component class
 */
export class HelpComponent extends Component<IHelpProps, IHelpState> {

  /**
   * Fields
   */
  iframeRef: React.RefObject<HTMLIFrameElement>

  /**
   * Component constructor
   *
   */
  constructor(props: IHelpProps) {
    super(props)
    this.iframeRef = React.createRef()

    // Defaul state
    this.state = {

    }

  }

  /**
   * Reneder component DOM
   * 
   */
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
    </div>
    )
  }
}

// - Connect component to redux store
const translateWrraper = withTranslation('translations')(HelpComponent as any)

export default withRouter<any>(connectHelp(withStyles(helpStyles as any)(translateWrraper as any) as any))
