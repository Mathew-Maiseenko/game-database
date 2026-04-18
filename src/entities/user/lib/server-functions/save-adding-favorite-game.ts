import { USER_ID_STORAGE_KEY } from '../../config'
import { postApiWrapper } from '@/shared/api/lib/post'

export async function saveAddingFavoriteGame(gameId: number) {
	const userId = localStorage.getItem(USER_ID_STORAGE_KEY)
	console.log(userId)
	if (!userId) return

	await postApiWrapper(
		'user/games/add-favorite',
		JSON.stringify({ userId: userId, gameId }),
	)
}
