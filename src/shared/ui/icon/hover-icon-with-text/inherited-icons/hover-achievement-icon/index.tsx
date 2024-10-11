import { HoverIconWithText } from '../..'
import { AchievementIcon } from '../../../achievement-icon'

export function HoverAchievementIcon() {
	return (
		<HoverIconWithText title='Achievements count'>
			<AchievementIcon classes='stroke-black dark:stroke-white' />
		</HoverIconWithText>
	)
}
