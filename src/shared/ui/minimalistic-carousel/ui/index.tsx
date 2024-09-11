'use client'
import { ScrollingCarousel } from '@trendyol-js/react-carousel'
import { ArrowIcon } from '../../arrow-icon'

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

/*
import { Carousel } from '@trendyol-js/react-carousel'
export function MinimalistCarousel() {
	return (
		<Carousel show={2} slide={3} swiping={true}>
			<article className='"select-none bg-blue"'>We love Web 🌐1</article>
			<article className='"select-none bg-pink"'>We love Web 🌐2</article>
			<article className='"select-none bg-blue"'>We love Web 🌐3</article>
			<article className='"select-none bg-pink"'>We love Web 🌐4</article>
			<article className='"select-none bg-blue"'>We love Web 🌐5</article>
			<article className='"select-none bg-pink"'>We love Web 🌐6</article>
		</Carousel>
	)
}
*/

/*



;('use client')
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

export const MinimalistCarousel = () => {
	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 5,
			slidesToSlide: 3, // optional, default to 1.
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 4,
			slidesToSlide: 2, // optional, default to 1.
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 2,
			slidesToSlide: 1,
		},
	}
	return (
		<Carousel
			swipeable={false}
			draggable={false}
			showDots={false}
			responsive={responsive}
			ssr={false} // means to render carousel on server-side.
			infinite={true}
			autoPlay={false}
			autoPlaySpeed={500}
			keyBoardControl={true}
			customTransition='all .5'
			transitionDuration={500}
			containerClass='carousel-container'
			removeArrowOnDeviceType={['tablet', 'mobile']}
			//deviceType={this.props.deviceType}
			dotListClass='custom-dot-list-style'
			itemClass='carousel-item-padding-40-px'
			className='h-11 w-full justify-between'
		>
			<div>Item 1</div>
			<div>Item 2</div>
			<div>Item 3</div>
			<div>Item 4</div>
			<div>Item 1</div>
			<div>Item 2</div>
			<div>Item 3</div>
			<div>Item 4</div>
			<div>Item 1</div>
			<div>Item 2</div>
			<div>Item 3</div>
			<div>Item 4</div>
			<div>Item 1</div>
			<div>Item 2</div>
			<div>Item 3</div>
			<div>Item 4</div>
		</Carousel>
	)
}






 * 
 * const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 5,
		slidesToSlide: 3, // optional, default to 1.
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 4,
		slidesToSlide: 2, // optional, default to 1.
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 2,
		slidesToSlide: 1,
	},
}
;<Carousel
	swipeable={false}
	draggable={false}
	showDots={true}
	responsive={responsive}
	ssr={true} // means to render carousel on server-side.
	infinite={true}
	autoPlay={true}
	autoPlaySpeed={500}
	keyBoardControl={true}
	customTransition='all .5'
	transitionDuration={500}
	containerClass='carousel-container'
	removeArrowOnDeviceType={['tablet', 'mobile']}
	//deviceType={this.props.deviceType}
	dotListClass='custom-dot-list-style'
	itemClass='carousel-item-padding-40-px'
>
	<div>Item 1</div>
	<div>Item 2</div>
	<div>Item 3</div>
	<div>Item 4</div>
</Carousel>


 * <div>
			<div className='w-[200px] bg-neutral-50 shadow-lg rounded-lg p-3 flex items-center justify-center space-x-2'>
				<span className='material-symbols-outlined text-primary'>
					sports_esports
				</span>
				<span className='font-title text-primary'>Game Genre</span>
			</div>
		</div>
 */
