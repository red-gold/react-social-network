/**
 * Log the data
 * @param title log title
 * @param data log data object
 */
const logger = (title: string, data: any, trace?: boolean) => {
  const randomColor = getRandomColor()
  if (trace) {
    console.trace()
  }
  console.log(`\n\n\n%c ${title} :\n`, `color:${getRandomColor()};font-size:15`)
  console.log('%c =========================================', `color:${randomColor}`)
  console.log(data)
  console.log('%c =========================================', `color:${randomColor}`)
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
