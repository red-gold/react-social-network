import { ServerRequestType } from 'constants/serverRequestType'

// - Import actions

const isValidEmail = (email: string) => {
  let re = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

const createServerRequestId = (requestType: ServerRequestType, uniqueId: string) => {
  return `${requestType}:${uniqueId}`
}

function queryString (name: string, url: string = window.location.href) {
  name = name.replace(/[[]]/g, '\\$&')

  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i')
  const results = regex.exec(url)

  if (!results) {
    return null
  }
  if (!results[2]) {
    return ''
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export default {
  isValidEmail,
  queryString,
  createServerRequestId
}
