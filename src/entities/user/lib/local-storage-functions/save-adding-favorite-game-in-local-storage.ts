import { UserInfoLocaleStorageType } from '../../types'
import { saveAddingFavoriteGame } from '../server-functions/save-adding-favorite-game'

export function saveAddingFavoriteGameInLocalStorage(gameId: number) {
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
						[gameId]: { isComplete: false, completedAchievementIds: {} },
					},
					favoriteGamesIds: [...user.statistics.favoriteGamesIds, gameId],
				},
				computerSpecifications: {
					CPU: user.computerSpecifications.CPU,
					GPU: user.computerSpecifications.GPU,
					RAM: user.computerSpecifications.RAM,
					graphicsMemory: user.computerSpecifications.graphicsMemory,
				},
			}),
		)
	}

	saveAddingFavoriteGame(gameId)
}
