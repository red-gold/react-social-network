import { IHttpService } from 'core/services/webAPI'
import { injectable } from 'inversify'
import { SocialProviderTypes } from 'core/socialProviderTypes'
import { inject } from 'inversify'
import config from 'src/config'
import axios from 'axios'
import { IPermissionService } from 'src/core/services/security/IPermissionService'

@injectable()
export class HttpService implements IHttpService {

    private _permissionService: IPermissionService

    constructor(
        @inject(SocialProviderTypes.PermissionService) permissionService: IPermissionService
    ) { 
        this._permissionService = permissionService
        this.get = this.get.bind(this)
        this.post = this.post.bind(this)
    }

    /**
     * Http get
     */
    public async get(url: string, params?: any) {
        const idToken: string = await this._permissionService.getIdToken()
        const result = await axios
            .get(`${config.settings.api}${url}`,
                {
                    headers: { 'authorization': `Bearer ${idToken}` }
                }
            )
        return result
    }

    /**
     * Http Post
     */
    public async post(url: string, payload?: any) {
        const idToken: string = await this._permissionService.getIdToken()
        const result = await axios
            .post(`${config.settings.api}${url}`,
                payload,
                {
                    headers: { 'authorization': `Bearer ${idToken}` }
                }
            )
        return result
    }

    /**
     * Http get by token id
     */
    public async getWithoutAuth(url: string, params?: any) {
        const idToken: string = await this._permissionService.getIdToken()
        const result = await axios
            .get(`${config.settings.api}${url}`)
        return result
    }

    /**
     * Http Post by token id
     */
    public async postWithoutAuth(url: string, payload?: any) {
        const result = await axios
            .post(`${config.settings.api}${url}`,
                payload
            )
        return result
    }

}