import { fetchApiWrapper, type StoreGameDetails } from '@/shared/api'
import { extraArgumentType } from '@/shared/lib'
import { createAsyncThunk } from '@reduxjs/toolkit'

type GameId = number

export const fetchDetailsByGamesIds = createAsyncThunk<
	Record<GameId, StoreGameDetails>,
	GameId[],
	{ extra: extraArgumentType }
>('userSlice/fetchDetailsByGamesIds', async (ids, thunkApi) => {
	const results = await Promise.all(
		ids.map(async id => {
			// const currentGame = (await thunkApi.extra.api.games.getGameDetails(
			// 	id
			// )) as StoreGameDetails

			const currentGame = await fetchApiWrapper<StoreGameDetails>(
				`games/details/${id}`
			)

			return { [id]: currentGame }
		})
	)

	return results.reduce((acc, game) => {
		return { ...acc, ...game }
	}, {} as Record<GameId, StoreGameDetails>)
})
