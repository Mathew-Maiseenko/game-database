import { createAppSlice } from '@/shared/lib'

interface StateType {
	isThemeDark: boolean
}

const initialState: StateType = {
	isThemeDark: false,
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
			localStorage.setItem('current-theme', state.isThemeDark ? 'true' : '')
		},
		initActiveTheme: state => {
			const startedSiteColorTheme = localStorage.getItem('current-theme')
			if (startedSiteColorTheme) {
				state.isThemeDark = !!startedSiteColorTheme
			} else {
				state.isThemeDark = false
			}
		},
	},
})
