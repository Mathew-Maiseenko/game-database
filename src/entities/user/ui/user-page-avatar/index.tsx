'use client'
import getRandomDefaultImage from '@/shared/model/defaultImages'

import Image from 'next/image'
import { userSlice } from '../../model/user-slice'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import { useRouter } from 'next/navigation'

export function UsersAvatar() {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const userName = useAppSelector(userSlice.selectors.selectUserName)
	return (
		<article className='flex flex-col sm:mr-0 md:mr-5 lg:mr-10 sm:w-full md:w-1/3 rounded-3xl relative after:h-full after:w-px after:absolute md:after:-right-2 lg:after:-right-5  sm:after:bg-none md:after:bg-grayLineAfterCard'>
			<h2 className='text-center inline-block w-full text-black dark:text-white font-bold sm:text-xl md:text-2xl xl:text-3xl mb-2 underline'>
				{userName}
			</h2>
			<Image
				src={false || getRandomDefaultImage()}
				width={80}
				height={80}
				alt='user avatar'
				className='flex flex-grow sm:w-1/2 md:w-full rounded-2xl self-center mb-2'
			/>
			<button
				onClick={() => {
					dispatch(userSlice.actions.setUserUnsigned())
					router.push('http://localhost:3000')
				}}
				className='flex text-white justify-center items-center bg-accountExitRed rounded-2xl p-3 font-semibold'
			>
				Log out
			</button>
		</article>
	)
}
