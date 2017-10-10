// - Import firebase components
import {firebaseAuth, firebaseRef} from 'app/firebase/'
import store from 'store/configureStore'

// - Check user if is authorized
export let isAuthorized = () => {
  let state = store.getState()
  return state.authorize.authed

}

export let isAdmin = () =>{

return true

}
