'use client'
import { gameDetailsSlice } from '@/entities/game/game-details/model'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import { CrossIcon, Modal } from '@/shared/ui'
import Image from 'next/image'
import { memo, useEffect } from 'react'

interface ImageModalProps {
	image?: string
	alt?: string
}

export const ImageModal = memo(function ImageModal({
	image,
	alt,
}: ImageModalProps) {
	const dispatch = useAppDispatch()

	const ModalsImage = useAppSelector(
		gameDetailsSlice.selectors.selectCurrentModalImage
	)

	const isImageModalOpen = !!ModalsImage

	useEffect(() => {
		if (isImageModalOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [isImageModalOpen])

	return (
		<Modal isOpen={isImageModalOpen}>
			<section className='relative border-2 border-solid border-textGray bg-darkGray sm:w-1/3 lg:w-2/5 py-24 px-20 rounded-3xl'>
				<article
					className='flex absolute top-5 left-5 w-full '
					onClick={() =>
						dispatch(gameDetailsSlice.actions.clearCurrentModalImage())
					}
				>
					<CrossIcon classes='sm:w-7 lg:w-10' />
				</article>
				<Image
					src={image ? image : ''}
					width={2560}
					height={1440}
					alt={alt ? alt : ''}
				/>
			</section>
		</Modal>
	)
})
