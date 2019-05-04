// - Import react components
import withStyles from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import { connectSponser } from './connectSponser';
import { ISponserProps } from './ISponserProps';
import { ISponserState } from './ISponserState';
import { sponserStyles } from './sponserStyles';

// - Material UI
// - Import app components
// - Import API

// - Import actions
/**
 * Create component class
 */
export class SponserComponent extends Component<ISponserProps, ISponserState> {

  /**
   * Fields
   */
  iframeRef: React.RefObject<HTMLIFrameElement>

  /**
   * Component constructor
   *
   */
  constructor(props: ISponserProps) {
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
const translateWrraper = withTranslation('translations')(SponserComponent as any)

export default withRouter<any>(connectSponser(withStyles(sponserStyles as any)(translateWrraper as any) as any))
