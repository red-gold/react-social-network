import { BaseDomain } from 'core/domain/common'

export class Graph extends BaseDomain {

  constructor (
    /**
     * Left node of graph
     *
     * @type {string}
     * @memberof Graph
     */
  public leftNode: string,

   /**
    * Graph relationship type
    *
    * @type {number}
    * @memberof Graph
    */
  public edgeType: string,

   /**
    * Right node of graph
    *
    * @type {string}
    * @memberof Graph
    */
  public rightNode: string,

   /**
    * Graph left node metadata
    *
    * @memberof Graph
    */
  public LeftMetadata: any,

  /**
   * Graph right node metadata
   *
   * @memberof Graph
   */
  public rightMetadata: any,

  /**
   * Graph metadata
   *
   * @type {string}
   * @memberof Graph
   */
  public graphMetadata: any,

  /**
   * Graph node identifier
   *
   * @type {string}
   * @memberof Graph
   */
  public nodeId?: string

  ) { super() }

}
