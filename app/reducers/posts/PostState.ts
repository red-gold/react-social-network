
/**
 * Post state
 * 
 * @export
 * @class PostState
 */
export class PostState  {

    /**
     * The list of user posts
     * 
     * @type {*}
     * @memberof PostState
     */
    userPosts: any = {};

    /**
     * If user posts are loaded {true} or not {false}
     * 
     * @type {Boolean}
     * @memberof PostState
     */
    loaded: Boolean = false;
  }