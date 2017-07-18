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

## FileAPI.jsx

A set of functions for working with files.

```javascript
getExtension = (fileName) => {}
```

Get file extension from file name. `fileName` is the name of file.

```javascript
convertImageToCanvas = (image) => {}
```

Conver image to canvas. `image` is the image file should be converted.

```javascript
constraintImage = (file,fileName, maxWidth, maxHeight) => {}
```

Resize an image with specific max-height and max-with. After resizing image, `onSendResizedImage` event will be fired and will send the image resized and file name as arguments . `file` is image file , `fileName` is the name of the image, `maxWidth` is the maximum width and `maxHeight` is the maximum width for the image.

```javascript
dataURLToBlob = (dataURL) => {}
```

Convert [data url file](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) to [blob file](https://developer.mozilla.org/en/docs/Web/API/Blob). `dataURL` is the file with data url type.

## PostAPI.jsx

A set of functions for working with user posts.

```javascript
detectTags = (content,character) => {}
```

Detect and get word wich starts with specific `character` in the `content` of a text.

```javascript
getContentTags = (content) => {}
```

Get tag from the `content` of a text.

```javascript
sortObjectsDate = (objects) => {}
```

Sort an java script object based on key/value type.