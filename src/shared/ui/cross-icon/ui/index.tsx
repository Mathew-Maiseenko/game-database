import Image from 'next/image'
import CrossSwg from '../../../../../public/cross-svgrepo-com.svg'

interface iconProps {
	classes?: string | undefined
}

export function CrossIcon({ classes }: iconProps) {
	return (
		<Image
			src={CrossSwg}
			width={20}
			height={20}
			className={`cursor-pointer ${classes}`}
			alt='Cross icon'
		/>
	)
}
