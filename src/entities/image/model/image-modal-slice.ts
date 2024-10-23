import { createAppSlice } from '@/shared/lib'
import { PayloadAction } from '@reduxjs/toolkit'

interface ImageObj {
	image?: string | null
	alt?: string | null
}

interface initialGameDetailsStateType {
	modalImages: ImageObj[] | undefined
	currentModalImageId: number | undefined
}

const initialGameDetailsState: initialGameDetailsStateType = {
	modalImages: undefined,
	currentModalImageId: undefined,
}

export const imageModalSlice = createAppSlice({
	name: 'imageWithModal',
	initialState: initialGameDetailsState,
	selectors: {
		selectModalImages: state => state.modalImages,
		selectCurrentModalImageId: state => state.currentModalImageId,
	},
	reducers: {
		setModalImages: (state, action: PayloadAction<ImageObj[]>) => {
			state.modalImages = action.payload
		},
		setCurrentModalImageId: (state, action: PayloadAction<number>) => {
			state.currentModalImageId = action.payload
		},
		clearImageModal: state => {
			state.modalImages = undefined
			state.currentModalImageId = undefined
		},
	},
})
