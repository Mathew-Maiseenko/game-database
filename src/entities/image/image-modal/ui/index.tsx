'use client'
import { gameDetailsSlice } from '@/entities/game/game-details/model'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import { CrossIcon, Modal } from '@/shared/ui'
import Image from 'next/image'
import { memo, useEffect } from 'react'

export const ImageModal = memo(function ImageModal() {
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
			<section className='relative border-2 border-solid border-textGray bg-darkGray sm:w-1/3 lg:w-3/5 rounded-3xl overflow-hidden'>
				<article
					className='flex absolute top-5 left-5 w-full '
					onClick={() =>
						dispatch(gameDetailsSlice.actions.clearCurrentModalImage())
					}
				>
					<CrossIcon classes='sm:w-7 lg:w-10' />
				</article>
				<Image
					src={ModalsImage?.image ? ModalsImage.image : ''}
					width={2560}
					height={1440}
					alt={ModalsImage?.alt ? ModalsImage.alt : ''}
				/>
			</section>
		</Modal>
	)
})
