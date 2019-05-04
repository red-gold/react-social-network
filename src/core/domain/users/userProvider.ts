/**
 * User provide data
 *
 * @export
 * @class UserProvider
 */
export class UserProvider {

  // eslint-disable-next-line
  constructor (
       public userId: string,
       public email: string,
       public fullName: string,
       public avatar: string,
       public providerId: string,
       public provider: string,
       public accessToken: string
    ) {}
}
