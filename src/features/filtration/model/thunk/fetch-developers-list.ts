import type { DeveloperResult } from '@/shared/api/RawgApi-hook'
import type { extraArgumentType } from '@/shared/lib'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchDeveloperList = createAsyncThunk<
	DeveloperResult[],
	undefined,
	{ extra: extraArgumentType }
>('gamesFilteredList/fetchDevelopersList', async (_, thunkApi) => {
	const res = await thunkApi.extra.api.getDevelopersList()
	return res
})
