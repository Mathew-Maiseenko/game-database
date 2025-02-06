import {
	buildUrlQueryParams,
	fetchApiWrapper,
	type StoreGamesFiltrationObj,
} from '@/shared/api'
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
	fetchFilteredGameListThunkParams
>(
	'gamesFilteredList/fetchFilteredGameList',
	async (
		{ gamesPerPage, pageNumber, title, genres, tags, year, developers },
		thunkApi
	) => {
		// const response = await thunkApi.extra.api.games.getGamesListWithParams({
		// 	gamesPerPage,
		// 	pageNumber,
		// 	title,
		// 	genres,
		// 	tags,
		// 	year,
		// 	developers,
		// })
		//return response

		const queryParamsString = buildUrlQueryParams({
			page_size: gamesPerPage,
			page: pageNumber,
			search: title,
			genres,
			tags,
			dates: year,
			developers,
		})

		return await fetchApiWrapper<StoreGamesFiltrationObj>(
			`games${queryParamsString}`
		)
	}
)
