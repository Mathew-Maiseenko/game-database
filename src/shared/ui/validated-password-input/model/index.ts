export const validatePassword = (
	password: string,
	setValidationMessage: React.Dispatch<React.SetStateAction<string>>,
	setReliabilityLevel: React.Dispatch<
		React.SetStateAction<'' | 'red' | 'orange' | 'green'>
	>
) => {
	if (!password.length) {
		setValidationMessage('')
		setReliabilityLevel('')
		return
	}

	if (password.length < 8) {
		setValidationMessage('Password must be at least 8 characters long!')
		setReliabilityLevel('red')
		return
	}

	const upperCaseRegex = /[A-Z]/
	const lowerCaseRegex = /[a-z]/
	const numberRegex = /[0-9]/

	if (
		!numberRegex.test(password) ||
		!lowerCaseRegex.test(password) ||
		!upperCaseRegex.test(password)
	) {
		setValidationMessage(
			'The password must contain digits, lowercase and capital letters!'
		)
		setReliabilityLevel('red')
		return
	}
	const SpecialSymbolsRegex = /[!@#$%^&*(),.?":{}|<>]/g
	if (!SpecialSymbolsRegex.test(password)) {
		setValidationMessage(
			'Reliable password, the password should contain special symbols (@#$...)!'
		)
		setReliabilityLevel('orange')
		return
	} else {
		setValidationMessage('Strong password')
		setReliabilityLevel('green')
		return
	}
}

/*
const smallCharactersRegex = /[a-z]/
	if (!smallCharactersRegex.test(password)) {
		return {
			validationMessage:
				'The password must contain lowercase and capital letters',
			reliabilityLevel: 'red',
		}
	}
	const largeCharactersRegex = /[A-Z]/
	if (!largeCharactersRegex.test(password)) {
		return {
			validationMessage: 'Reliable password',
			reliabilityLevel: 'orange',
		}
	}

*/
