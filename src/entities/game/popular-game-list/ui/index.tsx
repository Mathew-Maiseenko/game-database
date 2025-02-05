'use client'
import { GameCard } from '@/entities/game/game-card'
import { RawgApiClient, StoreGame } from '@/shared/api'
import { ListWrapper } from '@/shared/ui'
import { useEffect, useState } from 'react'
export function PopularGamesList() {
	const [games, setGames] = useState<StoreGame[]>([])
	const [gameListFetchingState, setGameListFetchingState] = useState<
		'idle' | 'pending' | 'rejected' | 'fulfilled'
	>('idle')

	useEffect(() => {
		setGameListFetchingState('pending')
		RawgApiClient.games
			.getGamesList()
			.then(res => setGames(res))
			.then(() => setGameListFetchingState('fulfilled'))
			.catch(() => setGameListFetchingState('rejected'))
	}, [])

	return (
		<ListWrapper fetchingState={gameListFetchingState}>
			<section className='flex flex-col  min-w-full min-h-[46vh] bg-lightThemeGray dark:bg-darkGray px-6 pt-5 pb-3 rounded-3xl relative mb-12 dark:border-none border-2 border-lightThemeBorderGray transition-all duration-200 ease-in-out'>
				<h2 className='dark:text-orange text-blue text-3xl font-medium  mb-8 transition-all duration-200 ease-in-out'>
					<strong className='inline font-bold dark:text-white text-black underline transition-all duration-200 ease-in-out'>
						Popular
					</strong>{' '}
					Games
				</h2>
				<ul className='flex flex-row justify-between flex-wrap pb-0'>
					<ViewGamesList gameList={games} />
				</ul>
			</section>
		</ListWrapper>
	)
}

function ViewGamesList({ gameList }: { gameList: StoreGame[] }) {
	return gameList.map((game: StoreGame, i) => (
		<GameCard
			key={game.id}
			id={game.id}
			title={game.name}
			image={game.backgroundImage}
			rating={game.rating}
			playtime={game.playtime}
			genres={game.genres?.map(genre => genre.name)}
			stores={game.stores}
			sequenceNumber={i}
		/>
	))
}
