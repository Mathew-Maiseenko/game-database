export const passwordsMatchCheck = (
	password: string,
	verifiedPassword: string
): string =>
	password !== verifiedPassword
		? 'Your password and confirmed password are different'
		: ''
