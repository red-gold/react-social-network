import { UserPermissionType } from 'core/domain/common/userPermissionType'

export interface IUserPermissionState {
    [key: string]: any

    /**
     * Selected Permission
     */
    selectedValue: UserPermissionType

    /**
     * Whether OK button is disabled
     */
    disabledOk: boolean
}
