'use client'
import { MouseEvent, ReactElement, useCallback, useRef, useState } from 'react'
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
	const [isLeftButtonPressed, setLeftButtonPressed] = useState<boolean>(false)
	const scrollRef = useRef<HTMLDivElement>(null)
	const [prevX, setPrevX] = useState<number>(0)

	const [startX, setStartX] = useState<number>(0)
	const [scrollLeftX, setScrollLeftX] = useState<number>(0)

	const handleMouseMouseDown = (e: MouseEvent<HTMLElement>) => {
		if (e.button === 0) {
			setLeftButtonPressed(true)
			console.log('pressed')
			setPrevX(e.clientX)
		}
	}

	const handleMouseMouseMove = (e: MouseEvent<HTMLElement>) => {
		if (isLeftButtonPressed && scrollRef.current) {
			const translationLength = e.clientX - prevX
			scrollRef.current.scrollLeft =
				scrollRef.current.offsetLeft + translationLength * 20
			console.log(translationLength)

			setPrevX(e.clientX)
		}
	}

	const handleMouseMouseUp = (e: MouseEvent<HTMLElement>) => {
		if (e.button === 0) {
			setLeftButtonPressed(false)
			console.log('released')
		}
	}

	const handleMouseMouseLeave = (e: MouseEvent<HTMLElement>) => {
		if (e.button === 0) {
			setLeftButtonPressed(false)
			console.log('released')
		}
	}

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
					onMouseDown={handleMouseMouseDown}
					onMouseMove={handleMouseMouseMove}
					onMouseUp={handleMouseMouseUp}
					onMouseLeave={handleMouseMouseLeave}
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
