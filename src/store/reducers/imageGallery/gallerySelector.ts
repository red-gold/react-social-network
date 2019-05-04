import { PostAPI } from 'api/PostAPI';
import { List, Map } from 'immutable';
import { createSelector } from 'reselect';

const getImages = (state: Map<string, any>) => {
    return state.getIn(['imageGallery', 'entities'], Map({})) as Map<string, any>
}

const hasMoreImages = (state: Map<string, any>, props: {albumId: string}) => {
    return state.getIn(['imageGallery',  'album', props.albumId, 'hasMoreData'], true)
}

const getAlbumImages = (state: Map<string, any>, props: { albumId: string }) => {
    const images: Map<string, boolean> = state.getIn(['imageGallery', 'album', props.albumId, 'list'], Map({}))
    return images
}

const getAvatarImages = (state: Map<string, any>, props: { userId: string }) => {
    const images: Map<string, boolean> = state.getIn(['imageGallery', 'avatar', props.userId, 'list'], Map({}))
    return images
}

const getCoverImages = (state: Map<string, any>, props: { userId: string }) => {
    const images: Map<string, boolean> = state.getIn(['imageGallery', 'cover', props.userId, 'list'], Map({}))
    return images
}

const getAlbumLastImageId = (state: Map<string, any>, props: { albumId: string }) => {
    return state.getIn(['imageGallery', 'album', props.albumId, 'lastImageId'], '')
}

/****************************
 * Selectors
 ***************************/
const selectImages = () => {
    return createSelector(
        [getImages],
        (images) => images
    )
}

const selectLastImageId = () => {
    return createSelector(
        [getAlbumLastImageId],
        (imageId) => imageId
    )
}

const selectMoreImages = () => {
    return createSelector(
        [hasMoreImages],
        (moreImages) => moreImages
    )
}

const selectAlbumImages = () => {
    return createSelector(
        [getAlbumImages, getImages],
        (albumImages, images) => {
            let mappedImages: List<Map<string, any>> = List([])
            albumImages.forEach((exist, postId) => {
                if (exist) {
                    let existPost = images.get(postId!)
                    if (existPost) {
                        existPost = existPost.set('original', existPost.get('url') )
                        existPost = existPost.set('src', existPost.get('url') )
                        existPost = existPost.set('title', existPost.get('caption', '') )
                        existPost = existPost.set('description', '' )
                        mappedImages = mappedImages.push(existPost)
                    }
                }
            })
            
            if (mappedImages.isEmpty()) {
                return List([])
            }
            
            return PostAPI.sortImuObjectsDate(mappedImages)
        }
    )
}

const selectAvatarImages = () => {
    return createSelector(
        [getAvatarImages, getImages],
        (albumImages, images) => {
            let mappedImages: List<Map<string, any>> = List([])

            albumImages.forEach((exist, postId) => {
                if (exist) {
                    let existPost = images.get(postId!)
                    if (existPost) {
                        mappedImages = mappedImages.push(existPost)
                    }
                }
            })
            
            if (mappedImages.isEmpty()) {
                return List([])
            }
            const sortedImages = PostAPI.sortImuObjectsDate(mappedImages)
            
            return sortedImages
        }
    )
}

const selectCoverImages = () => {
    return createSelector(
        [getCoverImages, getImages],
        (albumImages, images) => {
            let mappedImages: List<Map<string, any>> = List([])
            albumImages.forEach((exist, postId) => {
                if (exist) {
                    let existPost = images.get(postId!)
                    if (existPost) {
                        mappedImages = mappedImages.push(existPost)
                    }
                }
            })
            
            if (mappedImages.isEmpty()) {
                return List([])
            }
            
            return PostAPI.sortImuObjectsDate(mappedImages)
        }
    )
}

export const gallerySelector = {
    getImages,
    hasMoreImages,
    getAlbumImages,
    selectImages,
    getAlbumLastImageId,
    selectLastImageId,
    selectMoreImages,
    selectAlbumImages,
    selectAvatarImages,
    selectCoverImages
}