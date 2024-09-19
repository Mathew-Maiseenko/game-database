import { UserInfoStateType } from '../types'

export const calculateUsersFavoriteGenres = (state: UserInfoStateType) => {
	const gentesByIds = state.statistics.favoriteGamesIds.map(id =>
		state.statistics.favoriteGames[id]?.game.genres.map(genre => genre.name)
	)

	const gentesMap: Map<string, number> = new Map()

	gentesByIds.forEach(genres => {
		genres?.forEach(genre => {
			if (gentesMap.has(genre)) {
				let countOfGenreEntries = gentesMap.get(genre) || 0
				gentesMap.set(genre, ++countOfGenreEntries)
			} else {
				gentesMap.set(genre, 1)
			}
		})
	})

	let maxGenreEntries = 0
	let resGenres: string[] = []
	gentesMap.forEach((count, genre) => {
		if (count > maxGenreEntries) {
			resGenres = [genre]
		} else if (maxGenreEntries === count) {
			resGenres.push(genre)
		}
	})
	return resGenres
}
