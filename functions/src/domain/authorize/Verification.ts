export class Verification {
    constructor(
        public id: string,
        public code: string,
        public target: string,
        public creationDate: number,
        public remoteIpAddress: string,
        public userId: string,
        public isVerified = false
    ) {}
}