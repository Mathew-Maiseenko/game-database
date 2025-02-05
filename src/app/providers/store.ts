'use client'
import { gameDetailsSlice } from '@/entities/game/game-details/model'
import { imageModalSlice } from '@/entities/image'
import { userSlice } from '@/entities/user'
import { filteredGamesSlice } from '@/features/filtration'
import { signUpModalSlice } from '@/features/logging'
import { themeSwitcherSlice } from '@/features/theme-switcher'
import { extraArgument } from '@/shared/lib'
import { configureStore } from '@reduxjs/toolkit'
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
