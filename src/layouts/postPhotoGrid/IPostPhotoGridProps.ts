import { Photo } from 'core/domain/imageGallery/photo'

export interface IPostPhotoGridProps {
    classes?: any
    images: Photo[]
    onClick?: (event: React.MouseEvent<HTMLDivElement>, index: number) => void
}
