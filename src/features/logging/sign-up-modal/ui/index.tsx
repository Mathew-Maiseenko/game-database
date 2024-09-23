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
import { submitUserData } from '../model/submitUserData'
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
		//говно-код
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
		<Modal isOpen={isSignUpModalOpen}>
			<section className='relative  border-2 border-solid border-textGray bg-darkGray sm:w-1/3 lg:w-2/3 min-h-52 pt-5 pb-10 px-44 rounded-3xl'>
				<article
					className='flex absolute top-5 left-5 w-full '
					onClick={() => dispatch(userSlice.actions.setUserSignUpModalClose())}
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
					className='w-full bg-darkGray mb-3'
					errorMessage={userNameValidationMessage}
				/>
				<ValidatedPasswordInput
					inputValue={userPassword}
					setInputValue={setUserPassword}
					message='Enter password'
					withMagnifierIcon={false}
					className='w-full bg-darkGray mb-3'
				/>
				<MinimalistPasswordInput
					inputValue={userVerifiedPassword}
					setInputValue={setUserVerifiedPassword}
					message='Confirm password'
					withMagnifierIcon={false}
					className='w-full bg-darkGray mb-7'
					errorMessage={passwordValidationMessage}
				/>
				<h3 className='w-full text-center text-3xl text-gray-light mb-5 underline'>
					Computer Specifications
				</h3>
				<MinimalistInput
					inputValue={userProcessor}
					setInputValue={setUserProcessor}
					message='Enter processor model'
					withMagnifierIcon={false}
					className='w-full bg-darkGray mb-3'
					errorMessage={CPUValidationMessage}
				/>
				<MinimalistInput
					inputValue={userGraphicsCard}
					setInputValue={setUserGraphicsCard}
					message='Enter graphics card model'
					withMagnifierIcon={false}
					className='w-full bg-darkGray mb-3'
					errorMessage={GPUValidationMessage}
				/>
				<MinimalistNumberInput
					inputValue={userRAM}
					setInputValue={setUserRAM}
					message='Enter the RAM size'
					className='w-full bg-darkGray mb-3'
					errorMessage={RAMValidationMessage}
				/>
				<MinimalistNumberInput
					inputValue={userVideoMemory}
					setInputValue={setUserVideoMemory}
					message='Enter amount of video memory'
					className='w-full bg-darkGray mb-9'
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
					className='w-full bg-orange rounded-3xl p-2 mb-5'
				>
					Sign Up
				</button>
				<article className='flex justify-center items-center w-full text-textGray'>
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