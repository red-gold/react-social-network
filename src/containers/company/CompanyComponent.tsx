// - Import react components
import withStyles from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import { companyStyles } from './companyStyles';
import { connectCompany } from './connectCompany';
import { ICompanyProps } from './ICompanyProps';
import { ICompanyState } from './ICompanyState';

// - Material UI
// - Import app components
// - Import API

// - Import actions
/**
 * Create component class
 */
export class CompanyComponent extends Component<ICompanyProps, ICompanyState> {

  /**
   * Fields
   */
  iframeRef: React.RefObject<HTMLIFrameElement>
  
  /**
   * Component constructor
   *
   */
  constructor(props: ICompanyProps) {
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
const translateWrapper = withTranslation('translations')(CompanyComponent as any)
export default withRouter<any, any>(connectCompany(withStyles(companyStyles as any)(translateWrapper as any) as any))
