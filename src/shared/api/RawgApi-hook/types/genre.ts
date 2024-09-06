export interface ApiGenreResponse {
	count: number
	next: string | null
	previous: string | null
	results: ResponseGenre[]
}

export interface ResponseGenre {
	id: number
	name: string
	slug: string
	games_count: number
	image_background: string
}
export interface Genre {
	id: number
	name: string
	slug: string
	gamesCount: number
	image: string
}
