import { Map, fromJS, List } from 'immutable'
/**
 * Global state
 *
 * @export
 * @class GlobalState
 */
export class GlobalState {

 /**
  * Set percent of loading progress and visibility for Master component
  *
  * @type {{
  *     percent: number,
  *     visible: boolean
  *   }}
  * @memberof IGlobalState
  */
  progress = Map({
    percent: 0,
    visible: false
  })

 /**
  * If loading is enabled {true} or not false
  *
  * @type {boolean}
  * @memberof IGlobalState
  */
  loadingStatus: boolean = true

 /**
  * Whether send feedback is diplayed
  */
  sendFeedbackStatus: boolean = false

 /**
  * If user date is loaded {true} or not {false}
  *
  * @type {boolean}
  * @memberof IGlobalState
  */
  defaultLoadDataStatus: boolean = false

 /**
  * If message popup is open {true} or not {false}
  *
  * @type {boolean}
  * @memberof IGlobalState
  */
  messageOpen: boolean = false

 /**
  * The text of popup global message
  *
  * @type {string}
  * @memberof IGlobalState
  */
  message: string = ''

 /**
  * Window size
  *
  * @type {number}
  * @memberof IGlobalState
  */
  windowWidth: number = 0

 /**
  * Window height
  *
  * @type {number}
  * @memberof IGlobalState
  */
  windowHeight: number = 0

 /**
  * The text of website header
  *
  * @type {string}
  * @memberof IGlobalState
  */
  headerTitle: string = ''

 /**
  * Top loading is visible {true} or not {false}
  *
  * @type {boolean}
  * @memberof IGlobalState
  */
  showTopLoading: boolean = false

 /**
  * Top loading message queue
  *
  * @type {number}
  * @memberof IGlobalState
  */
  topLoadingQueue: number = 0

 /**
  * Master loading is visible {true} or not {false}
  *
  * @type {boolean}
  * @memberof IGlobalState
  */
  showMasterLoading: boolean = true

 /**
  * Master loading message queue
  *
  * @type {number}
  * @memberof IGlobalState
  */
  masterLoadingQueue: number = 0

 /**
  * Temp date storage
  *
  * @type {*}
  * @memberof IGlobalState
  */
  temp: any = Map({
    caller: List()
  })
}
