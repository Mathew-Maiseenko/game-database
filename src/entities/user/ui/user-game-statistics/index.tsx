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
		<article className='flex flex-col relative text-white sm:mr-0 md:mr-5 lg:mr-10 sm:w-full md:w-1/3 after:h-full after:w-px after:absolute md:after:-right-2 lg:after:-right-5 sm:after:bg-none md:after:bg-grayLineAfterCard'>
			<h2 className='text-center inline-block w-full text-white font-medium sm:text-2xl xl:text-3xl mb-2 underline'>
				Статистика:
			</h2>
			<article className='flex flex-col justify-between w-full h-full pb-5 sm:text-md md:text-lg'>
				<section
					className='flex flex-row relative justify-between sm:after:h-px md:after:h-0.5 after:w-full after:absolute 
				md:after:-bottom-2.5 sm:after:-bottom-1 after:bg-grayLineAfterCard sm:text-sm md:text-md lg:text-lg xl:text-2xl md:mb-0 sm:mb-2'
				>
					<h3>Звание:</h3>
					<h4>{usersRang}</h4>
				</section>
				<section className='flex flex-row relative justify-between sm:after:h-px md:after:h-0.5 after:w-full after:absolute md:after:-bottom-2.5 sm:after:-bottom-0.5 after:bg-grayLineAfterCard sm:text-sm md:text-md lg:text-lg xl:text-2xl md:mb-0 sm:mb-2'>
					<h3>Игр в избранном:</h3>
					<h4>{favoriteGamesIds.length}</h4>
				</section>
				<section className='flex flex-row relative justify-between sm:after:h-px md:after:h-0.5 after:w-full after:absolute md:after:-bottom-2.5 sm:after:-bottom-0.5 after:bg-grayLineAfterCard sm:text-sm md:text-md lg:text-lg xl:text-2xl md:mb-0 sm:mb-2'>
					<h3>Пройденных игр:</h3>
					<h4>
						{
							favoriteGamesIds.filter(id => favoriteGames[id]?.isComplete)
								.length
						}
					</h4>
				</section>
				<section className='flex flex-row relative justify-between sm:after:h-px md:after:h-0.5 after:w-full after:absolute md:after:-bottom-2.5 sm:after:-bottom-0.5 after:bg-grayLineAfterCard sm:text-sm md:text-md lg:text-lg xl:text-2xl'>
					<h3>Любимые жанры:</h3>
					<h4>{favoriteGenres.join(',')}</h4>
				</section>
			</article>
		</article>
	)
}
