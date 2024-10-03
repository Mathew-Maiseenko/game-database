'use client'
import { ReactElement, useCallback, useRef } from 'react'
import classes from './classes.module.css'

export const Carousel = ({
	children,
	rightIcon,
	leftIcon,
}: {
	children: ReactElement | JSX.Element[]
	rightIcon?: ReactElement
	leftIcon?: ReactElement
}) => {
	const scrollRef = useRef<HTMLDivElement>(null)

	const scrollRight = useCallback(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollLeft = scrollRef.current.scrollLeft + 500
		}
	}, [scrollRef])

	const scrollLeft = useCallback(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollLeft = scrollRef.current.scrollLeft - 500
		}
	}, [scrollRef])

	return (
		<>
			<article className='flex items-center justify-center flex-col relative  w-full select-none'>
				{leftIcon && (
					<section
						className='absolute -left-5 top-1/2 w-5 h-5'
						onClick={scrollLeft}
					>
						{leftIcon}
					</section>
				)}
				<section
					ref={scrollRef}
					id='slider'
					className={`${classes['scrollbar-hide']} w-full h-full overflow-x-scroll bg-scroll whitespace-nowrap scroll-smooth`}
				>
					{children}
				</section>
				{rightIcon && (
					<section
						className='absolute -right-5 top-1/2 w-5 h-5'
						onClick={scrollRight}
					>
						{rightIcon}
					</section>
				)}
			</article>
		</>
	)
}
