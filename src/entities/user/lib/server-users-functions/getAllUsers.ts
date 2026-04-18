import { baseSiteUrl } from '@/shared/model'
import { UserInfoInServerMongo } from '../../types'

export async function getAllUsers(): Promise<UserInfoInServerMongo[]> {
	const response = await fetch(`${baseSiteUrl}/api/user/list`)

	if (!response.ok) {
		const errorText = await response.text()
		console.error('Failed to fetch all users:', response.status, errorText)
		throw new Error(`HTTP ${response.status}: ${errorText}`)
	}

	const data = await response.json()
	// data имеет вид { users: UserInfoInServerMongo[], total: number }
	return data.users as UserInfoInServerMongo[]
}
