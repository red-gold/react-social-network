
import { Comment } from "domain/comments";

/**
 * Comment state 
 * 
 * @export
 * @class CommentState
 */
export class CommentState  {

    /**
     * The list of comments on the posts
     * 
     * @type {({[postId: string]: {[commentId: string]: Comment}} | null)}
     * @memberof CommentState
     */
    postComments: {[postId: string]: {[commentId: string]: Comment}} = {};

    /**
     * If the comments are loaded {true} or not {false}
     * 
     * @type {Boolean}
     * @memberof CommentState
     */
    loaded: Boolean = false;
  }