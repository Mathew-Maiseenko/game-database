import type { StoreGamesFiltrationObj, TagResult } from '../index'
import getListGameAchievementsParams from '../lib/getting-params/getting-achievements-params'
import getDevelopersListParams from '../lib/getting-params/getting-developers-params'
import getFilteredGameListParams from '../lib/getting-params/getting-filtered-game-list-params'
import getGameDetailsParams from '../lib/getting-params/getting-game-details-params'
import getGameListParams from '../lib/getting-params/getting-game-list-params'
import getGenreListParams from '../lib/getting-params/getting-genres-params'
import getRandomGamesPostersParams from '../lib/getting-params/getting-posters-params'
import getListGameScreenshotsParams from '../lib/getting-params/getting-screenshots-params'
import getTagsListParams from '../lib/getting-params/getting-tags-params'
import {
	AchievementDtoSchema,
	DeveloperDtoSchema,
	FilteredGameDtoSchema,
	GameDetailsDtoSchema,
	GameDtoSchema,
	GenreDtoSchema,
	PostersDtoSchema,
	ScreenshotsDtoSchema,
	TagDtoSchema,
} from '../schemes'
import { Achievement } from '../types/achievement'
import { DeveloperResult } from '../types/developer'
import { StoreGameDetails } from '../types/game-details'
import { StoreGame } from '../types/game-list'
import { Genre } from '../types/genre'

type queryParamsType = string | number | null

interface ApiRequestConfig {
	endpoint: string
	params?: Record<string, queryParamsType | undefined>
	parser: (data: any) => unknown
	schema: any
}

interface GameListQueryParamsType {
	gamesPerPage: number | null
	pageNumber: number | null
	title?: string | null
	genres?: string | null
	tags?: string | null
	year?: number | string | null
	developers?: string | null
}

// export const RawgApi = {
// 	getGamesList: async () => {
// 		return await fetchingWrapper(`${baseUrl}games?${ApiKey}&page_size=8`)
// 			.then(res => getGameListParams(res))
// 			.then(res => {
// 				return GameDtoSchema.array().parse(res) as StoreGame[]
// 			})
// 	},
// 	getGamesListWithParams: async ({
// 		gamesPerPage,
// 		pageNumber,
// 		title,
// 		genres,
// 		tags,
// 		year,
// 		developers,
// 	}: {
// 		gamesPerPage: number
// 		pageNumber: number
// 		title?: string
// 		genres?: string
// 		tags?: string
// 		year?: number | string | null
// 		developers?: string
// 	}) => {
// 		return await fetchingWrapper(
// 			`${baseUrl}games?${ApiKey}&page=${pageNumber}&page_size=${gamesPerPage}` +
// 				(title ? `&search=${title}` : '') +
// 				(developers ? `&developers=${developers}` : '') +
// 				(genres ? `&genres=${genres}` : '') +
// 				(tags ? `&tags=${tags}` : '') +
// 				(year ? `&dates=${year}` : '')
// 		)
// 			.then(res => getFilteredGameListParams(res))
// 			.then(res => {
// 				return FilteredGameDtoSchema.parse(res) as StoreGamesFiltrationObj
// 			})
// 	},
// 	getGameDetails: async (id: number) => {
// 		return await fetchingWrapper(`${baseUrl}games/${id}?${ApiKey}`)
// 			.then(res => getGameDetailsParams(res))
// 			.then(res => {
// 				return GameDetailsDtoSchema.parse(res) as StoreGameDetails
// 			})
// 	},
// 	getListGameAchievements: async (id: number) => {
// 		return await fetchingWrapper(`${baseUrl}games/${id}/achievements?${ApiKey}`)
// 			.then(res => getListGameAchievementsParams(res))
// 			.then(res => {
// 				return AchievementDtoSchema.array().parse(res) as Achievement[]
// 			})
// 	},
// 	getListGameScreenshots: async (id: number) => {
// 		return await fetchingWrapper(`${baseUrl}games/${id}/screenshots?${ApiKey}`)
// 			.then(res => getListGameScreenshotsParams(res))
// 			.then(res => {
// 				return ScreenshotsDtoSchema.array().parse(res) as string[]
// 			})
// 	},
// 	getGenresList: async () => {
// 		return await fetchingWrapper(`${baseUrl}genres?${ApiKey}`)
// 			.then(res => getGenreListParams(res))
// 			.then(res => {
// 				return GenreDtoSchema.array().parse(res) as Genre[]
// 			})
// 	},
// 	getRandomGamesPosters: async () => {
// 		return await fetchingWrapper(`${baseUrl}genres?${ApiKey}`)
// 			.then(res => getRandomGamesPostersParams(res))
// 			.then(res => {
// 				return PostersDtoSchema.array().parse(res) as string[]
// 			})
// 	},
// 	getTagsList: async () => {
// 		return await fetchingWrapper(`${baseUrl}tags?${ApiKey}`)
// 			.then(res => getTagsListParams(res))
// 			.then(res => {
// 				return TagDtoSchema.array().parse(res) as TagResult[]
// 			})
// 	},
// 	getDevelopersList: async () => {
// 		return await fetchingWrapper(`${baseUrl}developers?${ApiKey}`)
// 			.then(res => getDevelopersListParams(res))
// 			.then(res => {
// 				return DeveloperDtoSchema.array().parse(res) as DeveloperResult[]
// 			})
// 	},
// }

