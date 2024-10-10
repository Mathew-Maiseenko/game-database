'use client'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import {
	GameDetailsHeader,
	ListOfGameScreenshots,
	PairOfGameInfoCards,
} from '../../../entities/game/game-details/ui'
import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AppState } from '@/shared/lib'
import {
	fetchGameDetails,
	gameDetailsSlice,
} from '../../../entities/game/game-details/model'
import { GameAchievementsList } from '@/entities/game/game-details/ui'
import { RawgApi } from '@/shared/api/RawgApi-hook'
import Link from 'next/link'
import { userSlice } from '@/entities/user'
import { getUserIdByPathname } from '../lib'

export function GameDetailsMain() {
	const [screenshots, setScreenshots] = useState<string[]>([])
	const dispatch = useAppDispatch()
	const pathname = usePathname()

	const currentGameId = useMemo(() => getUserIdByPathname(pathname), [pathname])

	const currentGame = useAppSelector((state: AppState) =>
		gameDetailsSlice.selectors.selectGameDetailsById(state, currentGameId)
	)

	const isGameAddedInUserList = useAppSelector((state: AppState) =>
		userSlice.selectors.selectIsUserContainGameById(state, currentGameId)
	)

	useEffect(() => {
		RawgApi.getListGameScreenshots(currentGameId).then(setScreenshots)
		dispatch(fetchGameDetails(currentGameId))
	}, [dispatch, currentGameId])

	if (!currentGame) {
		return <div>Loading...</div>
	} else {
		return (
			<>
				<GameDetailsHeader
					mainImage={currentGame.backgroundImage}
					firstScreenshot={screenshots[0]}
					secondScreenshot={screenshots[1]}
					gameTitle={currentGame.name}
				/>
				<section className='flex flex-col bg-lightThemeGray dark:bg-darkGray dark:border-none border-2 border-lightThemeBorderGray rounded-3xl p-5 mb-5'>
					<PairOfGameInfoCards />
					<ListOfGameScreenshots screenshots={screenshots.slice(2)} />
					<h3 className='text-textGray text-base mb-5'>
						{currentGame.descriptionRaw}
					</h3>
					<section className='flex flex-row w-full'>
						<Link
							href={currentGame.website}
							className='w-1/2 mr-3 text-center rounded-3xl border-2 border-orange p-1 text-orange hover:text-white hover:bg-orange active:bg-activeButtonRed active:text-white'
						>
							Download {currentGame.name} Now!
						</Link>
						<button
							className='w-1/2 rounded-3xl border-2 transition-all duration-300 dark:border-orange border-blue p-1 text-blue dark:text-orange dark:hover:text-white hover:text-black dark:hover:bg-orange hover:bg-blue dark:active:bg-activeButtonRed dark:active:text-white active:text-black'
							onClick={() => {
								if (!isGameAddedInUserList) {
									dispatch(userSlice.actions.addFavoriteGame(currentGame))
								} else {
									dispatch(userSlice.actions.removeFavoriteGame(currentGameId))
								}
							}}
						>
							{!isGameAddedInUserList ? 'Add ' : 'Remove '} {currentGame.name}{' '}
							{!isGameAddedInUserList ? 'to ' : 'from '}
							favorite list
						</button>
					</section>
				</section>
				<GameAchievementsList gameId={currentGameId} />
			</>
		)
	}
}
