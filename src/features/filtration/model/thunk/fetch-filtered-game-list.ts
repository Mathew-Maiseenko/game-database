import type { StoreGamesFiltrationObj } from '@/shared/api/RawgApi-hook'
import type { extraArgumentType } from '@/shared/lib'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface fetchFilteredGameListThunkParams {
	gamesPerPage: number
	pageNumber: number
	title?: string
	genres?: string
	tags?: string
	year?: number | string | null
	developers?: string
}

export const fetchFilteredGameList = createAsyncThunk<
	StoreGamesFiltrationObj,
	fetchFilteredGameListThunkParams,
	{ extra: extraArgumentType }
>(
	'gamesFilteredList/fetchFilteredGameList',
	async (
		{ gamesPerPage, pageNumber, title, genres, tags, year, developers },
		thunkApi
	) => {
		const response = await thunkApi.extra.api.games.getGamesListWithParams({
			gamesPerPage,
			pageNumber,
			title,
			genres,
			tags,
			year,
			developers,
		})
		return response
	}
)
