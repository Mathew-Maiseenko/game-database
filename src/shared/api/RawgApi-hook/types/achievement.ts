export interface Achievement {
	id: number
	name: string
	description: string
	image: string
	percent: string
}

export interface ApiGameAchievementListResponse {
	count: number
	next: string
	previous: string
	results: Achievement[]
}
