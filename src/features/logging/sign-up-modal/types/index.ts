import type { AppDispatch } from '@/shared/lib'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export interface submitUserDataFooParams {
	dispatch: AppDispatch
	router: AppRouterInstance
	name: string
	password: string
	verifiedPassword: string
	CPU: string
	GPU: string
	graphicsMemory: number
	RAM: number
}

export interface goToTheSecondStageOfSigningUpFooParams {
	dispatch: AppDispatch
	name: string
	password: string
	verifiedPassword: string
}

export interface setUserBasicsValidationMessagesActionType {
	userNameValidationMessage: string
	passwordValidationMessage: string
}

export interface validationMessagesType {
	userNameValidationMessage: string
	passwordValidationMessage: string
	CPUValidationMessage: string
	GPUValidationMessage: string
	RAMValidationMessage: string
	graphicsMemoryValidationMessage: string
}

export interface userBasicsType {
	userNameToSigningUp: string
	userPasswordToSigningUp: string
	userVerifiedPasswordToSigningUp: string
}

export interface SignUpModalStateType {
	stageOfSigningUp: SigningUpStagesEnum
	userBasics: userBasicsType
	validationMessages: validationMessagesType
}

export const enum SigningUpStagesEnum {
	userBasicsInfoStage = 0,
	usersComputerSpecificationsStage = 1,
}
