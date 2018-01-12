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
  getPosts: (currentUserId: string,lastPostId: string, page: number, limit: number)
  => Promise<{posts: {[postId: string]: Post }[], newLastPostId: string}>

  /**
   * Get list of post by user identifier
   */
  getPostsByUserId: (userId: string, lastPostId?: string, page?: number, limit?: number)
    => Promise<{ posts: { [postId: string]: Post }[], newLastPostId: string }>

    /**
     * Get post by the post identifier
     */
  getPostById: (postId: string) => Promise<Post>
}
