// - Import react components
import { firebaseAuth, db } from 'data/firestoreClient'
import {Map, fromJS} from 'immutable'
import { SocialError, Feed } from 'core/domain/common'
import { ICommonService } from 'core/services/common'
import { injectable, inject } from 'inversify'
import { SocialProviderTypes } from 'core/socialProviderTypes'
import { IHttpService } from 'core/services/webAPI'
import axios from 'axios'
import { Post } from 'core/domain/posts'
import { PostType } from 'core/domain/posts/postType'
import { UserPermissionType } from 'core/domain/common/userPermissionType'

/**
 * Firbase common service
 */
@injectable()
export class CommonService implements ICommonService {

  @inject(SocialProviderTypes.Httpervice) private _httpService: IHttpService
  constructor( 
  ) {
    this.getTwitterMedia = this.getTwitterMedia.bind(this)
  }

  /**
   * Get twitter media
   */
 async getTwitterMedia(accessToken: string) {
    const result = await axios
    .get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${accessToken}`,
        {
           
        }
    )
    let mappedPosts = Map({}) ;
    (result.data.data as Array<any>).forEach((post) => {
      const newPost = new Post(
        post.id,
        PostType.Photo,
        post.created_time,
        0,
        post.likes.count,
        {},
        0,
        {},
        post.caption ? post.caption.text : '',
        post.user.id,
        post.user.full_name,
        post.user.profile_picture,
        0,
        post.tags,
        post.comments.count,
        post.images.standard_resolution.url,
        '',
        '',
        '',
        undefined,
        true,
        true,
        false,
        [],
        UserPermissionType.Public
      )
      mappedPosts = mappedPosts.set(post.id, fromJS({...newPost}))
    })
    return mappedPosts
    
  }

  /**
   * Post feedback
   */
  public addFeed: (feed: Feed)
    => Promise<string> = (feed) => {
      return new Promise<string>((resolve, reject) => {
        let feedRef = db.collection(`feeds`).doc()
        feedRef.set({ ...feed, id: feedRef.id })
          .then(() => {
            resolve(feedRef.id)
          })
          .catch((error: any) => {
            reject(new SocialError(error.code, error.message))
          })
      })
    }
}
