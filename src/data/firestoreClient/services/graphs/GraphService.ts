// - Import react components
import firebase, { firebaseRef, firebaseAuth, db } from 'data/firestoreClient'
import { SocialError } from 'core/domain/common'
import { Graph } from 'core/domain/graphs'
import { IGraphService } from './IGraphService'
import { injectable } from 'inversify'

/**
 * Firbase graph service
 *
 * @export
 * @class GraphService
 * @implements {IGraphService}
 */
@injectable()
export class GraphService implements IGraphService {

  /**
   * Add graph
   */
  public addGraph: (graph: Graph, collection: string)
    => Promise<string> = (graph, collection) => {
      return new Promise<string>((resolve,reject) => {

        let graphRef = db.collection(`graphs:${collection}`).doc()
        graphRef.set({...graph, nodeId: graphRef.id})
        .then(() => {
          resolve(graphRef.id)
        })
        .catch((error: any) => {
          reject(new SocialError(error.code,error.message))
        })
      })
    }

  /**
   * Update graph
   */
  public updateGraph: (graph: Graph, collection: string)
  => Promise<string> = (graph, collection) => {
    return new Promise<string>((resolve,reject) => {
      const graphData = this.getGraphs(collection, graph.leftNode, graph.edgeType, graph.rightNode)
      .then((result) => {
        graph.nodeId = result[0].nodeId
        let graphRef = db.collection(`graphs:${collection}`).doc(result[0].nodeId)
        .set({...graph}).then((result) => {
          resolve()
        })
      }).catch((error: any) => {
        reject(new SocialError(error.code,error.message))
      })
    })
  }

    /**
     * Get graphs data
     */
  public getGraphs: (collection: string, leftNode?: string | null, edgeType?: string, rightNode?: string | null)
    => Promise<Graph[]> = (collection, leftNode, edgeType, rightNode) => {
      return new Promise<Graph[]>((resolve,reject) => {

        this.getGraphsQuery(collection,leftNode,edgeType,rightNode).then((result) => {
          let parsedData: Graph[] = []
          result.forEach((item) => {
            parsedData.push(item.data() as Graph)
          })
          resolve(parsedData)
        })

      })
    }

  /**
   * Delete graph by node identifier
   */
  public deleteGraphByNodeId: (nodeId: string)
  => Promise<void> = (nodeId) => {
    return new Promise<void>((resolve,reject) => {
      db.collection('graphs:users').doc(nodeId).delete()
      .then(function () {
        resolve()
      })
      .catch(reject)

    })
  }

  /**
   * Delete graph
   */
  public deleteGraph: (collection: string, leftNode?: string | null, edgeType?: string, rightNode?: string | null)
    => Promise<void> = (collection, leftNode, edgeType, rightNode) => {
      return new Promise<void>((resolve,reject) => {
        this.getGraphsQuery(collection, leftNode, edgeType, rightNode)
        .then((snapshot) => {

            // Delete documents in a batch
          let batch = db.batch()
          snapshot.docs.forEach(function (doc: any) {
            batch.delete(doc.ref)
          })

          batch.commit().then(function () {
            resolve()
          })
        })
        .catch(reject)

      })
    }

  /**
   * Get graphs query
   */
  private getGraphsQuery: (collection: string, leftNode?: string | null, edgeType?: string, rightNode?: string | null)
    => Promise<firebase.firestore.QuerySnapshot> = (collection, leftNode, edgeType, rightNode) => {
      return new Promise<firebase.firestore.QuerySnapshot>((resolve,reject) => {
        let graphsRef = db.collection(`graphs:${collection}`) as any

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

}
