import type { Achievement, StoreGameDetails } from '@/shared/api'
import { createAppSlice } from '@/shared/lib'
import { PayloadAction } from '@reduxjs/toolkit'
import { fetchGameDetails } from '../thunk/fetch-game-details'

type GameId = number

interface ImageObj {
	image: string
	alt: string
}

interface initialGameDetailsStateType {
	games: Record<GameId, StoreGameDetails>
	gameAchievements: Achievement[]
	currentGameId: GameId | null | undefined
	gameDetailsFetchingState: 'idle' | 'pending' | 'fulfilled' | 'rejected'
	currentModalImage: ImageObj | undefined
}

const initialGameDetailsState: initialGameDetailsStateType = {
	games: {},
	gameAchievements: [],
	currentGameId: null,
	gameDetailsFetchingState: 'idle',
	currentModalImage: undefined,
}

export const gameDetailsSlice = createAppSlice({
	name: 'gameDetails',
	initialState: initialGameDetailsState,
	selectors: {
		selectGameDetailsById: (state, id) => state.games[id],
		selectIsGameAlreadyLoaded: (state, id) => !!state.games[id],
		selectAllGamesDetails: state => state.games,
		selectCurrentGameId: state => state.currentGameId,
		selectCurrentModalImage: state => state.currentModalImage,
		selectGameAchievementsById: (state, id) => state.gameAchievements[id],
		selectAllGamesAchievementsById: state => state.gameAchievements,
		selectGameDetailsFetchingState: state => state.gameDetailsFetchingState,
	},
	reducers: {
		setCurrentModalImage: (state, action: PayloadAction<ImageObj>) => {
			state.currentModalImage = action.payload
		},
		clearCurrentModalImage: state => {
			state.currentModalImage = undefined
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchGameDetails.pending, state => {
				state.gameDetailsFetchingState = 'pending'
			})
			.addCase(fetchGameDetails.fulfilled, (state, action) => {
				state.games[action.meta.arg] = action.payload
				state.currentGameId = action.payload.id
				state.gameDetailsFetchingState = 'fulfilled'
			})
			.addCase(fetchGameDetails.rejected, state => {
				state.gameDetailsFetchingState = 'rejected'
			})
	},
})
