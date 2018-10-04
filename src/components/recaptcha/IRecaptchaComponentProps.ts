export interface IRecaptchaComponentProps {
  /**
   * Translate to locale string
   */
  t?: (state: any) => any

  /**
   * Styles
   */
  classes?: any

  /**
   * On successful solved captcha
   */
  onSuccess: (value: any) => void

  /**
   * On expired captcha
   */
  onExpired: () => void

  /**
   * Handle captcha render error
   */
  onRenderError: (error: string) => void
}
