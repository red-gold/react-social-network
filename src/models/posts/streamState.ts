export class StreamState {
    constructor(
       public hasMoreData: boolean,
       public list: string[],
       public lastPostId: string,
    ) {}
}