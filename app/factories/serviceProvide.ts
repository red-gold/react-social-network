//#region Interfaces

import { IServiceProvider } from "factories";
import { IAuthorizeService } from "services/authorize";

//#endregion

//#region Service implemented classes

    // - Firebase services
    import { AuthorizeService } from "firebaseServices/authorize";

//#endregion

export class ServiceProvide implements IServiceProvider {

    /**
     * Create instant for AuthorizeService
     * 
     * @memberof ServiceProvide
     */
    createAuthorizeService: () => IAuthorizeService = () => {
        return new AuthorizeService();
    }
    
}