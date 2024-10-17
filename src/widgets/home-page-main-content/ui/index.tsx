'use client'
import { PopularGamesList } from '@/entities/game/popular-game-list'
import { RecommendedGameList } from '@/entities/game/recommended-game-list'
import { UsersGamesList, userSlice } from '@/entities/user'
import { useAppSelector } from '@/shared/lib/redux/hooks'

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
