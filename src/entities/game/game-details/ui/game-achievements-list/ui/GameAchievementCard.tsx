import Image from 'next/image'

import getRandomDefaultImage from '@/shared/model/defaultImages'
import { AchievementIcon } from '@/shared/ui'
import { AnimatedTickIcon } from '@/shared/ui/animated-tick-icon'

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
		<section className='flex w-full justify-between relative mb-5 after:h-0.5 after:w-full after:absolute after:bottom-[-7px] after:bg-grayLineAfterCard'>
			<section className='flex'>
				<article className='relative'>
					<section className='absolute w-full'>
						<AnimatedTickIcon />
					</section>
					<Image
						src={image || getRandomDefaultImage()}
						width={80}
						height={80}
						alt='Picture of the achievement'
						className='w-full'
					/>
				</article>
				<article className='flex flex-col justify-self-start rounded-3xl min-w-[70%] p-3'>
					<section className='flex justify-between'>
						<h3 className='text-xl font-bold text-white'>{title}</h3>
					</section>
					<section className='flex justify-between'>
						<h4 className='text-lg font-medium text-textGray'>{description}</h4>
					</section>
				</article>
			</section>
			<section className='flex items-center'>
				<h4 className='text-lg font-bold text-white mr-3'>{percent}%</h4>
				<AchievementIcon />
			</section>
		</section>
	)
}
