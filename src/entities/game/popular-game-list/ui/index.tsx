'use client'
import { GameCard } from '@/entities/game/game-card'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import { fetchGameList } from '../model/game-card-slice'
import { AppState } from '@/shared/lib'
import { useEffect } from 'react'
import { StoreGame } from '@/shared/api/RawgApi-hook'
import { ErrorMessage, Loader } from '@/shared/ui'
export function PopularGamesList() {
	const dispatch = useAppDispatch()
	const games = useAppSelector((state: AppState) => state.gamesList.entries)
	const gameListFetchingState = useAppSelector(
		(state: AppState) => state.gamesList.gameListFetchingState
	)

	useEffect(() => {
		dispatch(fetchGameList())
	}, [dispatch])

	if (gameListFetchingState === 'pending') {
		return <Loader />
	} else if (gameListFetchingState === 'rejected') {
		return <ErrorMessage />
	} else if (gameListFetchingState === 'fulfilled') {
		return (
			<section className='flex flex-col  min-w-full min-h-[46vh] bg-darkGray px-6 pt-5 rounded-3xl relative mb-12'>
				<h2 className='text-orange text-2xl  mb-8'>
					<strong className='inline text-white underline'>Popular</strong> Games
				</h2>
				<article className='flex flex-row justify-between flex-wrap pb-0'>
					<ViewGamesList gameList={games} />
				</article>
			</section>
		)
	} else return
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
