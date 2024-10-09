'use client'
import { GameCard } from '@/entities/game/game-card'
import { useEffect, useState } from 'react'
import { RawgApi, StoreGame } from '@/shared/api/RawgApi-hook'
import { ListWrapper } from '@/shared/ui'
export function PopularGamesList() {
	const [games, setGames] = useState<StoreGame[]>([])
	const [gameListFetchingState, setGameListFetchingState] = useState<
		'idle' | 'pending' | 'rejected' | 'fulfilled'
	>('idle')

	useEffect(() => {
		setGameListFetchingState('pending')
		RawgApi.getGamesList()
			.then(res => setGames(res))
			.then(() => setGameListFetchingState('fulfilled'))
			.catch(() => setGameListFetchingState('rejected'))
	}, [])

	return (
		<ListWrapper
			fetchingState={gameListFetchingState}
			ErrorMessageStyles='mb-12'
		>
			<section className='flex flex-col  min-w-full min-h-[46vh] bg-white dark:bg-darkGray px-6 pt-5 pb-3 rounded-3xl relative mb-12 dark:border-none border-2 border-lightThemeBorderGray'>
				<h2 className='text-orange text-3xl  mb-8'>
					<strong className='inline text-white underline'>Popular</strong> Games
				</h2>
				<article className='flex flex-row justify-between flex-wrap pb-0'>
					<ViewGamesList gameList={games} />
				</article>
			</section>
		</ListWrapper>
	)
}

function ViewGamesList({ gameList }: { gameList: StoreGame[] }) {
	return gameList.map((game: StoreGame) => (
		<GameCard
			key={game.id}
			id={game.id}
			title={game.name}
			image={game.backgroundImage}
			rating={game.rating}
			playtime={game.playtime}
			genres={game.genres?.map(genre => genre.name)}
			stores={game.stores}
		/>
	))
}
