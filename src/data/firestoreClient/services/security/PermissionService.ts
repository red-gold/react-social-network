// - Import react components
import { firebaseAuth } from 'data/firestoreClient'
import { injectable } from 'inversify'
import { IPermissionService } from 'core/services/security/IPermissionService'
/**
 * Permission service
 */
@injectable()
export class PermissionService implements IPermissionService {
  
  constructor() {
    this.getIdToken = this.getIdToken.bind(this)
  }

  /**
   * Get current user id token
   */
  public getIdToken: () => Promise<string> = async () => {
    const currentUser = firebaseAuth().currentUser
    if (currentUser) {
      const token = await currentUser.getIdToken()
      return token
    }
    return localStorage.getItem('red-gold.scure.token') as string
  }

}
