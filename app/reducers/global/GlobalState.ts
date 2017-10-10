
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
       *     visible: Boolean
       *   }}
       * @memberof IGlobalState
       */
      progress: {
        percent: number
        visible: Boolean
      } = {
        percent : 0,
        visible : false
      }
    
      /**
       * If loading is enabled {true} or not false
       * 
       * @type {Boolean}
       * @memberof IGlobalState
       */
      loadingStatus: Boolean = true
    
      /**
       * If user date is loaded {true} or not {false}
       * 
       * @type {Boolean}
       * @memberof IGlobalState
       */
      defaultLoadDataStatus: Boolean = false
    
      /**
       * If message popup is open {true} or not {false}
       * 
       * @type {Boolean}
       * @memberof IGlobalState
       */
      messageOpen: Boolean = false
    
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
       * @type {Boolean}
       * @memberof IGlobalState
       */
      showTopLoading: Boolean = false
    
      /**
       * Top loading message queue
       * 
       * @type {number}
       * @memberof IGlobalState
       */
      topLoadingQueue: number = 0
    
      /**
       * Temp date storage
       * 
       * @type {*}
       * @memberof IGlobalState
       */
      temp: any = {}
    }
    