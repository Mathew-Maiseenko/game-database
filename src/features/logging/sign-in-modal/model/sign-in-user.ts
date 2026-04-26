import {
	saveIsUserSignedInLocalStorage,
	userSlice,
	UserInfoLocaleStorageType,
} from '@/entities/user'
import { baseSiteUrl } from '@/shared/model'
import type { signInUserParams } from '../types'

export async function signInUser({
	dispatch,
	router,
	name,
	password,
}: signInUserParams) {
	try {
		const response = await fetch(`${baseSiteUrl}/api/user/signin`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, password }),
		})

		const data = await response.json()

		if (!response.ok) {
			const errorMsg = data.error || 'Invalid login or password'
			dispatch(
				userSlice.actions.setValidationMessages({
					userNameValidationMessage: errorMsg,
					passwordValidationMessage: errorMsg,
				}),
			)
			return
		}

		// Извлекаем данные пользователя из ответа
		const {
			userId,
			userName,
			CPU,
			GPU,
			RAM,
			graphicsMemory,
			games,
			favoriteGamesIds,
		} = data.user

		const userInfo: UserInfoLocaleStorageType = {
			userBasics: {
				userName,
				userPassword: password,
			},
			statistics: {
				games,
				favoriteGamesIds,
			},
			computerSpecifications: {
				CPU,
				GPU,
				RAM,
				graphicsMemory,
			},
		}

		const { isAdmin } = data
		localStorage.setItem('isAdmin', JSON.stringify(isAdmin))

		// Сохраняем в localStorage для офлайн-доступа
		localStorage.setItem('userId', userId.toString())
		localStorage.setItem('UserInfo', JSON.stringify(userInfo))

		// Инициализируем (как ранее из localStorage)
		dispatch(
			userSlice.actions.initCurrentUser({
				user: userInfo,
				isSigned: 'true',
			}),
		)
		dispatch(userSlice.actions.setUserSignInModalClose())
		saveIsUserSignedInLocalStorage(true)

		router.push(`${baseSiteUrl}/user`)
	} catch (error) {
		console.error('Sign in error:', error)
		dispatch(
			userSlice.actions.setValidationMessages({
				userNameValidationMessage: 'Network error',
				passwordValidationMessage: 'Network error',
			}),
		)
	}
}
// import {
// 	saveIsUserSignedInLocalStorage,
// 	UserInfoLocaleStorageType,
// 	userSlice,
// } from '@/entities/user'
// import type { signInUserParams } from '../types'
// import { checkLogParams } from '../lib/check-log-params'
// import { baseSiteUrl } from '@/shared/model'

// export function signInUser({
// 	dispatch,
// 	router,
// 	name,
// 	password,
// }: signInUserParams) {
// 	const currentUserInfoJSON = localStorage.getItem('UserInfo')
// 	if (currentUserInfoJSON) {
// 		const currentUser = JSON.parse(
// 			currentUserInfoJSON
// 		) as UserInfoLocaleStorageType

// 		const { userPassword, userName } = currentUser.userBasics

// 		const isUserNameCorrect = checkLogParams(name, userName)
// 		const isPasswordCorrect = checkLogParams(password, userPassword)

// 		if (isUserNameCorrect && isPasswordCorrect) {
// 			dispatch(userSlice.actions.setUserSigned())
// 			dispatch(userSlice.actions.setUserSignInModalClose())
// 			saveIsUserSignedInLocalStorage(true)
// 			router.push(`${baseSiteUrl}/user`)
// 		} else {
// 			dispatch(
// 				userSlice.actions.setValidationMessages({
// 					userNameValidationMessage: name
// 						? 'Invalid login or password'
// 						: 'This field is required',
// 					passwordValidationMessage: password
// 						? 'Invalid login or password'
// 						: 'This field is required',
// 				})
// 			)
// 		}
// 	}
// }
