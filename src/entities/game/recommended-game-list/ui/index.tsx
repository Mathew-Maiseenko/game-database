'use client'
import { RecommendationListsGameCard } from '@/entities/game/game-card/'
import { calculateUsersFavoriteGenres, userSlice } from '@/entities/user'
import {
	buildUrlQueryParams,
	fetchApiWrapper,
	StoreGame,
	StoreGamesFiltrationObj,
} from '@/shared/api'
import { useAppSelector } from '@/shared/lib/redux/hooks'
import { ListWrapper } from '@/shared/ui'
import { useEffect, useState } from 'react'

export function RecommendedGameList() {
	const [recommendedGames, setRecommendedGames] = useState<StoreGame[]>([])
	const [recommendedGameListFetchingState, setGameListFetchingState] = useState<
		'idle' | 'pending' | 'rejected' | 'fulfilled'
	>('idle')
	const favoriteGames = useAppSelector(userSlice.selectors.selectFavoriteGames)
	const favoriteGameIds = useAppSelector(
		userSlice.selectors.selectFavoriteGamesIds
	)
	const isUserSigned = useAppSelector(userSlice.selectors.selectIsUserSigned)

	useEffect(() => {
		setGameListFetchingState('pending')
		if (isUserSigned && favoriteGameIds.length) {
			const { ids: favoriteGenresIds } = calculateUsersFavoriteGenres({
				ids: favoriteGameIds,
				games: favoriteGames,
			})

			let queryParamsString = buildUrlQueryParams({
				page_size: 6,
				page: 1,
				genres: favoriteGenresIds.join(','),
			})

			fetchApiWrapper<StoreGamesFiltrationObj>(`games${queryParamsString}`)
				.then(res => setRecommendedGames(res.games))
				.then(() => setGameListFetchingState('fulfilled'))
				.catch(() => setGameListFetchingState('rejected'))
		} else {
			let queryParamsString = buildUrlQueryParams({
				page_size: 6,
				page: 1,
			})

			fetchApiWrapper<StoreGamesFiltrationObj>(`games${queryParamsString}`)
				.then(res => setRecommendedGames(res.games))
				.then(() => setGameListFetchingState('fulfilled'))
				.catch(() => setGameListFetchingState('rejected'))
		}
	}, [isUserSigned, favoriteGameIds, favoriteGames])

	return (
		<ListWrapper
			fetchingState={recommendedGameListFetchingState}
			ErrorMessageStyles='mb-4'
		>
			<section className='flex flex-col min-w-full bg-lightThemeGray dark:bg-darkGray dark:border-none border-2 border-lightThemeBorderGray px-6 pr-10 pt-5 rounded-3xl relative'>
				<article className='dark:text-orange text-blue text-2xl font-medium mb-8'>
					<h2 className='inline text-black dark:text-white underline font-bold'>
						Recommended
					</h2>{' '}
					Games
				</article>
				<article className='flex flex-col w-full'>
					<ul className='flex flex-col justify-start gap-px md:flex-row md:flex-wrap md:justify-between w-full p-3'>
						<ViewRecommendedGameCards games={recommendedGames} />
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
