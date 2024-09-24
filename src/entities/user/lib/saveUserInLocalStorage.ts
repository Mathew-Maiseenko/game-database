import type { UserInfoStateType } from '../types'

export function saveUserInfoInLocalStorage(state: UserInfoStateType) {
	localStorage.setItem(
		'UserInfo',
		JSON.stringify({
			userBasics: {
				userName: state.userBasics.userName,
				userPassword: state.userBasics.userPassword,
			},
			statistics: {
				// completedGamesIds: state.statistics.favoriteGamesIds.filter(
				// 	id => state.statistics.favoriteGames[id]?.isComplete
				// ),
				games: state.statistics.favoriteGamesIds.reduce(
					(acc, id) => ({
						...acc,
						[id]: {
							isComplete: state.statistics.favoriteGames[id]?.isComplete,
							completedAchievementIds:
								state.statistics.favoriteGames[id]?.completedAchievementIds,
						},
					}),
					{}
				),
				favoriteGamesIds: state.statistics.favoriteGamesIds,
			},
			computerSpecifications: {
				CPU: state.computerSpecifications.CPU,
				GPU: state.computerSpecifications.GPU,
				RAM: state.computerSpecifications.RAM,
				graphicsMemory: state.computerSpecifications.graphicsMemory,
			},
		})
	)
}

export function saveIsUserSignedInLocalStorage(isSigned: boolean) {
	localStorage.setItem('isUserSigned', isSigned ? '1' : '')
}
