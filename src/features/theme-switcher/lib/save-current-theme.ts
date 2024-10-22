export const saveCurrentTheme = (isThemeDark: boolean) =>
	localStorage.setItem('current-theme', isThemeDark ? '' : 'true')
