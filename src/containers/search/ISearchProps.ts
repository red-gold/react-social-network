export interface ISearchProps {

  /**
   * Router match
   */
  match?: any

  /**
   * Router location
   */
  location?: any

  /**
   * Tab name
   */
  tab: string

  /**
   * Styles
   */
  classes?: any

  /**
   * Rediret to another route
   */
  goTo?: (url: string) => any

  /**
   * Set title of top bar
   */
  setHeaderTitle?: (title: string) => any

  /**
   * Translate to locale string
   */
  t?: (state: any) => any
}
