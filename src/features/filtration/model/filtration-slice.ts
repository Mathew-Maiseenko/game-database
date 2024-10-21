import type { StoreGame } from '@/shared/api/RawgApi-hook'
import type { Genre } from '@/shared/api/RawgApi-hook/types/genre'
import type { TagResult } from '@/shared/api/RawgApi-hook/types/tag'
import { createAppSlice } from '@/shared/lib'
import { PayloadAction } from '@reduxjs/toolkit'
import { fetchFilteredGameList } from './thunk/fetch-filtered-game-list'
interface StateType {
	games: StoreGame[]
	gameListFetchingState: 'idle' | 'pending' | 'rejected' | 'fulfilled'

	genres: Genre[]
	genreListFetchingState: 'idle' | 'pending' | 'rejected' | 'fulfilled'

	activePage: number
	totalGamesCount: number
	activeFiltrationGenres: Record<string, Genre | undefined>
	activeFiltrationTags: Record<string, TagResult | undefined>
}

const initialState: StateType = {
	games: [],
	gameListFetchingState: 'idle',

	genres: [],
	genreListFetchingState: 'idle',

	activePage: 1,
	totalGamesCount: 0,
	activeFiltrationGenres: {},
	activeFiltrationTags: {},
}

export const filteredGamesSlice = createAppSlice({
	name: 'gamesFilteredList',
	initialState,
	selectors: {
		selectCurrentGames: state => state.games,
		selectGenreList: state => state.genres,
		selectGameListFetchingState: state => state.gameListFetchingState,
		selectActivePage: state => state.activePage,
		selectTotalGamesCount: state => state.totalGamesCount,
		selectFiltrationGenreList: state => state.activeFiltrationGenres,
		selectFiltrationTagList: state => state.activeFiltrationTags,
	},
	reducers: {
		initGenres: (state, action: PayloadAction<Genre[]>) => {
			state.genres = action.payload
		},
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
	},
	extraReducers: builder => {
		builder
			.addCase(fetchFilteredGameList.pending, state => {
				state.gameListFetchingState = 'pending'
			})
			.addCase(fetchFilteredGameList.fulfilled, (state, action) => {
				state.gameListFetchingState = 'fulfilled'
				state.games = action.payload.games
				state.totalGamesCount = action.payload.count
			})
			.addCase(fetchFilteredGameList.rejected, state => {
				state.gameListFetchingState = 'rejected'
			})
	},
})
