'use client'
import { GameCard } from '@/entities/game/game-card'
import { useAppSelector } from '@/shared/lib/redux/hooks'
import { StoreGame } from '@/shared/api/RawgApi-hook'
import { filteredGamesSlice } from '@/features/filtration/model/filtration-slice'
import { AppState } from '@/shared/lib'
//import { fetchFilteredGameList } from '@/features/filtration/model/thunk/fetch-filtered-game-list'

export function FilteredGamesList() {
	const games = useAppSelector(filteredGamesSlice.selectors.selectCurrentGames)
	const gameListFetchingState = useAppSelector(
		(state: AppState) => state.gamesList.gameListFetchingState
	)

	if (games.length === 0) {
		return <div>{gameListFetchingState}</div>
	}

	fetch('https://api.rawg.io/api/stores?key=fd711517d11b45b0b5c432f288b02d33')
		.then(res => res.json())
		.then(console.log)

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
