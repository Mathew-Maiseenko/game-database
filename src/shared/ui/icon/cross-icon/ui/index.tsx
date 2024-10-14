import Image from 'next/image'
import CrossSwg from '../../../../../public/cross-svgrepo-com.svg'

interface iconProps {
	classes?: string
}

export function CrossIcon({ classes }: iconProps) {
	return (
		<svg
			className={`cursor-pointer ${classes}`}
			width='50px'
			height='50px'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				className='dark:fill-textGray fill-black'
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M5.46967 5.46967C5.76256 5.17678 6.23744 5.17678 6.53033 5.46967L18.5303 17.4697C18.8232 17.7626 18.8232 18.2374 18.5303 18.5303C18.2374 18.8232 17.7626 18.8232 17.4697 18.5303L5.46967 6.53033C5.17678 6.23744 5.17678 5.76256 5.46967 5.46967Z'
			/>
			<path
				className='dark:fill-textGray fill-black'
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M18.5303 5.46967C18.8232 5.76256 18.8232 6.23744 18.5303 6.53033L6.53035 18.5303C6.23745 18.8232 5.76258 18.8232 5.46969 18.5303C5.17679 18.2374 5.17679 17.7626 5.46968 17.4697L17.4697 5.46967C17.7626 5.17678 18.2374 5.17678 18.5303 5.46967Z'
			/>
		</svg>
	)
}
/*
<Image
			src={CrossSwg}
			width={20}
			height={20}
			className={`cursor-pointer ${classes}`}
			alt='Cross icon'
		/>
 */