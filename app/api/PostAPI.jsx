
// Get tags from post content
export const detectTags = (content,character) => {

  return content.split(" ").filter((word) => {
    return (word.slice(0,1) === character)
  })

}
export const getContentTags = (content) => {
  var newTags = []
  var tags =  detectTags(content,'#')
  tags.forEach((tag)=>{
    newTags.push(tag.slice(1))
  })
  return newTags
}

export const sortObjectsDate = (objects) => {
    var sortedObjects = objects;

     // Sort posts with creation date
     sortedObjects.sort((a, b) => {
      return  parseInt(b.creationDate) - parseInt(a.creationDate)

    });

    return sortedObjects;
  }