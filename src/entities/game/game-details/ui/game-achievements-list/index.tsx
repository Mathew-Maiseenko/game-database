import { userSlice } from '@/entities/user'
import { Achievement, RawgApiClient } from '@/shared/api'
import { useAppSelector } from '@/shared/lib/redux/hooks'
import { ErrorMessage, Loader } from '@/shared/ui'
import { memo, useEffect, useState } from 'react'
import { GameAchievementCard } from './ui/games-achievement-card'

interface GameAchievementsListProps {
	gameId: number
}
type AchievementsFetchStatusType = 'idle' | 'pending' | 'fulfilled' | 'rejected'

export const GameAchievementsList = memo(function GameAchievementsList({
	gameId,
}: GameAchievementsListProps) {
	const [achievements, setAchievements] = useState<Achievement[]>([])
	const [achievementsFetchStatus, setAchievementsFetchStatus] =
		useState<AchievementsFetchStatusType>('idle')

	const isUserSigned = useAppSelector(userSlice.selectors.selectIsUserSigned)
	const isGameFavorite = useAppSelector(state =>
		userSlice.selectors.selectIsGameFavoriteById(state, gameId)
	)
	useEffect(() => {
		setAchievementsFetchStatus('pending')
		RawgApiClient.games
			.getListGameAchievements(gameId)
			.then(res => {
				setAchievements(res)
				setAchievementsFetchStatus('fulfilled')
			})
			.catch(() => setAchievementsFetchStatus('rejected'))
	}, [gameId])

	if (achievementsFetchStatus === 'pending') {
		return (
			<section className='flex flex-col min-w-full bg-lightThemeGray dark:bg-darkGray dark:border-none border-2 border-lightThemeBorderGray px-20 py-20 rounded-3xl relative mb-5'>
				<Loader />
			</section>
		)
	} else if (achievementsFetchStatus === 'rejected') {
		return (
			<section className='flex flex-col min-w-full bg-lightThemeGray dark:bg-darkGray dark:border-none border-2 border-lightThemeBorderGray px-20 py-20 rounded-3xl relative mb-5'>
				<ErrorMessage />
			</section>
		)
	} else if (achievementsFetchStatus === 'fulfilled' && achievements.length) {
		return (
			<section className='flex flex-col min-w-full bg-lightThemeGray dark:bg-darkGray dark:border-none border-2 border-lightThemeBorderGray px-6 pr-10 pt-5 rounded-3xl relative mb-5'>
				<article className='dark:text-orange text-blue text-2xl font-semibold mb-8'>
					<h2 className='inline dark:text-white text-black underline'>All</h2>{' '}
					Achievements
				</article>
				<ul className='flex flex-col justify-between w-full p-3'>
					{achievements.length &&
						achievements.map((achievement: Achievement) => (
							<GameAchievementCard
								key={`${achievement.name}-${achievement.id}`}
								isGameFavorite={isGameFavorite}
								GameId={gameId}
								AchievementId={achievement.id}
								isUserSigned={isUserSigned}
								title={achievement.name}
								description={achievement.description}
								percent={achievement.percent}
								image={achievement.image}
							/>
						))}
				</ul>
			</section>
		)
	} else {
		return
	}
})
