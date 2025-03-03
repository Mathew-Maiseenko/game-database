import { Carousel } from '@/shared/ui'
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
			<Carousel>
				<ViewListOfGameScreenshots
					screenshots={screenshots}
					dispatch={dispatch}
				/>
			</Carousel>
		</section>
	)
})

export const ViewListOfGameScreenshots = ({
	screenshots,
	dispatch,
}: {
	screenshots: string[]
	dispatch: AppDispatch
}) => {
	const screenshotObjList = screenshots.map(screenshot => ({
		image: screenshot,
		alt: 'Game screenshot',
	}))

	return screenshots.map((screenshot, i) => (
		<ImageCardWithModal
			key={`screenshot-${i}`}
			dispatch={dispatch}
			imageList={screenshotObjList}
			imageIndexInList={i}
			image={screenshot}
			classes='inline-block w-2/3 sm:w-1/2 md:w-1/3 xl:w-1/4 mr-3 rounded-lg dark:border-none border-2 border-lightThemeBorderGray'
			alt={`Game screenshot ${i}`}
		/>
	))
}
