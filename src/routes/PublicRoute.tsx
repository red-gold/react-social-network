import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { IRoute } from './IRoute'

export class PublicRoute extends Component<IRoute, any> {

  render () {
    const {authed, path, component} = this.props
    return (
    <Route path={path} render={() => {
      return (
          authed
            ? <Redirect to='/' />
            : (() => component)()
      )
    }} />
    )
  }
}

const mapStateToProps = (state: any, nexProps: IRoute) => {
  const { authorize } = state
  return {
    authed: authorize.authed
  }
}

export default connect(mapStateToProps)(PublicRoute as any)
