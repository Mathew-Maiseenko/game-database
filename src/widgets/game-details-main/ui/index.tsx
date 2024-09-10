'use client'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import {
	GameDetailsHeader,
	ListOfGameScreenshots,
	PairOfGameInfoCards,
} from '../../../entities/game/game-details/ui'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { AppState } from '@/shared/lib'
import {
	fetchGameDetails,
	gameDetailsSlice,
} from '../../../entities/game/game-details/model'
import { GameAchievementsList } from '@/entities/game/game-details/ui/game-achievements-list'

export function GameDetailsMain() {
	const dispatch = useAppDispatch()
	const pathname = usePathname()

	const getUserIdByPathname = (path: string | null) => {
		const pointsList = path ? path.split('/') : null
		if (!pointsList) {
			return 0
		} else {
			return +pointsList[pointsList.length - 1]
		}
	}
	const currentGameId = getUserIdByPathname(pathname)

	const currentGame = useAppSelector((state: AppState) =>
		gameDetailsSlice.selectors.selectGameDetailsById(state, currentGameId)
	)

	useEffect(() => {
		dispatch(fetchGameDetails(currentGameId))
		console.log('проверка рендера:', dispatch, currentGameId)
	}, [dispatch, currentGameId])

	if (!currentGame) {
		return <div>Loading...</div>
	} else {
		return (
			<>
				<GameDetailsHeader
					mainImage={currentGame.backgroundImage}
					gameTitle={currentGame.name}
				/>
				<section className='flex flex-col bg-darkGray rounded-3xl p-5 mb-5'>
					<PairOfGameInfoCards />
					<ListOfGameScreenshots />
					<h3 className='text-textGray text-base mb-5'>
						{currentGame.descriptionRaw}
					</h3>
					<section className='flex flex-row'>
						<button className='rounded-3xl border-2 border-orange p-1 text-orange'>
							Download Fortnite Now!
						</button>
						<button className='rounded-3xl border-2 border-orange p-1 text-orange'>
							Add Fortnite to favorite list
						</button>
					</section>
				</section>
				<GameAchievementsList gameId={currentGameId} />
			</>
		)
	}
}

// const currentGame = useAppSelector(
// 	(state: AppState) => state.gameDetails.games[currentGameId]
// )
