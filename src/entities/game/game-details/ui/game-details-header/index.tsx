import Image from 'next/image'
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
	return (
		<>
			<header className='mb-10'>
				<article className='flex justify-between sm:flex-col lg:flex-row min-h-[40vh] mb-10'>
					<Image
						src={mainImage ? mainImage : ''}
						width={2048}
						height={1080}
						className='flex w-2/3 object-cover rounded-md mr-1'
						//className='flex flex-grow sm:w-2/3 lg:w-full object-cover'
						alt='Main game photo'
					/>
					<section className='w-1/3 flex-col'>
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
					</section>
				</article>
				<h1 className='w-full text-5xl font-extrabold text-white text-center'>
					{gameTitle} Details
				</h1>
			</header>
		</>
	)
})
