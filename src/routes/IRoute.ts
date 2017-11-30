import { Component } from 'react'

/**
 * Route interface
 *
 * @export
 * @interface IRoute
 */
export interface IRoute {

  /**
   * React component that would be rendered in routing
   *
   * @type {Component}
   * @memberof IRoute
   */
  component: any

  /**
   * Route path
   *
   * @type {string}
   * @memberof IRoute
   */
  path: string

  /**
   * If user is authorized {true} or not {false}
   *
   * @type {boolean}
   * @memberof IRoute
   */
  authed?: boolean

}
