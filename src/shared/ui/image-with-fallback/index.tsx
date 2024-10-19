import { useState } from 'react'
import Image from 'next/image'
import emptyImage from '../../../../public/empty-image.svg'

interface ImageWithFallbackProps
	extends React.ImgHTMLAttributes<HTMLImageElement> {
	width?: number
	height?: number
	src?: string
	fallbackSrc?: string
	alt: string
	className?: string
}

export const ImageWithFallback = ({
	src = emptyImage,
	width = 500,
	height = 500,
	fallbackSrc = emptyImage,
	alt,
	className,
	...rest
}: ImageWithFallbackProps) => {
	const [imgSrc, setImgSrc] = useState(src)
	return (
		<Image
			{...rest}
			className={className}
			width={width}
			height={height}
			placeholder='blur'
			blurDataURL={
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvH79JgAGswK11g2dbAAAAABJRU5ErkJggg=='
			}
			src={imgSrc}
			onError={() => {
				setImgSrc(fallbackSrc)
			}}
			alt={alt}
		/>
	)
}
