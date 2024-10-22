import type { Metadata } from 'next'
import './globals.css'
//import './styles/post-global-styles.css'
import StoreProvider from './providers/store-provider'
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
