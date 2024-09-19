import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { NavBar } from '@/widgets/nav-bar'
import './globals.css'
import StoreProvider from './providers/StoreProvider'
import { LogModal } from '@/features/logging'
//import Priv
const manrope = Manrope({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<StoreProvider>
			<html lang='en'>
				<body
					className={`${manrope.className} relative flex flex-col bg-darkGray h-full px-[7vw] pt-[3vh] min-h-screen overflow-x-hidden`}
				>
					<LogModal />
					<NavBar />
					<main className={'bg-whiteGray rounded-3xl p-[7vh] overflow-hidden'}>
						{children}
					</main>
					<footer className='text-center flex-grow justify-self-center text-textGray px-14 py-7'>
						All data about the games that are on this site are taken from the
						site https://rawg.io and the author has no intention of assigning
						this intellectual property
					</footer>
				</body>
			</html>
		</StoreProvider>
	)
}
//flex-grow
