import { UserInfoStateType } from '../types'

export const calculateUsersFavoriteGenres = (state: UserInfoStateType) => {
	const gentesObj = state.statistics.favoriteGamesIds.reduce(
		(totalAcc, id) => {
			const genresList = state.statistics.favoriteGames[id]?.game.genres
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
