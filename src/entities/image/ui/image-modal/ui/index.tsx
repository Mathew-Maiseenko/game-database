'use client'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import { ArrowIcon, CrossIcon, Modal } from '@/shared/ui'
import Image from 'next/image'
import emptyImage from '../../../../../../public/empty-image.svg'
import { memo, useEffect } from 'react'
import { imageModalSlice } from '@/entities/image/model/image-modal-slice'

export const ImageModal = memo(function ImageModal() {
	const dispatch = useAppDispatch()

	const ModalsImages = useAppSelector(
		imageModalSlice.selectors.selectModalImages
	)
	const curModalsImageId = useAppSelector(
		imageModalSlice.selectors.selectCurrentModalImageId
	)

	const isImageModalOpen = !!ModalsImages?.length
	console.log(isImageModalOpen)

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
		<Modal
			isOpen={isImageModalOpen}
			setModalCloseFunction={() =>
				dispatch(imageModalSlice.actions.clearImageModal())
			}
		>
			<section
				onClick={e => e.stopPropagation()}
				className='flex justify-center items-center relative border-2 border-solid bg-white border-lightThemeBorderGray dark:border-textGray dark:bg-darkGray w-2/3 lg:w-3/5 rounded-3xl overflow-hidden cursor-default box-content'
			>
				<article
					className='flex absolute top-5 left-5 w-full '
					onClick={() => dispatch(imageModalSlice.actions.clearImageModal())}
				>
					<CrossIcon classes='sm:w-7 lg:w-10' />
				</article>

				{curModalsImageId ? (
					<article
						className='flex absolute top-1/2 left-5 w-5 z-[70] cursor-pointer'
						onClick={() =>
							dispatch(
								imageModalSlice.actions.setCurrentModalImageId(
									curModalsImageId - 1
								)
							)
						}
					>
						<ArrowIcon styles='w-full h-auto transform rotate-90 fill-textGray' />
					</article>
				) : (
					''
				)}

				<Image
					className={
						curModalsImageId !== undefined && ModalsImages ? 'w-full' : 'w-1/3'
					}
					src={
						curModalsImageId !== undefined && ModalsImages
							? ModalsImages[curModalsImageId].image
							: emptyImage
					}
					width={2560}
					height={1440}
					alt={
						curModalsImageId !== undefined &&
						ModalsImages &&
						ModalsImages[curModalsImageId].alt
							? ModalsImages[curModalsImageId].alt
							: 'Game image'
					}
				/>

				{curModalsImageId !== undefined &&
				curModalsImageId + 1 !== ModalsImages?.length ? (
					<article
						className='flex absolute top-1/2 right-5 w-5 z-[70] cursor-pointer'
						onClick={() =>
							dispatch(
								imageModalSlice.actions.setCurrentModalImageId(
									curModalsImageId + 1
								)
							)
						}
					>
						<ArrowIcon styles='w-full h-auto transform -rotate-90 fill-textGray' />
					</article>
				) : (
					''
				)}
			</section>
		</Modal>
	)
})
