import { UserInfoLocaleStorageType } from '../../types'

export function saveRemovingFavoriteGameFromLocalStorage(gameId: number) {
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
						[gameId]: undefined,
					},
					favoriteGamesIds: user.statistics.favoriteGamesIds.filter(
						curId => curId !== gameId
					),
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
