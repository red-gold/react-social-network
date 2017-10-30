import { Image } from 'core/domain/imageGallery'

/**
 * ImageGallery state
 * 
 * @export
 * @class ImageGalleryState
 */
export class ImageGalleryState  {
    
      /**
       * Image gallery is open {true} or not {false}
       * 
       * @type {Boolean}
       * @memberof ImageGalleryState
       */
      status: Boolean = false

      /**
       * The list of image
       * 
       * @type {(Image[] | null)}
       * @memberof ImageGalleryState
       */
      images: Image[] = []

      /**
       * Selected image name
       * 
       * @type {string}
       * @memberof ImageGalleryState
       */
      selectImage: string = ''

      /**
       * Selected image address
       * 
       * @type {string}
       * @memberof ImageGalleryState
       */
      selectURL: string = ''

      /**
       * If image gallery is loaded {true} or not false
       * 
       * @type {Boolean}
       * @memberof ImageGalleryState
       */
      loaded: Boolean = false

      /**
       * Images address list
       * 
       * @type {*}
       * @memberof ImageGalleryState
       */
      imageURLList: any = {}

      /**
       * Store image requested
       * 
       * @type {*}
       * @memberof ImageGalleryState
       */
      imageRequests: any = {}
    
    }