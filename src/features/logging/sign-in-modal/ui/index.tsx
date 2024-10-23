'use client'
import { Teko } from 'next/font/google'
import { userSlice } from '@/entities/user'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import {
	CrossIcon,
	MinimalistInput,
	MinimalistPasswordInput,
	Modal,
} from '@/shared/ui'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInUser } from '../model/sign-in-user'

const teko = Teko({ subsets: ['latin'] })

export function SignInModal() {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const [userName, setUserName] = useState<string>('')
	const [userPassword, setUserPassword] = useState<string>('')

	const isSignInModalOpen = useAppSelector(
		userSlice.selectors.selectIsUserSignInModalOpen
	)

	const { userNameValidationMessage } = useAppSelector(
		userSlice.selectors.selectValidationMessages
	)

	useEffect(() => {
		if (isSignInModalOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [isSignInModalOpen])

	return (
		<Modal
			isOpen={isSignInModalOpen}
			setModalCloseFunction={() =>
				dispatch(userSlice.actions.setUserSignInModalClose())
			}
		>
			<section
				onClick={e => e.stopPropagation()}
				className='relative border-2 border-solid bg-white border-lightThemeBorderGray dark:border-textGray dark:bg-darkGray 
				w-4/5 lg:w-2/5 p-5 md:p-6 lg:p-7 rounded-2xl lg:rounded-3xl cursor-default'
			>
				<article
					className='flex absolute top-5 right-5 z-[51]'
					onClick={() => dispatch(userSlice.actions.setUserSignInModalClose())}
				>
					<CrossIcon classes='w-6 sm:w-7 lg:w-10' />
				</article>
				<h2
					className={`${teko.className} text-center dark:text-yellow text-blue text-4xl md:text-5xl lg:text-7xl xl:text-9xl font-medium self-center md:order-1 cursor-pointer`}
				>
					Cyber List
				</h2>
				<MinimalistInput
					inputValue={userName}
					setInputValue={setUserName}
					message='User name'
					withMagnifierIcon={false}
					className='w-full bg-inherit mb-5'
					errorMessage={userNameValidationMessage}
				/>
				<MinimalistPasswordInput
					inputValue={userPassword}
					setInputValue={setUserPassword}
					message='Enter password'
					className='w-full bg-inherit mb-5'
				/>
				<button
					onClick={() =>
						signInUser({
							dispatch,
							router,
							name: userName,
							password: userPassword,
						})
					}
					type='submit'
					className='w-full dark:bg-orange bg-blue rounded-3xl p-2 md:p-3 lg:p-4 mb-5'
				>
					Sign In
				</button>
				<article className='flex justify-center items-center w-full dark:text-textGray text-lightThemeTextGray'>
					<h6 className='inline-block transition-all duration-150 mr-3'>
						Do not have an account?
					</h6>
					<h6
						onClick={() => {
							dispatch(userSlice.actions.setUserSignInModalClose())
							dispatch(userSlice.actions.setUserSignUpModalOpen())
						}}
						className='inline-block transition-all duration-150 hover:underline cursor-pointer'
					>
						Sign Up
					</h6>
				</article>
			</section>
		</Modal>
	)
}
