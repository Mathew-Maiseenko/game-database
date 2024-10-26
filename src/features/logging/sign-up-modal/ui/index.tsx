'use client'
import { Teko } from 'next/font/google'
import { userSlice } from '@/entities/user'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import { CrossIcon, Modal } from '@/shared/ui'
import { useEffect } from 'react'
import { BaseUserInfoInputsGroup } from './base-user-info-inputs'
import { UserComputerSpecificationsInputsGroup } from './user-computer-specifications-inputs-group'
import { signUpModalSlice } from '../model/sign-up-modal-slice'
import { SigningUpStagesEnum } from '../types'

const teko = Teko({ subsets: ['latin'] })

export function SignUpModal() {
	const dispatch = useAppDispatch()

	const isSignUpModalOpen = useAppSelector(
		userSlice.selectors.selectIsUserSignUpModalOpen
	)

	const curSigningUpStage = useAppSelector(
		signUpModalSlice.selectors.selectTheStageOfSigningUp
	)

	useEffect(() => {
		if (isSignUpModalOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [isSignUpModalOpen])

	return (
		<Modal
			isOpen={isSignUpModalOpen}
			setModalCloseFunction={() =>
				dispatch(userSlice.actions.setUserSignUpModalClose())
			}
		>
			<section
				onClick={e => e.stopPropagation()}
				className='relative border-2 border-solid bg-white border-lightThemeBorderGray dark:border-textGray dark:bg-darkGray min-w-[83.333%] lg:min-w-[66.6%] min-h-[35vh] max-h-[95vh] pt-5 pb-7 px-4 sm:px-10 md:px-16 lg:px-20 cursor-default rounded-3xl'
			>
				<article
					className='flex absolute top-5 right-5'
					onClick={() => dispatch(userSlice.actions.setUserSignUpModalClose())}
				>
					<CrossIcon classes='w-6 sm:w-7 lg:w-10' />
				</article>
				<h2
					className={`${teko.className} text-center text-blue dark:text-yellow text-3xl lg:text-7xl font-medium self-center md:order-1 cursor-pointer`}
				>
					Cyber List
				</h2>
				{curSigningUpStage === SigningUpStagesEnum.userBasicsInfoStage && (
					<BaseUserInfoInputsGroup />
				)}
				{curSigningUpStage ===
					SigningUpStagesEnum.usersComputerSpecificationsStage && (
					<UserComputerSpecificationsInputsGroup />
				)}
				<article className='flex justify-center items-center w-full dark:text-textGray text-lightThemeTextGray'>
					<h6 className='inline-block transition-all duration-150 mr-3'>
						Have an account?
					</h6>
					<h6
						onClick={() => {
							dispatch(userSlice.actions.setUserSignUpModalClose())
							dispatch(userSlice.actions.setUserSignInModalOpen())
						}}
						className='inline-block transition-all duration-150 hover:underline cursor-pointer'
					>
						Sign In
					</h6>
				</article>
			</section>
		</Modal>
	)
}

/*
'use client'
import { Teko } from 'next/font/google'
import { userSlice } from '@/entities/user'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import {
	CrossIcon,
	MinimalistInput,
	MinimalistNumberInput,
	MinimalistPasswordInput,
	Modal,
	ValidatedPasswordInput,
} from '@/shared/ui'
import { useEffect, useState } from 'react'
import { submitUserData } from '../model/submit-user-data'
import { useRouter } from 'next/navigation'

const teko = Teko({ subsets: ['latin'] })

export function SignUpModal() {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const [userName, setUserName] = useState<string>('')
	const [userPassword, setUserPassword] = useState<string>('')
	const [userVerifiedPassword, setUserVerifiedPassword] = useState<string>('')

	const [userProcessor, setUserProcessor] = useState<string>('')
	const [userGraphicsCard, setUserGraphicsCard] = useState<string>('')
	const [userVideoMemory, setUserVideoMemory] = useState<number | ''>('')
	const [userRAM, setUserRAM] = useState<number | ''>('')

	const isSignUpModalOpen = useAppSelector(
		userSlice.selectors.selectIsUserSignUpModalOpen
	)

	const {
		userNameValidationMessage,
		passwordValidationMessage,
		CPUValidationMessage,
		GPUValidationMessage,
		RAMValidationMessage,
		graphicsMemoryValidationMessage,
	} = useAppSelector(userSlice.selectors.selectValidationMessages)

	useEffect(() => {
		if (isSignUpModalOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [isSignUpModalOpen])

	return (
		<Modal
			isOpen={isSignUpModalOpen}
			setModalCloseFunction={() =>
				dispatch(userSlice.actions.setUserSignUpModalClose())
			}
		>
			<section
				onClick={e => e.stopPropagation()}
				className='relative border-2 border-solid bg-white border-lightThemeBorderGray dark:border-textGray dark:bg-darkGray min-w-[83.333%] lg:min-w-[66.6%] min-h-[35vh] max-h-[95vh] pt-5 pb-7 px-4 sm:px-10 md:px-16 lg:px-20 cursor-default rounded-3xl'
			>
				<article
					className='flex absolute top-5 right-5'
					onClick={() => dispatch(userSlice.actions.setUserSignUpModalClose())}
				>
					<CrossIcon classes='w-6 sm:w-7 lg:w-10' />
				</article>
				<h2
					className={`${teko.className} text-center text-blue dark:text-yellow text-2xl md:text-3xl lg:text-7xl font-medium self-center md:order-1 cursor-pointer`}
				>
					Cyber List
				</h2>
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
					className='w-full bg-inherit mb-4'
					errorMessage={passwordValidationMessage}
				/>
				<h3 className='w-full text-center text-3xl text-lightThemeTextDarkGray dark:text-white mb-4 underline'>
					Computer Specifications
				</h3>
				<MinimalistInput
					inputValue={userProcessor}
					setInputValue={setUserProcessor}
					message='Enter processor model'
					withMagnifierIcon={false}
					className='w-full bg-inherit mb-2'
					errorMessage={CPUValidationMessage}
				/>
				<MinimalistInput
					inputValue={userGraphicsCard}
					setInputValue={setUserGraphicsCard}
					message='Enter graphics card model'
					withMagnifierIcon={false}
					className='w-full bg-inherit mb-2'
					errorMessage={GPUValidationMessage}
				/>
				<MinimalistNumberInput
					inputValue={userRAM}
					setInputValue={setUserRAM}
					message='Enter the RAM size'
					className='w-full bg-inherit mb-2'
					errorMessage={RAMValidationMessage}
				/>
				<MinimalistNumberInput
					inputValue={userVideoMemory}
					setInputValue={setUserVideoMemory}
					message='Enter amount of video memory'
					className='w-full bg-inherit mb-7'
					errorMessage={graphicsMemoryValidationMessage}
				/>
				<button
					type='submit'
					onClick={() => {
						submitUserData({
							dispatch: dispatch,
							router: router,
							name: userName,
							password: userPassword,
							verifiedPassword: userVerifiedPassword,
							CPU: userProcessor,
							GPU: userGraphicsCard,
							RAM: userRAM ? userRAM : 0,
							graphicsMemory: userVideoMemory ? userVideoMemory : 0,
						})
					}}
					className='w-full dark:bg-orange bg-blue dark:text-inherit text-white rounded-3xl p-2 mb-5'
				>
					Sign Up
				</button>
				<article className='flex justify-center items-center w-full dark:text-textGray text-lightThemeTextGray'>
					<h6 className='inline-block transition-all duration-150 mr-3'>
						Have an account?
					</h6>
					<h6
						onClick={() => {
							dispatch(userSlice.actions.setUserSignUpModalClose())
							dispatch(userSlice.actions.setUserSignInModalOpen())
						}}
						className='inline-block transition-all duration-150 hover:underline cursor-pointer'
					>
						Sign In
					</h6>
				</article>
			</section>
		</Modal>
	)
}

*/
