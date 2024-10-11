import { ClockIcon } from '@/shared/ui/icon/clock-icon/ui'
import { HoverIconWithText } from '../..'

export function HoverClockIcon() {
	return (
		<HoverIconWithText title='Playtime in hours'>
			<ClockIcon classes='fill-black dark:fill-white' />
		</HoverIconWithText>
	)
}
