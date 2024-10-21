import { makeStore } from '@/app/providers/store'
import { ThunkAction, UnknownAction } from '@reduxjs/toolkit'
import { extraArgument } from './extra-argument'

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type extraArgumentType = typeof extraArgument
export type AppThunk<R = void> = ThunkAction<
	R,
	AppState,
	extraArgumentType,
	UnknownAction
>
