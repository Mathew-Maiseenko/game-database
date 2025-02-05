export interface StoreGamesFiltrationObj {
	count: number
	games: StoreGame[]
}
export interface StoreGame {
	id: number
	slug: string
	name: string
	backgroundImage: string
	playtime: number
	released: string
	lastUpdate: string
	rating: number
	ratingTop: number
	detailedRating?: {
		id: number
		title: string
		count: number
		percent: number
	}[]
	accessPlatforms?: {
		platformId: number
		platformName: string
		releaseDate: string
		requirements?:
			| {
					minimum?: string | null
					recommended?: string | null
			  }
			| string
			| null
	}[]
	genres?: {
		id: number
		name: string
	}[]
	stores?: {
		id: number
		name: string
		domain: string
	}[]
	tags?: {
		id: number
		name: string
	}[]
	screenshots?: string[]
}

export interface Game {
	id: number
	slug: string
	name: string
	released: string
	tba: boolean
	background_image: string
	rating: number
	rating_top: number
	ratings: Record<string, unknown>
	ratings_count: number
	reviews_text_count: string
	added: number
	added_by_status: Record<string, unknown>
	metacritic: number
	playtime: number
	suggestions_count: number
	updated: string
	esrb_rating: EsrbGameRating
	platforms: GamePlatform[]
}

export interface EsrbGameRating {
	id: number
	slug: string
	name: string
}

export interface GamePlatform {
	platform: GamePlatformDetails
	released_at: string
	requirements: GameRequirements
}

export interface GamePlatformDetails {
	id: number
	slug: string
	name: string
}

export interface GameRequirements {
	minimum: string
	recommended: string
}

export interface ApiGameResponse {
	count: number
	next: string
	previous: string
	results: Game[]
}

export interface Store {
	id: number
	name: string
	domain: string
}
