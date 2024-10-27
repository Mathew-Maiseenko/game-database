'use client'
import { AnimatedTickIcon, ImageWithFallback } from '@/shared/ui'
import { useRouter } from 'next/navigation'
import { UsersOpeningActionsMenuButton } from './ui'
import { baseSiteUrl } from '@/shared/model'

interface UsersGameCardProps {
	id: number
	title: string
	poster: string | null | undefined
	releaseDate: string | null | undefined
	playtime: number | null | undefined
	website?: string | null
	achievementsCount: number | null
	completedAchievementsCount?: number
	isComplete: boolean
}

export function UsersGameCard({
	id,
	title,
	poster,
	releaseDate,
	playtime,
	website,
	achievementsCount,
	completedAchievementsCount,
	isComplete,
}: UsersGameCardProps) {
	const router = useRouter()
	return (
		<li className='flex flex-row relative w-full h-1/3 mb-3 after:h-0.5 after:w-full after:absolute after:-bottom-2 dark:after:bg-grayLineAfterCard after:bg-lightThemeBorderGray animate-card-showing'>
			<section
				className='flex justify-center items-center relative mr-1 sm:mr-5 w-2/6 cursor-pointer min-h-full overflow-hidden'
				onClick={() => router.push(`${baseSiteUrl}/details/${id}`)}
			>
				<article
					className={`${
						!isComplete && 'hidden'
					} flex justify-center items-center absolute  w-full h-full`}
				>
					<AnimatedTickIcon styles='w-1/2' />
				</article>
				<ImageWithFallback
					srcImage={poster ? poster : ''}
					width={500}
					height={500}
					alt='Poster of the game'
					className='w-full h-full cursor-pointer rounded-t-xl'
				/>
			</section>

			<section className='flex flex-row justify-between w-full text-xs md:text-sm lg:text-lg'>
				<section className='hidden sm:flex flex-col justify-center items-center overflow-hidden'>
					<h2 className='text-black dark:text-white mb-1 font-semibold'>
						{title}
					</h2>
					<p className='flex flex-row text-textGray font-light'>
						{releaseDate}
					</p>
				</section>

				<section className='flex flex-col justify-center items-center'>
					<h2 className='text-black dark:text-white mb-1 font-medium sm:font-semibold'>
						Playtime
					</h2>
					<p className='flex flex-row text-textGray font-light'>
						{playtime} hours
					</p>
				</section>

				<section className='flex flex-col justify-center items-center'>
					<h2 className='text-black dark:text-white mb-1 font-medium sm:font-semibold'>
						Achievements
					</h2>
					<p className='flex flex-row text-textGray font-light'>
						{completedAchievementsCount}/{achievementsCount}
					</p>
				</section>

				<section className='flex flex-col justify-center mx-1.5 relative z-50'>
					<UsersOpeningActionsMenuButton website={website} id={id} />
				</section>
			</section>
		</li>
	)
}
