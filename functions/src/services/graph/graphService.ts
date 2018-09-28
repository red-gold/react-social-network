import * as functions from 'firebase-functions'
import * as firebase from 'firebase-admin'
import { adminDB, firestoreDB } from '../../data/index'
import { Graph } from '../../domain/graphs'
import { Profile } from '../../domain/users'
import { Notification } from '../../domain/notifications'
import { NotificationType } from '../../domain/notifications/notificationType'

/**
 * On create graph user
 */
export const onCreateGraphUser = functions.firestore.document('graphs:users/{graphId}')
    .onCreate(async (dataSnapshot, context) => {
        if (dataSnapshot.exists) {
            const creationDate = dataSnapshot.createTime!
            const graphUser = dataSnapshot.data() as Graph
            if (graphUser.edgeType === 'TIE') {
                const notifier = graphUser.LeftMetadata as Profile
                const notified = graphUser.rightMetadata as Profile
                const notificationRef = firestoreDB.doc(`users/${notified.userId}`).collection(`notifications`).doc()
                const notificationId = notificationRef.id

                const notification = new Notification(
                    notificationId,
                    `Follow: ${notifier.fullName} is following you.`,
                    `/${notifier.userId}`,
                    creationDate.seconds,
                    notifier.userId,
                    { ...notifier },
                    notified.userId,
                    false,
                    NotificationType.OnFollow,
                    notified.userId
                )

                const notificationSet$ = notificationRef.set({ ...notification })

                /**
                 * Update users follow count
                 */
                const leftUserRef = firestoreDB.collection('userInfo').doc(graphUser.leftNode)
                const rightUserRef = firestoreDB.collection('userInfo').doc(graphUser.rightNode)

                const userLeftUpdate$ = firestoreDB.runTransaction((transaction) => {
                    // This code may get re-run multiple times if there are conflicts.
                    return transaction.get(leftUserRef).then((userDoc) => {
                        if (!userDoc.exists) {
                            throw 'Document does not exist!'
                        }
                
                        var newFollowCount = userDoc.data().followCount + 1
                        transaction.update(leftUserRef, { followCount: newFollowCount })
                    })
                })

                const userRightUpdate$ = firestoreDB.runTransaction((transaction) => {
                    // This code may get re-run multiple times if there are conflicts.
                    return transaction.get(rightUserRef).then((userDoc) => {
                        if (!userDoc.exists) {
                            throw 'Document does not exist!'
                        }
                
                        var newFollowerCount = userDoc.data().followerCount + 1
                        transaction.update(rightUserRef, { followerCount: newFollowerCount })
                    })
                })
                
                await Promise.all([notificationSet$, userRightUpdate$, userLeftUpdate$])
            }
        }
        return true
    })

/**
 * On delete graph user
 */
export const onDeleteGraphUser = functions.firestore.document('graphs:users/{graphId}')
    .onDelete(async (dataSnapshot, context) => {
        if (dataSnapshot.exists) {
            const creationDate = dataSnapshot.createTime!
            const graphUser = dataSnapshot.data() as Graph
            if (graphUser.edgeType === 'TIE') {

                /**
                 * Update users follow count
                 */
                const leftUserRef = firestoreDB.collection('userInfo').doc(graphUser.leftNode)
                const rightUserRef = firestoreDB.collection('userInfo').doc(graphUser.rightNode)

                const userLeftUpdate$ = firestoreDB.runTransaction((transaction) => {
                    // This code may get re-run multiple times if there are conflicts.
                    return transaction.get(leftUserRef).then((userDoc) => {
                        if (!userDoc.exists) {
                            throw 'Document does not exist!'
                        }
                
                        var newFollowCount = userDoc.data().followCount - 1
                        transaction.update(leftUserRef, { followCount: newFollowCount })
                    })
                })

                const userRightUpdate$ = firestoreDB.runTransaction((transaction) => {
                    // This code may get re-run multiple times if there are conflicts.
                    return transaction.get(rightUserRef).then((userDoc) => {
                        if (!userDoc.exists) {
                            throw 'Document does not exist!'
                        }
                
                        var newFollowerCount = userDoc.data().followerCount - 1
                        transaction.update(rightUserRef, { followerCount: newFollowerCount })
                    })
                })
                
                await Promise.all([userRightUpdate$, userLeftUpdate$])
            }
        }
        return true
    })

/**
 * Get graphs data
 */
const getGraphs: (collection: string, leftNode?: string | null, edgeType?: string, rightNode?: string | null)
    => Promise<Graph[]> = (collection, leftNode, edgeType, rightNode) => {
        return new Promise<Graph[]>((resolve, reject) => {

            getGraphsQuery(collection, leftNode, edgeType, rightNode).then((result) => {
                let parsedData: Graph[] = []
                result.forEach((item) => {
                    parsedData.push(item.data() as Graph)
                })
                resolve(parsedData)
            })

        })
    }

const getGraphsQuery: (collection: string, leftNode?: string | null, edgeType?: string, rightNode?: string | null)
    => Promise<firebase.firestore.QuerySnapshot> = (collection, leftNode, edgeType, rightNode) => {
        return new Promise<firebase.firestore.QuerySnapshot>((resolve, reject) => {
            let graphsRef = firestoreDB.collection(`graphs:${collection}`) as any

            if (leftNode != null) {
                graphsRef = graphsRef.where('leftNode', '==', leftNode)
            }
            if (rightNode && rightNode != null) {

                graphsRef = graphsRef.where('rightNode', '==', rightNode)
            }
            if (edgeType) {
                graphsRef = graphsRef.where('edgeType', '==', edgeType)
            }

            if (graphsRef) {
                graphsRef.get().then((result: any) => {

                    resolve(result)
                }).catch((error: any) => reject(error))
            } else {
                graphsRef.get().then((result: any) => {
                    resolve(result)
                }).catch((error: any) => reject(error))
            }

        })
    }

    export const graphService = {
        getGraphs
    }