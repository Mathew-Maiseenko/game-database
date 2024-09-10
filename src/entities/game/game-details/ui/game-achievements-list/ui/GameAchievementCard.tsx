import Image from 'next/image'

import getRandomDefaultImage from '@/shared/model/defaultImages'
import { AchievementIcon, DownloadIcon, StarIcon } from '@/shared/ui'

interface GameAchievementCardProps {
	title: string
	description: string
	percent: number | string
	image: string
}

export function GameAchievementCard({
	title,
	description,
	percent,
	image,
}: GameAchievementCardProps) {
	return (
		<section className='flex w-full justify-between relative mb-5 after:h-[2px] after:w-full after:absolute after:bottom-[-7px] after:bg-grayLineAfterCard'>
			<Image
				src={image || getRandomDefaultImage()}
				width={80}
				height={80}
				alt='Picture of the achievement'
				className=''
			/>
			<article className='flex flex-col rounded-3xl min-w-[70%] p-3'>
				<section className='flex justify-between'>
					<h3 className='text-xl font-bold text-white'>{title}</h3>
					<section className='flex items-center'>
						<h4 className='text-lg font-bold text-white mr-3'>{percent}%</h4>
						<AchievementIcon />
					</section>
				</section>
				<section className='flex justify-between'>
					<h4 className='text-lg font-medium text-textGray'>{description}</h4>
				</section>
			</article>
		</section>
	)
}
