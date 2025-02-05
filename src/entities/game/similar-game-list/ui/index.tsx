'use client'
import { RecommendationListsGameCard } from '@/entities/game/game-card'
import { RawgApiClient, StoreGame } from '@/shared/api/RawgApi-hook'
import { useAppSelector } from '@/shared/lib/redux/hooks'
import { ListWrapper } from '@/shared/ui'
import { useEffect, useState } from 'react'
import { gameDetailsSlice } from '../../game-details/model'

export function SimilarGameList() {
	const [similarGames, setSimilarGames] = useState<StoreGame[]>([])
	const [similarGameListFetchingState, setGameListFetchingState] = useState<
		'idle' | 'pending' | 'rejected' | 'fulfilled'
	>('idle')

	const currentGameId = useAppSelector(
		gameDetailsSlice.selectors.selectCurrentGameId
	)

	const currentGame = useAppSelector(state =>
		gameDetailsSlice.selectors.selectGameDetailsById(state, currentGameId)
	)

	useEffect(() => {
		if (currentGame) {
			setGameListFetchingState('pending')
			const currentGameGenres = currentGame.genres.map(genre => genre.id)
			RawgApiClient.games
				.getGamesListWithParams({
					gamesPerPage: 6,
					pageNumber: 1,
					genres: currentGameGenres.join(','),
				})
				.then(res => setSimilarGames(res.games))
				.then(() => setGameListFetchingState('fulfilled'))
				.catch(() => setGameListFetchingState('rejected'))
		}
	}, [currentGame])

	return (
		<ListWrapper
			fetchingState={similarGameListFetchingState}
			ErrorMessageStyles='mb-4'
		>
			<section className='flex flex-col min-w-full bg-lightThemeGray dark:bg-darkGray dark:border-none border-2 border-lightThemeBorderGray px-6 pr-10 pt-5 rounded-3xl relative animate-base-showing'>
				<article className='dark:text-orange text-blue text-2xl font-medium mb-8'>
					<h2 className='inline text-black dark:text-white underline font-bold'>
						Similar
					</h2>{' '}
					Games
				</article>
				<article className='flex flex-col w-full'>
					<ul className='flex flex-col justify-start md:flex-row md:flex-wrap md:justify-between gap-1 w-full p-3'>
						<ViewRecommendedGameCards games={similarGames} />
					</ul>
				</article>
			</section>
		</ListWrapper>
	)
}

const ViewRecommendedGameCards = ({ games }: { games: StoreGame[] }) =>
	games.map((game, i) => (
		<RecommendationListsGameCard
			key={`${game.name}_${game.id}`}
			id={game.id}
			title={game.name}
			poster={game.backgroundImage}
			rating={game.rating}
			genres={game.genres?.map(genre => genre.name)}
			sequenceNumber={i}
		/>
	))
