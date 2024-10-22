'use client'
import {
	AchievementIcon,
	AnimatedTickIcon,
	ImageWithFallback,
} from '@/shared/ui'
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux/hooks'
import {
	saveSettingGameAchievementCompleteInLocalStorage,
	saveSettingGameAchievementIncompleteInLocalStorage,
	userSlice,
} from '@/entities/user'

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
					className='relative w-10 sm:w-14 md:w-20 lg:w-24 overflow-hidden'
					onClick={() => {
						if (isUserSigned && isGameFavorite && !isComplete) {
							dispatch(
								userSlice.actions.setAchievementCompleted({
									GameId,
									AchievementId,
								})
							)

							saveSettingGameAchievementCompleteInLocalStorage(
								GameId,
								AchievementId
							)
						} else if (isUserSigned && isGameFavorite && isComplete) {
							dispatch(
								userSlice.actions.setAchievementInCompleted({
									GameId,
									AchievementId,
								})
							)

							saveSettingGameAchievementIncompleteInLocalStorage(
								GameId,
								AchievementId
							)
						}
					}}
				>
					<section
						className={`${
							!isComplete && 'hidden'
						} flex justify-center items-center absolute w-full h-full`}
					>
						<AnimatedTickIcon styles='w-1/2' />
					</section>

					<ImageWithFallback
						srcImage={image}
						width={500}
						height={500}
						alt='Picture of the achievement'
						className='flex flex-grow object-cover w-full h-auto'
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
