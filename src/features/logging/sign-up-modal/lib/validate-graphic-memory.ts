export const validateGraphicMemory = (count: number): string => {
	if (!count) {
		return 'This field is required'
	}
	if (count < 2) {
		return 'Graphic memory cannot be below zero.'
	} else if (count > 128) {
		return 'The introduced graphic memory is implausibly large. Please enter a number less than 24(GB).'
	} else if (count % 2 !== 0) {
		return 'Graphic memory entered incorrectly. This is always even number.'
	}
	return ''
}
