import type { Genre } from '@/shared/api/RawgApi-hook/types/genre'
import type { extraArgumentType } from '@/shared/lib'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchGenresList = createAsyncThunk<
	Genre[],
	undefined,
	{ extra: extraArgumentType }
>('gamesFilteredList/fetchGenresList', async (_, thunkApi) => {
	const res = await thunkApi.extra.api.getGenresList()
	return res
})
