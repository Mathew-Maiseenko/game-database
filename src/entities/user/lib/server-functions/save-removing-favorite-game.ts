import { USER_ID_STORAGE_KEY } from '../../config'

export async function saveRemovingFavoriteGame(gameId: number) {
	const userId = localStorage.getItem(USER_ID_STORAGE_KEY)
	if (!userId) return

	const response = await fetch('/api/user/games/remove-favorite', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ userId: parseInt(userId), gameId }),
	})

	if (!response.ok) {
		console.error('Failed to remove favorite game')
	}
}
