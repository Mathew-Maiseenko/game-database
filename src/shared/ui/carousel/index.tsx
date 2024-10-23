'use client'
import {
	MouseEvent,
	ReactElement,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'
import classes from './classes.module.css'
import { ArrowIcon } from '../icon/arrow-icon'

export const Carousel = ({
	children,
	rightIcon = (
		<ArrowIcon styles='w-full transform -rotate-90 fill-black dark:fill-textGray' />
	),
	leftIcon = (
		<ArrowIcon styles='w-full transform rotate-90 fill-black dark:fill-textGray' />
	),
}: {
	children: ReactElement | JSX.Element[]
	rightIcon?: ReactElement
	leftIcon?: ReactElement
}) => {
	const [isLeftButtonPressed, setLeftButtonPressed] = useState<boolean>(false)
	const [startX, setStartX] = useState<number>(0)
	const [scrollLeftX, setScrollLeftX] = useState<number>(0)
	const scrollRef = useRef<HTMLDivElement>(null)

	const [isWithLeftIcon, setIsWithLeftIcon] = useState<boolean>(true)
	const [isWithRightIcon, setIsWithRightIcon] = useState<boolean>(true)

	const handleMouseMouseDown = (e: MouseEvent<HTMLElement>) => {
		if (e.button === 0 && scrollRef.current) {
			setLeftButtonPressed(true)
			setStartX(e.clientX - scrollRef.current.offsetLeft)
			setScrollLeftX(scrollRef.current.scrollLeft)
			console.log('pressed')
		}
	}

	const handleMouseMouseMove = (e: MouseEvent<HTMLElement>) => {
		if (isLeftButtonPressed && scrollRef.current) {
			const currentCursorPos = e.clientX - scrollRef.current.offsetLeft
			const scrollingStep = (currentCursorPos - startX) * 1
			scrollRef.current.scrollLeft = scrollLeftX - scrollingStep
		}
	}

	const handleMouseMouseUp = (e: MouseEvent<HTMLElement>) => {
		if (e.button === 0 && scrollRef.current) {
			setLeftButtonPressed(false)
			setScrollLeftX(scrollRef.current.scrollLeft)
			console.log('released')

			setIsWithLeftIcon(Boolean(leftIcon && scrollLeftX != 0))
			setIsWithRightIcon(
				Boolean(
					rightIcon &&
						scrollLeftX <
							scrollRef.current.scrollWidth -
								scrollRef.current.clientWidth -
								100
				)
			)
		}
	}

	const handleMouseMouseLeave = (e: MouseEvent<HTMLElement>) => {
		if (e.button === 0 && scrollRef.current) {
			setLeftButtonPressed(false)

			setIsWithLeftIcon(Boolean(leftIcon && scrollRef.current.scrollLeft != 0))
			setIsWithRightIcon(
				Boolean(
					rightIcon &&
						scrollRef.current.scrollLeft <
							scrollRef.current.scrollWidth -
								scrollRef.current.clientWidth -
								100
				)
			)
			console.log('released')
		}
	}

	const scrollRight = useCallback(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollLeft = scrollRef.current.scrollLeft + 500

			setIsWithLeftIcon(Boolean(leftIcon && scrollRef.current.scrollLeft != 0))
			setIsWithRightIcon(
				Boolean(
					rightIcon &&
						scrollRef.current.scrollLeft <
							scrollRef.current.scrollWidth -
								scrollRef.current.clientWidth -
								100
				)
			)
		}
	}, [scrollRef, leftIcon, rightIcon])

	const scrollLeft = useCallback(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollLeft = scrollRef.current.scrollLeft - 500

			setIsWithLeftIcon(Boolean(leftIcon && scrollRef.current.scrollLeft != 0))
			setIsWithRightIcon(
				Boolean(
					rightIcon &&
						scrollRef.current.scrollLeft <
							scrollRef.current.scrollWidth -
								scrollRef.current.clientWidth -
								100
				)
			)
		}
	}, [scrollRef, leftIcon, rightIcon])

	useEffect(() => {
		if (scrollRef.current) {
			setIsWithLeftIcon(Boolean(leftIcon && scrollRef.current.scrollLeft != 0))
			setIsWithRightIcon(
				Boolean(
					rightIcon &&
						scrollRef.current.scrollLeft <
							scrollRef.current.scrollWidth -
								scrollRef.current.clientWidth -
								100
				)
			)
		}
	}, [rightIcon, leftIcon])

	return (
		<>
			<article className='flex  items-center justify-center flex-col relative w-full select-none'>
				{isWithLeftIcon && (
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
				{isWithRightIcon && (
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
