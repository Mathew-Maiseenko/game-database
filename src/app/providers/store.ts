'use client'
import { extraArgument } from '@/shared/lib'
import { configureStore } from '@reduxjs/toolkit'
import { gameDetailsSlice } from '@/entities/game/game-details/model'
import { filteredGamesSlice } from '@/features/filtration/model/filtration-slice'
import { userSlice } from '@/entities/user'
export const makeStore = () => {
	return configureStore({
		reducer: {
			[gameDetailsSlice.name]: gameDetailsSlice.reducer,
			[filteredGamesSlice.name]: filteredGamesSlice.reducer,
			[userSlice.name]: userSlice.reducer,
		},
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				thunk: {
					extraArgument,
				},
			}),
	})
}
