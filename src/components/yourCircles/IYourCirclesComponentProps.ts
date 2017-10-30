import { Circle } from 'core/domain/circles'

export interface IYourCirclesComponentProps {

  /**
   * Circles
   *
   * @type {{[circleId: string]: Circle}}
   * @memberof IYourCirclesComponentProps
   */
  circles?: {[circleId: string]: Circle}

  /**
   * User identifier
   *
   * @type {string}
   * @memberof IYourCirclesComponentProps
   */
  uid?: string
}
