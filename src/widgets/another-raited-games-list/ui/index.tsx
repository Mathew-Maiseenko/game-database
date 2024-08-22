import { ExtendedRatedGameCard } from '@/entities/game/extended-rated-game-card'

export async function ExtendedGameCardsList() {
	return (
		<section className='flex flex-col  min-w-full min-h-[46vh] bg-darkGray px-6 pr-10 pt-5 rounded-3xl relative'>
			<article className='text-orange text-2xl  mb-8'>
				<h2 className='inline text-white underline'>Other Raited</h2> Games
			</article>
			<article className='flex flex-col'>
				<article className='flex flex-row flex-wrap justify-between w-full p-3'>
					<ExtendedRatedGameCard />
					<ExtendedRatedGameCard />
					<ExtendedRatedGameCard />
					<ExtendedRatedGameCard />
					<ExtendedRatedGameCard />
					<ExtendedRatedGameCard />
				</article>
			</article>
			<button className='bg-orange sm:w-1/2 md:w-1/3 m-auto p-2 relative bottom-[-20px] rounded-2xl text-white'>
				View Your Library
			</button>
		</section>
	)
}
