import Image from 'next/image'
import star from '../../../../public/star.svg'

interface iconProps {
	classes?: string | undefined
}
export function StarIcon({ classes }: iconProps) {
	return (
		<Image
			src={star}
			width={20}
			height={20}
			className={`mr-1 ${classes}`}
			alt='star icon'
		/>
	)
}
