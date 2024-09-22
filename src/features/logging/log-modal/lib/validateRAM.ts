export const validateRAM = (count: number): string => {
	if (!count) {
		return 'This field is required'
	}
	if (count < 2) {
		return 'The introduced RAM is implausibly little. Please enter a number more than 2(GB).'
	} else if (count > 128) {
		return 'The introduced RAM is implausibly large. Please enter a number less than 128(GB).'
	} else if (count % 2 !== 0) {
		return 'RAM entered incorrectly. This is always even number.'
	}
	return ''
}
