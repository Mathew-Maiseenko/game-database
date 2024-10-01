import type { StoreGame } from '@/shared/api/RawgApi-hook'
import { createAppSlice, extraArgumentType } from '@/shared/lib'
import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface StateType {
	entries: StoreGame[]
	gameListFetchingState: 'idle' | 'pending' | 'rejected' | 'fulfilled'
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
	const response = await thunkApi.extra.api.getGamesList()
	return response
})

export const gameCardSlice = createAppSlice({
	name: 'gamesList',
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

/*
export const gameCardSlice = createAppSlice({
	name: 'gamesList',
	initialState,
	selectors: {
		selectEntries: state => state.entries,
	},
	reducers: create => ({
		store: create.reducer((state, action: PayloadAction<StoreGame[]>) => {
			state.entries = action.payload
		}),
		storeGameList: create.asyncThunk<
			StoreGame[],
			undefined,
			{ extra: extraArgumentType }
		>(async (_, thunkApi) => thunkApi.extra.api.getGamesList(), {
			pending: state => {
				state.gameListFetchingState = 'pending'
			},
			rejected: state => {
				state.gameListFetchingState = 'rejected'
			},
			fulfilled: (state, action) => {
				state.gameListFetchingState = 'fulfilled'
				state.entries = action.payload
			},
		}),
	}),
})
*/
