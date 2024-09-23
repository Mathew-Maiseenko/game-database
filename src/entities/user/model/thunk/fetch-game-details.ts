import { StoreGameDetails } from '@/shared/api/RawgApi-hook'
import { extraArgumentType } from '@/shared/lib'
import { createAsyncThunk } from '@reduxjs/toolkit'

type GameId = number

export const fetchDetailsByGamesIds = createAsyncThunk<
	Record<GameId, StoreGameDetails>,
	GameId[],
	{ extra: extraArgumentType }
>('userSlice/fetchDetailsByGamesIds', (ids, thunkApi) => {
	const res = ids.reduce(async (acc, id) => {
		const currentGame = (await thunkApi.extra.api.getGameDetails(
			id
		)) as StoreGameDetails
		return {
			...acc,
			[id]: currentGame,
		}
	}, {})
	return res
})
