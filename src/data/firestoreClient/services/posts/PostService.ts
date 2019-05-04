// - Import react components
import algoliasearch from 'algoliasearch';
import { SocialError } from 'core/domain/common';
import { Post } from 'core/domain/posts';
import { PostIndex } from 'core/domain/posts/postIndex';
import { PostType } from 'core/domain/posts/postType';
import { IPostService } from 'core/services/posts';
import { IHttpService } from 'core/services/webAPI';
import { SocialProviderTypes } from 'core/socialProviderTypes';
import { db } from 'data/firestoreClient';
import { fromJS, Map } from 'immutable';
import { inject, injectable } from 'inversify';
import config from 'src/config';

/**
 * Firbase post service
 */
@injectable()
export class PostService implements IPostService {

  @inject(SocialProviderTypes.Httpervice) private _httpService: IHttpService
  constructor(
  ) {
    this.getSearchKey = this.getSearchKey.bind(this)
    this.searchPosts = this.searchPosts.bind(this)
    this.getAlbumPosts = this.getAlbumPosts.bind(this)
    this.getPostsByUserId = this.getPostsByUserId.bind(this)
  }

  /**
   * Add post on server
   */
  public addPost: (post: Post)
    => Promise<string> = (post) => {
      return new Promise<string>((resolve, reject) => {
        let postRef = db.collection(`posts`).doc()
        postRef.set({ ...post, id: postRef.id })
          .then(() => {
            resolve(postRef.id)
          })
          .catch((error: any) => {
            reject(new SocialError(error.code, error.message))
          })
      })
    }

  /**
   * Updare post
   */
  public updatePost: (post: Post)
    => Promise<void> = (post) => {
      return new Promise<void>((resolve, reject) => {
        const batch = db.batch()
        const postRef = db.doc(`posts/${post.id}`)
        if (!post.votes) {
          delete post.votes
        }
        if (!post.comments) {
          delete post.comments
        }
        batch.update(postRef, { ...post })
        batch.commit().then(() => {
          resolve()
        })
          .catch((error: any) => {
            reject(new SocialError(error.code, error.message))
          })
      })
    }

  /**
   * Delete post
   */
  public deletePost: (postId: string)
    => Promise<void> = (postId) => {
      return new Promise<void>((resolve, reject) => {
        const batch = db.batch()
        const postRef = db.doc(`posts/${postId}`)

        batch.delete(postRef)
        batch.commit().then(() => {
          resolve()
        })
          .catch((error: any) => {
            reject(new SocialError(error.code, error.message))
          })
      })
    }

  /**
   * Get list of post by user identifier
   */
  public async getPostsByUserId(userId: string, lastPostId?: string, page?: number, limit?: number, searchKey?: string) {
    return this.searchPosts('', `ownerUserId:${userId}`, lastPostId, page, limit, searchKey)
  }

  /**
   * Get list of album post
   */
  public async getAlbumPosts(userId: string, lastPostId?: string, page?: number, limit?: number, searchKey?: string) {
    return this.searchPosts('', `ownerUserId:${userId} AND postTypeId:${PostType.Album}`, lastPostId, page, limit, searchKey)
  }

  /**
   * Search in posts
   */
  public async searchPosts(query: string, filters: string, lastPostId?: string, page?: number, limit?: number, searchKey?: string) {
    const searchClient = algoliasearch(config.algolia.appId, config.algolia.apiKey ) // searchKey!)
    const postIndex = searchClient.initIndex('post')
    const resultSearch: algoliasearch.Response = await postIndex
      .search({
        query,
        page,
        filters,
        hitsPerPage: limit
      })
    const pageCount = resultSearch.nbPages - 1
    const postCount = resultSearch.nbHits
    let parsedData: Map<string, any> = Map({})
    let postIds: Map<string, boolean> =  Map({})
    resultSearch.hits.forEach((post: PostIndex) => {
      const mapPost = PostIndex.mapToPost(post)
      parsedData = parsedData.set(mapPost.id!, fromJS({ ...mapPost }))
      postIds = postIds.set(mapPost.id!, true)
    })
    return { posts: parsedData, ids: postIds, newLastPostId: (postCount > 0  && resultSearch.hits.length > 0) ? resultSearch.hits[0].objectID : '', hasMore: !(pageCount === page || page! > pageCount) }
  }

  /**
   * Get search key
   */
  public async getSearchKey() {
    // await this._httpService.get('admin/change/user')
    const result = await this._httpService.get('search/post')
    return result.data.searchKey
  }

  /**
   * Get post by the post identifier
   */
  public getPostById: (postId: string)
    => Promise<Post> = (postId) => {
      return new Promise<Post>((resolve, reject) => {

        let postsRef = db.doc(`posts/${postId}`)
        postsRef.get().then((snapshot) => {
          let newPost = (snapshot.data() || {}) as Post
          let post: Post = {
            id: postId,
            ...newPost
          }
          resolve(fromJS(post))
        })
          .catch((error: any) => {
            reject(new SocialError(error.code, error.message))
          })

      })
    }

  /**
   * Pagination calculation
   * TODO: Needs to be optimized by server pagination calculation on {dateByMonth:[post1,post2,post3]} from `userInfo.posts`
   */
  private pagingPosts = (postList: { [postId: string]: Post }[], lastPostId: string, limit: number) => {

    let sortedObjects: { [postId: string]: Post }[] = postList.sort((a, b) => {
      const aKey = Object.keys(a)[0]
      const bKey = Object.keys(b)[0]
      // a = current item in array
      // b = next item in array
      return b[bKey].creationDate! - a[aKey].creationDate!
    })
    if (lastPostId && lastPostId !== '') {
      const lastPostIndex = sortedObjects.findIndex((arg) => {
        return Object.keys(arg)[0] === lastPostId
      })
      sortedObjects = sortedObjects.slice(lastPostIndex + 1, lastPostIndex + limit + 1)
    } else if (sortedObjects.length > limit) {
      sortedObjects = sortedObjects.slice(0, limit)
    }

    const newLastPostId = sortedObjects && sortedObjects.length > 0 ? Object.keys(sortedObjects[sortedObjects.length - 1])[0] : ''

    return { posts: sortedObjects, newLastPostId }
  }

}
