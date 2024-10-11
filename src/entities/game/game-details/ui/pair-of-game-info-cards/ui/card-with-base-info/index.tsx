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
		<section className='flex flex-col bg-white dark:border-none border-2 border-lightThemeBorderGray dark:bg-whiteGray rounded-3xl w-1/2 mr-3 p-7'>
			<section className='flex justify-between'>
				<h2 className='text-xl font-bold text-black dark:text-white'>
					{currentGame.name}
				</h2>
				<article className='flex items-center'>
					<StarIcon />
					<h4 className='text-lg font-bold text-black dark:text-white'>
						{currentGame.rating}
					</h4>
				</article>
			</section>
			<section className='flex-col justify-between'>
				<h3 className='text-lg font-medium text-textGray mb-2'>
					Genres: {currentGameGenres}
				</h3>
			</section>
		</section>
	)
}
