'use client'
import { RecommendedGameCard } from '@/entities/game/recommended-game-list/ui/recommended-game-card'
import { calculateUsersFavoriteGenres, userSlice } from '@/entities/user'
import { RawgApi, StoreGame } from '@/shared/api/RawgApi-hook'
import { useAppSelector } from '@/shared/lib/redux/hooks'
import { useEffect, useState } from 'react'

export function RecommendedGameList() {
	const [recommendedGames, setRecommendedGames] = useState<StoreGame[]>([])
	const favoriteGames = useAppSelector(userSlice.selectors.selectFavoriteGames)
	const favoriteGameIds = useAppSelector(
		userSlice.selectors.selectFavoriteGamesIds
	)
	const isUserSigned = useAppSelector(userSlice.selectors.selectIsUserSigned)

	useEffect(() => {
		if (isUserSigned && favoriteGameIds.length) {
			const { ids: favoriteGenresIds } = calculateUsersFavoriteGenres({
				ids: favoriteGameIds,
				games: favoriteGames,
			})
			RawgApi.getGamesListWithParams({
				gamesPerPage: 6,
				pageNumber: 1,
				genres: favoriteGenresIds.join(','),
			}).then(res => setRecommendedGames(res.games))
		} else {
			RawgApi.getGamesListWithParams({
				gamesPerPage: 6,
				pageNumber: 1,
			}).then(res => setRecommendedGames(res.games))
		}
	}, [isUserSigned, favoriteGames, favoriteGameIds])

	return (
		<section className='flex flex-col  min-w-full min-h-[46vh] bg-darkGray px-6 pr-10 pt-5 rounded-3xl relative'>
			<article className='text-orange text-2xl  mb-8'>
				<h2 className='inline text-white underline'>Recommended</h2> Games
			</article>
			<article className='flex flex-col'>
				<article className='flex flex-row flex-wrap justify-between w-full p-3'>
					<ViewRecommendedGameCards games={recommendedGames} />
				</article>
			</article>
			{isUserSigned && (
				<button className='bg-orange sm:w-1/2 md:w-1/3 m-auto p-2 relative -bottom-5 rounded-2xl text-white'>
					View Your Library
				</button>
			)}
		</section>
	)
}

const ViewRecommendedGameCards = ({ games }: { games: StoreGame[] }) =>
	games.map(game => (
		<RecommendedGameCard
			key={`${game.name}_${game.id}`}
			id={game.id}
			title={game.name}
			poster={game.backgroundImage}
			rating={game.rating}
			genres={game.genres?.map(genre => genre.name)}
		/>
	))
