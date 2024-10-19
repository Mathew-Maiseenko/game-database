'use client'
import { GameCard } from '@/entities/game/game-card'
import { useAppSelector } from '@/shared/lib/redux/hooks'
import { filteredGamesSlice } from '@/features/filtration/model/filtration-slice'
import { ListWrapper } from '@/shared/ui'
import type { StoreGame } from '@/shared/api/RawgApi-hook'
import { Pagination } from '@/features/pagination'

export function FilteredGamesList() {
	const games = useAppSelector(filteredGamesSlice.selectors.selectCurrentGames)
	const gameListFetchingState = useAppSelector(
		filteredGamesSlice.selectors.selectGameListFetchingState
	)

	const gamesCount = useAppSelector(
		filteredGamesSlice.selectors.selectTotalGamesCount
	)

	return (
		<ListWrapper fetchingState={gameListFetchingState}>
			<section className='flex flex-col min-w-full bg-lightThemeGray border-2 border-lightThemeBorderGray dark:bg-darkGray px-4 py-3 md:px-6 md:py-5 rounded-2xl relative mb-7 md:mb-12'>
				<ul className='flex flex-row justify-between flex-wrap pb-0 mb-1'>
					<ViewGamesList gameList={games} />
				</ul>
				<article className='flex justify-center w-full'>
					<Pagination totalPageCount={Math.ceil(gamesCount / 20)} />
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
