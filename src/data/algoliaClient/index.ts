import algoliasearch from 'algoliasearch'
import config from 'src/config'

export const searchClient = algoliasearch(config.algolia.appId, config.algolia.apiKey)