export class ApiClient {
	baseUrl: string
	ApiKey: string

	constructor(baseUrl: string, ApiKey: string) {
		this.baseUrl = baseUrl
		this.ApiKey = ApiKey
	}

	private buildUrl(
		path: string,
		params: Record<string, queryParamsType | undefined> = {}
	): string {
		const url = new URL(`${this.baseUrl}${path}`)
		url.searchParams.set('key', this.ApiKey)

		Object.entries(params).forEach(([key, value]) => {
			if (value) {
				url.searchParams.set(key, String(value))
			}
		})

		return url.toString()
	}

	async request<T>({ endpoint, parser, params, schema }: ApiRequestConfig) {
		return await fetch(this.buildUrl(endpoint, params))
			.then(res => res.json())
			.then(res => parser(res))
			.then(res => schema.parse(res) as T)
	}
}

export class GamesService {
	private apiClient: ApiClient

	constructor(apiClient: ApiClient) {
		this.apiClient = apiClient
	}

	async getGamesList() {
		return await this.apiClient.request<StoreGame[]>({
			endpoint: 'games',
			parser: getGameListParams,
			schema: GameDtoSchema.array(),
		})
	}

	async getGamesListWithParams({
		gamesPerPage = 8,
		pageNumber = 1,
		title,
		genres,
		tags,
		year,
		developers,
	}: GameListQueryParamsType) {
		return await this.apiClient.request<StoreGamesFiltrationObj>({
			endpoint: 'games',
			params: {
				page: pageNumber,
				page_size: gamesPerPage,
				search: title,
				developers: developers,
				genres: genres,
				tags: tags,
				dates: year,
			},
			parser: getFilteredGameListParams,
			schema: FilteredGameDtoSchema,
		})
	}
	async getGameDetails(id: number) {
		return this.apiClient.request<StoreGameDetails>({
			endpoint: `games/${id}`,
			parser: getGameDetailsParams,
			schema: GameDetailsDtoSchema,
		})
	}
	async getListGameAchievements(id: number) {
		return this.apiClient.request<Achievement[]>({
			endpoint: `games/${id}/achievements`,
			parser: getListGameAchievementsParams,
			schema: AchievementDtoSchema.array(),
		})
	}
	async getListGameScreenshots(id: number) {
		return this.apiClient.request<string[]>({
			endpoint: `games/${id}/screenshots`,
			parser: getListGameScreenshotsParams,
			schema: ScreenshotsDtoSchema.array(),
		})
	}

	async getRandomGamesPosters() {
		return this.apiClient.request<string[]>({
			endpoint: 'genres',
			parser: getRandomGamesPostersParams,
			schema: PostersDtoSchema.array(),
		})
	}
}

export class MetadataService {
	private apiClient: ApiClient

	constructor(apiClient: ApiClient) {
		this.apiClient = apiClient
	}

	async getGenresList() {
		return this.apiClient.request<Genre[]>({
			endpoint: 'genres',
			parser: getGenreListParams,
			schema: GenreDtoSchema.array(),
		})
	}

	async getTagsList() {
		return this.apiClient.request<TagResult[]>({
			endpoint: 'tags',
			parser: getTagsListParams,
			schema: TagDtoSchema.array(),
		})
	}

	async getDevelopersList() {
		return this.apiClient.request<DeveloperResult[]>({
			endpoint: 'developers',
			parser: getDevelopersListParams,
			schema: DeveloperDtoSchema.array(),
		})
	}
}

// const BASE_URL = serverSideEnv.RAWG_Api_BASE_URL
// const API_KEY = serverSideEnv.RAWG_Api_KEY
const API_KEY = 'fd711517d11b45b0b5c432f288b02d33'
const BASE_URL = 'https://api.rawg.io/api/'

// export class RawgApiClient {
// 	private static apiClient = new ApiClient(BASE_URL!, API_KEY!)

// 	static games = new GamesService(this.apiClient)
// 	static metadata = new MetadataService(this.apiClient)
// }
//export const RawgApi = new RawgApiClient()
