import { User } from 'core/domain/users'
import { Post } from 'core/domain/posts'

/**
 * Post service interface
 *
 * @export
 * @interface IPostService
 */
export interface IPostService {
  addPost: (userId: string, post: Post) => Promise<string>
  updatePost: (userId: string, postId: string, post: Post) => Promise<void>
  deletePost: (userId: string,postId: string) => Promise<void>
  getPosts: (userId: string) => Promise<{ [postId: string]: Post }>
  getPostById: (userId: string, postId: string) => Promise<Post>
}
