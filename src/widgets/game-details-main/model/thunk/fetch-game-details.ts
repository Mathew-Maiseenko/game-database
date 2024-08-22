import { StoreGameDetails } from '@/shared/api/RawgApi-hook'
import { extraArgumentType } from '@/shared/lib'
import { createAsyncThunk } from '@reduxjs/toolkit'

type GameId = number

export const fetchGameDetails = createAsyncThunk<
	StoreGameDetails,
	GameId,
	{ extra: extraArgumentType }
>('gameDetails/fetchGameDetails', async (id, thunkApi) => {
	const res = await thunkApi.extra.api.getGameDetails(id)
	return res
})
//4291
