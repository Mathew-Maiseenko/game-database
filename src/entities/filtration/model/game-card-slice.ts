import type { StoreGame } from '@/shared/api/RawgApi-hook'
import { createAppSlice, extraArgumentType } from '@/shared/lib'
import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface StateType {
	entries: StoreGame[]
	gameListFetchingState: 'idle' | 'pending' | 'rejected' | 'fulfilled'

	filtrationGameTitle: string | null
	filtrationGenres: string[]
	filtrationTags: string[]
}

interface ThunkParams {
	gamesPerPage: number
	pageNumber: number
	title?: string
	genres?: string
	tags?: string
	year?: number | string | null
	developers?: string
}

const initialState: StateType = {
	entries: [],
	gameListFetchingState: 'idle',

	filtrationGameTitle: '',
	filtrationGenres: [],
	filtrationTags: [],
}

export const fetchFilteredGameList = createAsyncThunk<
	StoreGame[],
	ThunkParams,
	{ extra: extraArgumentType }
>(
	'gamesFilteredList/fetchFilteredGameList',
	async (
		{ gamesPerPage, pageNumber, title, genres, tags, year, developers },
		thunkApi
	) => {
		const response = await thunkApi.extra.api.getGamesListWithParams(
			gamesPerPage,
			pageNumber,
			title,
			genres,
			tags,
			year,
			developers
		)
		return response
	}
)

export const filteredGamesSlice = createAppSlice({
	name: 'gamesFilteredList',
	initialState,
	reducers: {
		setTitle: (state, action: PayloadAction<string>) => {
			state.filtrationGameTitle = action.payload
		},
		clearTitle: state => {
			state.filtrationGameTitle = ''
		},

		addActiveGenre: (state, action: PayloadAction<string>) => {
			state.filtrationGenres = [...state.filtrationGenres, action.payload]
		},
		removeActiveGenre: (state, action: PayloadAction<string>) => {
			state.filtrationGenres = state.filtrationGenres.filter(
				genre => genre !== action.payload
			)
		},
		clearActiveGenres: state => {
			state.filtrationGenres = []
		},

		addActiveTag: (state, action: PayloadAction<string>) => {
			state.filtrationTags = [...state.filtrationTags, action.payload]
		},
		removeActiveTag: (state, action: PayloadAction<string>) => {
			state.filtrationTags = state.filtrationTags.filter(
				tag => tag !== action.payload
			)
		},
		clearActiveTags: state => {
			state.filtrationTags = []
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchFilteredGameList.pending, state => {
				state.gameListFetchingState = 'pending'
			})
			.addCase(fetchFilteredGameList.fulfilled, (state, action) => {
				state.gameListFetchingState = 'fulfilled'
				state.entries = action.payload
			})
			.addCase(fetchFilteredGameList.rejected, state => {
				state.gameListFetchingState = 'rejected'
			})
	},
})
