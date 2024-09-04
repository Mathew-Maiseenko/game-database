import type { StoreGame } from '@/shared/api/RawgApi-hook'
import { createAppSlice, extraArgumentType } from '@/shared/lib'
import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface StateType {
	entries: StoreGame[]
	gameListFetchingState: 'idle' | 'pending' | 'rejected' | 'fulfilled'

	filtrationGameTitle: string | null
	filtrationGenres: string[] | null | undefined
	filtrationTags: string[] | null | undefined
}

const initialState: StateType = {
	entries: [],
	gameListFetchingState: 'idle',
}

export const fetchGameList = createAsyncThunk<
	StoreGame[],
	undefined,
	{ extra: extraArgumentType }
>('gamesList/fetchGameList', async (_, thunkApi) => {
	const response = await thunkApi.extra.api.getGamesListWithPagination
	return response
})

export const gamesFiltrationSlice = createAppSlice({
	name: 'gamesFiltration',
	initialState,
	reducers: {
		store: (state, action: PayloadAction<StoreGame[]>) => {
			state.entries = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchGameList.pending, state => {
				state.gameListFetchingState = 'pending'
			})
			.addCase(fetchGameList.fulfilled, (state, action) => {
				state.gameListFetchingState = 'fulfilled'
				state.entries = action.payload
			})
			.addCase(fetchGameList.rejected, state => {
				state.gameListFetchingState = 'rejected'
			})
	},
})
