import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const HomePage = dynamic(() =>
	import('@/FSD_pages/home-page').then(file => file.HomePage)
)

export const metadata: Metadata = {
	title: 'Home Page',
}

export default async function Home() {
	return <HomePage />
}
