import { BaseDomain } from '../common'

export class Profile extends BaseDomain {
  constructor (
    public avatar: string,
    public fullName: string,
    public banner: string,
    public tagLine: string,
    public creationDate: number,
    public email: string = '',
    public birthday: number = 0,
    public webUrl: string = '',
    public companyName: string = '',
    public twitterId: string = '',
    public voteCount: number = 0,
    public shareCount: number = 0,
    public followCount: number = 0,
    public postCount: number = 0,
    public userId: string = ''
  ) {
    super()

  }

}
