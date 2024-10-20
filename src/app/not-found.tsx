import dynamic from 'next/dynamic'
const NotFoundPage = dynamic(() =>
	import('@/pages/not-found-page').then(file => file.NotFoundPage)
)

import { Metadata } from 'next'
export const metadata: Metadata = {
	title: '404',
}

export default function NotFound() {
	return <NotFoundPage />
}
