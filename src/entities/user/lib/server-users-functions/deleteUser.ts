import { baseSiteUrl } from '@/shared/model'

export async function deleteUser(userId: string): Promise<void> {
	const response = await fetch(`${baseSiteUrl}/api/user/${userId}`, {
		method: 'DELETE',
	})

	if (!response.ok) {
		const error = await response.json()
		throw new Error(error.error || 'Failed to delete user')
	}
}
