import { userSlice } from '@/entities/user'
import { useAppDispatch } from '@/shared/lib/redux/hooks'
import { passwordsMatchCheck } from '../lib/passwordsMatchCheck'
import { validateName } from '../lib/validateName'
import { validateHardwareName } from '../lib/validateCPU'
import { validateRAM } from '../lib/validateRAM'
import { validateGraphicMemory } from '../lib/validateGraphicMemory'
import type { submitUserDataFooParams } from '../types'
import { useRouter } from 'next/navigation'

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
		router.push('http://localhost:3000/user')
	} else {
		console.log('ошибка')

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
