
import * as functions from 'firebase-functions'
import { adminDB, firestoreDB, searchClient } from '../../data/index'
import { Comment } from '../../domain/comments/comment'
import * as express from 'express'
import { User } from '../../domain/users/user'
import { HttpStatusCode } from '../../data/httpStatusCode'
import { SocialError } from '../../domain/common/index'
import { Profile } from '../../domain/users/profile'
import { Post } from '../../domain/posts/post'
import { UserTie } from '../../domain/circles/index'
import { Graph } from '../../domain/graphs/index'
import { UserIndex } from '../../domain/users/userIndex'

const app = express()
app.disable('x-powered-by')

/**
 * Get users by user identifier list
 * @param userIdList A list of user key
 */
const getUserByListId = async (userIdList: string[]) => {
    return new Promise<{ [userId: string]: User }>((resolve, reject) => {
        let users: { [userId: string]: User } = {}
        if (userIdList && userIdList.length > 0) {
            userIdList.forEach((userId: string) => {
                firestoreDB.collection('userInfo').doc(userId).get().then((result) => {
                    let user = result.data() as User
                    users = {
                        ...users,
                        [userId]: {
                            ...user
                        }
                    }
                }).catch(reject)
            })
            resolve(users)
        }
    })
}

/**
 * Get users by  http trigget
 * Route ['users/']
 * Method [POST]
 */
app.post('/', async (request, response) => {
    const userIdList = JSON.parse(request.body)
    if (userIdList && Array.isArray(userIdList) && userIdList.length > 0) {
        getUserByListId(userIdList)
            .then((users) => {
                response.status(HttpStatusCode.OK).send(users)
            })

    } else {
        // Send baack bad request happened
        return response.status(HttpStatusCode.BadRequest)
            .send(new SocialError('UserService/UserIdListNotValid',
                `
        User list is undefined or not array or the length of array is not grater than zero!
        ${JSON.stringify(userIdList)}
        `))
    }

})

/**
 * Routing posts
 */
export const users = functions.https.onRequest(app)

/**
 * Handle create user information
 */
export const onCreateUserInfo = functions.firestore.document('userInfo/{userId}')
.onCreate(async (dataSnapshot, context) =>  {
    const index = searchClient.initIndex('user')
    const userId: string = context.params.userId
    const userInfo = dataSnapshot.data() as User
    const userIndex = UserIndex.map({
        userId: userId,
        ...userInfo
    })
    const createUserIndex$ = index.saveObject(userIndex)
    const result = await createUserIndex$
})

/**
 * Handle delete user information
 */
export const onDeleteUserInfo = functions.firestore.document('userInfo/{userId}')
.onDelete(async (dataSnapshot, context) =>  {
    const index = searchClient.initIndex('user')
    const userId: string = context.params.userId
   
    const deleteResult$ = index.deleteObject(userId)
    const result = await deleteResult$
})

/**
 * Handle on update user information
 */
export const onUpdateUserInfo = functions.firestore.document('userInfo/{userId}')
    .onUpdate(async (dataSnapshot, event) => {
        const userId: string = event.params.userId
        const previousUserInfo = dataSnapshot.before.data() as User
        const userInfo = dataSnapshot.after.data() as User

        if (previousUserInfo.avatar === userInfo.avatar && previousUserInfo.fullName === userInfo.fullName) {
            return true
        } else {
            const index = searchClient.initIndex('user')
            const userIndex = UserIndex.map({
                userId: userId,
                ...userInfo
            })
            const createUserIndex$ = index.saveObject(userIndex)
            const postsRef = firestoreDB.collection('posts').where('ownerUserId', '==', userId)
            const commentsRef = firestoreDB.collection('comments').where('userId', '==', userId)
            const leftUserTieRef = firestoreDB.collection('graphs:users').where('leftNode', '==', userId)
            const rightUserTieRef = firestoreDB.collection('graphs:users').where('rightNode', '==', userId)

            // Get a new write batch
            var batch = firestoreDB.batch()

            const posts$ = postsRef.get()
            const comments$ = commentsRef.get()
            const leftTies$ = leftUserTieRef.get()
            const rightTies$ = rightUserTieRef.get()
            const resultArray = await Promise.all([posts$, comments$, leftTies$, rightTies$, createUserIndex$])
            const posts = resultArray[0]
            const comments = resultArray[1]
            const leftTies = resultArray[2]
            const rightTies = resultArray[3]

            // Set update batch for posts
            posts.forEach((post) => {
                const updatedPost: Post = post.data() as Post
                updatedPost.ownerAvatar = userInfo.avatar
                updatedPost.ownerDisplayName = userInfo.fullName
                batch.update(post.ref, updatedPost)
            })

            // Set update batch for comments
            comments.forEach((comment) => {
                const updatedComment = comment.data() as Comment
                updatedComment.userDisplayName = userInfo.avatar
                updatedComment.userDisplayName = userInfo.fullName
                batch.update(comment.ref, updatedComment)
            })

            // Set update batch for leftTies
            leftTies.forEach((leftTie) => {
                const updatedGraph = leftTie.data() as Graph
                const updatedLeftTie = updatedGraph.LeftMetadata as UserTie
                updatedLeftTie.avatar = userInfo.avatar
                updatedLeftTie.fullName = userInfo.fullName
                updatedGraph.LeftMetadata = updatedLeftTie
                batch.update(leftTie.ref, updatedGraph)
            })

            // Set update batch for rightTies
            rightTies.forEach((rightTie) => {
                const updatedGraph = rightTie.data() as Graph
                const updatedRightTie = updatedGraph.rightMetadata as UserTie
                updatedRightTie.avatar = userInfo.avatar
                updatedRightTie.fullName = userInfo.fullName
                updatedGraph.rightMetadata = updatedRightTie
                batch.update(rightTie.ref, updatedGraph)
            })

            const result = await batch.commit()
            return result

        }

    })