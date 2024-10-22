interface saveUserInfoInLocalStorageAfterSigningUpParams {
	name: string
	password: string
	verifiedPassword: string
	CPU: string
	GPU: string
	graphicsMemory: number
	RAM: number
}

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

export function saveIsUserSignedInLocalStorage(isSigned: boolean) {
	localStorage.setItem('isUserSigned', isSigned ? '1' : '')
}
