import { BaseDomain } from 'core/domain/common'
import { Comment } from 'core/domain/comments'
import { UserPermissionType } from 'core/domain/common/userPermissionType'
import { Post } from 'core/domain/posts/post'

export class PostIndex extends BaseDomain {
  public static mapToPost(postIndexObj: PostIndex) {
    const post = new Post(
      postIndexObj.objectID,
      postIndexObj.postTypeId,
      postIndexObj.creationDate,
      postIndexObj.deleteDate,
      postIndexObj.score,
      postIndexObj.votes,
      postIndexObj.viewCount,
      postIndexObj.comments,
      postIndexObj.body,
      postIndexObj.ownerUserId,
      postIndexObj.ownerDisplayName,
      postIndexObj.ownerAvatar,
      postIndexObj.lastEditDate,
      postIndexObj._tags,
      postIndexObj.commentCounter,
      postIndexObj.image,
      postIndexObj.imageFullPath,
      postIndexObj.video,
      postIndexObj.videoThumbnails,
      postIndexObj.album,
      postIndexObj.disableComments,
      postIndexObj.disableSharing,
      postIndexObj.deleted,
      postIndexObj.accessUserList,
      postIndexObj.permission,
      postIndexObj.version
    )
    if (!post.votes) {
      delete post.votes
    }
    if (!post.comments) {
      delete post.comments
    }
    return post
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
