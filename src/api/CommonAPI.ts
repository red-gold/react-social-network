import * as moment from 'moment/moment'
/**
 * Log the data
 * @param title log title
 * @param data log data object
 */
const logger = (title: string, data: any) => {
  const randomColor = getRandomColor()

  console.log(`\n\n%c =======  ${title} ======= %c${moment().format('HH:mm:ss SSS')} \n`, `color:${randomColor};font-size:15`
  , `color:${getRandomColor()};font-size:15`, data,`\n\n =========================================`)

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

export default {
  logger,
  getRandomColor
}
