import { Map } from 'immutable';
import { Component } from 'react';
import { connect } from 'react-redux';

import { IFunProps } from './IFunProps';

// - Import actions
/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IFunProps) => {
  return {
  }
}

const makeMapStateToProps = () => {

  const mapStateToProps = (state: Map<string, any>, ownProps: IFunProps) => {
    return {
      
    }
  }
  return mapStateToProps
}

export const connectFun =
  (component: Component<IFunProps>) => connect(makeMapStateToProps, mapDispatchToProps)(component as any)