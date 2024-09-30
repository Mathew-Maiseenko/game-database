'use client'
import { gameDetailsSlice } from '@/entities/game/game-details/model'
import { AppDispatch } from '@/shared/lib'
import { useAppDispatch } from '@/shared/lib/redux/hooks'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface ImageCardWithModalProps {
	dispatch: AppDispatch
	classes?: string
	image?: string
	alt: string
}

export function ImageCardWithModal({
	image,
	alt,
	classes,
	dispatch,
}: ImageCardWithModalProps) {
	return (
		<Image
			alt={alt}
			src={image ? image : ''}
			width={1920}
			height={1080}
			className={classes}
			onClick={() => {
				if (image) {
					dispatch(
						gameDetailsSlice.actions.setCurrentModalImage({ image, alt })
					)
				}
			}}
		/>
	)
}
