import { UserInfoLocaleStorageType } from '../../types'

export function saveRemovingAllFavoriteGameFromLocalStorage() {
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
					games: {},
					favoriteGamesIds: [],
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
/*
		initCurrentUser: state => {
			let userInfoJSON = localStorage.getItem('UserInfo')
			if (userInfoJSON) {
				const isSigned = localStorage.getItem('isUserSigned')
				const user = JSON.parse(userInfoJSON) as UserInfoLocaleStorageType

				state.isUserSigned = !!isSigned
				state.computerSpecifications = {
					...user.computerSpecifications,
				}
				state.userBasics = {
					...user.userBasics,
				}
				state.statistics.favoriteGamesIds = [
					...user.statistics.favoriteGamesIds,
				]
				state.statistics.favoriteGames = {
					...user.statistics.favoriteGamesIds.reduce(
						(acc, id) => ({
							...acc,
							[id]: {
								isComplete: user.statistics.games[id]?.isComplete,
								completedAchievementIds:
									user.statistics.games[id]?.completedAchievementIds || [],
								game: {},
							},
						}),
						{}
					),
				}
			}
		},
 */
