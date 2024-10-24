'use client'
import { gameDetailsSlice } from '@/entities/game/game-details/model'
import { useAppSelector } from '@/shared/lib/redux/hooks'
import { StarIcon } from '@/shared/ui'
import { useMemo } from 'react'

export default function CardWithBaseInfo() {
	const currentGameId = useAppSelector(
		gameDetailsSlice.selectors.selectCurrentGameId
	)
	const currentGame = useAppSelector(state =>
		gameDetailsSlice.selectors.selectGameDetailsById(state, currentGameId)
	)

	const currentGameGenres = useMemo(
		() => currentGame.genres.map(game => game.name).join(',  '),
		[currentGame]
	)

	if (!currentGame) {
		return
	}
	return (
		<section className='flex flex-col bg-white dark:border-none border-2 border-lightThemeBorderGray dark:bg-whiteGray rounded-3xl w-full md:w-1/2 mr-3 p-3 sm:p-4 md:p-7 mb-2 md:mb-0'>
			<section className='w-full flex flex-col items-center sm:flex-row justify-between sm:items-start mb-2 sm:mb-0'>
				<h2 className='text-xl font-bold text-black dark:text-white mb-1 sm:mb-0'>
					{currentGame.name}
				</h2>
				<article className='flex items-center'>
					<StarIcon />
					<h4 className='text-lg font-bold text-black dark:text-white'>
						{currentGame.rating}
					</h4>
				</article>
			</section>
			<h3 className='w-full text-center  md:text-start text-lg font-medium text-textGray mb-2'>
				Genres: {currentGameGenres}
			</h3>
		</section>
	)
}
