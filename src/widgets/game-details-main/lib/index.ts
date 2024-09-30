export const getUserIdByPathname = (path: string | null) => {
	const pointsList = path ? path.split('/') : null
	if (!pointsList) {
		return 0
	} else {
		return +pointsList[pointsList.length - 1]
	}
}
