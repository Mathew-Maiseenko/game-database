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
import { getGamesIdByPathname } from '../lib'
import { ErrorMessage, Loader } from '@/shared/ui'

export function GameDetailsMain() {
	const [screenshots, setScreenshots] = useState<string[]>([])
	const dispatch = useAppDispatch()
	const pathname = usePathname()

	const currentGameId = useMemo(
		() => getGamesIdByPathname(pathname),
		[pathname]
	)

	const currentGame = useAppSelector((state: AppState) =>
		gameDetailsSlice.selectors.selectGameDetailsById(state, currentGameId)
	)

	const isUserSigned = useAppSelector(userSlice.selectors.selectIsUserSigned)

	const isGameAddedInUserList = useAppSelector((state: AppState) =>
		userSlice.selectors.selectIsUserContainGameById(state, currentGameId)
	)

	const isGameAlreadyLoaded = useAppSelector((state: AppState) =>
		gameDetailsSlice.selectors.selectGameDetailsById(state, currentGameId)
	)

	const gameDetailsFetchingState = useAppSelector(
		gameDetailsSlice.selectors.selectGameDetailsFetchingState
	)

	useEffect(() => {
		if (!isGameAlreadyLoaded) {
			RawgApi.getListGameScreenshots(currentGameId).then(setScreenshots)
			dispatch(fetchGameDetails(currentGameId))
		}
	}, [dispatch, currentGameId, isGameAlreadyLoaded])

	if (
		gameDetailsFetchingState === 'fulfilled' &&
		screenshots.length &&
		currentGame
	) {
		return (
			<>
				<GameDetailsHeader
					mainImage={currentGame.backgroundImage}
					firstScreenshot={screenshots[0]}
					secondScreenshot={screenshots[1]}
					gameTitle={currentGame.name}
				/>
				<section className='flex flex-col bg-lightThemeGray dark:bg-darkGray dark:border-none border-2 border-lightThemeBorderGray rounded-3xl p-5 mb-5 animate-base-showing'>
					<PairOfGameInfoCards />
					<ListOfGameScreenshots screenshots={screenshots.slice(2)} />
					<p className='text-textGray text-base mb-5'>
						{currentGame.descriptionRaw}
					</p>
					<section className='flex flex-row w-full'>
						<Link
							href={currentGame.website}
							className='w-1/2 mr-3 text-center rounded-3xl border-2 dark:border-orange border-blue p-1 text-blue dark:text-orange dark:hover:text-white hover:text-black dark:hover:bg-orange hover:bg-blue dark:active:bg-activeButtonRed dark:active:text-white active:text-black'
						>
							Download {currentGame.name} Now!
						</Link>
						<button
							className='w-1/2 rounded-3xl border-2 transition-all duration-300 dark:border-orange border-blue p-1 text-blue dark:text-orange dark:hover:text-white hover:text-black dark:hover:bg-orange hover:bg-blue dark:active:bg-activeButtonRed dark:active:text-white active:text-black'
							onClick={() => {
								if (isUserSigned) {
									if (!isGameAddedInUserList) {
										dispatch(userSlice.actions.addFavoriteGame(currentGame))
									} else {
										dispatch(
											userSlice.actions.removeFavoriteGame(currentGameId)
										)
									}
								} else {
									dispatch(userSlice.actions.setUserSignUpModalOpen())
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
	} else if (
		gameDetailsFetchingState === 'pending' ||
		gameDetailsFetchingState === 'idle'
	) {
		return (
			<section className='flex justify-center items-center w-full bg-lightThemeGray dark:bg-darkGray rounded-3xl px-10 py-10'>
				<Loader classes='w-1/3' />
			</section>
		)
	} else if (gameDetailsFetchingState === 'rejected') {
		return (
			<section
				className={`flex flex-col justify-center items-center w-full dark:border-none border-2 border-lightThemeBorderGray bg-lightThemeGray dark:bg-darkGray px-10 py-40 rounded-3xl`}
			>
				<ErrorMessage classes='w-1/3' />
			</section>
		)
	}
}
