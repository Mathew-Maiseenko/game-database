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
//import { submitUserData } from '../model/submitUserData'
import { useRouter } from 'next/navigation'
import { signInUser } from '../model/signInUser'

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
		<Modal isOpen={isSignInModalOpen}>
			<section className='relative border-2 border-solid border-textGray bg-darkGray sm:w-1/3 lg:w-2/5 py-24 px-20 rounded-3xl'>
				<article
					className='flex absolute top-5 left-5 w-full '
					onClick={() => dispatch(userSlice.actions.setUserSignInModalClose())}
				>
					<CrossIcon classes=' sm:w-7 lg:w-10' />
				</article>
				<h2
					className={`${teko.className} text-center text-yellow text-7xl font-medium self-center md:order-1 cursor-pointer`}
				>
					Cyber List
				</h2>
				<MinimalistInput
					inputValue={userName}
					setInputValue={setUserName}
					message='User name'
					withMagnifierIcon={false}
					className='w-full bg-darkGray mb-5'
					errorMessage={userNameValidationMessage}
				/>
				<MinimalistPasswordInput
					inputValue={userPassword}
					setInputValue={setUserPassword}
					message='Enter password'
					withMagnifierIcon={false}
					className='w-full bg-darkGray mb-5'
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
					className='w-full bg-orange rounded-3xl p-2 mb-5'
				>
					Sign In
				</button>
				<article className='flex justify-center items-center w-full text-textGray'>
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
//setLogModalOpen(!isLogModalOpen)
{
	/* <MinimalistInput
					inputValue={userVideoMemory}
					setInputValue={setUserVideoMemory}
					message='Enter amount of video memory'
					withMagnifierIcon={false}
					className='w-full bg-darkGray mb-3'
				/>
				<MinimalistInput
					inputValue={userRAM}
					setInputValue={setUserRAM}
					message='Enter the RAM size'
					withMagnifierIcon={false}
					className='w-full bg-darkGray mb-7'
					errorMessage=''
				/> */
}
