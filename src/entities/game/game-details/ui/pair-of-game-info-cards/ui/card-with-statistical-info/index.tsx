import Image from 'next/image'
import downloadIcon from './../../../../../../../public/downloadIcon.svg'
import star from './../../../../../../../public/star.svg'

export default function CardWithStatisticalInfo() {
	return (
		<section className='flex flex-row justify-between bg-whiteGray rounded-3xl w-[48%] p-7 '>
			<article className='flex flex-col justify-between items-center'>
				<Image
					src={star}
					width={20}
					height={20}
					className='mr-1'
					alt='second game photo'
				/>
				<h4 className='text-lg font-bold text-white'>4.8</h4>
			</article>
			<article className='flex flex-col justify-between items-center'>
				<Image
					src={downloadIcon}
					width={20}
					height={20}
					className='mr-1'
					alt='second game photo'
				/>
				<h4 className='text-lg font-bold text-white'>2.3M</h4>
			</article>
			<article className='flex flex-col justify-between items-center'>
				<Image
					src={downloadIcon}
					width={20}
					height={20}
					className='mr-1'
					alt='second game photo'
				/>
				<h4 className='text-lg font-bold text-white'>3</h4>
			</article>
			<article className='flex flex-col justify-between items-center'>
				<Image
					src={downloadIcon}
					width={20}
					height={20}
					className='mr-1'
					alt='second game photo'
				/>
				<h4 className='text-lg font-bold text-white'>4</h4>
			</article>
		</section>
	)
}
