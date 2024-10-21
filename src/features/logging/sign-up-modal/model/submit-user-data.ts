import { userSlice } from '@/entities/user'
import { passwordsMatchCheck } from '../lib/passwords-match-check'
import { validateName } from '../lib/validate-name'
import { validateHardwareName } from '../lib/validate-CPU'
import { validateRAM } from '../lib/validate-RAM'
import { validateGraphicMemory } from '../lib/validate-graphic-memory'
import type { submitUserDataFooParams } from '../types'

export function submitUserData({
	dispatch,
	router,
	name,
	password,
	verifiedPassword,
	CPU,
	GPU,
	RAM,
	graphicsMemory,
}: submitUserDataFooParams) {
	const userNameValidationMessage = validateName(name)
	const passwordValidationMessage = passwordsMatchCheck(
		password,
		verifiedPassword
	)
	const CPUValidationMessage = validateHardwareName(CPU)
	const GPUValidationMessage = validateHardwareName(GPU)
	const RAMValidationMessage = validateRAM(RAM)
	const graphicsMemoryValidationMessage = validateGraphicMemory(graphicsMemory)

	const isClear =
		!userNameValidationMessage &&
		!passwordValidationMessage &&
		!CPUValidationMessage &&
		!GPUValidationMessage &&
		!RAMValidationMessage &&
		!graphicsMemoryValidationMessage

	if (isClear) {
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
		dispatch(userSlice.actions.removeAllFavoriteGames())
		router.push('http://localhost:3000/user')
		dispatch(userSlice.actions.setUserSignUpModalClose())
	} else {
		dispatch(
			userSlice.actions.setValidationMessages({
				userNameValidationMessage: userNameValidationMessage,
				passwordValidationMessage: passwordValidationMessage,
				CPUValidationMessage: CPUValidationMessage,
				GPUValidationMessage: GPUValidationMessage,
				RAMValidationMessage: RAMValidationMessage,
				graphicsMemoryValidationMessage: graphicsMemoryValidationMessage,
			})
		)
	}
}
