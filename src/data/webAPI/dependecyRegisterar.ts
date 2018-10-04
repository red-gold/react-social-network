import { IHttpService } from 'core/services/webAPI'
import { SocialProviderTypes } from 'core/socialProviderTypes'
import { Container } from 'inversify/dts/container/container'
import { HttpService } from 'data/webAPI/services/httpService'

/**
 * Register http service dependecies
 */
export const useHttpService = (container: Container) => {
  container.bind<IHttpService>(SocialProviderTypes.Httpervice).to(HttpService)

}
