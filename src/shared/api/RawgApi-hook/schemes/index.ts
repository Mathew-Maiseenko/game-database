import { z } from 'zod'
export const FilteredGameDtoSchema = z.object({
	count: z.number(),
	games: z.array(
		z.object({
			id: z.number(),
			slug: z.string(),
			name: z.string(),
			backgroundImage: z.string().nullable(),
			playtime: z.number(),
			lastUpdate: z.string().nullable(),
			released: z.string().nullable(),
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
						releaseDate: z.string().nullable().optional(),
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
				.nullable()
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
						domain: z.string().nullable().optional(),
					})
				)
				.nullable()
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
	),
})

export const GameDtoSchema = z.object({
	id: z.number(),
	slug: z.string(),
	name: z.string(),
	backgroundImage: z.string().nullable(),
	playtime: z.number(),
	lastUpdate: z.string().nullable(),
	released: z.string().nullable(),
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
				releaseDate: z.string().nullable().optional(),
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
		.nullable()
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
				domain: z.string().nullable().optional(),
			})
		)
		.nullable()
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

export const GameDetailsDtoSchema = z.object({
	id: z.number(),
	slug: z.string(),
	name: z.string(),
	nameOriginal: z.string(),
	alternativeNames: z.array(z.string().nullable()).nullable(),
	description: z.string().nullable(),
	descriptionRaw: z.string().nullable().optional(),
	released: z.string().nullable().optional(),
	achievementsCount: z.number().nullable(),
	backgroundImage: z.string().nullable().optional(),
	backgroundImageAdditional: z.string().nullable().optional(),
	playtime: z.number().nullable().optional(),
	lastUpdate: z.string().nullable().optional(),
	rating: z.number(),
	ratingTop: z.number(),
	website: z.string(),
	detailedRating: z.array(
		z.object({
			id: z.number(),
			title: z.string(),
			count: z.number(),
			percent: z.number(),
		})
	),
	accessPlatforms: z.array(
		z
			.object({
				platformId: z.number(),
				platformName: z.string(),
				releaseDate: z.string(),
				requirements: z
					.object({
						minimum: z.string().nullable().optional(),
						recommended: z.string().nullable().optional(),
					})
					.nullable()
					.optional(),
			})
			.nullable()
			.optional()
	),
	genres: z.array(
		z.object({
			id: z.number(),
			name: z.string(),
		})
	),
	stores: z.array(
		z
			.object({
				id: z.number(),
				name: z.string(),
				domain: z.string(),
			})
			.nullable()
			.optional()
	),
	tags: z.array(
		z.object({
			id: z.number(),
			name: z.string(),
		})
	),
})

export const AchievementDtoSchema = z.object({
	id: z.number(),
	name: z.string(),
	description: z.string(),
	image: z.string().nullable().optional(),
	percent: z.string().nullable().optional(),
})

export const GenreDtoSchema = z.object({
	id: z.number(),
	name: z.string(),
	slug: z.string(),
	gamesCount: z.number(),
	image: z.string(),
})

export const PostersDtoSchema = z.string()

export const TagDtoSchema = z.object({
	id: z.number(),
	name: z.string(),
	slug: z.string(),
	image: z.string().optional().nullable(),
	language: z.string().optional(),
})

export const DeveloperDtoSchema = z.object({
	id: z.number(),
	name: z.string(),
	slug: z.string(),
	image: z.string().optional().nullable(),
	gameCount: z.number(),
})
export const ScreenshotsDtoSchema = z.string()
