import * as functions from 'firebase-functions'
import { adminDB, firestoreDB } from '../../data/index'
import { Graph } from '../../domain/graphs'

/**
 * On delete circle
 */
export const onDeleteCircle = functions.firestore
    .document(`users/{userId}/circles/{circleId}`)
    .onDelete(async (dataSnapshot, context) => {
        const userId = context.params.userId
        const circleId = context.params.circleId
        const authedId = context.auth
        const graphUserRef = firestoreDB.collection('graphs:users')
        const userTies = await graphUserRef
            .where(`graphMetadata.circleIds.${circleId}`, '==', true).get()
        const promiseList$ = []
        for (let index = 0; index < userTies.docs.length; index++) {
            const doc = userTies.docs[index]
            const userTie = doc.data() as Graph
            const circleIds = userTie.graphMetadata.circleIds
            let updatedCircles = {}
            const newCircles = Object.keys(circleIds)
                .filter((circleKey) => circleKey !== circleId).forEach((circleKey) => {
                    updatedCircles = {
                        ...updatedCircles,
                        [circleKey]: true
                    }
                })
            promiseList$.push(doc.ref.update(`graphMetadata.circleIds`, updatedCircles))
        }
        const result = await Promise.all(promiseList$)
        return result

    })