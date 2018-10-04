import * as moment from 'moment/moment'
import {Map, List} from 'immutable'
import { RegexPattern } from 'constants/RegexPattern'
import * as R from 'ramda'
/**
 * Log the data
 */
const logger = (title: string, ...data: any[]) => {
  const randomColor = getRandomColor()

  window['console']['log'](`\n\n%c =======  ${title} ======= %c${moment().format('HH:mm:ss SSS')} \n`, `color:${randomColor};font-size:15`
  , `color:${getRandomColor()};font-size:15`)
  window['console']['log'](``)
  window['console']['log'](`    `,  data)
  window['console']['log'](`\n =========================================`)

}

/**
 * Get random color in hex
 */
const getRandomColor = () => {
  let letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const updateObject = (oldObject: any, updatedProperties: any) => {
  return {
      ...oldObject,
      ...updatedProperties
  }
}

const isMobile = () => {
  const nav = navigator.userAgent || navigator.vendor || (window as any).opera
  return RegexPattern.IsMobileA.test(nav) || RegexPattern.IsMobileA.test(nav.substr(0,4))
}

const sortImmutable = (objects: List<Map<string, any>>) => {
  let sortedObjects = objects
  // Sort posts with creation date
  return sortedObjects.sort((a: any, b: any) => {
    return parseInt(b.get('creationDate'), 10) - parseInt(a.get('creationDate'), 10)

  })
}

const removeNil = <T extends object>(obj: T) => {
 return R.reject(R.isNil, obj) as T
}

const getStateSlice = (state: any) => state.toJS()['locale']

export default {
  logger,
  getRandomColor,
  updateObject,
  getStateSlice,
  sortImmutable,
  isMobile,
  removeNil
}
