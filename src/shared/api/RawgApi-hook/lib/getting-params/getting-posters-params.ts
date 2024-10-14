import type { ApiGenreResponse, Genre, ResponseGenre } from '../../types/genre'

const getRandomGamesPostersParams = (response: ApiGenreResponse): string[] =>
	response['results'].map((genre: ResponseGenre) => genre['image_background'])
export default getRandomGamesPostersParams
