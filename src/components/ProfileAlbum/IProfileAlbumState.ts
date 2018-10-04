import { ActiveTabType } from './activeTabType'

export interface IProfileAlbumState {
    activeTab: ActiveTabType
    acceptedFiles: any[],
    rejectedFiles: any[],
    albumDialogOpen: boolean
}
