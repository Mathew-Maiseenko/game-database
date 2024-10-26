'use client'
import { extraArgument } from '@/shared/lib'
import { configureStore } from '@reduxjs/toolkit'
import { gameDetailsSlice } from '@/entities/game/game-details/model'
import { filteredGamesSlice } from '@/features/filtration'
import { userSlice } from '@/entities/user'
import { themeSwitcherSlice } from '@/features/theme-switcher'
import { imageModalSlice } from '@/entities/image'
import { signUpModalSlice } from '@/features/logging'
export const makeStore = () => {
	return configureStore({
		reducer: {
			[gameDetailsSlice.name]: gameDetailsSlice.reducer,
			[filteredGamesSlice.name]: filteredGamesSlice.reducer,
			[userSlice.name]: userSlice.reducer,
			[imageModalSlice.name]: imageModalSlice.reducer,
			[themeSwitcherSlice.name]: themeSwitcherSlice.reducer,
			[signUpModalSlice.name]: signUpModalSlice.reducer,
		},
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				thunk: {
					extraArgument,
				},
			}),
	})
}
