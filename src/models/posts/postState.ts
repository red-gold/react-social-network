import { StreamState } from 'models/posts/streamState'
import {Map} from 'immutable'
import { PostSearchState } from 'models/posts/postSearchState'

export class PostState {
    constructor(
        stream: StreamState,
        search: PostSearchState,
        entities: Map<string, Map<string, any>> // {[postId: string]: {post data}}
    ) {}
}