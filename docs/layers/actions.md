# Actions

This layer is responsible for implementing actions for entities. [Actions](http://redux.js.org/docs/basics/Actions.html) are payloads of information that send data from your application to your store. They are the only source of information for the store.

----

## authorizeActions

We provide some actions to authorize a user. The authorize actions include singup, login, logout and update password for a user.

### Authorize Action Functions

```javascript
dbLogin = (email, password) => {}
```

This action check a user by `email` and `password` to authorize a user to login website. 

```javascript
dbLogout = () => {}
```

This action is responsible to logout the user.

```javascript
dbSignup = (user) => {}
```

This action is responsible to register user on the server. `user` parameter is a user object with user information.

```javascript
dbUpdatePassword = (newPassword) => {}
```

This action is responsible to change user passwaord on the server. `newPassword` parameter is the password that user wants to replace with current password.

```javascript
login = (uid) => {}
```

This action is responsible to change user state to login state on reducer. `uid` is the user identifire.

```javascript
logout = () => {}
```

This action is responsible to change user state to logout state on reducer.

```javascript
signup = (user) => {}
```

This action is responsible to create new user state on reducer.

```javascript
updatePassword = () => {}
```

This action is responsible to fire reducer method on update password.

## circleActions

We provide some actions to authorize a user. The authorize actions include singup, login, logout and update password for a user.

### Circle Action Functions

```javascript
dbAddCircle = (circleName) => {}
```

Add a circle on the database. `circleName` is the name of the circle.

```javascript
dbAddFollowingUser = (cid, userFollowing) => {}
```

Add a user in a circle on the server. `cid` is the identifier of that circle. `userFollowing` is an object of the user which we want to add in a circle.

```javascript
dbDeleteFollowingUser = (cid, followingId) => {}
```

Delete a user from a circle on the server. `cid` is the identifier of that circle. `userFollowing` is an object of the user which we want to from a circle.

```javascript
dbUpdateCircle = (newCircle) => {}
```

Update a circle. `newCircle` is a circle object which should be updated.

```javascript
dbDeleteCircle = (id) => {}
```

Update a circle on the server. `id` is the circle identifier.

```javascript
dbGetCircles = () => {}
```

Get all circles of current user from server.

```javascript
dbGetCirclesByUserId = (uid) => {}
```

Get all circles of a specific user from server. `uid` is the user identifier.

```javascript
addCircle = (uid, circle) => {}
```

Add a circle in redux store. `uid` is the user identifier which we want to add `circle` to, from redux store.

```javascript
updateCircle = (uid, circle) => {}
```

Add a circle in redux store. `uid` is the user identifier which we want to update `circle` for, from redux store.

```javascript
deleteCircle = (uid, id)}
```

Delete a circle with `id` identifier which the user with `uid` identifier is the owner of that circle, from redux store.

```javascript
addCircles = (uid, circles) => {}
```

Add a list of `cricles` for the user with `uid` identifier on redux store.

```javascript
openCircleSettings = (uid, id) => {}
```

Indicate a circle with `id` identifier for a user with `uid` identifier should be open.

```javascript
closeCircleSettings = (uid, id) => {}
```

Indicate a circle with `id` identifier for a user with `uid` identifier should be close.

```javascript
addFollowingUser = (uid, cid, followingId, userCircle) => {}
```

Add a user in a circle.
Add a user with `followingId` identifier in a circle with `cid` identifier belong to the user with `uid` identifier. `userCircle` is an object of user information which we want to add in a circle.

```javascript
deleteFollowingUser = (uid, cid, followingId) => {}
```

Delete a user from a circle.
Delete a user with `followingId` identifier from a circle with `cid` identifier belong to the user with `uid` identifier. `userCircle` is an object of user information which we want to delete from a circle.

## commentActions

### Comment Action Functions

```javascript
dbAddComment = (newComment, callBack) => {}
```

Add a comment on a post. `newComment` is an object of comment. `callBack` is a function callback which will be fired when comment add successfully.

```javascript
dbGetComments = () => {}
```

Get whole comments of current user who is logged in.

```javascript
dbUpdateComment = (id, postId, text) => {}
```

Update a comment content with `id` identifier on a post with `postId` identifier. `text` is the new content of the comment.

```javascript
dbDeleteComment = (id, postId) => {}
```

Delete a comment content with `id` identifier on a post with `postId` identifier.

```javascript
addComment = (data) => {}
```

Add a comment on redux store. Data is an object with comment information.

```javascript
updateComment = (data) => {}
```

Update a comment on redux store. Data is an object with updated comment information.

```javascript
addCommentList = (postComments) => {}
```

Add a list of comment on redux store. `postComments` is a list of comments.

```javascript
deleteComment = (id, postId) => {}
```

Delete a comment with `id` identifier on a post with `postId` identifier on redux store. Data is an object with comment information.

```javascript
clearAllData = () => {}
```

Delete all comments from redux store.

```javascript
openCommentEditor = (comment) => {}
```

Open comment editor of a comment. `comment` include comment information.

```javascript
closeCommentEditor = (comment) => {}
```

Comment comment editor of a comment. `comment` include comment information.

## globalActions

### Global Action Functions

```javascript
progressChange = (percent, visible) => {}
```

Changes progress bar percentage. `percent` is a number of percentage. `visible` indicate if progress bar should be visible or not.

```javascript
defaultDataEnable = (status) => {}
```

Sets dafault data loaded.

```javascript
defaultDataDisable = () => {}
```

Sets dafault data has not loaded.

```javascript
showNotificationRequest = () =>  {}
```

Show a notification popup that request has been sent.

```javascript
showNotificationSuccess = () =>  {}
```

Show a notification popup that request has been processed successfully.

```javascript
hideMessage = () => {}
```

Hide notification popup.

```javascript
showErrorMessage = (message) => {}
```

Show notification popup with error `message`.

```javascript
setHeaderTitleOpt = (opt,payload) => {}
```

Sets the title of site header. According `opt` we can set the title. `payload` is an object depend on `opt`.

```javascript
setHeaderTitle = (text) => {}
```

Sets the title of site header. `text` is the text of title.

```javascript
openPostWrite = () => {}
```

Show the dialog of writing post.

```javascript
closePostWrite = () => {}
```

Close the dialog of writing post.

```javascript
showTopLoading = () => {}
```

Show top loading popup.

```javascript
hideTopLoading = () => {}
```

Hide top loading popup.

```javascript
temp = (data) => {}
```

Stor temprory data on redux store.

```javascript
loadDataGuest = () => {}
```

Execute some procedure like load essential data the time user is unauthorized.

## imageGalleryActions

### Image Gallery Action Functions

## notifyActions

### Notify Action Functions

## postActions

### Post Action Functions

## userActions

### User Action Functions

## voteActions

### Vote Action Functions
