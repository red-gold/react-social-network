import CommentAPI from 'api/CommentAPI';
import { CommentActionType } from 'constants/commentActionType';
import { ICommentService } from 'core/services/comments';
import { SocialProviderTypes } from 'core/socialProviderTypes';
import { Map } from 'immutable';
import { postComments } from 'models/comments/commentTypes';
import { Channel, eventChannel } from 'redux-saga';
import { all, call, cancelled, fork, put, select, take } from 'redux-saga/effects';
import { provider } from 'src/socialEngine';
import { commentActions, postActions, serverActions } from 'store/actions';
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType';
import { postSelector } from 'store/reducers/posts/postSelector';

/**
 * Get service providers
 */
const commentService: ICommentService = provider.get<ICommentService>(SocialProviderTypes.CommentService)

/***************************** Subroutines ************************************/
/**
 * Creating channel event and subscribing get comments service
 */
function fetchCommentsChannel(postId: string) {  
    return eventChannel<postComments>((emmiter) => {
        const unsubscribe = commentService.getComments(postId, (comments: postComments) => { 
             emmiter(comments)
         })
         return () => {
             unsubscribe()
         }
     })
}

/**
 * Set comments in store
 */
function* setComments(ownerId: string, postId: string, comments: postComments) {
        /**
         * Workout getting the number of post's comment and getting three last comments
         */
        yield put(commentActions.addCommentList(comments))
        let commentsCount: number
        const post: Map<string, any> = yield select(postSelector.getPost, {userId: ownerId, postId})
        if (post) {
        const desiredComments = comments[postId]
        if (desiredComments) {
          commentsCount = Object.keys(desiredComments).length
          let sortedObjects = yield CommentAPI.sortCommentsByDate(desiredComments)
         const updatedPost =  post.set('comments', Map(sortedObjects))
                                  .set('commentCounter', commentsCount)
          yield put(postActions.updatePostComments(updatedPost))
        }
    }
}

/**
 * Fetch comments from the server
 */
function* dbFetchComments(ownerId: string, postId: string) {
   const getCommentsRequest = CommentAPI.createGetCommentsRequest(postId)
   yield put(serverActions.sendRequest(getCommentsRequest))
     const channelSubscription: Channel<postComments> =  yield call(fetchCommentsChannel, postId)

     let comments = yield take(channelSubscription)
     getCommentsRequest.status = ServerRequestStatusType.OK
     yield call(setComments, ownerId, postId, comments)
    yield put(serverActions.sendRequest(getCommentsRequest))
     try {    
         while (true) {
            let comments = yield take(channelSubscription)
            yield call(setComments, ownerId, postId, comments)
        }
      } finally {
        if (yield cancelled()) {
            channelSubscription.close()
          } 
      }
    
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

function* watchFetchComments() {
    while (true) {
        const {payload} = yield take(CommentActionType.DB_FETCH_COMMENTS)
        const {ownerUserId, postId} = payload
        yield fork(dbFetchComments, ownerUserId, postId)
    }
}

export default function* commentSaga() {
    yield all([
      watchFetchComments()
    ])
  }
  