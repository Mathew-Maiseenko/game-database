import Image from 'next/image'
import downloadIcon from './../../../../../public/downloadIcon.svg'
import star from './../../../../../public/star.svg'

import getRandomDefaultImage from '@/shared/model/defaultImages'

export async function GameAchievementCard() {
	return (
		<section className='flex w-[48%] justify-between relative mb-5 after:h-[2px] after:w-full after:absolute after:bottom-[-7px] after:bg-grayLineAfterCard'>
			<Image
				src={false || getRandomDefaultImage()}
				width={80}
				height={80}
				alt='Picture of the author'
				className=''
			/>
			<article className='flex flex-col rounded-3xl min-w-[70%] p-3'>
				<section className='flex justify-between'>
					<h3 className='text-xl font-bold text-white'>Fortnite</h3>
					<section className='flex items-center'>
						<Image
							src={star}
							width={20}
							height={20}
							className='mr-1'
							alt='second game photo'
						/>
						<h4 className='text-lg font-bold text-white'>4.8</h4>
					</section>
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
			</article>
		</section>
	)
}
