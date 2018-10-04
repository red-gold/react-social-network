import { User } from 'core/domain/users'
import { Post } from 'core/domain/posts'
import {Map, List} from 'immutable'

/**
 * Post service interface
 */
export interface IPostService {
  addPost: (post: Post) => Promise<string>
  updatePost: (post: Post) => Promise<void>
  deletePost: (postId: string) => Promise<void>

  /**
   * Search posts
   */
  searchPosts: (query: string, filters: string, lastPostId?: string, page?: number, limit?: number, searchKey?: string)
  => Promise<{ posts: Map<string, any>, ids: Map<string, boolean>, newLastPostId: string, hasMore: boolean }>

  /**
   * Get search key
   */
  getSearchKey: () => Promise<string>

  /**
   * Get list of post by user identifier
   */
  getPostsByUserId: (userId: string, lastPostId?: string, page?: number, limit?: number, searchKey?: string)
    => Promise<{ posts: Map<string, any>, ids: Map<string, boolean>, newLastPostId: string, hasMore: boolean }>

  /**
   * Get list of album post
   */
  getAlbumPosts: (userId: string, lastPostId?: string, page?: number, limit?: number, searchKey?: string)
    => Promise<{ posts: Map<string, any>, ids: Map<string, boolean>, newLastPostId: string, hasMore: boolean }>

    /**
     * Get post by the post identifier
     */
  getPostById: (postId: string) => Promise<Post>
}
