import { USER_ID_STORAGE_KEY } from '../../config'

export async function saveSettingGameAchievementComplete(
	gameId: number,
	achievementId: number
) {
	const userId = localStorage.getItem(USER_ID_STORAGE_KEY)
	if (!userId) return

	const response = await fetch('/api/user/games/achievements/complete', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			userId: parseInt(userId),
			gameId,
			achievementId,
		}),
	})

	if (!response.ok) {
		console.error('Failed to set achievement complete')
	}
}
