import type { Tag } from '@/shared/api/RawgApi-hook/types/tag'
import type { extraArgumentType } from '@/shared/lib'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchTagsList = createAsyncThunk<
	Tag[],
	undefined,
	{ extra: extraArgumentType }
>('gameDetails/fetchGameDetails', async (_, thunkApi) => {
	const res = await thunkApi.extra.api.getTagsList()
	return res
})
