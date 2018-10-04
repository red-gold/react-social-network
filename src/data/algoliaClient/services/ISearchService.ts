import { IQueryParameters } from 'core/domain/search/IQueryParameters'

/**
 * Search service interface
 */
export interface ISearchService {
    search: (query: IQueryParameters) => any
}
