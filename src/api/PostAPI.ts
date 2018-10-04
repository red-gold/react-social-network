import { List, Map } from 'immutable'
import StringAPI from 'api/StringAPI'
import { ServerRequestType } from 'constants/serverRequestType'
import { ServerRequestModel } from 'models/server'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'

// Get tags from post content
export const detectTags: (content: string, character: string) => string[] = (content: string, character: string) => {

  return content.split(' ').filter((word) => {
    return (word.slice(0, 1) === character)
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

export const getTagsInString = (tags: { [key: string]: boolean }) => {
  return Object.keys(tags).join(',')
}

export const arrayTagToModel = (tags: string[]) => {
  let parsedTags = {}
  tags.forEach((tag) => {
    parsedTags = {
      ...parsedTags,
      [tag]: true
    }
  })
  return parsedTags
}

export const stringTagToModel = (tags: string) => {
  let parsedTags = {}
  tags.split(',').forEach((tag) => {
    parsedTags = {
      ...parsedTags,
      [tag]: true
    }
  })
  return parsedTags
}

export const sortObjectsDate = (objects: any) => {
  let sortedObjects = objects

  // Sort posts with creation date
  sortedObjects.sort((a: any, b: any) => {
    return parseInt(b.creationDate, 10) - parseInt(a.creationDate, 10)

  })

  return sortedObjects
}

/**
 * Creat get stream server request
 */
const createFetchStreamRequest = (userId: string) => {
  const requestId = StringAPI.createServerRequestId(ServerRequestType.StreamGetPosts, userId)
  return new ServerRequestModel(
      ServerRequestType.StreamGetPosts,
      requestId,
      '',
      ServerRequestStatusType.Sent
  )
}

/**
 * Creat search post server request
 */
const createSearchPostRequest = (userId: string) => {
  const requestId = StringAPI.createServerRequestId(ServerRequestType.SearchPosts, userId)
  return new ServerRequestModel(
      ServerRequestType.SearchPosts,
      requestId,
      '',
      ServerRequestStatusType.Sent
  )
}

/**
 * Create request user posts server
 */
const createFetchPostUserRequest = (userId: string) => {
  const requestId = StringAPI.createServerRequestId(ServerRequestType.ProfileGetPosts, userId)
  return new ServerRequestModel(
      ServerRequestType.ProfileGetPosts,
      requestId,
      '',
      ServerRequestStatusType.Sent
  )
}

/**
 * Create reques get album from server
 */
const createFetchAlbumRequest = (userId: string) => {
  const requestId = StringAPI.createServerRequestId(ServerRequestType.ProfileGetAlbums, userId)
  return new ServerRequestModel(
      ServerRequestType.ProfileGetAlbums,
      requestId,
      '',
      ServerRequestStatusType.Sent
  )
}

/**
 * Sort immutable list
 */
export const sortImuObjectsDate = (objects: List<Map<string, any>>) => {
  let sortedObjects = objects
  // Sort posts with creation date
  return sortedObjects.sort((a: any, b: any) => {
    return parseInt(b.get('creationDate'), 10) - parseInt(a.get('creationDate'), 10)

  })

  // return sortedObjects
}

export const PostAPI = {
  createFetchStreamRequest,
  createSearchPostRequest,
  createFetchPostUserRequest,
  sortImuObjectsDate,
  createFetchAlbumRequest
}
