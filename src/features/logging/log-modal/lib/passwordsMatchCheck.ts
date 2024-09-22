export const passwordsMatchCheck = (
	password: string,
	verifiedPassword: string
): string => {
	if (!password.length) {
		return 'This field is required'
	}
	if (password !== verifiedPassword) {
		return 'Your password and confirmed password are different'
	}
	return ''
}
