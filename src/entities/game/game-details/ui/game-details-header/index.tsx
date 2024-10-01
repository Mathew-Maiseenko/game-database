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
				<article className='flex justify-between sm:flex-col lg:flex-row min-h-[40vh] mb-10'>
					<ImageCardWithModal
						dispatch={dispatch}
						image={mainImage ? mainImage : ''}
						classes={`flex object-cover rounded-md ${
							firstScreenshot && secondScreenshot ? 'w-2/3 mr-1' : 'w-full'
						}`}
						alt='Main game photo'
					/>
					{firstScreenshot && secondScreenshot && (
						<section className='w-1/3 flex-col'>
							<ImageCardWithModal
								dispatch={dispatch}
								image={firstScreenshot ? firstScreenshot : ''}
								classes='flex flex-grow w-full rounded-md mb-1'
								alt='first game screenshot'
							/>
							<ImageCardWithModal
								dispatch={dispatch}
								image={secondScreenshot ? secondScreenshot : ''}
								classes='flex flex-grow w-full rounded-md'
								alt='first game screenshot'
							/>
						</section>
					)}
				</article>
				<h1 className='w-full text-5xl font-extrabold text-white text-center'>
					{gameTitle} Details
				</h1>
			</header>
		</>
	)
})
/*
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
