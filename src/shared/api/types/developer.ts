export interface ApiDeveloperResponse {
	count: number
	next: string | null
	previous: string | null
	results: Developer[]
}

export interface Developer {
	id: number
	name: string
	slug: string
	games_count: number
	image_background: string
}

export interface DeveloperResult {
	id: number
	name: string
	slug: string
	image: string | null | undefined
	gameCount: number
}
