'use client'
import { GameCard } from '@/entities/game/game-card'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import { AppState } from '@/shared/lib'
import { useEffect } from 'react'
import { StoreGame } from '@/shared/api/RawgApi-hook'
//import { fetchFilteredGameList } from '@/features/filtration/model/thunk/fetch-filtered-game-list'

export function PopularGamesList() {
	const dispatch = useAppDispatch()
	const games = useAppSelector((state: AppState) => state.gamesList.entries)
	const gameListFetchingState = useAppSelector(
		(state: AppState) => state.gamesList.gameListFetchingState
	)

	useEffect(() => {
		//dispatch(fetchFilteredGameList({}))
	}, [dispatch])
	if (games.length === 0) {
		return <div>{gameListFetchingState}</div>
	}

	return (
		<section className='flex flex-col  min-w-full min-h-[46vh] bg-darkGray px-6 pt-5 rounded-3xl relative mb-12'>
			<article className='flex flex-row justify-between flex-wrap pb-0'>
				<ViewGamesList gameList={games} />
			</article>
		</section>
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
			developer={game.slug}
		/>
	))
}
