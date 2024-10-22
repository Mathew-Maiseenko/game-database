export function saveUserInfoInLocalStorageAfterSigningUp(
	name: string,
	password: string,
	CPU: string,
	GPU: string,
	graphicsMemory: number,
	RAM: number
) {
	localStorage.setItem(
		'UserInfo',
		JSON.stringify({
			userBasics: {
				userName: name,
				userPassword: password,
			},
			statistics: {
				games: {},
				favoriteGamesIds: [],
			},
			computerSpecifications: {
				CPU: CPU,
				GPU: GPU,
				RAM: RAM,
				graphicsMemory: graphicsMemory,
			},
		})
	)
}
