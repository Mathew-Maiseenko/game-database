'use client'
import { useState } from 'react'
import Image from 'next/image'
import emptyImage from '../../../../public/empty-image.svg'

interface ImageWithFallbackProps
	extends React.ImgHTMLAttributes<HTMLImageElement> {
	width?: number
	height?: number
	srcImage?: string | null
	fallbackSrc?: string
	alt: string
	className?: string
}

export const ImageWithFallback = ({
	srcImage = emptyImage,
	width = 500,
	height = 500,
	fallbackSrc = emptyImage,
	alt,
	className,
	...rest
}: ImageWithFallbackProps) => {
	const [imgSrc, setImgSrc] = useState(srcImage)
	const base64Image =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvH79JgAGswK11g2dbAAAAABJRU5ErkJggg=='
	return (
		<Image
			{...rest}
			className={className}
			width={width}
			height={height}
			placeholder='blur'
			blurDataURL={base64Image}
			src={imgSrc ?? fallbackSrc}
			onError={() => {
				setImgSrc(fallbackSrc)
			}}
			alt={alt}
		/>
	)
}
