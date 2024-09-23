import { UserInfoLocaleStorageType, userSlice } from '@/entities/user'
import type { signInUserParams } from '../types'
import { checkLogParams } from '../lib/checkLogParams'

export function signInUser({
	dispatch,
	router,
	name,
	password,
}: signInUserParams) {
	const currentUserInfoJSON = localStorage.getItem('UserInfo')
	if (currentUserInfoJSON) {
		const currentUser = JSON.parse(
			currentUserInfoJSON
		) as UserInfoLocaleStorageType

		const { userPassword, userName } = currentUser.userBasics

		const isUserNameCorrect = checkLogParams(name, userName)
		const isPasswordCorrect = checkLogParams(password, userPassword)

		if (isUserNameCorrect && isPasswordCorrect) {
			dispatch(userSlice.actions.setUserSigned())
			dispatch(userSlice.actions.setUserSignInModalClose())
			router.push('http://localhost:3000/user')
		} else {
			dispatch(
				userSlice.actions.setValidationMessages({
					userNameValidationMessage: 'Invalid login or password',
					passwordValidationMessage: 'Invalid login or password',
					CPUValidationMessage: '',
					GPUValidationMessage: '',
					RAMValidationMessage: '',
					graphicsMemoryValidationMessage: '',
				})
			)
		}
	}
}
