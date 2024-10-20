import type { Metadata } from 'next'
import './globals.css'
//import './../../public/output.css'
import StoreProvider from './providers/StoreProvider'
import { LayoutWrapper } from '@/widgets/layout-wrapper'
import { layoutMetadata } from '@/shared/model'

export const metadata: Metadata = layoutMetadata

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<StoreProvider>
			<html lang='en'>
				<LayoutWrapper>{children}</LayoutWrapper>
			</html>
		</StoreProvider>
	)
}
