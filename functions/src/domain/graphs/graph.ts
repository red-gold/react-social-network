import { BaseDomain } from '../common'

export class Graph extends BaseDomain {

  constructor (
    /**
     * Left node of graph
     */
  public leftNode: string,

   /**
    * Graph relationship type
    */
  public edgeType: string,

   /**
    * Right node of graph
    */
  public rightNode: string,

   /**
    * Graph left node metadata
    */
  public LeftMetadata: any,

  /**
   * Graph right node metadata
   */
  public rightMetadata: any,

  /**
   * Graph metadata
   */
  public graphMetadata: any,

  /**
   * Graph node identifier
   */
  public nodeId?: string

  ) { super() }

}
