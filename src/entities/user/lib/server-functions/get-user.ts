import { baseSiteUrl } from '@/shared/model'
import { USER_ID_STORAGE_KEY } from '../../config'
import { UserInfoLocaleStorageType } from '../../types'

export async function getUserInfo(): Promise<UserInfoLocaleStorageType | null> {
	const userId = localStorage.getItem(USER_ID_STORAGE_KEY)
	if (!userId) return null

	try {
		const response = await fetch(`${baseSiteUrl}/api/user?userId=${userId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			console.error(
				`Failed to get user info: ${response.status} ${response.statusText}`,
			)
			return null
		}

		const data = await response.json()
		return data as UserInfoLocaleStorageType
	} catch (error) {
		console.error('Error fetching user info:', error)
		return null
	}
}
