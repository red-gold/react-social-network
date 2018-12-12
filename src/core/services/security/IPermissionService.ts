
/**
 * Authentication service interface
 */
export interface IPermissionService {

  /**
   * Get current user id token
   */
  getIdToken: () =>  Promise<string>
}
