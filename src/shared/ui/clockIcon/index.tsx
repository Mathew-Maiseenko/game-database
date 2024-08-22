import Image from 'next/image'
import ClockSwg from '../../../../public/clock.svg'

interface iconProps {
	classes?: string | undefined
}
export function ClockIcon({ classes }: iconProps) {
	return (
		<Image
			src={ClockSwg}
			width={20}
			height={20}
			className={`mr-1 ${classes}`}
			alt='star icon'
		/>
	)
}
