export interface IBountyBoxComponentProps {

  /**
   * Set title of top bar
   */
  setHeaderTitle?: (title: string) => any

  /**
   * Translate to locale string
   */
  t?: (state: any) => any

  /**
   * Styles
   */
  classes?: any

  /**
   * Bounty caption
   */
  caption?: string
  
  /**
   * Bounty text
   */
  text?: string
  
  /**
   * Bounty image address
   */
  image?: string
  
  /**
   * Bounty subheader
   */
  subheader?: string
  
  /**
   * Bounty percentage
   */
  value?: number
}
