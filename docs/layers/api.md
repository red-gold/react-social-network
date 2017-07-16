# API

Is a decoupled layer of interfaces to data and/or functionality of one or more components.

## CircleAPI.jsx

We provided some functions for doing some procedures on user circles.

```javascript
getUserBelongCircles = (circles,followingId) => {}
```

To get circles which the user is added in. `circles` is the parameter that we want to know if user is exist in any of them or not. `followingId` is the parameter that show the use identifier who we are looking for in `circles` parameter.

```javascript
getFollowingUsers = (circles) => {}
```

Get the user who are in circles. `circles` is the paramater that we get users from.