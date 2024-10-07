import { createAppSlice } from '@/shared/lib'

interface StateType {
	isThemeDark: boolean
}

const initialState: StateType = {
	isThemeDark: true,
}

export const themeSwitcherSlice = createAppSlice({
	name: 'themeSwitcher',
	initialState,
	selectors: {
		selectIsThemeDark: state => state.isThemeDark,
	},
	reducers: {
		toggleActiveTheme: state => {
			state.isThemeDark = !state.isThemeDark
		},
	},
})
