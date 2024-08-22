import type { ApiGameResponse } from '../../types/game-list'
import { transformDate } from '../transformDate'

const getGameListParams = (response: ApiGameResponse) =>
	response['results'].map((game: any) => ({
		id: game.id,
		slug: game.slug,
		name: game.name,
		backgroundImage: game.background_image,
		playtime: game.playtime,
		released: game.released ? transformDate(game.updated) : null, //new Date(Date.parse(game.released))
		lastUpdate: game.updated ? transformDate(game.updated) : null, //new Date(Date.parse(game.updated))
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

export default getGameListParams
