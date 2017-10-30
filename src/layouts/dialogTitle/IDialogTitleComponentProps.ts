export interface IDialogTitleComponentProps {

  /**
   * Lable of the button
   *
   * @type {string}
   * @memberof IDialogTitleComponentProps
   */
  buttonLabel?: string 

  /**
   * Dialog tile
   *
   * @type {string}
   * @memberof IDialogTitleComponentProps
   */
  title: string

  /**
   * Button is disabled {true} or not {false}
   *
   * @type {boolean}
   * @memberof IDialogTitleComponentProps
   */
  disabledButton?: boolean 

  /**
   * On click event
   *
   * @memberof IDialogTitleComponentProps
   */
  onClickButton?: (event: any) => void 

  /**
   * On request close event
   *
   * @memberof IDialogTitleComponentProps
   */
  onRequestClose: (event: any) => void
}
