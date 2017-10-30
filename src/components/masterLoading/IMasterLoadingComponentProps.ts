export interface IMasterLoadingComponentProps {

  /**
   * Loading is active {true} or not {false}
   *
   * @type {boolean}
   * @memberof IMasterLoadingComponentProps
   */
  activeLoading: boolean

  handleLoading: (status: boolean) => void
}
