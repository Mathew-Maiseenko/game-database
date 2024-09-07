'use client'
import { extraArgument } from '@/shared/lib'
import { configureStore } from '@reduxjs/toolkit'
import { gameCardSlice } from '@/widgets/popular-game-list/model/game-card-slice'
import { gameDetailsSlice } from '@/entities/game/game-details/model'
import { filteredGamesSlice } from '@/features/filtration/model/filtration-slice'
export const makeStore = () => {
	return configureStore({
		reducer: {
			[gameCardSlice.name]: gameCardSlice.reducer,
			[gameDetailsSlice.name]: gameDetailsSlice.reducer,
			[filteredGamesSlice.name]: filteredGamesSlice.reducer,
		},
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				thunk: {
					extraArgument,
				},
			}),
	})
}
