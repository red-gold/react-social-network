import {IAuthorizeService} from 'services/authorize/IAuthorizeService'
export interface IServiceProvider{
    /**
     * Create authorize service
     * 
     * @memberof IServiceProvider
     */
    createAuthorizeService : () => IAuthorizeService;

}