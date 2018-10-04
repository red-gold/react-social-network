export class UserClaim {
    constructor(
        public displayName: string,
        public email: string,
        public emailVerified: boolean,
        public isAnonymous: boolean,
        public metadata: any,
        public phoneNumber: string,
        public photoURL: string,
        public providerData: any,
        public providerId: any,
        public refreshToken: string,
        public uid: string,
        public phoneVerified: boolean
    ) {

    }
}