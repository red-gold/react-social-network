import { UserTie } from '../../domain/circles/userTie'
import { graphService } from '../graph/graphService'
import { SocialError } from '../../domain/common/socialError'
import * as functions from 'firebase-functions'
import { adminDB, firestoreDB } from '../../data/index'

/**
 * Get the users who tied current user
 */
const getUserTieSender: (userId: string)
    => Promise<{ [userId: string]: UserTie }> = (userId) => {
        return new Promise<{ [userId: string]: UserTie }>((resolve, reject) => {
            graphService
                .getGraphs(
                    'users',
                    null,
                    'TIE',
                    userId
                )
                .then((result) => {
                    let parsedData: { [userId: string]: UserTie } = {}

                    result.forEach((node) => {
                        const leftUserInfo: UserTie = node.LeftMetadata
                        const rightUserInfo: UserTie = node.rightMetadata
                        const metada: { creationDate: number, circleIds: string[] } = node.graphMetadata
                        parsedData = {
                            ...parsedData,
                            [leftUserInfo.userId!]: {
                                ...leftUserInfo,
                                circleIdList: []
                            }
                        }
                    })
                    resolve(parsedData)
                })
                .catch((error: any) => reject(new SocialError(error.code, 'firestore/getUserTieSender :' + error.message)))
        })
    }

export const tieService = {
    getUserTieSender
}