'use client'
import { userSlice } from '../../model/user-slice'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import { useRouter } from 'next/navigation'
import { UserIcon } from '@/shared/ui'
import { baseSiteUrl } from '@/shared/model'
import { saveIsUserSignedInLocalStorage } from '../../lib/local-storage-functions/save-is-user-signed-in-local-storage'

export function UsersAvatar() {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const userName = useAppSelector(userSlice.selectors.selectUserName)
	return (
		<article className='flex flex-col mr-0 md:mr-5 lg:mr-10 w-full md:w-1/3 rounded-xl md:rounded-2xl relative after:h-full after:w-px after:absolute md:after:-right-2 lg:after:-right-5  after:bg-none md:after:bg-grayLineAfterCard'>
			<h2 className='text-center inline-block w-full text-black dark:text-white font-bold text-xl md:text-2xl xl:text-3xl mb-2 underline'>
				{userName}
			</h2>
			<UserIcon className='dark:fill-white fill-black flex flex-grow w-1/2 md:w-full rounded-2xl self-center mb-2' />
			<button
				onClick={() => {
					router.push(`${baseSiteUrl}/`)

					setTimeout(() => {
						dispatch(userSlice.actions.setUserUnsigned())
						saveIsUserSignedInLocalStorage(false)
					}, 300)
				}}
				className='flex text-white justify-center items-center bg-accountExitRed rounded-2xl p-3 lg:p-5 font-semibold'
			>
				Log out
			</button>
		</article>
	)
}
