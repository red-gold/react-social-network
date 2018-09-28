export class Email {
    constructor(
        public from: string,
        public to: string,
        public subject: string,
        public html?: string,
        public text?: string

    ) {
        
    }
}