import { postApiWrapper } from '@/shared/api/lib/PostApiWrapper'
import { USER_ID_STORAGE_KEY } from '../../config'

export async function saveTogglingFavoriteGameCompletion(gameId: number) {
	const userId = localStorage.getItem(USER_ID_STORAGE_KEY)
	if (!userId) return

	await postApiWrapper(
		'user/games/toggle-completion',
		JSON.stringify({ userId: parseInt(userId), gameId }),
	)
}
