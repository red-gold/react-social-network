# Actions

This layer is responsible for implementing actions for entities. [Actions](http://redux.js.org/docs/basics/Actions.html) are payloads of information that send data from your application to your store. They are the only source of information for the store.

## authorizeActions.jsx

We provide some actions to authorize a user. The authorize actions include singup, login, logout and update password for a user.

### Functions

```jsx
dbLogin = (email, password) => {}
```

This action check a user by `email` and `password` to authorize a user to login website. 

```jsx
dbLogout = () => {}
```

This action is responsible to logout the user.

```jsx
dbSignup = (user) => {}
```

This action is responsible to register user on the server. `user` parameter is a user object with user information.

```jsx
dbUpdatePassword = (newPassword) => {}
```

This action is responsible to change user passwaord on the server. `newPassword` parameter is the password that user wants to replace with current password.

```jsx
login = (uid) => {}
```

This action is responsible to change user state to login state on reducer. `uid` is the user identifire.

```jsx
logout = () => {}
```

This action is responsible to change user state to logout state on reducer.

```jsx
signup = (user) => {}
```

This action is responsible to create new user state on reducer.

```jsx
updatePassword = () => {}
```

This action is responsible to fire reducer method on update password.