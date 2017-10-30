// - Import react components
import { firebaseRef, firebaseAuth } from 'data/firebaseClient'

import { SocialError } from 'core/domain/common'
import { Post } from 'core/domain/posts'
import { IPostService } from 'core/services/posts'

/**
 * Firbase post service
 *
 * @export
 * @class PostService
 * @implements {IPostService}
 */
export class PostService implements IPostService {

  public addPost: (userId: string, post: Post)
    => Promise<string> = (userId, post) => {
      return new Promise<string>((resolve,reject) => {
        let postRef: any = firebaseRef.child(`userPosts/${userId}/posts`).push(post)
        postRef.then(() => {
          resolve(postRef.key)
        })
        .catch((error: any) => {
          reject(new SocialError(error.code,error.message))
        })
      })
    }

  public updatePost: (userId: string, postId: string, post: Post)
    => Promise<void> = (userId, postId, post) => {
      return new Promise<void>((resolve,reject) => {
        let updates: any = {}
        updates[`userPosts/${userId}/posts/${postId}`] = post
        firebaseRef.update(updates).then(() => {
          resolve()
        })
        .catch((error: any) => {
          reject(new SocialError(error.code,error.message))
        })
      })
    }

  public deletePost: (userId: string, postId: string)
    => Promise<void> = (userId, postId) => {
      return new Promise<void>((resolve,reject) => {
        let updates: any = {}
        updates[`userPosts/${userId}/posts/${postId}`] = null
        firebaseRef.update(updates).then(() => {
          resolve()
        })
        .catch((error: any) => {
          reject(new SocialError(error.code,error.message))
        })
      })
    }

  public getPosts: (userId: string)
    => Promise<{ [postId: string]: Post }> = (userId) => {
      return new Promise<{ [postId: string]: Post }>((resolve,reject) => {

        let postsRef: any = firebaseRef.child(`userPosts/${userId}/posts`)
        postsRef.once('value').then((snapshot: any) => {
          let posts: any = snapshot.val() || {}
          let parsedPosts: { [postId: string]: Post } = {}

          Object.keys(posts).forEach((postId) => {
            parsedPosts[postId] = {
              id: postId,
              ...posts[postId]
            }
          })
          resolve(parsedPosts)
        })
        .catch((error: any) => {
          reject(new SocialError(error.code,error.message))
        })
      })
    }

  public getPostById: (userId: string, postId: string)
    => Promise<Post> = (userId, postId) => {
      return new Promise<Post>((resolve,reject) => {

        let postsRef: any = firebaseRef.child(`userPosts/${userId}/posts/${postId}`)

        postsRef.once('value').then((snapshot: any) => {
          let newPost = snapshot.val() || {}
          let post: Post = {
            id: postId,
            ...newPost
          }
          resolve(post)
        })
        .catch((error: any) => {
          reject(new SocialError(error.code,error.message))
        })

      })
    }
}
