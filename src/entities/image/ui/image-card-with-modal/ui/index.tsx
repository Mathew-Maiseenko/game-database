'use client'
import { AppDispatch } from '@/shared/lib'
import Image from 'next/image'
import emptyImage from '../../../../../../public/empty-image.svg'
import { imageModalSlice } from '@/entities/image/model/image-modal-slice'

interface ImageObj {
	image?: string | null
	alt?: string | null
}

interface ImageCardWithModalProps {
	dispatch: AppDispatch
	classes?: string
	imageList?: ImageObj[]
	imageIndexInList?: number
	image?: string
	alt: string
}

export function ImageCardWithModal({
	imageList,
	imageIndexInList,
	image,
	alt,
	classes,
	dispatch,
}: ImageCardWithModalProps) {
	return (
		<Image
			alt={alt}
			src={image ? image : emptyImage}
			width={1920}
			height={1080}
			className={`cursor-pointer rounded-2xl ${classes}`}
			onClick={() => {
				if (imageList && imageIndexInList !== undefined) {
					dispatch(imageModalSlice.actions.setModalImages(imageList))
					dispatch(
						imageModalSlice.actions.setCurrentModalImageId(imageIndexInList)
					)
				}
			}}
		/>
	)
}
