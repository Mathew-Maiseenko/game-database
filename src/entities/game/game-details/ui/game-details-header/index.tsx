import Image from 'next/image'

interface GameDetailsHeaderPropsTypes {
	mainImage: string | null | undefined
	firstScreenshot?: string | null
	secondScreenshot?: string | null
	gameTitle: string | undefined
}

export function GameDetailsHeader({
	mainImage,
	// firstScreenshot,
	// secondScreenshot,
	gameTitle,
}: GameDetailsHeaderPropsTypes) {
	return (
		<>
			<header className='mb-10'>
				<article className='flex sm:flex-col lg:flex-row h-[40vh] mb-10'>
					<Image
						src={mainImage ? mainImage : ''}
						width={4000}
						height={4000}
						className='flex flex-grow sm:w-2/3 lg:w-full'
						alt='Main game photo'
					/>
					{/* <section>
						<Image
							src={firstScreenshot ? firstScreenshot : ''}
							width={20}
							height={20}
							className='flex flex-grow sm:w-1/3 lg:w-full'
							alt='first game screenshot'
						/>
						<Image
							src={secondScreenshot ? secondScreenshot : ''}
							width={20}
							height={20}
							className='flex flex-grow sm:w-1/3 lg:w-full'
							alt='second game screenshot'
						/>
					</section> */}
				</article>
				<h1 className='w-full text-5xl font-extrabold text-white text-center'>
					{gameTitle} Details
				</h1>
			</header>
		</>
	)
}
