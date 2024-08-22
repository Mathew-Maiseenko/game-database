import Image from 'next/image'
import TestImage from './../../../../../../public/downloadIcon.svg'

export function ListOfGameScreenshots() {
	return (
		<section className='flex flex-row justify-between h-[30vh] mb-5'>
			<Image
				src={TestImage}
				width={20}
				height={20}
				className='flex w-[32%]'
				alt='first game photo'
			/>
			<Image
				src={TestImage}
				width={20}
				height={20}
				className='flex w-[32%]'
				alt='first game photo'
			/>
			<Image
				src={TestImage}
				width={20}
				height={20}
				className='flex w-[32%]'
				alt='first game photo'
			/>
		</section>
	)
}
