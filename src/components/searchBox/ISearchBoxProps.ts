import StringAPI from 'api/StringAPI'
export interface ISearchBoxProps {
  /**
   * Material ui theme style
   */
  classes?: any
    
  /**
   * Theme
   */
  theme?: any

  /**
   * Router location
   */
  location?: any

  /**
   * Redirect to another URL 
   */
  goTo?: (url: string) => any

  /**
   * Translate to locale string
   */
  t?: (state: any, params?: any) => any
}
