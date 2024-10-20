import { UserPage } from '@/pages/user-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'User',
}

export default function User() {
	return <UserPage />
}
