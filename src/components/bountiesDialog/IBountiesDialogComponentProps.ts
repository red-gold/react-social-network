export interface IBountiesDialogComponentProps {

  /**
   * Set title of top bar
   */
  setHeaderTitle?: (title: string) => any

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  t?: (state: any) => any

  /**
   * Button text
   */
  text?: string
}
