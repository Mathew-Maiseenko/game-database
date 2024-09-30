import AchievementSwg from '../../../../../../public/achievement.svg'
import { HoverIconWithText } from '../..'

export function HoverAchievementIcon() {
	return (
		<HoverIconWithText
			title='Achievements count'
			image={AchievementSwg}
			alt='Last update icon'
		/>
	)
}
