import { Photo } from 'core/domain/imageGallery/photo'
import { Post } from 'core/domain/posts'

export interface IPostAlbumProps {
    classes?: any
    images: any[]
    currentAlbum: Post
}
