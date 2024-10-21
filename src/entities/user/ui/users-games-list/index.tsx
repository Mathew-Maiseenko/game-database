'use client'
import { useRouter } from 'next/navigation'
import { UsersGameCard } from '../user-game-card'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import { userSlice } from '../../model/user-slice'
import { useEffect, useMemo } from 'react'
import { fetchDetailsByGamesIds } from '../../model/thunk/fetch-game-details'
import { usersFavoriteGameType } from '../../types'
import { ListWrapper } from '@/shared/ui'
import { baseSiteUrl } from '@/shared/model'

interface UsersGamesListProps {
	withButton: boolean
	styles?: string
}

export function UsersGamesList({ withButton, styles }: UsersGamesListProps) {
	const dispatch = useAppDispatch()
	const router = useRouter()

	const fetchingDetailsByGamesIdsState = useAppSelector(
		userSlice.selectors.selectFetchingDetailsByGamesIdsState
	)

	const userGamesIds = useAppSelector(
		userSlice.selectors.selectFavoriteGamesIds
	)

	const userGamesObject = useAppSelector(
		userSlice.selectors.selectFavoriteGames
	)

	const userGames = useMemo(
		() =>
			userGamesIds.reduce((acc, id) => {
				const currentGame = userGamesObject[id] as
					| usersFavoriteGameType
					| undefined
				if (currentGame) {
					return [...acc, currentGame]
				} else {
					return [...acc]
				}
			}, [] as usersFavoriteGameType[]),
		[userGamesIds, userGamesObject]
	)

	useEffect(() => {
		dispatch(fetchDetailsByGamesIds(userGamesIds))
	}, [userGamesIds, dispatch])
	return (
		<ListWrapper
			fetchingState={fetchingDetailsByGamesIdsState}
			ErrorMessageStyles='mb-7'
		>
			<article
				className={`flex flex-col  min-w-full bg-white dark:border-none border-2 border-lightThemeBorderGray dark:bg-darkGray px-5 py-2 md:px-7 md:py-4  lg:px-9 lg:py-6 rounded-2xl relative animate-base-showing ${styles}`}
			>
				{userGames.length ? (
					<>
						<h2 className='text-blue dark:text-orange text-xl lg:text-2xl xl:text-3xl mb-5'>
							<strong className='inline text-black dark:text-white underline'>
								Your Gaming
							</strong>{' '}
							Library
						</h2>
						<ul className='flex flex-col'>
							<ViewUsersGamesList gameList={userGames} />
						</ul>
						<button
							className={`${
								withButton ? '' : 'hidden'
							} bg-blue dark:bg-orange w-2/3 sm:w-1/2 md:w-1/3 m-auto p-2 relative -bottom-7 lg:-bottom-11 rounded-2xl text-black dark:text-white`}
							onClick={() => {
								router.push(`${baseSiteUrl}/user`)
							}}
						>
							View Your Library
						</button>
					</>
				) : (
					<article className='flex flex-col justify-center items-center'>
						<h2 className='text-black dark:text-white text-2xl lg:text-3xl xl:text-4xl mb-5 uppercase'>
							Your{' '}
							<strong className='inline text-blue dark:text-orange'>
								Gaming Library
							</strong>{' '}
							is empty!
						</h2>
						<h3 className='text-lightThemeTextGray dark:text-textGray text-lg lg:text-xl xl:text-2xl'>
							Your can add a new game in Cyber Game List
						</h3>
						<button
							className={
								'bg-blue dark:bg-orange w-2/3 sm:w-1/2 md:w-1/3 m-auto p-2 relative -bottom-7 lg:-bottom-11 rounded-2xl text-black dark:text-white'
							}
							onClick={() => {
								router.push(`${baseSiteUrl}/`)
							}}
						>
							Go to Cyber Game List
						</button>
					</article>
				)}
			</article>
		</ListWrapper>
	)
}

function ViewUsersGamesList({
	gameList,
}: {
	gameList: usersFavoriteGameType[]
}) {
	return (
		gameList &&
		gameList.map((currentGame: usersFavoriteGameType) => (
			<UsersGameCard
				key={currentGame.game.id}
				id={currentGame.game.id}
				title={currentGame.game.name}
				poster={currentGame.game.backgroundImage}
				releaseDate={currentGame.game.released}
				playtime={currentGame.game.playtime}
				achievementsCount={currentGame.game.achievementsCount}
				completedAchievementsCount={
					Object.keys(currentGame.completedAchievementIds).length
				}
				website={currentGame.game.website}
				isComplete={currentGame.isComplete}
			/>
		))
	)
}
