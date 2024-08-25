import Image from 'next/image'
import downloadSwg from '../../../../public/downloadIcon.svg'

interface iconProps {
	classes?: string | undefined
}
export function DownloadIcon({ classes }: iconProps) {
	return (
		<Image
			src={downloadSwg}
			width={20}
			height={20}
			className={`mr-1 ${classes}`}
			alt='star icon'
		/>
	)
}
