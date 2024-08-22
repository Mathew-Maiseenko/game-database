'use client'
import { GameCard } from '@/entities/game/game-card'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import { fetchGameList } from '../model/game-card-slice'
import { AppState } from '@/shared/lib'
import { useEffect } from 'react'
import { StoreGame } from '@/shared/api/RawgApi-hook'
export function PopularGamesList() {
	const dispatch = useAppDispatch()
	const games = useAppSelector((state: AppState) => state.gamesList.entries)
	const gameListFetchingState = useAppSelector(
		(state: AppState) => state.gamesList.gameListFetchingState
	)

	useEffect(() => {
		dispatch(fetchGameList())
	}, [dispatch])
	if (games.length === 0) {
		return <div>{gameListFetchingState}</div>
	}

	return (
		<section className='flex flex-col  min-w-full min-h-[46vh] bg-darkGray px-6 pt-5 rounded-3xl relative mb-12'>
			<article className='text-orange text-2xl  mb-8'>
				<h2 className='inline text-white underline'>Most Popular</h2> Right Now
			</article>
			<article className='flex flex-row justify-between flex-wrap pb-0'>
				<ViewGamesList gameList={games} />
			</article>
			<button className='bg-orange sm:w-1/2 md:w-1/3 m-auto p-2 relative bottom-[-20px] rounded-2xl text-white'>
				Discover Popular
			</button>
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

/*
				<GameCard
					title={games[0].name}
					image={games[0].backgroundImage}
					rating={games[0].rating}
					developer={games[0].slug}
				/>
				<GameCard
					title={games[1].name}
					image={games[1].backgroundImage}
					rating={games[1].rating}
					developer={games[1].slug}
				/>
				<GameCard
					title={games[2].name}
					image={games[2].backgroundImage}
					rating={games[2].rating}
					developer={games[2].slug}
				/>
*/
