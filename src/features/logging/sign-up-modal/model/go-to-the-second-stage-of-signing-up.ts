import { passwordsMatchCheck } from '../lib/passwords-match-check'
import { validateName } from '../lib/validate-name'
import type { goToTheSecondStageOfSigningUpFooParams } from '../types'
import { signUpModalSlice } from './sign-up-modal-slice'

export function goToTheSecondStageOfSigningUp({
	dispatch,
	name,
	password,
	verifiedPassword,
}: goToTheSecondStageOfSigningUpFooParams) {
	const userNameValidationMessage = validateName(name)
	const passwordValidationMessage = passwordsMatchCheck(
		password,
		verifiedPassword
	)

	const isClear = !userNameValidationMessage && !passwordValidationMessage

	if (isClear) {
		dispatch(
			signUpModalSlice.actions.setUserBasics({
				userNameToSigningUp: name,
				userPasswordToSigningUp: password,
				userVerifiedPasswordToSigningUp: verifiedPassword,
			})
		)
		dispatch(signUpModalSlice.actions.clearValidationMessages())
		dispatch(signUpModalSlice.actions.goToTheSecondStageOfSigningUp())
	} else {
		dispatch(
			signUpModalSlice.actions.setUserBasicsValidationMessages({
				userNameValidationMessage: userNameValidationMessage,
				passwordValidationMessage: passwordValidationMessage,
			})
		)
	}
}
