import { USER_ID_STORAGE_KEY } from '../../config'

export async function saveSettingGameAchievementIncomplete(
	gameId: number,
	achievementId: number
) {
	const userId = localStorage.getItem(USER_ID_STORAGE_KEY)
	if (!userId) return

	const response = await fetch('/api/user/games/achievements/incomplete', {
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
		console.error('Failed to set achievement incomplete')
	}
}
