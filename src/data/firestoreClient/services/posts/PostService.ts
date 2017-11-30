// - Import react components
import { firebaseRef, firebaseAuth, db } from 'data/firestoreClient'

import { SocialError } from 'core/domain/common'
import { Post } from 'core/domain/posts'
import { IPostService } from 'core/services/posts'
import { IServiceProvider } from 'core/factories'
import { ICommentService } from 'core/services/comments'
import { ServiceProvide } from 'core/factories/serviceProvide'

/**
 * Firbase post service
 *
 * @export
 * @class PostService
 * @implements {IPostService}
 */
export class PostService implements IPostService {

  public addPost: (post: Post)
    => Promise<string> = (post) => {
      return new Promise<string>((resolve,reject) => {
        let postRef = db.collection(`posts`).add(post)
        postRef.then((result) => {
          resolve(result.id)
        })
        .catch((error: any) => {
          reject(new SocialError(error.code,error.message))
        })
      })
    }

  public updatePost: (post: Post)
    => Promise<void> = (post) => {
      return new Promise<void>((resolve,reject) => {
        const batch = db.batch()
        const notificationRef = db.doc(`posts/${post.id}`)

        batch.update(notificationRef, post)
        batch.commit().then(() => {
          resolve()
        })
        .catch((error: any) => {
          reject(new SocialError(error.code,error.message))
        })
      })
    }

  public deletePost: (postId: string)
    => Promise<void> = (postId) => {
      return new Promise<void>((resolve,reject) => {
        const batch = db.batch()
        const notificationRef = db.doc(`posts/${postId}`)

        batch.delete(notificationRef)
        batch.commit().then(() => {
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

        let postsRef = db.collection(`posts`).where('ownerUserId', '==', userId)
        postsRef.get().then((snapshot) => {
          let parsedData: { [postId: string]: Post } = {}
          snapshot.forEach((result) => {
            parsedData[result.id] = {
              id: result.id,
              ...result.data() as Post
            }
          })
          resolve(parsedData)
        })
        .catch((error: any) => {
          reject(new SocialError(error.code,error.message))
        })
      })
    }

  public getPostById: (postId: string)
    => Promise<Post> = (postId) => {
      return new Promise<Post>((resolve,reject) => {

        let postsRef = db.doc(`posts/${postId}`)
        postsRef.get().then((snapshot) => {
          let newPost = snapshot.data() || {}
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
