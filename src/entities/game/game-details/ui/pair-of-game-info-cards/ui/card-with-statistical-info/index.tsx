import { gameDetailsSlice } from '@/entities/game/game-details/model'
import { useAppSelector } from '@/shared/lib/redux/hooks'
import {
	HoverAchievementIcon,
	HoverClockIcon,
	HoverDownloadCalendarIcon,
	HoverSettingCalendarIcon,
} from '@/shared/ui'
import { useMemo } from 'react'

export default function CardWithStatisticalInfo() {
	const currentGameId = useAppSelector(
		gameDetailsSlice.selectors.selectCurrentGameId
	)
	const currentGame = useAppSelector(state =>
		gameDetailsSlice.selectors.selectGameDetailsById(state, currentGameId)
	)
	const { playtime, released, lastUpdate, achievementsCount } = currentGame

	const currentGameLastUpdate = useMemo(
		() => lastUpdate?.slice(0, lastUpdate.indexOf('T')),
		[lastUpdate]
	)

	if (!currentGame) {
		return
	}
	return (
		<section className='flex flex-row flex-wrap sm:flex-nowrap justify-between bg-white dark:border-none border-2 border-lightThemeBorderGray dark:bg-whiteGray rounded-3xl w-full md:w-1/2 p-3 sm:p-4 md:p-7 '>
			{playtime && (
				<article className='flex flex-col justify-between items-center w-1/2 sm:w-auto'>
					<HoverClockIcon />
					<h4 className='text-sm sm:text-lg font-bold text-black dark:text-white'>
						{playtime}
					</h4>
				</article>
			)}
			{released && (
				<article className='flex flex-col justify-between items-center w-1/2 sm:w-auto'>
					<HoverSettingCalendarIcon />
					<h4 className='text-sm sm:text-lg font-bold text-black dark:text-white'>
						{released}
					</h4>
				</article>
			)}

			{lastUpdate && (
				<article className='flex flex-col justify-between items-center w-1/2 sm:w-auto'>
					<HoverDownloadCalendarIcon />
					<h4 className='text-sm sm:text-lg font-bold text-black dark:text-white'>
						{currentGameLastUpdate}
					</h4>
				</article>
			)}
			{achievementsCount && (
				<article className='flex flex-col justify-between items-center w-1/2 sm:w-auto'>
					<HoverAchievementIcon />
					<h4 className='text-lg font-bold text-black dark:text-white'>
						{achievementsCount}
					</h4>
				</article>
			)}
		</section>
	)
}
