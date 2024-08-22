import Image from 'next/image'
import downloadIcon from './../../../../../../../public/downloadIcon.svg'
import { StarIcon } from '@/shared/ui'

export default function CardWithBaseInfo() {
	return (
		<section className='flex flex-col bg-whiteGray rounded-3xl w-[48%] p-7'>
			<section className='flex justify-between'>
				<h2 className='text-xl font-bold text-white'>Fortnite</h2>
				<article className='flex items-center'>
					<StarIcon />
					<h4 className='text-lg font-bold text-white'>4.8</h4>
				</article>
			</section>
			<section className='flex justify-between'>
				<h3 className='text-lg font-medium text-textGray'>Sandbox</h3>
				<section className='flex items-center'>
					<Image
						src={downloadIcon}
						width={20}
						height={20}
						className='mr-1'
						alt='second game photo'
					/>
					<h4 className='text-lg font-bold text-white'>2.3M</h4>
				</section>
			</section>
		</section>
	)
}
