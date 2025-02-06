import { fetchApiWrapper, StoreGameDetails } from '@/shared/api'
import { createAsyncThunk } from '@reduxjs/toolkit'

type GameId = number

export const fetchGameDetails = createAsyncThunk<StoreGameDetails, GameId>(
	'gameDetails/fetchGameDetails',
	async id => {
		return await fetchApiWrapper<StoreGameDetails>(`games/details/${id}`)
	}
)
