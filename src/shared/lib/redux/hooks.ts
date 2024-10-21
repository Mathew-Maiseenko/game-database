import {
	TypedUseSelectorHook,
	useDispatch,
	useSelector,
	useStore,
} from 'react-redux'
import type {
	AppDispatch,
	AppStore,
	AppState,
	extraArgumentType,
} from './types'
import {
	asyncThunkCreator,
	buildCreateSlice,
	createAsyncThunk,
} from '@reduxjs/toolkit'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
export const useAppStore = () => useStore<AppStore>()
export const createAppSelector = useSelector.withTypes<AppState>
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: AppState
	dispatch: AppDispatch
	extra: extraArgumentType
}>()
export const createAppSlice = buildCreateSlice({
	creators: { asyncThunk: asyncThunkCreator },
})
