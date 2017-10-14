// - Import react components
import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'

// - Import API
import * as AuthAPI from 'AuthAPI'


export var PrivateRoute = ({component: Component, ...rest}) => {
  console.log('is auth ; ', AuthAPI.isAuthorized());
  return (
    <Route
      {...rest}
      render={(props) => AuthAPI.isAuthorized()
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

export var PublicRoute = ({component: Component,...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => !(AuthRouterAPI.isAuthorized())
        ? <Component {...props} />
        : <Redirect to='/' />}
    />
  )
}
