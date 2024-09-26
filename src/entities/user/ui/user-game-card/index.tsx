'use client'
import Image from 'next/image'
import getRandomDefaultImage from '@/shared/model/defaultImages'
import { StoreLogoList } from '@/shared/model'
import { Store } from '@/shared/api/RawgApi-hook'
import { DownloadIcon } from '@/shared/ui'
import { GarbageIcon } from '@/shared/ui/garbage-icon'
import { useAppDispatch } from '@/shared/lib/redux/hooks'
import { userSlice } from '../../model/user-slice'

interface UsersGameCardProps {
	id: number
	title: string
	poster: string | null | undefined
	releaseDate: string | null | undefined
	playtime: number | null | undefined
	stores?: Store[] | null
	achievementsCount: number | null
	completedAchievementsCount?: number | null
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
	stores,
}: UsersGameCardProps) {
	const dispatch = useAppDispatch()
	//after:-bottom-1.5
	return (
		<article className='flex flex-row relative w-full h-1/3 overflow-x-hidden rounded-xl mb-3 after:h-0.5 after:w-full after:absolute after:bottom-0 after:bg-textGray'>
			<Image
				src={poster || getRandomDefaultImage()}
				width={300}
				height={300}
				alt='Picture of the game'
				className='mr-5 w-1/5'
			/>
			<article className='flex flex-row justify-between w-full'>
				<section className='flex flex-col justify-center text-white'>
					<h2 className='text-white mb-1 font-semibold'>{title}</h2>
					<section className='flex flex-row justify-between'>
						<article className='flex flex-row text-white'>
							{stores ? <StoreLogoList stores={stores} /> : ''}
						</article>
					</section>
				</section>

				<section className='flex flex-col justify-center  items-center'>
					<h2 className='text-white mb-1 font-semibold'>Date Added</h2>
					<p className='flex flex-row text-textGray font-light'>
						{releaseDate}
					</p>
				</section>

				<section className='flex flex-col justify-center items-center'>
					<h2 className='text-white mb-1 font-semibold'>Playtime</h2>
					<p className='flex flex-row text-textGray font-light'>
						{playtime} hours
					</p>
				</section>

				<section className='flex flex-col justify-center items-center'>
					<h2 className='text-white mb-1 font-semibold'>Achievements</h2>
					<p className='flex flex-row text-textGray font-light'>
						{completedAchievementsCount}/{achievementsCount}
					</p>
				</section>

				<section className='flex flex-col justify-center'>
					<button
						onClick={() =>
							dispatch(userSlice.actions.toggleFavoriteGameComplete(id))
						}
						className='bg-green text-white mb-1 font-semibold rounded-md py-1 px-3'
					>
						Complete
					</button>
					<article className='flex flex-row'>
						<button className='flex justify-center items-center bg-orangeBorder p-1 w-1/2 text-white font-semibold rounded-md mr-1'>
							<DownloadIcon />
						</button>

						<button className='flex justify-center items-center bg-accountExitRed p-1 w-1/2 text-white font-semibold rounded-md'>
							<GarbageIcon />
						</button>
					</article>
				</section>
				<section
					className={`flex justify-center items-center transition-all ease-in-out bg-green ${
						isComplete ? 'translate-x-full' : 'translate-x-0'
					}`}
				>
					complete
				</section>
			</article>
		</article>
	)
}
//lg:flex-row  md:flex-col sm:flex-col
