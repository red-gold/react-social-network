
/**
 * Http service interface
 */
export interface IHttpService {
 get: (url: string, params?: any) => Promise<any>
 post: (url: string, payload?: any) => Promise<any>
 getWithoutAuth: (url: string, params?: any) => Promise<any>
 postWithoutAuth: (url: string, payload?: any) => Promise<any>
}
