export const validateHardwareName = (Hardware: string): string => {
	if (!Hardware.length) {
		return 'This field is required'
	}
	if (Hardware.length < 3) {
		return 'Name of this hardware is too short. Please input more than 2 characters'
	} else if (Hardware.length > 30) {
		return 'Name of this hardware is too long. Please input less than 30 characters'
	}
	return ''
}
