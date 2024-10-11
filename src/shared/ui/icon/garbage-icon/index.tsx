import Image from 'next/image'
import GarbageSWG from '../../../../../public/garbage-trash-svgrepo-com.svg'

interface iconProps {
	classes?: string | undefined
}

export function GarbageIcon({ classes }: iconProps) {
	return (
		<Image
			src={GarbageSWG}
			width={20}
			height={20}
			className={`${classes}`}
			alt='garbage icon'
		/>
	)
}
