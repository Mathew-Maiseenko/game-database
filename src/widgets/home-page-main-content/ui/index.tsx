'use client'
import dynamic from 'next/dynamic'
import { userSlice } from '@/entities/user'
import { useAppSelector } from '@/shared/lib/redux/hooks'

const PopularGamesList = dynamic(() =>
	import('@/entities/game/popular-game-list').then(
		file => file.PopularGamesList
	)
)

const RecommendedGameList = dynamic(() =>
	import('@/entities/game/recommended-game-list').then(
		file => file.RecommendedGameList
	)
)

const UsersGamesList = dynamic(() =>
	import('@/entities/user').then(file => file.UsersGamesList)
)

export function HomePageMainContent() {
	const isUserSigned = useAppSelector(userSlice.selectors.selectIsUserSigned)
	const userGamesIdsCount = useAppSelector(
		userSlice.selectors.selectFavoriteGamesIdsCount
	)

	if (isUserSigned && userGamesIdsCount) {
		return (
			<>
				<UsersGamesList styles='mb-9 md:mb-14 lg:mb-16' withButton={true} />
				<RecommendedGameList />
			</>
		)
	} else {
		return <PopularGamesList />
	}
}
