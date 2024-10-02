'use client'
import { GameCard } from '@/entities/game/game-card'
import { useAppSelector } from '@/shared/lib/redux/hooks'
import { filteredGamesSlice } from '@/features/filtration/model/filtration-slice'
import { Pagination } from '@/shared/ui'
import type { StoreGame } from '@/shared/api/RawgApi-hook'

export function FilteredGamesList() {
	const games = useAppSelector(filteredGamesSlice.selectors.selectCurrentGames)
	const gameListFetchingState = useAppSelector(
		filteredGamesSlice.selectors.selectGameListFetchingState
	)
	const activePage = useAppSelector(
		filteredGamesSlice.selectors.selectActivePage
	)

	const gamesCount = useAppSelector(
		filteredGamesSlice.selectors.selectTotalGamesCount
	)

	if (games.length === 0) {
		return <div>{gameListFetchingState}</div>
	}

	return (
		<section className='flex flex-col  min-w-full min-h-[46vh] bg-darkGray px-6 pt-5 rounded-3xl relative mb-12'>
			<article className='flex flex-row justify-between flex-wrap pb-0'>
				<ViewGamesList gameList={games} />
			</article>
			<Pagination
				totalPageCount={Math.ceil(gamesCount / 20)}
				currentPage={activePage}
			/>
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
			playtime={game.playtime}
			genres={game.genres?.map(genre => genre.name)}
			stores={game.stores}
		/>
	))
}
