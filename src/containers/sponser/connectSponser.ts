import { Map } from 'immutable';
import { Component } from 'react';
import { connect } from 'react-redux';

import { ISponserProps } from './ISponserProps';

// - Import actions
/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: ISponserProps) => {
  return {
  }
}

const makeMapStateToProps = () => {
  const mapStateToProps = (state: Map<string, any>) => {
    return {
      
    }
  }
  return mapStateToProps
}

export const connectSponser =
  (component: Component<ISponserProps>) => connect(makeMapStateToProps, mapDispatchToProps)(component as any)