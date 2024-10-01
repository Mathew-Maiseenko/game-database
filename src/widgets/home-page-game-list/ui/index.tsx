'use client'
import { PopularGamesList } from '@/entities/game/popular-game-list'
import { RecommendedGameList } from '@/entities/game/recommended-game-list'
import { userSlice } from '@/entities/user'
import { useAppSelector } from '@/shared/lib/redux/hooks'

export function HomePageGameList() {
	const isUserSigned = useAppSelector(userSlice.selectors.selectIsUserSigned)
	const userGamesIds = useAppSelector(
		userSlice.selectors.selectFavoriteGamesIds
	)
	if (isUserSigned && userGamesIds.length) {
		return <RecommendedGameList />
	} else {
		return <PopularGamesList />
	}
}
