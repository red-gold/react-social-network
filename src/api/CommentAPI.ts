import StringAPI from 'api/StringAPI'
import { ServerRequestType } from 'constants/serverRequestType'
import { ServerRequestModel } from 'models/server'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'
import { comments } from 'models/comments/commentTypes'
import * as _ from 'lodash'

/**
 * Create get comments server request model
 */
const createGetCommentsRequest = (postId: string) => {
    const requestId = StringAPI.createServerRequestId(ServerRequestType.CommentGetComments, postId)
    return new ServerRequestModel(
        ServerRequestType.CommentGetComments,
        requestId,
        '',
        ServerRequestStatusType.Sent
    )
}

const sortCommentsByDate = (sortedObjects: comments) => {
    const commentKeys = Object.keys(sortedObjects)
    if (commentKeys.length > 1) {
       return _.fromPairs(_.toPairs(sortedObjects)
            .sort((a: any, b: any) => parseInt(b[1].creationDate, 10) - parseInt(a[1].creationDate, 10)).slice(0, 3))

    } 
    return sortedObjects
}

export default {
    createGetCommentsRequest,
    sortCommentsByDate
}