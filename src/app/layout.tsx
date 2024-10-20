import type { Metadata } from 'next'
import './globals.css'
//import './../../public/output.css'
import StoreProvider from './providers/StoreProvider'
import { LayoutWrapper } from '@/widgets/layout-wrapper'
import Head from 'next/head'

export const metadata: Metadata = {
	title: {
		template: '%s | Cyber List',
		default: 'Cyber List',
	},
	description: 'Create your personal game list with Cyber List',
	keywords: [
		'games',
		'personal game list',
		'gaming',
		'Cyber List',
		'game collection',
		'game searching',
	],
	authors: {
		url: '',
		name: 'Maiseenko Mathew',
	},
	viewport: 'width=device-width, initial-scale=1',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://cyberlist.com',
		title: 'Cyber List - Create Your Personal Game List',
		description:
			'Cyber List helps you create and manage your personal game list. Discover new games, add them to your list.',
		images: [
			{
				url: 'https://cyberlist.com/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Cyber List - Create Your Personal Game List',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		site: '@cyberlist',
		title: 'Cyber List - Create Your Personal Game List',
		description:
			'Cyber List helps you create and manage your personal game list. Discover new games, add them to your list.',
		images: [
			{
				url: 'https://cyberlist.com/twitter-image.jpg',
				alt: 'Cyber List - Create Your Personal Game List',
			},
		],
	},
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
