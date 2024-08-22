import type { ApiGenreResponse, Genre } from '../../types/genre'

const getGenreListParams = (response: ApiGenreResponse) =>
	response['results'].map((genre: Genre) => ({
		id: genre.id,
		name: genre.name,
		slug: genre.slug,
		image: genre['image_background'],
	}))

export default getGenreListParams
