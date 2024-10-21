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
