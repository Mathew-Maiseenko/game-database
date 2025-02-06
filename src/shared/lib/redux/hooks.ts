import {
	asyncThunkCreator,
	buildCreateSlice,
	createAsyncThunk,
} from '@reduxjs/toolkit'
import {
	TypedUseSelectorHook,
	useDispatch,
	useSelector,
	useStore,
} from 'react-redux'
import type { AppDispatch, AppState, AppStore } from './types'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
export const useAppStore = () => useStore<AppStore>()
export const createAppSelector = useSelector.withTypes<AppState>
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: AppState
	dispatch: AppDispatch
}>()
export const createAppSlice = buildCreateSlice({
	creators: { asyncThunk: asyncThunkCreator },
})
