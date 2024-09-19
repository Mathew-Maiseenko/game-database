export const calculateUsersRang = (length: number) => {
	if (length === 0) {
		return 'Not a gamer'
	} else if (length < 3) {
		return 'Solitaire lover'
	} else if (length < 7) {
		return 'Ordinary gamer'
	} else if (length < 11) {
		return 'True gamer'
	} else if (length <= 15) {
		return 'Boss'
	} else if (length > 15) {
		return 'God'
	}
	return ''
}
