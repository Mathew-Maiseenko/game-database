import type { Metadata } from 'next'
import './globals.css'
//import './../../public/output.css'
import StoreProvider from './providers/StoreProvider'
import { LayoutWrapper } from '@/widgets/layout-wrapper'
import Head from 'next/head'

export const metadata: Metadata = {
	title: 'Cyber List',
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
				<Head>
					<meta
						name='viewport'
						content='width=device-width, initial-scale=1.0'
					/>
				</Head>
				<LayoutWrapper>{children}</LayoutWrapper>
			</html>
		</StoreProvider>
	)
}
//flex-grow
