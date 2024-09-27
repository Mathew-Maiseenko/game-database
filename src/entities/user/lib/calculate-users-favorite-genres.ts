import type { usersFavoriteGameType } from '../types'

interface calculateUsersFavoriteGenresArg {
	ids: number[]
	games: Record<number, usersFavoriteGameType | undefined>
}

export const calculateUsersFavoriteGenres = ({
	ids,
	games,
}: calculateUsersFavoriteGenresArg): {
	genres: string[]
	ids: number[]
} => {
	const gentesObj = ids.reduce(
		(totalAcc, id) => {
			const genresList = games[id]?.game.genres
			if (genresList) {
				let currentGamesGenresObj = genresList.reduce((acc, genre) => {
					let currentGenre = acc[genre.name]
					return {
						...acc,
						[genre.name]: currentGenre
							? { count: currentGenre.count + 1, id: genre.id }
							: { count: 1, id: genre.id },
					}
				}, totalAcc)
				return {
					...totalAcc,
					...currentGamesGenresObj,
				}
			} else {
				return {
					...totalAcc,
				}
			}
		},
		{} as {
			[key: string]: {
				count: number
				id: number
			}
		}
	)
	const theMostOftenGenresObj = Object.keys(gentesObj).reduce(
		(genresAcc, currentGenre) => {
			if (gentesObj[currentGenre].count > genresAcc.max) {
				return {
					max: gentesObj[currentGenre].count,
					genres: [currentGenre],
					ids: [gentesObj[currentGenre].id],
				}
			} else if (gentesObj[currentGenre].count === genresAcc.max) {
				return {
					max: gentesObj[currentGenre].count,
					genres: [...genresAcc.genres, currentGenre],
					ids: [...genresAcc.ids, gentesObj[currentGenre].id],
				}
			} else {
				return {
					max: genresAcc.max,
					genres: [...genresAcc.genres],
					ids: [...genresAcc.ids],
				}
			}
		},
		{
			max: 0,
			genres: [],
			ids: [],
		} as {
			max: number
			genres: string[]
			ids: number[]
		}
	)
	return {
		genres: theMostOftenGenresObj.genres,
		ids: theMostOftenGenresObj.ids,
	}
}

// const gentesByIds = state.statistics.favoriteGamesIds.map(id =>
// 	state.statistics.favoriteGames[id]?.game.genres.map(genre => genre.name)
// )

// const gentesMap: Map<string, number> = new Map()

// gentesByIds.forEach(genres => {
// 	genres?.forEach(genre => {
// 		if (gentesMap.has(genre)) {
// 			let countOfGenreEntries = gentesMap.get(genre) || 0
// 			gentesMap.set(genre, ++countOfGenreEntries)
// 		} else {
// 			gentesMap.set(genre, 1)
// 		}
// 	})
// })

// let maxGenreEntries = 0
// let resGenres: string[] = []
// gentesMap.forEach((count, genre) => {
// 	if (count > maxGenreEntries) {
// 		resGenres = [genre]
// 	} else if (maxGenreEntries === count) {
// 		resGenres.push(genre)
// 	}
// })
//return resGenres

/*
import type { UserInfoStateType, usersFavoriteGameType } from '../types'

interface calculateUsersFavoriteGenresArg {
	games: Record<number, usersFavoriteGameType | undefined>
	ids: number[]
}

export const calculateUsersFavoriteGenres = ({
	games,
	ids,
}: calculateUsersFavoriteGenresArg) => {
	const gentesObj = ids.reduce(
		(totalAcc, id) => {
			const genresList = games[id]?.game.genres
			if (genresList) {
				let currentGamesGenresObj = genresList.reduce((acc, genre) => {
					let currentGenre = acc[genre.name]
					return {
						...acc,
						[genre.name]: currentGenre ? currentGenre + 1 : 1,
					}
				}, totalAcc)
				return {
					...totalAcc,
					...currentGamesGenresObj,
				}
			} else {
				return {
					...totalAcc,
				}
			}
		},
		{} as {
			[key: string]: number
		}
	)
	const theMostOftenGenresObj = Object.keys(gentesObj).reduce(
		(genresAcc, currentGenre) => {
			if (gentesObj[currentGenre] > genresAcc.max) {
				return {
					max: gentesObj[currentGenre],
					genres: [currentGenre],
				}
			} else if (gentesObj[currentGenre] === genresAcc.max) {
				return {
					max: gentesObj[currentGenre],
					genres: [...genresAcc.genres, currentGenre],
				}
			} else {
				return {
					max: genresAcc.max,
					genres: [...genresAcc.genres],
				}
			}
		},
		{
			max: 0,
			genres: [],
		} as {
			max: number
			genres: string[]
		}
	)
	return theMostOftenGenresObj.genres
}

// const gentesByIds = state.statistics.favoriteGamesIds.map(id =>
// 	state.statistics.favoriteGames[id]?.game.genres.map(genre => genre.name)
// )

// const gentesMap: Map<string, number> = new Map()

// gentesByIds.forEach(genres => {
// 	genres?.forEach(genre => {
// 		if (gentesMap.has(genre)) {
// 			let countOfGenreEntries = gentesMap.get(genre) || 0
// 			gentesMap.set(genre, ++countOfGenreEntries)
// 		} else {
// 			gentesMap.set(genre, 1)
// 		}
// 	})
// })

// let maxGenreEntries = 0
// let resGenres: string[] = []
// gentesMap.forEach((count, genre) => {
// 	if (count > maxGenreEntries) {
// 		resGenres = [genre]
// 	} else if (maxGenreEntries === count) {
// 		resGenres.push(genre)
// 	}
// })
//return resGenres

 */
