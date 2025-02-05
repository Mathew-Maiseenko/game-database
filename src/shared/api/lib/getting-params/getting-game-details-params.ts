import type { GameDetails, StoreWrapper } from '../../types/game-details'
import type { Tag } from '../../types/tag'
import { transformDate } from '../transformDate'

const getGameDetailsParams = (game: GameDetails) => ({
	id: game.id,
	slug: game.slug,
	name: game.name,
	nameOriginal: game['name_original'],
	alternativeNames: game.alternative_names,
	description: game.description,
	descriptionRaw: game['description_raw'],
	released: game.released ? transformDate(game.released) : null,
	achievementsCount: game['achievements_count'],
	backgroundImage: game.background_image,
	backgroundImageAdditional: game['background_image_additional'],
	playtime: game.playtime,
	lastUpdate: game.updated ? transformDate(game.updated) : null,
	rating: game.rating,
	ratingTop: game.rating_top,
	website: game.website,
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
		requirements: platformObj['requirements'],
	})),
	genres: game.genres.map((genre: any) => ({
		id: genre.id,
		name: genre.name,
	})),
	stores: game.stores.map((storeObj: StoreWrapper) => ({
		id: storeObj.store.id,
		name: storeObj.store.name,
		domain: storeObj.store.domain,
	})),
	tags: game.tags.map((tag: Tag) => ({
		id: tag.id,
		name: tag.name,
	})),
})

export default getGameDetailsParams
