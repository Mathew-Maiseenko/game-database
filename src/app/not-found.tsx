import { NotFoundPage } from '@/pages/not-found-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: '404',
}

export default function NotFound() {
	return <NotFoundPage />
}
