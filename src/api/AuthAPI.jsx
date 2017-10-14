// - Import firebase components
import {firebaseAuth, firebaseRef} from 'src/firebase/';
import store from 'store/configureStore';

// - Check user if is authorized
export var isAuthorized = () => {
  var state = store.getState();
  return state.authorize.authed;

};

export var isAdmin = () =>{

return true;

};
