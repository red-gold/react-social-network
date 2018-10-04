import { Component } from 'react'

/**
 * Route interface
 */
export interface IRoute {

  /**
   * React component that would be rendered in routing
   */
  component: any

  /**
   * Route path
   */
  path: string | undefined

  /**
   * If user is authorized {true} or not {false}
   */
  authed?: boolean

}
