import type { TagResult } from '@/shared/api/RawgApi-hook/types/tag'
import type { extraArgumentType } from '@/shared/lib'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchTagsList = createAsyncThunk<
	TagResult[],
	undefined,
	{ extra: extraArgumentType }
>('gamesFilteredList/fetchTagsList', async (_, thunkApi) => {
	const res = await thunkApi.extra.api.getTagsList()
	return res
})
