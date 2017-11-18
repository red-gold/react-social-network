import { BaseDomain } from 'core/domain/common'

export class Profile extends BaseDomain {
  constructor (
    public avatar: string,
    public fullName: string,
    public banner: string,
    public tagLine: string,
    public email?: string | null) {
    super()

  }

}
