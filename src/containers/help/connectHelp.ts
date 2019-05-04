import { Map } from 'immutable';
import { Component } from 'react';
import { connect } from 'react-redux';

import { IHelpProps } from './IHelpProps';

// - Import actions
/**
 * Map dispatch to props
 */
const mapDispatchToProps = (dispatch: any, ownProps: IHelpProps) => {
  return {
  }
}

const makeMapStateToProps = () => {

  const mapStateToProps = (state: Map<string, any>, ownProps: IHelpProps) => {
    return {
      
    }
  }
  return mapStateToProps
}

export const connectHelp =
  (component: Component<IHelpProps>) => connect(makeMapStateToProps, mapDispatchToProps)(component as any)