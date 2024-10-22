import classes from './classes.module.css'
import { ImageCardWithModal } from '@/entities/image'
import { useAppDispatch } from '@/shared/lib/redux/hooks'
import { memo } from 'react'

interface GameDetailsHeaderPropsTypes {
	mainImage: string | null | undefined
	firstScreenshot?: string | null
	secondScreenshot?: string | null
	gameTitle: string | undefined
}
export const GameDetailsHeader = memo(function GameDetailsHeader({
	mainImage,
	firstScreenshot,
	secondScreenshot,
	gameTitle,
}: GameDetailsHeaderPropsTypes) {
	const dispatch = useAppDispatch()
	return (
		<>
			<header className='mb-10'>
				<article className='flex justify-between sm:flex-col lg:flex-row flex-grow mb-10 '>
					<ImageCardWithModal
						dispatch={dispatch}
						image={mainImage ? mainImage : ''}
						classes={`block lg:flex lg:flex-shrink rounded-md dark:border-none border-2 border-lightThemeBorderGray min-h-full w-full lg:w-auto mr-1 ${
							firstScreenshot && secondScreenshot
								? `${classes['game-main-pictures']}`
								: 'w-full'
						}`}
						alt='Main game photo'
					/>
					{firstScreenshot && secondScreenshot && (
						<section className='lg:flex md:flex-grow md:flex-col h-full hidden'>
							<ImageCardWithModal
								dispatch={dispatch}
								image={firstScreenshot ? firstScreenshot : ''}
								classes={`flex w-full rounded-md mb-1 dark:border-none border-2 border-lightThemeBorderGray 
								${classes['game-first-screenshot']}
								`}
								alt='The first game screenshot'
							/>
							<ImageCardWithModal
								dispatch={dispatch}
								image={secondScreenshot ? secondScreenshot : ''}
								classes={`flex w-full rounded-md dark:border-none border-2 border-lightThemeBorderGray
								${classes['game-second-screenshot']}
								`}
								alt='The second game screenshot'
							/>
						</section>
					)}
				</article>
				<h1 className='w-full text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-extrabold dark:text-white text-black text-center'>
					{gameTitle} Details
				</h1>
			</header>
		</>
	)
})
