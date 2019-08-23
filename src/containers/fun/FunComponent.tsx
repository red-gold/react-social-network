// - Import react components
import withStyles from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import { connectFun } from './connectFun';
import { funStyles } from './funStyles';
import { IFunProps } from './IFunProps';
import { IFunState } from './IFunState';

// - Material UI
// - Import app components
// - Import API

// - Import actions
/**
 * Create component class
 */
export class HelpComponent extends Component<IFunProps, IFunState> {

  /**
   * Fields
   */
  iframeRef: React.RefObject<HTMLIFrameElement>

  /**
   * Component constructor
   *
   */
  constructor(props: IFunProps) {
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
    const {  classes } = this.props
    return (
      <div className={classes.root}>
    </div>
    )
  }
}

// - Connect component to redux store
const translateWrapper = withTranslation('translations')(HelpComponent as any)

export default withRouter<any, any>(connectFun(withStyles(funStyles as any)(translateWrapper as any) as any))
