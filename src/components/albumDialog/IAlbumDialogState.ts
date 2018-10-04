import { UserPermissionType } from 'core/domain/common/userPermissionType'

export interface IAlbumDialogState {
    [key: string]: any
    acceptedFiles: any[]
    rejectedFiles: any[]
    activeStep: number
    nextDisabled: boolean
    saveDisabled: boolean
    description: string
    albumName: string
    selectedPhotos: { file: any, fileName: string }[]
    accessUserList: Array<string>
    permission: UserPermissionType
    permissionOpen: boolean
    descriptionError: string
    albumNameError: string
}
