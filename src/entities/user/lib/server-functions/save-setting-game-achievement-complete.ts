import { postApiWrapper } from '@/shared/api/lib/post'
import { USER_ID_STORAGE_KEY } from '../../config'

export async function saveSettingGameAchievementComplete(
	gameId: number,
	achievementId: number,
) {
	const userId = localStorage.getItem(USER_ID_STORAGE_KEY)
	if (!userId) return

	await postApiWrapper(
		'user/games/achievements/complete',
		JSON.stringify({
			userId: parseInt(userId),
			gameId,
			achievementId,
		}),
	)
}
