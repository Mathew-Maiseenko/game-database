import { Carousel, MinimalistCarousel } from '@/shared/ui'
import { ImageCardWithModal } from '@/entities/image'
import { useAppDispatch } from '@/shared/lib/redux/hooks'
import { AppDispatch } from '@/shared/lib'
import { memo } from 'react'

export const ListOfGameScreenshots = memo(function ListOfGameScreenshots({
	screenshots,
}: {
	screenshots: string[]
}) {
	const dispatch = useAppDispatch()
	return (
		<section className='mb-5'>
			{/* <MinimalistCarousel>
				{...ViewListOfGameScreenshots(screenshots, dispatch)}
			</MinimalistCarousel> */}
			<Carousel>{...ViewListOfGameScreenshots(screenshots, dispatch)}</Carousel>
		</section>
	)
})

export const ViewListOfGameScreenshots = (
	screenshots: string[],
	dispatch: AppDispatch
) =>
	screenshots.map((screenshot, i) => (
		<ImageCardWithModal
			key={`screenshot-${i}`}
			dispatch={dispatch}
			image={screenshot}
			classes='w-1/3 mr-3 rounded-lg dark:border-none border-2 border-lightThemeBorderGray'
			alt='first game photo'
		/>
	))
