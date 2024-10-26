'use client'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import { MinimalistInput, MinimalistNumberInput } from '@/shared/ui'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { submitUserData } from '../../model/submit-user-data'
import { signUpModalSlice } from '../../model/sign-up-modal-slice'

export function UserComputerSpecificationsInputsGroup() {
	const dispatch = useAppDispatch()
	const router = useRouter()

	const [userProcessor, setUserProcessor] = useState<string>('')
	const [userGraphicsCard, setUserGraphicsCard] = useState<string>('')
	const [userVideoMemory, setUserVideoMemory] = useState<number | ''>('')
	const [userRAM, setUserRAM] = useState<number | ''>('')

	const {
		CPUValidationMessage,
		GPUValidationMessage,
		RAMValidationMessage,
		graphicsMemoryValidationMessage,
	} = useAppSelector(signUpModalSlice.selectors.selectValidationMessages)

	const {
		userNameToSigningUp,
		userPasswordToSigningUp,
		userVerifiedPasswordToSigningUp,
	} = useAppSelector(signUpModalSlice.selectors.selectUserBasics)

	return (
		<>
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

			<section className='flex w-full dark:text-inherit text-white rounded-3xl mb-5'>
				<button
					type='submit'
					onClick={() => {
						dispatch(signUpModalSlice.actions.goToTheFirstStageOfSigningUp())
					}}
					className='w-1/2 dark:bg-orange dark:hover:bg-orangeHover dark:active:bg-orangeActive bg-blue hover:bg-hoverBlue active:bg-activeBlue dark:text-inherit text-white rounded-3xl p-2 mr-2'
				>
					Go Back
				</button>
				<button
					type='submit'
					onClick={() => {
						submitUserData({
							dispatch: dispatch,
							router: router,
							name: userNameToSigningUp,
							password: userPasswordToSigningUp,
							verifiedPassword: userVerifiedPasswordToSigningUp,
							CPU: userProcessor,
							GPU: userGraphicsCard,
							RAM: userRAM ? userRAM : 0,
							graphicsMemory: userVideoMemory ? userVideoMemory : 0,
						})
					}}
					className='w-1/2 dark:bg-orange dark:hover:bg-orangeHover dark:active:bg-orangeActive bg-blue hover:bg-hoverBlue active:bg-activeBlue dark:text-inherit text-white rounded-3xl p-2'
				>
					Sign Up
				</button>
			</section>
		</>
	)
}
