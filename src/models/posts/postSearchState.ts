export class PostSearchState {
    constructor(
       public hasMoreData: boolean,
       public list: string[],
       public lastPostId: string,
    ) {}
}