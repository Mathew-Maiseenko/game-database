'use client'
import { extraArgument } from '@/shared/lib'
import { configureStore } from '@reduxjs/toolkit'
import { gameDetailsSlice } from '@/entities/game/game-details/model'
import { filteredGamesSlice } from '@/features/filtration'
import { userSlice } from '@/entities/user'
import { themeSwitcherSlice } from '@/features/theme-switcher'
export const makeStore = () => {
	return configureStore({
		reducer: {
			[gameDetailsSlice.name]: gameDetailsSlice.reducer,
			[filteredGamesSlice.name]: filteredGamesSlice.reducer,
			[userSlice.name]: userSlice.reducer,
			[themeSwitcherSlice.name]: themeSwitcherSlice.reducer,
		},
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				thunk: {
					extraArgument,
				},
			}),
	})
}
