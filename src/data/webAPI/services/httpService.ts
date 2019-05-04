import { IHttpService } from 'core/services/webAPI'
import { injectable } from 'inversify'
import { SocialProviderTypes } from 'core/socialProviderTypes'
import { inject } from 'inversify'
import config from 'src/config'
import axios from 'axios'
import { IPermissionService } from 'src/core/services/security/IPermissionService'
import { SocialError } from 'src/core/domain/common';

@injectable()
export class HttpService implements IHttpService {

    @inject(SocialProviderTypes.PermissionService) private _permissionService: IPermissionService

    constructor(
    ) {
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
    public async getWithoutAuth(url: string) {
        await this._permissionService.getIdToken()
        const result = await axios
            .get(`${config.settings.api}${url}`)
        return result
    }

    /**
     * Http Post by token id
     */
    public async postWithoutAuth(url: string, payload?: any) {
        try {
            const result = await axios
                .post(`${config.settings.api}${url}`,
                    payload
                )
            return result.data

        } catch (error) {
            console.log(error)
            let errorData = new SocialError('HttpService/WrongSetting', 'Error happened!')
           
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                const {data} = error.response
                if (data.isError) {
                    errorData.code = data.code
                    errorData.message = data.message
                } else {
                    errorData.code = 'HttpService/postWithoutAuth/NotValidRequest'
                    errorData.message = `The request was made and the server responded with a status code that falls out of the range of 2xx`
                }


              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                
                errorData.code = 'HttpService/postWithoutAuth/NoResponse'
                errorData.message = `
                The request was made but no response was received
                error.request is an instance of XMLHttpRequest in the browser and an instance of
                http.ClientRequest in node.js
                `

              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                errorData.code = 'HttpService/postWithoutAuth/WrongSetting'
                errorData.message = `
                Something happened in setting up the request that triggered an Error
                `
              }
              console.log(error.config);
              throw errorData
        }
    }

}