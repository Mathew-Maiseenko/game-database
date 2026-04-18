import { postApiWrapper } from '@/shared/api/lib/post'
import { USER_ID_STORAGE_KEY } from '../../config'

export async function saveRemovingFavoriteGame(gameId: number) {
	const userId = localStorage.getItem(USER_ID_STORAGE_KEY)
	if (!userId) return

	await postApiWrapper(
		'user/games/remove-favorite',
		JSON.stringify({ userId: userId, gameId }),
	)
}
