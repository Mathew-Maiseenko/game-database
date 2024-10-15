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
				<article className='flex justify-between sm:flex-col lg:flex-row flex-grow mb-10'>
					<ImageCardWithModal
						dispatch={dispatch}
						image={mainImage ? mainImage : ''}
						classes={`flex flex-shrink rounded-md dark:border-none border-2 border-lightThemeBorderGray min-h-full ${
							firstScreenshot && secondScreenshot
								? `${classes['game-main-pictures']}`
								: 'w-full'
						}`}
						alt='Main game photo'
					/>
					{firstScreenshot && secondScreenshot && (
						<section className='flex flex-grow h-full flex-col'>
							<ImageCardWithModal
								dispatch={dispatch}
								image={firstScreenshot ? firstScreenshot : ''}
								classes={`flex w-full  rounded-md dark:border-none border-2 border-lightThemeBorderGray 
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
				<h1 className='w-full text-5xl font-extrabold dark:text-white text-black text-center'>
					{gameTitle} Details
				</h1>
			</header>
		</>
	)
})

/*
export const GameDetailsHeader = memo(function GameDetailsHeader({
	mainImage,
	firstScreenshot,
	secondScreenshot,
	gameTitle,
}: GameDetailsHeaderPropsTypes) {
	const dispatch = useAppDispatch()
	return (
		<>
			<header className='mb-10 w-full'>
				<article
					className={`${classes['game-pictures-container']} mb-10 w-full`}
				>
					<ImageCardWithModal
						dispatch={dispatch}
						image={mainImage ? mainImage : ''}
						classes={`${
							classes['game-main-pictures']
						} flex flex-shrink items-stretch rounded-md dark:border-none border-2 border-lightThemeBorderGray ${
							firstScreenshot && secondScreenshot ? 'h-full mr-1' : 'w-full'
						}`}
						alt='Main game photo'
					/>
					<ImageCardWithModal
						dispatch={dispatch}
						image={firstScreenshot ? firstScreenshot : ''}
						classes={`${classes['game-first-screenshot']} object-cover flex flex-grow items-stretch w-full rounded-md mb-1 dark:border-none border-2 border-lightThemeBorderGray`}
						alt='first game screenshot'
					/>
					<ImageCardWithModal
						dispatch={dispatch}
						image={secondScreenshot ? secondScreenshot : ''}
						classes={`${classes['game-second-screenshot']} object-cover flex flex-grow items-stretch w-full rounded-md dark:border-none border-2 border-lightThemeBorderGray`}
						alt='first game screenshot'
					/>
				</article>
				<h1 className='w-full text-5xl font-extrabold dark:text-white text-black text-center'>
					{gameTitle} Details
				</h1>
			</header>
		</>
	)
})
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
				<article className='flex justify-between sm:flex-col lg:flex-row mb-10'>
					<ImageCardWithModal
						dispatch={dispatch}
						image={mainImage ? mainImage : ''}
						classes={`flex flex-shrink object-cover rounded-md dark:border-none border-2 border-lightThemeBorderGray ${
							firstScreenshot && secondScreenshot ? 'h-full mr-1' : 'w-full'
						}`}
						alt='Main game photo'
					/>
					{firstScreenshot && secondScreenshot && (
						<section className='h-full w-1/3 flex-col flex-grow'>
							<ImageCardWithModal
								dispatch={dispatch}
								image={firstScreenshot ? firstScreenshot : ''}
								classes='flex flex-grow w-full rounded-md mb-1 dark:border-none border-2 border-lightThemeBorderGray'
								alt='first game screenshot'
							/>
							<ImageCardWithModal
								dispatch={dispatch}
								image={secondScreenshot ? secondScreenshot : ''}
								classes='flex flex-grow w-full rounded-md dark:border-none border-2 border-lightThemeBorderGray'
								alt='first game screenshot'
							/>
						</section>
					)}
				</article>
				<h1 className='w-full text-5xl font-extrabold dark:text-white text-black text-center'>
					{gameTitle} Details
				</h1>
			</header>
		</>
	)
})

<Image
							src={firstScreenshot ? firstScreenshot : ''}
							width={2048}
							height={1080}
							className='flex flex-grow w-full rounded-md mb-1'
							alt='first game screenshot'
						/>
						<Image
							src={secondScreenshot ? secondScreenshot : ''}
							width={2048}
							height={1080}
							className='flex flex-grow w-full rounded-md'
							alt='second game screenshot'
						/>
*/
