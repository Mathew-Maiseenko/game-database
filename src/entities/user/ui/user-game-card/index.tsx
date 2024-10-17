'use client'
import Image from 'next/image'
import getRandomDefaultImage from '@/shared/model/defaultImages'
import { Store } from '@/shared/api/RawgApi-hook'
import { AnimatedTickIcon, DownloadIcon } from '@/shared/ui'
import { GarbageIcon } from '@/shared/ui/icon/garbage-icon'
import { useAppDispatch } from '@/shared/lib/redux/hooks'
import { userSlice } from '../../model/user-slice'
import { useRouter } from 'next/navigation'

interface UsersGameCardProps {
	id: number
	title: string
	poster: string | null | undefined
	releaseDate: string | null | undefined
	playtime: number | null | undefined
	stores?: Store[] | null
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
	achievementsCount,
	completedAchievementsCount,
	isComplete,
}: UsersGameCardProps) {
	const dispatch = useAppDispatch()
	const router = useRouter()

	return (
		<article className='flex flex-row relative w-full h-1/3 overflow-x-hidden rounded-xl mb-3 after:h-0.5 after:w-full after:absolute after:bottom-0 after:bg-textGray overflow-hidden'>
			<section
				className='flex justify-center items-center relative mr-5 w-2/6 cursor-pointer min-h-full'
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
					className='w-full h-full cursor-pointer'
				/>
			</section>

			<section className='flex flex-row justify-between w-full text-xs md:text-sm lg:text-lg'>
				{/* <section className='flex flex-col justify-center text-black dark:text-white'>
					<h2 className='text-white mb-1 font-semibold'>{title}</h2>
					<section className='flex flex-row justify-between'>
						<article className='flex flex-row text-white'>
							{stores ? <StoreLogoList stores={stores} /> : ''}
						</article>
					</section>
				</section> */}

				<section className='hidden sm:flex flex-col justify-center items-center'>
					<h2 className='text-black dark:text-white mb-1 font-semibold'>
						Date Added
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
					{/* <button
						onClick={() =>
							dispatch(userSlice.actions.toggleFavoriteGameComplete(id))
						}
						className='bg-green text-white mb-1 font-semibold rounded-md py-1 px-3'
					>
						Complete
					</button> */}
					<article className='flex flex-col'>
						{/* <button className='flex justify-center items-center bg-downloadGameButton py-1 px-3 h-1/2 text-white rounded-md mb-1'>
							<DownloadIcon classes='w-5 h-5 fill-white dark:fill-black' />
						</button> */}

						<button
							className='flex justify-center items-center bg-gameDeleteRedLightTheme py-3 px-2 md:py-4 md:px-2 h-1/2 text-white rounded-full'
							onClick={() => dispatch(userSlice.actions.removeFavoriteGame(id))}
						>
							<GarbageIcon classes='w-5 h-5 fill-white dark:fill-black' />
						</button>
					</article>
				</section>
				{/* <section
					className={`flex justify-center items-center transition-all ease-in-out bg-green ${
						!isComplete ? 'translate-x-full' : 'translate-x-0'
					}`}
				>
					complete
				</section> */}
			</section>
		</article>
	)
}
//lg:flex-row  md:flex-col sm:flex-col
