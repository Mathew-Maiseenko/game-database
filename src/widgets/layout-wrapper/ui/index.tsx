'use client'
import { Manrope } from 'next/font/google'
import { NavBar } from '@/widgets/nav-bar'
//import './globals.css'
import { SignInModal, SignUpModal } from '@/features/logging'
import { ImageModal } from '@/entities/image'
import { useAppSelector } from '@/shared/lib/redux/hooks'
import { themeSwitcherSlice } from '@/features/theme-switcher'

const manrope = Manrope({ subsets: ['latin'] })

export function LayoutWrapper({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const isThemeDark = useAppSelector(
		themeSwitcherSlice.selectors.selectIsThemeDark
	)

	return (
		<body
			className={`${manrope.className} ${
				isThemeDark && 'dark'
			} transition-colors duration-300 ease-in-out relative flex flex-col bg-mainBgColor h-full px-[2vw] py-[1vh] lg:px-[7vw] lg:py-[3vh] min-h-screen overflow-x-hidden dark:bg-darkGray`}
		>
			<SignInModal />
			<SignUpModal />
			<ImageModal />
			<NavBar />
			<main
				className={
					'bg-white border-2 border-lightThemeBorderGray dark:bg-whiteGray dark:border-none rounded-2xl lg:rounded-3xl px-[2vw] py-[3vh] lg:px-[3vw] lg:pt-[7vh] lg:pb-[2vh] overflow-hidden'
				}
			>
				{children}
			</main>
			<footer className='text-center text-base lg:text-lg xl:text-xl flex-grow justify-self-center text-textGray px-8 py-6 lg:px-14 lg:py-7'>
				All data about the games that are on this site are taken from the site
				https://rawg.io and the author has no intention of assigning this
				intellectual property
			</footer>
		</body>
	)
}
