import type { StoreGameDetails } from '@/shared/api/RawgApi-hook'
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
			const currentGame = (await thunkApi.extra.api.getGameDetails(
				id
			)) as StoreGameDetails
			return { [id]: currentGame }
		})
	)

	return results.reduce((acc, game) => {
		return { ...acc, ...game }
	}, {} as Record<GameId, StoreGameDetails>)
})
