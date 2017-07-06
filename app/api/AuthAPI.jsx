// - Import firebase components
import {firebaseAuth, firebaseRef} from 'app/firebase/'
import store from 'configureStore'

// - Check user if is authorized
export var isAuthorized = () => {
  var state = store.getState()
  return state.authorize.authed

}

export var isAdmin = () =>{

return true;

}
