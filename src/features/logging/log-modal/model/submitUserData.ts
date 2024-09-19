import { userSlice } from '@/entities/user'
import { useAppDispatch } from '@/shared/lib/redux/hooks'
import type { submitUserDataFooParams } from '../types'
import { passwordsMatchCheck } from '../lib/passwordsMatchCheck'
import { validateName } from '../lib/validateName'

function isNumber(value: string): boolean {
	return !isNaN(Number(value))
}

function submitUserData({
	name,
	password,
	verifiedPassword,
	CPU,
	GPU,
	graphicsMemory,
	RAM,
}: submitUserDataFooParams) {
	const dispatch = useAppDispatch()

	let isWithError = false
	const functionValidationMessages = {
		userNameValidationMessage: validateName(name),
		passwordValidationMessage: passwordsMatchCheck(password, verifiedPassword),
		CPUValidationMessage: '',
		GPUValidationMessage: '',
		RAMValidationMessage: '',
		graphicsMemoryValidationMessage: '',
	}

	if (name.length < 2) {
		functionValidationMessages.CPUValidationMessage =
			'User name is too short. Please input more than 1 character'
		isWithError = true
	} else if (name.length > 30) {
		functionValidationMessages.CPUValidationMessage =
			'User name is too long. Please input less than 30 characters'
		isWithError = true
	}

	if (!isNaN(Number(password))) {
		functionValidationMessages.passwordValidationMessage =
			'Your password should not consist only of numbers'
	} else if (password === verifiedPassword) {
		functionValidationMessages.passwordValidationMessage =
			'Your password and confirmed password are different'
	} else {
	}

	if (!isWithError) {
		dispatch(
			userSlice.actions.setUsersData({
				userName: name,
				userPassword: password,
				computerSpecifications: {
					CPU: CPU,
					GPU: GPU,
					RAM: RAM,
					graphicsMemory: graphicsMemory,
				},
			})
		)
	} else {
		dispatch(
			userSlice.actions.setValidationMessages({
				userNameValidationMessage: '',
				passwordValidationMessage: '',
				CPUValidationMessage: '',
				GPUValidationMessage: '',
				RAMValidationMessage: '',
				graphicsMemoryValidationMessage: '',
			})
		)
	}
}
