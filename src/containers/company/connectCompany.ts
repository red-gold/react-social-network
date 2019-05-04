import { Map } from 'immutable';
import { Component } from 'react';
import { connect } from 'react-redux';

import { ICompanyProps } from './ICompanyProps';

// - Import actions
/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: ICompanyProps) => {
  return {
  }
}

const makeMapStateToProps = () => {

  const mapStateToProps = (state: Map<string, any>, ownProps: ICompanyProps) => {
    return {
      
    }
  }
  return mapStateToProps
}

export const connectCompany =
  (component: Component<ICompanyProps>) => connect(makeMapStateToProps, mapDispatchToProps)(component as any)