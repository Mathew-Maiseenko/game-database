'use client'
import Image from 'next/image'
import getRandomDefaultImage from '@/shared/model/defaultImages'
import { AnimatedTickIcon } from '@/shared/ui'
import { useAppDispatch } from '@/shared/lib/redux/hooks'
import { userSlice } from '../../model/user-slice'
import { useRouter } from 'next/navigation'
import { UsersOpeningActionsMenuButton } from './ui'

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
	const dispatch = useAppDispatch()
	const router = useRouter()

	return (
		<article className='flex flex-row relative w-full h-1/3 mb-3 after:h-0.5 after:w-full after:absolute after:bottom-0 after:bg-textGray'>
			<section
				className='flex justify-center items-center relative mr-5 w-2/6 cursor-pointer min-h-full '
				onDoubleClick={() => router.push(`http://localhost:3000/details/${id}`)}
				onClick={() =>
					dispatch(userSlice.actions.toggleFavoriteGameComplete(id))
				}
			>
				<article
					className={`${
						!isComplete && 'hidden'
					} top-0 bottom-0 absolute w-1/2 h-1/2`}
				>
					<AnimatedTickIcon />
				</article>
				<Image
					src={poster || getRandomDefaultImage()}
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
					<h2 className='text-black dark:text-white mb-1 font-semibold'>
						Playtime
					</h2>
					<p className='flex flex-row text-textGray font-light'>
						{playtime} hours
					</p>
				</section>

				<section className='flex flex-col justify-center items-center'>
					<h2 className='text-black dark:text-white mb-1 font-semibold'>
						Achievements
					</h2>
					<p className='flex flex-row text-textGray font-light'>
						{completedAchievementsCount}/{achievementsCount}
					</p>
				</section>

				<section className='flex flex-col justify-center'>
					<article className='flex flex-col px-6 text-5xl font-bold'>
						<UsersOpeningActionsMenuButton website={website} id={id} />
					</article>
				</section>
			</section>
		</article>
	)
}
