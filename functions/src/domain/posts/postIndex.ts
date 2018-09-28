import { BaseDomain } from '../common'
import { Comment } from '../comments'
import { UserPermissionType } from '../common/userPermissionType'
import { Post } from './post'
export class PostIndex extends BaseDomain {

  static map(post: Post) {
    const indexPost = new PostIndex(
      post.id,
      post.postTypeId,
      post.creationDate,
      post.deleteDate,
      post.score,
      post.votes,
      post.viewCount,
      post.comments,
      post.body,
      post.ownerUserId,
      post.ownerDisplayName,
      post.ownerAvatar,
      post.lastEditDate,
      post.tags,
      post.commentCounter,
      post.image,
      post.imageFullPath,
      post.video,
      post.videoThumbnails,
      post.album,
      post.disableComments,
      post.disableSharing,
      post.deleted,
      post.accessUserList,
      post.permission,
      post.version
    )
    return indexPost
  }
  constructor(
    /**
     * Post identifier
     */
    public objectID: string,

    /**
     * The identifier of post type
     */
    public postTypeId?: number,

    /**
     * The post creation date
     */
    public creationDate?: number,

    /**
     * The post delete date
     */
    public deleteDate?: number,

    /**
     * The score of post
     */
    public score?: number,

    /**
     * List of voter identifier
     */
    public votes?: { [voterId: string]: boolean },

    /**
     * Post view count
     */
    public viewCount?: number,

    /**
     * Store three last comments to show in slide preview comment
     */
    public comments?: { [commentId: string]: Comment },

    /**
     * The text of post
     */
    public body?: string,

    /**
     * The identifier of post owner
     */
    public ownerUserId?: string,

    /**
     * Full name of post owner
     */
    public ownerDisplayName?: string,

    /**
     * Avatar address of post owner
     */
    public ownerAvatar?: string,

    /**
     * Last post edit date
     */
    public lastEditDate?: number,

    /**
     * Post tags
     */
    public _tags?: string[],

    /**
     * Numeber of comment on the post
     */
    public commentCounter?: number,

    /**
     * The address of image on the post
     */
    public image?: string,

    /**
     * Post image full path
     */
    public imageFullPath?: string,

    /**
     * The adress of video on the post
     */
    public video?: string,

    /**
     * The address of video thumbnails on the post
     */
    public videoThumbnails?: string,

    /**
     * Album data
     */
    public album?: any,

    /**
     * If writing comment is disabled {true} or not {false}
     */
    public disableComments?: boolean,

    /**
     * If sharing post is disabled {true} or not {false}
     */
    public disableSharing?: boolean,

    /**
     * If the post is deleted {true} or not false
     */
    public deleted?: boolean,

    /**
     * The list of user can access to post
     */
    public accessUserList?: Array<string>,

    /**
     * User permission type
     */
    public permission: UserPermissionType = UserPermissionType.Public,

    /**
     * Post format version
     */
    public version?: string

  ) {
    super()
  }

}
