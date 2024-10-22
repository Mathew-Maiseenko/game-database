import { UserInfoLocaleStorageType } from '../../types'

export function saveSettingGameAchievementIncompleteInLocalStorage(
	gameId: number,
	achievementId: number
) {
	let userInfoJSON = localStorage.getItem('UserInfo')
	if (userInfoJSON) {
		const user = JSON.parse(userInfoJSON) as UserInfoLocaleStorageType
		localStorage.setItem(
			'UserInfo',
			JSON.stringify({
				userBasics: {
					userName: user.userBasics.userName,
					userPassword: user.userBasics.userPassword,
				},
				statistics: {
					games: {
						...user.statistics.games,
						[gameId]: {
							isComplete: user.statistics.games[gameId]?.isComplete
								? user.statistics.games[gameId].isComplete
								: true,
							completedAchievementIds: {
								...user.statistics.games[gameId]?.completedAchievementIds,
								[achievementId]: undefined,
							},
						},
					},
					favoriteGamesIds: user.statistics.favoriteGamesIds,
				},
				computerSpecifications: {
					CPU: user.computerSpecifications.CPU,
					GPU: user.computerSpecifications.GPU,
					RAM: user.computerSpecifications.RAM,
					graphicsMemory: user.computerSpecifications.graphicsMemory,
				},
			})
		)
	}
}
