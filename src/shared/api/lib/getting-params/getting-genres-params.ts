import type { ApiGenreResponse, Genre, ResponseGenre } from '../../types/genre'

const getGenreListParams = (response: ApiGenreResponse): Genre[] =>
	response['results'].map((genre: ResponseGenre) => ({
		id: genre.id,
		name: genre.name,
		slug: genre.slug,
		gamesCount: genre.games_count,
		image: genre['image_background'],
	}))
export default getGenreListParams
