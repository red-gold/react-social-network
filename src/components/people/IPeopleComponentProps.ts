export interface IPeopleComponentProps {

  /**
   * Router match
   *
   * @type {*}
   * @memberof IPeopleComponentProps
   */
  match?: any

  /**
   * Circles loaded {true} or not {false}
   *
   * @type {boolean}
   * @memberof IPeopleComponentProps
   */
  circlesLoaded?: boolean

  /**
   * Rediret to another route
   *
   * @memberof IPeopleComponentProps
   */
  goTo?: (url: string) => any

  /**
   * Set title of top bar
   *
   * @memberof IPeopleComponentProps
   */
  setHeaderTitle?: (title: string) => any

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any
}
