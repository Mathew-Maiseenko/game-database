//import { HomePage } from '@/pages/home-page'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const HomePage = dynamic(() =>
	import('@/pages/home-page').then(file => file.HomePage)
)

export const metadata: Metadata = {
	title: 'Home Page',
}

export default async function Home() {
	return <HomePage />
}
