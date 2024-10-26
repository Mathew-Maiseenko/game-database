import { createAppSlice } from '@/shared/lib'
import { PayloadAction } from '@reduxjs/toolkit'
import {
	SigningUpStagesEnum,
	type setUserBasicsValidationMessagesActionType,
	type SignUpModalStateType,
	type userBasicsType,
	type validationMessagesType,
} from '../types'

const initialState: SignUpModalStateType = {
	stageOfSigningUp: SigningUpStagesEnum.userBasicsInfoStage,
	userBasics: {
		userNameToSigningUp: '',
		userPasswordToSigningUp: '',
		userVerifiedPasswordToSigningUp: '',
	},
	validationMessages: {
		userNameValidationMessage: '',
		passwordValidationMessage: '',
		CPUValidationMessage: '',
		GPUValidationMessage: '',
		RAMValidationMessage: '',
		graphicsMemoryValidationMessage: '',
	},
}

export const signUpModalSlice = createAppSlice({
	name: 'signUpModal',
	initialState,
	selectors: {
		selectTheStageOfSigningUp: state => state.stageOfSigningUp,
		selectValidationMessages: state => state.validationMessages,
		selectUserBasics: state => state.userBasics,
	},
	reducers: {
		goToTheFirstStageOfSigningUp: state => {
			state.stageOfSigningUp = SigningUpStagesEnum.userBasicsInfoStage
		},
		goToTheSecondStageOfSigningUp: state => {
			state.stageOfSigningUp =
				SigningUpStagesEnum.usersComputerSpecificationsStage
		},
		setUserBasics: (state, action: PayloadAction<userBasicsType>) => {
			state.userBasics = action.payload
		},
		clearValidationMessages: state => {
			state.validationMessages = {
				userNameValidationMessage: '',
				passwordValidationMessage: '',
				CPUValidationMessage: '',
				GPUValidationMessage: '',
				RAMValidationMessage: '',
				graphicsMemoryValidationMessage: '',
			}
		},
		setUserBasicsValidationMessages: (
			state,
			action: PayloadAction<setUserBasicsValidationMessagesActionType>
		) => {
			state.validationMessages = {
				...state.validationMessages,
				userNameValidationMessage: action.payload.userNameValidationMessage,
				passwordValidationMessage: action.payload.passwordValidationMessage,
			}
		},

		setValidationMessages: (
			state,
			action: PayloadAction<validationMessagesType>
		) => {
			state.validationMessages = {
				userNameValidationMessage: action.payload.userNameValidationMessage,
				passwordValidationMessage: action.payload.passwordValidationMessage,
				CPUValidationMessage: action.payload.CPUValidationMessage,
				GPUValidationMessage: action.payload.GPUValidationMessage,
				RAMValidationMessage: action.payload.RAMValidationMessage,
				graphicsMemoryValidationMessage:
					action.payload.graphicsMemoryValidationMessage,
			}
		},
	},
})
