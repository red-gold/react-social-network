// - Import react components

import firebase, { firebaseAuth, db } from 'data/firestoreClient'
import moment from 'moment/moment'
import { Map, List } from 'immutable'

import { SocialError } from 'core/domain/common'
import { UserProvider, User } from 'core/domain/users'
import { IUserTieService } from 'core/services/circles'
import { inject, injectable } from 'inversify'
import { FirestoreClientTypes } from '../../firestoreClientTypes'
import { IGraphService } from '../graphs/IGraphService'
import { Graph } from 'core/domain/graphs'
import { UserTie } from 'core/domain/circles'

/**
 * Firbase user service
 */
@injectable()
export class UserTieService implements IUserTieService {

  @inject(FirestoreClientTypes.GraphService) private _graphService: IGraphService
  constructor(
  ) {
  }

  /**
   * Tie users
   */
  public tieUseres: (userTieSenderInfo: UserTie, userTieReceiveInfo: UserTie, circleIds: string[])
    => Promise<void> = (userTieSenderInfo, userTieReceiveInfo, circleIds) => {
      return new Promise<void>((resolve, reject) => {
        let mappedCircles = {}
        circleIds.forEach((circleKey) => {
          mappedCircles = {
            ...mappedCircles,
            [circleKey]: true
          }
        })
        this._graphService
          .addGraph(
            new Graph(
              userTieSenderInfo.userId!,
              'TIE',
              userTieReceiveInfo.userId!,
              { ...userTieSenderInfo },
              { ...userTieReceiveInfo },
              { creationDate: Date.now(), circleIds: mappedCircles }
            )
            , 'users'
          ).then((result) => {
            resolve()

          })
          .catch((error: any) => reject(new SocialError(error.code, 'firestore/tieUseres :' + error.message)))
      })
    }

  /**
   * Update users tie
   */
  public updateUsersTie: (userTieSenderInfo: UserTie, userTieReceiveInfo: UserTie, circleIds: string[])
    => Promise<void> = (userTieSenderInfo, userTieReceiveInfo, circleIds) => {
      return new Promise<void>((resolve, reject) => {
        let mappedCircles = {}
        circleIds.forEach((circleKey) => {
          mappedCircles = {
            ...mappedCircles,
            [circleKey]: true
          }
        })
        this._graphService
          .updateGraph(
            new Graph(
              userTieSenderInfo.userId!,
              'TIE',
              userTieReceiveInfo.userId!,
              { ...userTieSenderInfo },
              { ...userTieReceiveInfo },
              { creationDate: Date.now(), circleIds: mappedCircles }
            )
            , 'users'
          ).then(() => {
            resolve()

          })
          .catch((error: any) => reject(new SocialError(error.code, 'firestore/updateUsersTie :' + error.message)))
      })
    }

  /**
   * Remove users' tie
   */
  public removeUsersTie: (firstUserId: string, secondUserId: string)
    => Promise<void> = (firstUserId, secondUserId) => {
      return new Promise<void>((resolve, reject) => {
        this.getUserTiesWithSeconUser(firstUserId, secondUserId).then((userTies) => {
          if (userTies.length > 0) {
            this._graphService.deleteGraphByNodeId(userTies[0].nodeId!).then(resolve)
          }
        })
          .catch((error: any) => reject(new SocialError(error.code, 'firestore/removeUsersTie :' + error.message)))
      })
    }

  /**
   * Get user ties
   */
  public getUserTies = async (userId: string) => {
    try {
      const result = await this._graphService
        .getGraphs(
          'users',
          userId,
          'TIE')

      let parsedData: Map<string, any> = Map({})
      result.forEach((node) => {
        const leftUserInfo: UserTie = node.LeftMetadata
        const rightUserInfo: UserTie = node.rightMetadata
        const metadata: { creationDate: number, circleIds: string[] } = node.graphMetadata
        parsedData.set(rightUserInfo.userId!,
          Map({
            ...rightUserInfo,
            circleIdList: metadata ? List(Object.keys(metadata.circleIds)) : List([])
          }))
      })
      return parsedData

    } catch (error) {
      throw new SocialError(error.code, 'firestore/getUserTies :' + error.message)
    }
  }

  /**
   * Get the users who tied current user
   */
  public getUserTieSender = async (userId: string) => {

    try {
      const result = await this._graphService
        .getGraphs(
          'users',
          null,
          'TIE',
          userId
        )

      let parsedData: Map<string, any> = Map({})

      result.forEach((node) => {
        const leftUserInfo: UserTie = node.LeftMetadata
        const rightUserInfo: UserTie = node.rightMetadata
        const metada: { creationDate: number, circleIds: string[] } = node.graphMetadata
        parsedData.set(leftUserInfo.userId!,
          Map({
            ...leftUserInfo,
            circleIdList: List([])
          }))
      })
      return parsedData

    } catch (error) {

      throw new SocialError(error.code, 'firestore/getUserTieSender :' + error.message)
    }

  }

  /**
   * Get user ties with second user identifier
   */
  private getUserTiesWithSeconUser: (userId: string, secondUserId: string)
    => Promise<Graph[]> = (userId, secondUserId) => {
      return new Promise<Graph[]>((resolve, reject) => {
        this._graphService
          .getGraphs(
            'users',
            userId,
            'TIE',
            secondUserId
          ).then(resolve)
          .catch(reject)
      })
    }
}
