import { USER_ID_STORAGE_KEY } from '../../config'

export async function getUserInfo() {
	const userId = localStorage.getItem(USER_ID_STORAGE_KEY)
	if (!userId) return null

	const response = await fetch(`/api/user?userId=${userId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	if (!response.ok) {
		console.error('Failed to get user info')
		return null
	}

	const data = await response.json()
	return data.user
}
