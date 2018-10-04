import StringAPI from 'api/StringAPI'
import { ServerRequestType } from 'constants/serverRequestType'
import { ServerRequestModel } from 'models/server/serverRequestModel'
import { ServerRequestStatusType } from 'store/actions/serverRequestStatusType'

const createAlbumRequest = (userId: string) => {
    const requestId = StringAPI.createServerRequestId(ServerRequestType.GalleryCreateAlbum, userId)
    return new ServerRequestModel(
        ServerRequestType.GalleryCreateAlbum,
        requestId,
        '',
        ServerRequestStatusType.Sent
    )
}
export const GalleryAPI = {
    createAlbumRequest
}