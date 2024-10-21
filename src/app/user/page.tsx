import dynamic from 'next/dynamic'
const UserPage = dynamic(() =>
	import('@/FSD_pages/user-page').then(file => file.UserPage)
)

import { Metadata } from 'next'
export const metadata: Metadata = {
	title: 'User',
}

export default function User() {
	return <UserPage />
}
