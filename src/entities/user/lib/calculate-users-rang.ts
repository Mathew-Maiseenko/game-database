export const calculateUsersRang = (favorites: number, completed: number) => {
	if (favorites === 0 && completed === 0) {
		return 'Not a gamer'
	} else if (favorites < 2 && completed < 1) {
		return 'Beginner'
	} else if (favorites < 4 && completed < 2) {
		return 'Casual Player'
	} else if (favorites < 6 && completed < 3) {
		return 'Solitaire Lover'
	} else if (favorites < 8 && completed < 4) {
		return 'Ordinary Gamer'
	} else if (favorites < 10 && completed < 5) {
		return 'Enthusiast'
	} else if (favorites < 12 && completed < 6) {
		return 'Avid Gamer'
	} else if (favorites < 14 && completed < 7) {
		return 'Pro Gamer'
	} else if (favorites < 16 && completed < 8) {
		return 'True Gamer'
	} else if (favorites < 18 && completed < 9) {
		return 'Hardcore Gamer'
	} else if (favorites < 20 && completed < 10) {
		return 'Master Gamer'
	} else if (favorites < 22 && completed < 11) {
		return 'Elite Gamer'
	} else if (favorites < 24 && completed < 12) {
		return 'Legendary Gamer'
	} else if (favorites < 26 && completed < 13) {
		return 'Boss'
	} else if (favorites >= 26 && completed >= 13) {
		return 'God'
	}
	return 'Not a gamer'
}
