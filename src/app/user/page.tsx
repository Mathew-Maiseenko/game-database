import dynamic from 'next/dynamic'
const UserPage = dynamic(() =>
	import('@/pages/user-page').then(file => file.UserPage)
)

import { Metadata } from 'next'
export const metadata: Metadata = {
	title: 'User',
}

export default function User() {
	return <UserPage />
}
