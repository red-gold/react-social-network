import { IHttpService } from 'core/services/webAPI'
import { injectable } from 'inversify'
import { IAuthorizeService } from 'core/services'
import { SocialProviderTypes } from 'core/socialProviderTypes'
import { inject } from 'inversify'
import config from 'src/config'
import axios from 'axios'

@injectable()
export class HttpService implements IHttpService {

    private _authService: IAuthorizeService

    constructor(
        @inject(SocialProviderTypes.AuthorizeService) authService: IAuthorizeService
    ) { 
        this._authService = authService
        this.get = this.get.bind(this)
        this.post = this.post.bind(this)
    }

    /**
     * Http get
     */
    public async get(url: string, params?: any) {
        const idToken: string = await this._authService.getIdToken()
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
        const idToken: string = await this._authService.getIdToken()
        const result = await axios
            .post(`${config.settings.api}${url}`,
                payload,
                {
                    headers: { 'authorization': `Bearer ${idToken}` }
                }
            )
        return result
    }
}