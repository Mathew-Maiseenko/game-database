'use client'
import Image from 'next/image'

import getRandomDefaultImage from '@/shared/model/defaultImages'
import {
	AchievementIcon,
	AnimatedTickIcon,
	ImageWithFallback,
} from '@/shared/ui'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import { userSlice } from '@/entities/user'

interface GameAchievementCardProps {
	GameId: number
	AchievementId: number
	isUserSigned: boolean
	isGameFavorite: boolean
	title: string
	description: string
	percent: number | string
	image: string
}

export function GameAchievementCard({
	GameId,
	AchievementId,
	isUserSigned,
	isGameFavorite,
	title,
	description,
	percent,
	image,
}: GameAchievementCardProps) {
	const dispatch = useAppDispatch()
	const isComplete = useAppSelector(state =>
		userSlice.selectors.selectIsAchievementCompleteById(
			state,
			GameId,
			AchievementId
		)
	)
	return (
		<li className='flex w-full justify-between relative mb-5 after:h-0.5 after:w-full after:absolute after:-bottom-2 after:bg-grayLineAfterCard py-2'>
			<section className='flex'>
				<article
					className='relative sm:max-w-10 md:max-w-20 lg:max-w-40'
					onClick={() => {
						if (isUserSigned && isGameFavorite && !isComplete) {
							dispatch(
								userSlice.actions.setAchievementCompleted({
									GameId,
									AchievementId,
								})
							)
						} else if (isUserSigned && isGameFavorite && isComplete) {
							dispatch(
								userSlice.actions.setAchievementInCompleted({
									GameId,
									AchievementId,
								})
							)
						}
					}}
				>
					<section
						className={`${!isComplete && 'hidden'} absolute w-full h-full`}
					>
						<AnimatedTickIcon />
					</section>
					<ImageWithFallback
						src={image}
						width={500}
						height={500}
						alt='Picture of the achievement'
						className='w-full h-full'
					/>
				</article>
				<article className='flex flex-col justify-self-start rounded-3xl min-w-[70%] p-3'>
					<section className='flex justify-between'>
						<h3 className='text-xl font-bold text-black dark:text-white'>
							{title}
						</h3>
					</section>
					<section className='flex justify-between'>
						<h4 className='text-lg font-medium text-textGray'>{description}</h4>
					</section>
				</article>
			</section>
			<section className='flex items-center'>
				<h4 className='text-lg font-bold text-black dark:text-white mr-3'>
					{percent}%
				</h4>
				<AchievementIcon classes='stroke-blue dark:stroke-orange' />
			</section>
		</li>
	)
}
