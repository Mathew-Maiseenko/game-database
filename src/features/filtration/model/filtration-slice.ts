import type { DeveloperResult, StoreGame } from '@/shared/api/RawgApi-hook'
import type { Genre } from '@/shared/api/RawgApi-hook/types/genre'
import type { TagResult } from '@/shared/api/RawgApi-hook/types/tag'
import { createAppSlice } from '@/shared/lib'
import { PayloadAction } from '@reduxjs/toolkit'
import { fetchFilteredGameList } from './thunk/fetch-filtered-game-list'
import { fetchGenresList } from './thunk/fetch-genres-list'
import { fetchTagsList } from './thunk/fetch-tags-list'
import { fetchDeveloperList } from './thunk/fetch-developers-list'
//переделать структуру хранилища
interface StateType {
	games: StoreGame[]
	gameListFetchingState: 'idle' | 'pending' | 'rejected' | 'fulfilled'

	developers: DeveloperResult[]
	developerListFetchingState: 'idle' | 'pending' | 'rejected' | 'fulfilled'

	genres: Genre[]
	genreListFetchingState: 'idle' | 'pending' | 'rejected' | 'fulfilled'

	tags: TagResult[]
	tagListFetchingState: 'idle' | 'pending' | 'rejected' | 'fulfilled'

	//activeFiltrationGameTitle: string
	activePage: number
	activeFiltrationGenres: Record<string, Genre | undefined>
	activeFiltrationTags: Record<string, TagResult | undefined>

	// activeFiltrationGenres: string[]
	// activeFiltrationTags: string[]
}

const initialState: StateType = {
	games: [],
	gameListFetchingState: 'idle',

	developers: [],
	developerListFetchingState: 'idle',

	genres: [],
	genreListFetchingState: 'idle',

	tags: [],
	tagListFetchingState: 'idle',

	activePage: 1,

	activeFiltrationGenres: {},
	activeFiltrationTags: {},
}

export const filteredGamesSlice = createAppSlice({
	name: 'gamesFilteredList',
	initialState,
	selectors: {
		selectCurrentGames: state => state.games,
		selectDeveloperList: state => state.developers,
		selectGenreList: state => state.genres,
		selectTagList: state => state.tags,
		selectActivePage: state => state.activePage,
		//selectFiltrationTitle: state => state.activeFiltrationGameTitle,
		selectFiltrationGenreList: state => state.activeFiltrationGenres,
		selectFiltrationTagList: state => state.activeFiltrationTags,
	},
	reducers: {
		// setTitle: (state, action: PayloadAction<string>) => {
		// 	state.activeFiltrationGameTitle = action.payload
		// },
		// clearTitle: state => {
		// 	state.activeFiltrationGameTitle = ''
		// },

		setActivePage: (state, action: PayloadAction<number>) => {
			state.activePage = action.payload
		},

		setActiveGenres: (
			state,
			action: PayloadAction<{
				name: string
				param: Genre | undefined
			}>
		) => {
			state.activeFiltrationGenres = {
				...state.activeFiltrationGenres,
				[action.payload.name]: action.payload.param,
			}
		},

		setActiveTags: (
			state,
			action: PayloadAction<{
				name: string
				param: TagResult | undefined
			}>
		) => {
			state.activeFiltrationTags = {
				...state.activeFiltrationTags,
				[action.payload.name]: action.payload.param,
			}
		},

		// addActiveGenre: (state, action: PayloadAction<string>) => {
		// 	state.activeFiltrationGenres = [
		// 		...state.activeFiltrationGenres,
		// 		action.payload,
		// 	]
		// },
		// removeActiveGenre: (state, action: PayloadAction<string>) => {
		// 	state.activeFiltrationGenres = state.activeFiltrationGenres.filter(
		// 		genre => genre !== action.payload
		// 	)
		// },
		// clearActiveGenres: state => {
		// 	state.activeFiltrationGenres = []
		// },
		// addActiveTag: (state, action: PayloadAction<string>) => {
		// 	state.activeFiltrationTags = {
		// 		...state.activeFiltrationTags,
		// 		[action.payload],
		// 	}
		// },
		// removeActiveTag: (state, action: PayloadAction<string>) => {
		// 	state.activeFiltrationTags = state.activeFiltrationTags.filter(
		// 		tag => tag !== action.payload
		// 	)
		// },
		// clearActiveTags: state => {
		// 	state.activeFiltrationTags = []
		// },
	},
	extraReducers: builder => {
		builder
			.addCase(fetchFilteredGameList.pending, state => {
				state.gameListFetchingState = 'pending'
			})
			.addCase(fetchFilteredGameList.fulfilled, (state, action) => {
				state.gameListFetchingState = 'fulfilled'
				state.games = action.payload
			})
			.addCase(fetchFilteredGameList.rejected, state => {
				state.gameListFetchingState = 'rejected'
			})

			.addCase(fetchGenresList.pending, state => {
				state.genreListFetchingState = 'pending'
			})
			.addCase(fetchGenresList.fulfilled, (state, action) => {
				state.genreListFetchingState = 'fulfilled'
				state.genres = action.payload
			})
			.addCase(fetchGenresList.rejected, state => {
				state.genreListFetchingState = 'rejected'
			})

			.addCase(fetchTagsList.pending, state => {
				state.tagListFetchingState = 'pending'
			})
			.addCase(fetchTagsList.fulfilled, (state, action) => {
				state.tagListFetchingState = 'fulfilled'
				state.tags = action.payload
			})
			.addCase(fetchTagsList.rejected, state => {
				state.tagListFetchingState = 'rejected'
			})

			.addCase(fetchDeveloperList.pending, state => {
				state.developerListFetchingState = 'pending'
			})
			.addCase(fetchDeveloperList.fulfilled, (state, action) => {
				state.developerListFetchingState = 'fulfilled'
				state.developers = action.payload
			})
			.addCase(fetchDeveloperList.rejected, state => {
				state.developerListFetchingState = 'rejected'
			})
	},
})

// export const fetchFilteredGameList = createAsyncThunk<
// 	StoreGame[],
// 	ThunkParams,
// 	{ extra: extraArgumentType }
// >(
// 	'gamesFilteredList/fetchFilteredGameList',
// 	async (
// 		{ gamesPerPage, pageNumber, title, genres, tags, year, developers },
// 		thunkApi
// 	) => {
// 		const response = await thunkApi.extra.api.getGamesListWithParams(
// 			gamesPerPage,
// 			pageNumber,
// 			title,
// 			genres,
// 			tags,
// 			year,
// 			developers
// 		)
// 		return response
// 	}
// )

// export const fetchGenresList = createAsyncThunk<
// 	Genre[],
// 	undefined,
// 	{ extra: extraArgumentType }
// >('gameDetails/fetchGameDetails', async (_, thunkApi) => {
// 	const res = await thunkApi.extra.api.getGenresList()
// 	return res
// })

// export const fetchTagsList = createAsyncThunk<
// 	Tag[],
// 	undefined,
// 	{ extra: extraArgumentType }
// >('gameDetails/fetchGameDetails', async (_, thunkApi) => {
// 	const res = await thunkApi.extra.api.getTagsList()
// 	return res
// })
