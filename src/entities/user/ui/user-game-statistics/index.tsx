'use client'
import { useAppSelector } from '@/shared/lib/redux/hooks'
import { userSlice } from '../../model/user-slice'
import { calculateUsersFavoriteGenres } from '../../lib/calculate-users-favorite-genres'
import { calculateUsersRang } from '../../lib/calculate-users-rang'

export function GameStatistics() {
	const { favoriteGames, favoriteGamesIds } = useAppSelector(
		userSlice.selectors.selectIsUserStatistics
	)
	const usersRang = calculateUsersRang(
		favoriteGamesIds.length,
		favoriteGamesIds.filter(id => favoriteGames[id]?.isComplete).length
	)
	const favoriteGenres = calculateUsersFavoriteGenres({
		games: favoriteGames,
		ids: favoriteGamesIds,
	}).genres

	return (
		//sm:mr-0 sm:w-full sm:after:bg-none
		<article className='flex flex-col relative text-black dark:text-white mr-0 md:mr-5 lg:mr-10 w-full md:w-1/3 after:h-full after:w-px after:absolute md:after:-right-2 lg:after:-right-5 after:bg-none md:after:bg-grayLineAfterCard'>
			<h2 className='text-center inline-block w-full text-black dark:text-white font-semibold sm:text-2xl xl:text-3xl mb-2 underline'>
				Statistics:
			</h2>
			<article className='flex flex-col justify-between w-full h-full pb-5 text-base md:text-lg'>
				<section className='flex flex-row flex-wrap relative font-semibold justify-between sm:after:h-px md:after:h-0.5 after:w-full after:absolute md:after:-bottom-2.5 sm:after:-bottom-1 after:bg-grayLineAfterCard text-sm md:text-md lg:text-lg xl:text-2xl md:mb-0 mb-2'>
					<h3>Rang:</h3>
					<h4>{usersRang}</h4>
				</section>
				<section className='flex flex-row flex-wrap relative font-semibold  justify-between after:h-px md:after:h-0.5 after:w-full after:absolute md:after:-bottom-2.5 after:-bottom-0.5 after:bg-grayLineAfterCard text-base md:text-md lg:text-lg xl:text-2xl md:mb-0 mb-2'>
					<h3>Games in favorite list:</h3>
					<h4>{favoriteGamesIds.length}</h4>
				</section>
				<section className='flex flex-row flex-wrap relative font-semibold  justify-between after:h-px md:after:h-0.5 after:w-full after:absolute md:after:-bottom-2.5 after:-bottom-0.5 after:bg-grayLineAfterCard text-base md:text-md lg:text-lg xl:text-2xl md:mb-0 mb-2'>
					<h3>Completed games:</h3>
					<h4>
						{
							favoriteGamesIds.filter(id => favoriteGames[id]?.isComplete)
								.length
						}
					</h4>
				</section>
				<section className='flex flex-row flex-wrap relative font-semibold justify-between after:h-px md:after:h-0.5 after:w-full after:absolute md:after:-bottom-2.5 after:-bottom-0.5 after:bg-grayLineAfterCard text-base md:text-md lg:text-lg xl:text-2xl'>
					<h3>Favorite genres:</h3>
					<h4>
						{favoriteGenres.length
							? favoriteGenres.join(', ')
							: "You haven't got any favorite game"}
					</h4>
				</section>
			</article>
		</article>
	)
}
