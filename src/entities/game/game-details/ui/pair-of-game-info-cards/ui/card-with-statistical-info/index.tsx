import { useAppSelector } from '@/shared/lib/redux/hooks'
import { gameDetailsSlice } from '@/entities/game/game-details/model'
import {
	HoverClockIcon,
	HoverAchievementIcon,
	HoverDownloadCalendarIcon,
	HoverSettingCalendarIcon,
} from '@/shared/ui'

export default function CardWithStatisticalInfo() {
	const currentGameId = useAppSelector(
		gameDetailsSlice.selectors.selectCurrentGameId
	)
	const currentGame = useAppSelector(state =>
		gameDetailsSlice.selectors.selectGameDetailsById(state, currentGameId)
	)
	if (!currentGame) {
		return
	}

	const { playtime, released, lastUpdate, achievementsCount } = currentGame
	return (
		<section className='flex flex-row justify-between bg-whiteGray rounded-3xl w-1/2 p-7 '>
			{playtime && (
				<article className='flex flex-col justify-between items-center'>
					<HoverClockIcon />
					<h4 className='text-lg font-bold text-white'>{playtime}</h4>
				</article>
			)}
			{released && (
				<article className='flex flex-col justify-between items-center'>
					<HoverSettingCalendarIcon />
					<h4 className='text-lg font-bold text-white'>{released}</h4>
				</article>
			)}

			{lastUpdate && (
				<article className='flex flex-col justify-between items-center'>
					<HoverDownloadCalendarIcon />
					<h4 className='text-lg font-bold text-white'>
						{lastUpdate.slice(0, lastUpdate.indexOf('T'))}
					</h4>
				</article>
			)}
			{achievementsCount && (
				<article className='flex flex-col justify-between items-center'>
					<HoverAchievementIcon />
					<h4 className='text-lg font-bold text-white'>{achievementsCount}</h4>
				</article>
			)}
		</section>
	)
}
