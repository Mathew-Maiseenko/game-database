'use client'
import { useRouter } from 'next/navigation'
import { UsersGameCard } from '../user-game-card'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import { userSlice } from '../../model/user-slice'
import { useEffect, useMemo } from 'react'
import { fetchDetailsByGamesIds } from '../../model/thunk/fetch-game-details'
import { usersFavoriteGameType } from '../../types'
import { ListWrapper } from '@/shared/ui'

interface UsersGamesListProps {
	withButton: boolean
}

export function UsersGamesList({ withButton }: UsersGamesListProps) {
	const dispatch = useAppDispatch()
	const router = useRouter()

	const isUserSigned = useAppSelector(userSlice.selectors.selectIsUserSigned)

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

	if (isUserSigned) {
		return (
			<ListWrapper fetchingState={fetchingDetailsByGamesIdsState}>
				<section className='flex flex-col  min-w-full min-h-[46vh] bg-white dark:border-none border-2 border-lightThemeBorderGray dark:bg-whiteGray px-6 pr-10 py-5 rounded-3xl relative'>
					<h2 className='text-blue dark:text-orange text-2xl  mb-5'>
						<strong className='inline text-black dark:text-white underline'>
							Your Gaming
						</strong>{' '}
						Library
					</h2>
					<section className='flex flex-col'>
						<ViewUsersGamesList gameList={userGames} />
					</section>
					<button
						className={`${
							withButton ? '' : 'hidden'
						} bg-blue dark:bg-orange sm:w-1/2 md:w-1/3 m-auto p-2 relative -bottom-5 rounded-2xl text-black dark:text-white`}
						onClick={() => {
							router.push('http://localhost:3000/user')
						}}
					>
						View Your Library
					</button>
				</section>
			</ListWrapper>
		)
	} else {
		return
	}
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
				stores={currentGame.game.stores}
				isComplete={currentGame.isComplete}
			/>
		))
	)
}
