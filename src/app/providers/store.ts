'use client'
import { extraArgument } from '@/shared/lib'
import { configureStore } from '@reduxjs/toolkit'
import { gameCardSlice } from '@/widgets/popular-game-list/model/game-card-slice'
import { gameDetailsSlice } from '@/entities/game/game-details/model'
export const makeStore = () => {
	return configureStore({
		reducer: {
			[gameCardSlice.name]: gameCardSlice.reducer,
			[gameDetailsSlice.name]: gameDetailsSlice.reducer,
		},
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				thunk: {
					extraArgument,
				},
			}),
	})
}
