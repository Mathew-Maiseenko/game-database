'use client'
import { useRouter } from 'next/navigation'
import { userSlice } from '@/entities/user'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import { UserIcon } from '@/shared/ui'
import { baseSiteUrl } from '@/shared/model'

export function UserButton({ styles }: { styles?: string }) {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const isUserSigned = useAppSelector(userSlice.selectors.selectIsUserSigned)

	return (
		<section
			onClick={() => {
				if (isUserSigned) {
					router.push(`${baseSiteUrl}/user`)
				} else {
					dispatch(userSlice.actions.setUserSignUpModalOpen())
				}
			}}
			className={`${
				styles
					? `group ${styles} dark:hover:bg-yellow hover:bg-blue cursor-pointer transition-all duration-300 ease-in-out`
					: `group flex flex-row items-center justify-between font-semibold bg-white dark:bg-whiteGray relative cursor-pointer transition-all duration-300 ease-in-out
      sm:rounded-full sm:px-1 sm:py-1 sm:h-13
      md:px-1 md:pl-3 md:py-1 md:rounded-3xl
      dark:hover:bg-yellow hover:bg-blue hover:text-black`
			}`}
		>
			<article className='transition-all duration-300 ease-in-out hidden md:inline group-hover:text-black group-hover:font-bold text-xl'>
				Profile
			</article>
			<UserIcon className='sm:ml-0 sm:p-0 md:ml-3 sm:w-full sm:h-full md:w-11 md:h-11 fill-textGray group-hover:fill-black md:p-1' />
		</section>
	)
}
