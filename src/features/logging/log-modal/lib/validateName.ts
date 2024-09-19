export function validateName(name: string): string {
	if (name.length < 2) {
		return 'User name is too short. Please input more than 1 character'
	} else if (name.length > 30) {
		return 'User name is too long. Please input less than 30 characters'
	}
	return ''
}
