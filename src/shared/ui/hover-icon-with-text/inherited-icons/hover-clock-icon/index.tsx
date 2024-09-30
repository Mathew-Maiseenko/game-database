import ClockSwg from '../../../../../../public/clock.svg'
import { HoverIconWithText } from '../..'

export function HoverClockIcon() {
	return (
		<HoverIconWithText
			title='Playtime in hours'
			image={ClockSwg}
			alt='playtime icons'
		/>
	)
}
