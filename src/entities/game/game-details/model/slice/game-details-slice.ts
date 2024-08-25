import type { Achievement, StoreGameDetails } from '@/shared/api/RawgApi-hook'
import { createAppSlice } from '@/shared/lib'
import { fetchGameDetails } from '../thunk/fetch-game-details'

type GameId = number

interface initialGameDetailsStateType {
	games: Record<GameId, StoreGameDetails>
	gameAchievements: Achievement[] //Record<GameId, Achievement[]>
	currentGameId: GameId | null | undefined
	gameDetailsFetchingState: 'idle' | 'pending' | 'rejected' | 'fulfilled'
	//gameAchievementsFetchingState: 'idle' | 'pending' | 'rejected' | 'fulfilled'
}

const initialGameDetailsState: initialGameDetailsStateType = {
	games: {},
	gameAchievements: [],
	currentGameId: null,
	gameDetailsFetchingState: 'idle',
	//gameAchievementsFetchingState: 'idle',
}

export const gameDetailsSlice = createAppSlice({
	name: 'gameDetails',
	initialState: initialGameDetailsState,
	selectors: {
		selectGameDetailsById: (state, id) => state.games[id],
		selectAllGamesDetails: state => state.games,
		selectCurrentGameId: state => state.currentGameId,

		selectGameAchievementsById: (state, id) => state.gameAchievements[id],
		selectAllGamesAchievementsById: state => state.gameAchievements,
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchGameDetails.pending, state => {
				state.gameDetailsFetchingState = 'pending'
			})
			.addCase(fetchGameDetails.fulfilled, (state, action) => {
				state.games[action.meta.arg] = action.payload
				state.currentGameId = action.meta.arg
				state.gameDetailsFetchingState = 'fulfilled'
			})
			.addCase(fetchGameDetails.rejected, state => {
				state.gameDetailsFetchingState = 'rejected'
			})

		// .addCase(fetchGameAchievements.pending, state => {
		// 	state.gameAchievementsFetchingState = 'pending'
		// })
		// .addCase(fetchGameAchievements.fulfilled, (state, action) => {
		// 	state.gameAchievements = action.payload
		// 	state.gameAchievementsFetchingState = 'fulfilled'
		// })
		// .addCase(fetchGameAchievements.rejected, state => {
		// 	state.gameAchievementsFetchingState = 'rejected'
		// })
	},
})
