# Actions

This layer is responsible for implementing actions for entities. [Actions](http://redux.js.org/docs/basics/Actions.html) are payloads of information that send data from your application to your store. They are the only source of information for the store.

## authorizeActions.jsx

We provide some actions to authorize a user. The authorize actions include singup, login, logout and update password for a user.

### Authorize Action Functions

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

## circleActions.jsx

We provide some actions to authorize a user. The authorize actions include singup, login, logout and update password for a user.

### Circle Action Functions

```jsx
dbAddCircle = (circleName) => {}
```

Add a circle on the database. `circleName` is the name of the circle.

```jsx
dbAddFollowingUser = (cid, userFollowing) => {}
```

Add a user in a circle on the server. `cid` is the identifier of that circle. `userFollowing` is an object of the user which we want to add in a circle.

```jsx
dbDeleteFollowingUser = (cid, followingId) => {}
```

Delete a user from a circle on the server. `cid` is the identifier of that circle. `userFollowing` is an object of the user which we want to from a circle.

```jsx
dbUpdateCircle = (newCircle) => {}
```

Update a circle. `newCircle` is a circle object which should be updated.

```jsx
dbDeleteCircle = (id) => {}
```

Update a circle on the server. `id` is the circle identifier.

```jsx
dbGetCircles = () => {}
```

Get all circles of current user from server.

```jsx
dbGetCirclesByUserId = (uid) => {}
```

Get all circles of a specific user from server. `uid` is the user identifier.

```jsx
addCircle = (uid, circle) => {}
```

Add a circle in redux store. `uid` is the user identifier which we want to add `circle` to, from redux store.

```jsx
updateCircle = (uid, circle) => {}
```

Add a circle in redux store. `uid` is the user identifier which we want to update `circle` for, from redux store.

```jsx
deleteCircle = (uid, id)}
```

Delete a circle with `id` identifier which the user with `uid` identifier is the owner of that circle, from redux store.

## commentActions.jsx

### Comment Action Functions

## globalActions.jsx

### Global Action Functions

## imageGalleryActions.jsx

### Image Gallery Action Functions

## notifyActions.jsx

### Notify Action Functions

## postActions.jsx

### Post Action Functions

## userActions.jsx

### User Action Functions

## voteActions.jsx

### Vote Action Functions
