import type {
	Achievement,
	ApiGameAchievementListResponse,
} from '../../types/achievement'

const getListGameAchievementsParams = (
	response: ApiGameAchievementListResponse
) =>
	response['results'].map((achievement: Achievement) => ({
		id: achievement.id,
		name: achievement.name,
		description: achievement.description,
		image: achievement.image,
		percent: achievement.percent,
	}))

export default getListGameAchievementsParams
