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

const baseUrl: string = 'https://api.rawg.io/api/'
const ApiKey: string = 'key=fd711517d11b45b0b5c432f288b02d33'

export const RawgApi = {
	getGamesList: async () => {
		return await fetchingWrapper(`${baseUrl}games?${ApiKey}&page_size=8`)
			.then(res => getGameListParams(res))
			.then(res => {
				console.log(res)
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
			.then(res => {
				console.log(res, 'fetchingWrapper details')
				return res
			})
			.then(res => getFilteredGameListParams(res))
			.then(res => {
				console.log(
					'getGameListParams',
					`&page=${pageNumber}&page_size=${gamesPerPage}` +
						(title ? `&search=${title}` : '') +
						(developers ? `&developers=${developers}` : '') +
						(genres ? `&genres=${genres}` : '') +
						(tags ? `&tags=${tags}` : '') +
						(year ? `&dates=${year}` : ''),
					res
				)
				return FilteredGameDtoSchema.parse(res) as StoreGamesFiltrationObj
			})
	},
	getGameDetails: async (id: number) => {
		return await fetchingWrapper(`${baseUrl}games/${id}?${ApiKey}`)
			// .then(
			// 	res => {
			// 		console.log(res, 'details')
			// 		return res
			// 	}
			// )
			.then(res => getGameDetailsParams(res))
			.then(res => {
				console.log(res, 'details')
				return GameDetailsDtoSchema.parse(res) as StoreGameDetails
			})
	},
	getListGameAchievements: async (id: number) => {
		return await fetchingWrapper(`${baseUrl}games/${id}/achievements?${ApiKey}`)
			.then(res => getListGameAchievementsParams(res))
			.then(res => {
				console.log(res)
				return AchievementDtoSchema.array().parse(res) as Achievement[]
			})
	},
	getListGameScreenshots: async (id: number) => {
		return await fetchingWrapper(`${baseUrl}games/${id}/screenshots?${ApiKey}`)
			.then(res => getListGameScreenshotsParams(res))
			.then(res => {
				console.log(res)
				return ScreenshotsDtoSchema.array().parse(res) as string[]
			})
	},
	getGenresList: async () => {
		return await fetchingWrapper(`${baseUrl}genres?${ApiKey}`)
			.then(res => getGenreListParams(res))
			.then(res => {
				console.log(res)
				return GenreDtoSchema.array().parse(res) as Genre[]
			})
	},
	getTagsList: async () => {
		return await fetchingWrapper(`${baseUrl}tags?${ApiKey}`)
			.then(res => getTagsListParams(res))
			.then(res => {
				console.log(res)
				return TagDtoSchema.array().parse(res) as TagResult[]
			})
	},
	getDevelopersList: async () => {
		return await fetchingWrapper(`${baseUrl}developers?${ApiKey}`)
			.then(res => getDevelopersListParams(res))
			.then(res => {
				console.log(res)
				return DeveloperDtoSchema.array().parse(res) as DeveloperResult[]
			})
	},
}

/*

import { z } from 'zod'

const UserDtoSchema = z.object({
	id: z.number(),
	slug: z.string(),
	name: z.string(),
	backgroundImage: z.string(),
	playtime: z.number(),
	lastUpdate: z.string(), //z.date(),
	rating: z.number(),
	ratingTop: z.number(),
	detailedRating: z
		.array(
			z.object({
				id: z.number(),
				title: z.string(),
				count: z.number(),
				percent: z.number(),
			})
		)
		.optional(),
	accessPlatforms: z
		.array(
			z.object({
				platformId: z.number(),
				platformName: z.string(),
				releaseDate: z.string(),
				requirements: z
					.union([
						z.object({
							minimum: z.string().nullable().optional(),
							recommended: z.string().nullable().optional(),
						}),
						z.string().nullable().optional(),
					])
					.nullable(),
			})
		)
		.optional(),
	genres: z
		.array(
			z.object({
				id: z.number(),
				name: z.string(),
			})
		)
		.optional(),
	stores: z
		.array(
			z.object({
				id: z.number(),
				name: z.string(),
				domain: z.string(),
			})
		)
		.optional(),
	tags: z
		.array(
			z.object({
				id: z.number(),
				name: z.string(),
			})
		)
		.optional(),
	screenshots: z.array(z.string()).optional(),
})

const RawgApi = {
	getGamesList: async (): Promise<any | null> => {
		return await fetch(`${baseUrl}games?${ApiKey}`)
			.then(res => res.json())
			.then(res =>
				res['results'].map((game: any) => ({
					id: game.id,
					slug: game.slug,
					name: game.name,
					backgroundImage: game.background_image,
					playtime: game.playtime,
					lastUpdate: game.updated,
					rating: game.rating,
					ratingTop: game.rating_top,
					detailedRating: game.ratings.map((rating: any) => ({
						id: rating.id,
						title: rating.title,
						count: rating.count,
						percent: rating.percent,
					})),
					accessPlatforms: game.platforms.map((platformObj: any) => ({
						platformId: platformObj.platform.id,
						platformName: platformObj.platform.name,
						releaseDate: platformObj['released_at'],
						requirements: platformObj['requirements_en'],
					})),
					genres: game.genres.map((genre: any) => ({
						id: genre.id,
						name: genre.name,
					})),
					stores: game.stores.map((storeObj: any) => ({
						id: storeObj.store.id,
						name: storeObj.store.name,
						domain: storeObj.store.domain,
					})),
					tags: game.tags.map((tag: any) => ({
						id: tag.id,
						name: tag.name,
					})),
					screenshots: game['short_screenshots'].map(
						(screenshotObj: any) => screenshotObj.image
					),
				}))
			)
			.then(res => UserDtoSchema.array().parse(res))
			.then(res => console.log(res))
	},
}

*/
