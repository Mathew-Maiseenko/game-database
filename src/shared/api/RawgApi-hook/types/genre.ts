export interface ApiGenreResponse {
	count: number
	next: string | null
	previous: string | null
	results: Genre[]
}

export interface Genre {
	id: number
	name: string
	slug: string
	games_count: number
	image_background: string
}
