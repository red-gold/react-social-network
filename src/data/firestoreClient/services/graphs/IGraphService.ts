import { User } from 'core/domain/users'
import { Graph } from 'core/domain/graphs'
import firebase from 'firebase'

/**
 * Graph service interface
 *
 * @export
 * @interface IGraphService
 */
export interface IGraphService {
  /**
   * Add graph
   */
  addGraph: (graph: Graph, collection: string) => Promise<string>

  /**
   * Update graph
   */
  updateGraph: (graph: Graph, collection: string) => Promise<string>

  /**
   * Get graphs data
   */
  getGraphs: (collection: string, leftNode?: string | null, edgeType?: string, rightNode?: string | null) => Promise<Graph[]>

  /**
   * Delete graph by node identifier
   */
  deleteGraphByNodeId: (nodeId: string) => Promise<void>

/**
 * Delete graph
 */
  deleteGraph: (collection: string, leftNode?: string | null, edgeType?: string, rightNode?: string | null) => Promise<void>
}
