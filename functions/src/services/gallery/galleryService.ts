
import * as functions from 'firebase-functions'
import { adminDB, firestoreDB, searchClient } from '../../data/index'
import { Photo } from '../../domain/imageGallery/photo'

/**
 * Handle on delete image
 */
export const onDeleteImage = functions.firestore.document('users/{userId}/images/{imageId')
    .onDelete(async (dataSnapshot, context) => {
        const userId = context.params.userId
        const image = dataSnapshot.data() as Photo

        return true
    })
