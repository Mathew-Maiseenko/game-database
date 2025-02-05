import { StoreGameDetails } from '@/shared/api'
import { extraArgumentType } from '@/shared/lib'
import { createAsyncThunk } from '@reduxjs/toolkit'

type GameId = number

export const fetchGameDetails = createAsyncThunk<
	StoreGameDetails,
	GameId,
	{ extra: extraArgumentType }
>('gameDetails/fetchGameDetails', async (id, thunkApi) => {
	const res = await thunkApi.extra.api.games.getGameDetails(id)
	return res
})
