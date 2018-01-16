# API

Is a decoupled layer of interfaces to data and/or functionality of one or more components.

## FileAPI

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

## PostAPI

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