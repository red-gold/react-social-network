# Actions

This layer is responsible for implementing actions for entities. [Actions](http://redux.js.org/docs/basics/Actions.html) are payloads of information that send data from your application to your store. They are the only source of information for the store.

## authorizeActions.jsx

We provide some actions to authorize a user. The authorize actions include singup, login, logout and update password for a user.

#### Functions
```jsx
dbLogin = (email, password) => {}
```
This action check a user by email and password to authorize a user to login website. 