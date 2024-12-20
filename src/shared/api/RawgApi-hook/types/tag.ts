export interface ApiTagResponse {
	count: number
	next: string | null
	previous: string | null
	results: Tag[]
}

export interface Tag {
	id: number
	name: string
	slug: string
	games_count: number
	image_background: string
	language: string | undefined
}

export interface TagResult {
	id: number
	name: string
	slug: string
	gamesCount: number
	image: string
	language: string | undefined
}
