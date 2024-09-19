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

const teko = Teko({ subsets: ['latin'] })

export function LogModal() {
	const dispatch = useAppDispatch()

	const [userName, setUserName] = useState<string>('')
	const [userPassword, setUserPassword] = useState<string>('')
	const [userVerifiedPassword, setUserVerifiedPassword] = useState<string>('')

	const [userProcessor, setUserProcessor] = useState<string>('')
	const [userGraphicsCard, setUserGraphicsCard] = useState<string>('')
	const [userVideoMemory, setUserVideoMemory] = useState<string>('')
	const [userRAM, setUserRAM] = useState<string>('')

	const isLogModalOpen = useAppSelector(
		userSlice.selectors.selectIsLoggingModalOpen
	)

	useEffect(() => {
		if (isLogModalOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [isLogModalOpen])

	return (
		<Modal isOpen={isLogModalOpen}>
			<section className='relative  border-2 border-solid border-textGray bg-darkGray sm:w-1/3 lg:w-2/3 min-h-52 pt-5 pb-10 px-10 rounded-3xl'>
				<article
					className='flex absolute top-5 left-5 w-full '
					onClick={() => dispatch(userSlice.actions.setUserLoggingModalClose())}
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
				/>
				<MinimalistPasswordInput
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
				/>
				<h3 className='w-full text-center text-3xl text-gray-light mb-5 underline'>
					Computer Specifications
				</h3>
				<MinimalistInput
					inputValue={userProcessor}
					setInputValue={setUserProcessor}
					message='User name'
					withMagnifierIcon={false}
					className='w-full bg-darkGray mb-3'
				/>
				<MinimalistInput
					inputValue={userGraphicsCard}
					setInputValue={setUserGraphicsCard}
					message='User name'
					withMagnifierIcon={false}
					className='w-full bg-darkGray mb-3'
				/>
				<MinimalistInput
					inputValue={userVideoMemory}
					setInputValue={setUserVideoMemory}
					message='User name'
					withMagnifierIcon={false}
					className='w-full bg-darkGray mb-3'
				/>
				<MinimalistInput
					inputValue={userRAM}
					setInputValue={setUserRAM}
					message='User name'
					withMagnifierIcon={false}
					className='w-full bg-darkGray mb-7'
				/>
				<button
					type='submit'
					className='w-full bg-orange rounded-3xl p-2'
					onSubmit={() => {}}
				>
					Sign Up
				</button>
			</section>
		</Modal>
	)
}
//setLogModalOpen(!isLogModalOpen)
