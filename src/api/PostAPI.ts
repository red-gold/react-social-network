import {List} from 'immutable'

// Get tags from post content
export const detectTags: (content: string, character: string) => string[] = (content: string, character: string) => {

  return content.split(' ').filter((word) => {
    return (word.slice(0,1) === character)
  })

}
export const getContentTags = (content: string) => {
  let newTags: string[] = []
  let tags = detectTags(content,'#')
  tags.forEach((tag) => {
    newTags.push(tag.slice(1))
  })
  return newTags
}

export const sortObjectsDate = (objects: any) => {
  let sortedObjects = objects

     // Sort posts with creation date
  sortedObjects.sort((a: any, b: any) => {
    return parseInt(b.creationDate,10) - parseInt(a.creationDate,10)

  })

  return sortedObjects
}

export const sortImuObjectsDate = (objects: List<Map<string, any>>) => {
  let sortedObjects = objects

     // Sort posts with creation date
 return sortedObjects.sort((a: any, b: any) => {
    return parseInt(b.get('creationDate'),10) - parseInt(a.get('creationDate'),10)

  })

  // return sortedObjects
}
