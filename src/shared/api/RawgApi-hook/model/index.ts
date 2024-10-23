import fetchingWrapper from '../lib/fetching-wrapper'
import getListGameAchievementsParams from '../lib/getting-params/getting-achievements-params'
import getDevelopersListParams from '../lib/getting-params/getting-developers-params'
import getGameDetailsParams from '../lib/getting-params/getting-game-details-params'
import getGameListParams from '../lib/getting-params/getting-game-list-params'
import getGenreListParams from '../lib/getting-params/getting-genres-params'
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
import { StoreGameDetails } from '../types/game-details'
import { StoreGame } from '../types/game-list'
import { Genre } from '../types/genre'
import type { StoreGamesFiltrationObj, TagResult } from '../'
import { DeveloperResult } from '../types/developer'
import getListGameScreenshotsParams from '../lib/getting-params/getting-screenshots-params'
import getFilteredGameListParams from '../lib/getting-params/getting-filtered-game-list-params'
import getRandomGamesPostersParams from '../lib/getting-params/getting-posters-params'

const baseUrl = process.env.NEXT_PUBLIC_RAWG_Api_BASE_URL
const ApiKey = process.env.NEXT_PUBLIC_RAWG_Api_KEY

export const RawgApi = {
	getGamesList: async () => {
		return await fetchingWrapper(`${baseUrl}games?${ApiKey}&page_size=8`)
			.then(res => getGameListParams(res))
			.then(res => {
				return GameDtoSchema.array().parse(res) as StoreGame[]
			})
	},
	getGamesListWithParams: async ({
		gamesPerPage,
		pageNumber,
		title,
		genres,
		tags,
		year,
		developers,
	}: {
		gamesPerPage: number
		pageNumber: number
		title?: string
		genres?: string
		tags?: string
		year?: number | string | null
		developers?: string
	}) => {
		return await fetchingWrapper(
			`${baseUrl}games?${ApiKey}&page=${pageNumber}&page_size=${gamesPerPage}` +
				(title ? `&search=${title}` : '') +
				(developers ? `&developers=${developers}` : '') +
				(genres ? `&genres=${genres}` : '') +
				(tags ? `&tags=${tags}` : '') +
				(year ? `&dates=${year}` : '')
		)
			.then(res => getFilteredGameListParams(res))
			.then(res => {
				return FilteredGameDtoSchema.parse(res) as StoreGamesFiltrationObj
			})
	},
	getGameDetails: async (id: number) => {
		return await fetchingWrapper(`${baseUrl}games/${id}?${ApiKey}`)
			.then(res => getGameDetailsParams(res))
			.then(res => {
				return GameDetailsDtoSchema.parse(res) as StoreGameDetails
			})
	},
	getListGameAchievements: async (id: number) => {
		return await fetchingWrapper(`${baseUrl}games/${id}/achievements?${ApiKey}`)
			.then(res => getListGameAchievementsParams(res))
			.then(res => {
				return AchievementDtoSchema.array().parse(res) as Achievement[]
			})
	},
	getListGameScreenshots: async (id: number) => {
		return await fetchingWrapper(`${baseUrl}games/${id}/screenshots?${ApiKey}`)
			.then(res => getListGameScreenshotsParams(res))
			.then(res => {
				return ScreenshotsDtoSchema.array().parse(res) as string[]
			})
	},
	getGenresList: async () => {
		return await fetchingWrapper(`${baseUrl}genres?${ApiKey}`)
			.then(res => getGenreListParams(res))
			.then(res => {
				return GenreDtoSchema.array().parse(res) as Genre[]
			})
	},
	getRandomGamesPosters: async () => {
		return await fetchingWrapper(`${baseUrl}genres?${ApiKey}`)
			.then(res => getRandomGamesPostersParams(res))
			.then(res => {
				return PostersDtoSchema.array().parse(res) as string[]
			})
	},
	getTagsList: async () => {
		return await fetchingWrapper(`${baseUrl}tags?${ApiKey}`)
			.then(res => getTagsListParams(res))
			.then(res => {
				return TagDtoSchema.array().parse(res) as TagResult[]
			})
	},
	getDevelopersList: async () => {
		return await fetchingWrapper(`${baseUrl}developers?${ApiKey}`)
			.then(res => getDevelopersListParams(res))
			.then(res => {
				return DeveloperDtoSchema.array().parse(res) as DeveloperResult[]
			})
	},
}
