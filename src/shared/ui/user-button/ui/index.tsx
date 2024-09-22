'use client'
//import { Teko } from 'next/font/google'
import Link from 'next/link'
import classes from './styles.module.css'
import { useRouter } from 'next/navigation'
import { userSlice } from '@/entities/user'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
//const teko = Teko({ subsets: ['latin'] })

export function UserButton({ styles }: { styles?: string }) {
	const dispatch = useAppDispatch()
	const router = useRouter()

	const isUserSigned = useAppSelector(userSlice.selectors.selectIsUserSigned)

	return (
		<section
			onClick={() => {
				if (isUserSigned) {
					router.push('http://localhost:3000/user')
				} else {
					dispatch(userSlice.actions.setUserSignUpModalOpen())
				}
			}}
			className={`${
				styles
					? `group ${styles} ${classes.group}`
					: `group ${classes.group} flex flex-row items-center justify-between font-semibold bg-whiteGray relative
      sm:rounded-full sm:px-1 sm:py-1 sm:h-13
      md:px-1 md:pl-3 md:py-1 md:order-3 md:rounded-3xl
      hover:bg-yellow hover:text-black`
			}`}
		>
			<article className='sm:hidden md:inline group-hover:text-black group-hover:font-bold text-xl'>
				Profile
			</article>
			<svg
				className='sm:ml-0 sm:p-0 md:ml-3 sm:w-full sm:h-full md:w-11 md:h-11 fill-textGray group-hover:fill-black md:p-1'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 32 32'
				xmlSpace='preserve'
			>
				<path d='M16 31C7.729 31 1 24.271 1 16S7.729 1 16 1s15 6.729 15 15-6.729 15-15 15zm0-28C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3z' />
				<path d='M16 20.2a4.605 4.605 0 0 1-4.6-4.6c0-2.537 2.064-4.6 4.6-4.6s4.6 2.063 4.6 4.6c0 2.537-2.064 4.6-4.6 4.6zm0-7.2c-1.434 0-2.6 1.166-2.6 2.6s1.166 2.6 2.6 2.6 2.6-1.167 2.6-2.6S17.434 13 16 13zM16 31c-2.462 0-4.907-.613-7.072-1.772a1.003 1.003 0 0 1-.528-.882V26.33a5.772 5.772 0 0 1 5.765-5.766h3.67a5.772 5.772 0 0 1 5.765 5.766v2.015c0 .368-.204.707-.528.882A15.033 15.033 0 0 1 16 31zm-5.6-3.269c3.48 1.663 7.72 1.663 11.2 0v-1.4a3.77 3.77 0 0 0-3.765-3.766h-3.67a3.77 3.77 0 0 0-3.765 3.766v1.4zm12.2.615h.01-.01z' />
			</svg>
		</section>
	)
}

/*
 before:content-["RU/EN"] before:text-yellow before:absolute before:left-[-100px] before:text-2xl



export function UserButton() {
	return (
		<article
			className={`group ${classes.group} flex flex-row items-center justify-between min-w-[12vw] px-5 font-semibold bg-whiteGray rounded-[35px] relative hover:bg-yellow hover:text-black 
  before:content-["RU/EN"] before:text-yellow before:absolute before:left-[-100px] before:text-2xl md:order-3`}
		>
			<article className='group-hover:text-black group-hover:font-bold text-xl'>
				Profile
			</article>
			<svg
				className='ml-3 fill-textGray group-hover:fill-black p-1'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 32 32'
				xmlSpace='preserve'
			>
				<path d='M16 31C7.729 31 1 24.271 1 16S7.729 1 16 1s15 6.729 15 15-6.729 15-15 15zm0-28C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3z' />
				<path d='M16 20.2a4.605 4.605 0 0 1-4.6-4.6c0-2.537 2.064-4.6 4.6-4.6s4.6 2.063 4.6 4.6c0 2.537-2.064 4.6-4.6 4.6zm0-7.2c-1.434 0-2.6 1.166-2.6 2.6s1.166 2.6 2.6 2.6 2.6-1.167 2.6-2.6S17.434 13 16 13zM16 31c-2.462 0-4.907-.613-7.072-1.772a1.003 1.003 0 0 1-.528-.882V26.33a5.772 5.772 0 0 1 5.765-5.766h3.67a5.772 5.772 0 0 1 5.765 5.766v2.015c0 .368-.204.707-.528.882A15.033 15.033 0 0 1 16 31zm-5.6-3.269c3.48 1.663 7.72 1.663 11.2 0v-1.4a3.77 3.77 0 0 0-3.765-3.766h-3.67a3.77 3.77 0 0 0-3.765 3.766v1.4zm12.2.615h.01-.01z' />
			</svg>
		</article>
	)
}

*/
