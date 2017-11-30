import { User } from 'core/domain/users'
import { Post } from 'core/domain/posts'

/**
 * Post service interface
 *
 * @export
 * @interface IPostService
 */
export interface IPostService {
  addPost: (post: Post) => Promise<string>
  updatePost: (post: Post) => Promise<void>
  deletePost: (postId: string) => Promise<void>
  getPosts: (userId: string) => Promise<{ [postId: string]: Post }>
  getPostById: (postId: string) => Promise<Post>
}
