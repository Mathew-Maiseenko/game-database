'use client'
import { ScrollingCarousel } from '@trendyol-js/react-carousel'
import { ArrowIcon } from '../../icon/arrow-icon'

export const MinimalistCarousel = ({
	children,
}: {
	children: React.ReactElement[]
}) => {
	return (
		<div className='flex items-center justify-center flex-col  w-full select-none'>
			<ScrollingCarousel
				className='w-full'
				rightIcon={
					<ArrowIcon styles='absolute right-1 top-1/2 transform -rotate-90' />
				}
				leftIcon={
					<ArrowIcon styles='absolute left-1 top-1/2 transform rotate-90' />
				}
			>
				{...children}
			</ScrollingCarousel>
		</div>
	)
}
