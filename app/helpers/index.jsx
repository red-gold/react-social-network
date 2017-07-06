import {firebaseAuth, firebaseRef} from 'app/firebase/'

export function auth(email, pw, other) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(u => saveUser(u,other))
}

export function logout() {
  return firebaseAuth().signOut()
}

export function login(email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword(email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser(user,other) {
  return firebaseRef.child(`users/${user.uid}/info`)
    .set({
      ...other,
      email: user.email,
      uid: user.uid

    })
    .then(() => user)
}
