'use client'
import { userSlice } from '@/entities/user'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import {
	MinimalistInput,
	MinimalistPasswordInput,
	ValidatedPasswordInput,
} from '@/shared/ui'
import { useState } from 'react'
import { goToTheSecondStageOfSigningUp } from '../../model/go-to-the-second-stage-of-signing-up'
import { signUpModalSlice } from '../../model/sign-up-modal-slice'

export function BaseUserInfoInputsGroup() {
	const dispatch = useAppDispatch()
	const [userName, setUserName] = useState<string>('')
	const [userPassword, setUserPassword] = useState<string>('')
	const [userVerifiedPassword, setUserVerifiedPassword] = useState<string>('')

	const { userNameValidationMessage, passwordValidationMessage } =
		useAppSelector(signUpModalSlice.selectors.selectValidationMessages)

	return (
		<>
			<MinimalistInput
				inputValue={userName}
				setInputValue={setUserName}
				message='User name'
				withMagnifierIcon={false}
				className='w-full bg-inherit mb-1'
				errorMessage={userNameValidationMessage}
			/>
			<ValidatedPasswordInput
				inputValue={userPassword}
				setInputValue={setUserPassword}
				message='Enter password'
				className='w-full bg-inherit mb-1'
			/>
			<MinimalistPasswordInput
				inputValue={userVerifiedPassword}
				setInputValue={setUserVerifiedPassword}
				message='Confirm password'
				className='w-full bg-inherit mb-8'
				errorMessage={passwordValidationMessage}
			/>

			<button
				onClick={() =>
					goToTheSecondStageOfSigningUp({
						dispatch: dispatch,
						name: userName,
						password: userPassword,
						verifiedPassword: userVerifiedPassword,
					})
				}
				className='w-full dark:bg-orange dark:hover:bg-orangeHover dark:active:bg-orangeActive bg-blue hover:bg-hoverBlue active:bg-activeBlue dark:text-inherit text-white rounded-3xl p-2 mb-5'
			>
				Next
			</button>
		</>
	)
}
