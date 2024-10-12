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
			} relative flex flex-col bg-mainBgColor h-full px-[7vw] pt-[3vh] min-h-screen overflow-x-hidden dark:bg-darkGray`}
		>
			<SignInModal />
			<SignUpModal />
			<ImageModal />
			<NavBar />
			<main
				className={
					'bg-white border-2 border-lightThemeBorderGray dark:bg-whiteGray dark:border-none rounded-3xl p-[7vh] overflow-hidden'
				}
			>
				{children}
			</main>
			<footer className='text-center flex-grow justify-self-center text-textGray px-14 py-7'>
				All data about the games that are on this site are taken from the site
				https://rawg.io and the author has no intention of assigning this
				intellectual property
			</footer>
		</body>
	)
}
