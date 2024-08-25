import Image from 'next/image'
import releaseSwg from '../../../../public/calendar-download-svgrepo-com.svg'

interface iconProps {
	classes?: string | undefined
}
export function ReleaseDateIcon({ classes }: iconProps) {
	return (
		<Image
			src={releaseSwg}
			width={20}
			height={20}
			className={`mr-1 ${classes}`}
			alt='star icon'
		/>
	)
}
