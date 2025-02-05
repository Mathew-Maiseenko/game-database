import type { Genre } from './genre'
import type { Tag } from './tag'

export interface StoreGameDetails {
	id: number
	slug: string
	name: string
	nameOriginal: string
	alternativeNames: string[]
	description: string
	descriptionRaw?: string | null
	released?: string | null
	achievementsCount: number | null
	backgroundImage?: string | null
	backgroundImageAdditional?: string | null
	playtime?: number | null
	lastUpdate?: string | null
	rating: number
	ratingTop: number
	website: string
	detailedRating: {
		id: number
		title: string
		count: number
		percent: number
	}[]
	accessPlatforms:
		| {
				platformId: number
				platformName: string
				releaseDate: string
				requirements?: {
					minimum?: string | null
					recommended?: string | null
				} | null
		  }[]
		| null
	genres: {
		id: number
		name: string
	}[]
	stores:
		| {
				id: number
				name: string
				domain: string
		  }[]
		| null
	tags: {
		id: number
		name: string
	}[]
}

export interface GameDetails {
	id: number
	slug: string
	name: string
	name_original: string
	description: string
	description_raw: string
	metacritic: number
	metacritic_platforms: MetacriticPlatform[]
	released: string
	tba: boolean
	updated: string
	background_image: string
	background_image_additional: string
	website: string
	rating: number
	rating_top: number
	ratings: Record<string, any> ///
	reactions: Record<string, unknown>
	added: number
	added_by_status: Record<string, unknown>
	playtime: number
	screenshots_count: number
	movies_count: number
	creators_count: number
	achievements_count: number
	parent_achievements_count: string
	reddit_url: string
	reddit_name: string
	reddit_description: string
	reddit_logo: string
	reddit_count: number
	twitch_count: string
	youtube_count: string
	reviews_text_count: string
	ratings_count: number
	suggestions_count: number
	alternative_names: string[]
	metacritic_url: string
	parents_count: number
	additions_count: number
	game_series_count: number
	esrb_rating: EsrbRating
	platforms: Platform[]
	genres: Genre[] //
	stores: StoreWrapper[] //
	tags: Tag[] //
}

interface MetacriticPlatform {
	metascore: number
	url: string
}

interface EsrbRating {
	id: number
	slug: string
	name: string
}

interface Platform {
	platform: PlatformDetails
	released_at: string
	requirements: Requirements
}

interface PlatformDetails {
	id: number
	slug: string
	name: string
}

interface Requirements {
	minimum: string
	recommended: string
}
interface Store {
	id: number
	name: string
	slug: string
	domain: string
	games_count: number
	image_background: string
}

export interface StoreWrapper {
	id: number
	url: string
	store: Store
}
