import Image from 'next/image'
import AchievementSWG from '../../../../public/achievement.svg'

interface iconProps {
	classes?: string | undefined
}
export function AchievementIcon({ classes }: iconProps) {
	return (
		<Image
			src={AchievementSWG}
			width={20}
			height={20}
			className={`mr-1 ${classes}`}
			alt='star icon'
		/>
	)
}
