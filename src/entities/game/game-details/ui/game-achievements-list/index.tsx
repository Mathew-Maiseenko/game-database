import { GameAchievementCard } from './ui/GameAchievementCard'
import { Achievement, RawgApi } from '@/shared/api/RawgApi-hook'
import { useEffect, useState } from 'react'

interface GameAchievementsListProps {
	gameId: number
}

export function GameAchievementsList({ gameId }: GameAchievementsListProps) {
	const [achievements, setAchievements] = useState<Achievement[]>([])
	useEffect(() => {
		RawgApi.getListGameAchievements(gameId).then(setAchievements)
	}, [gameId])
	return (
		<section className='flex flex-col min-w-full min-h-[46vh] bg-darkGray px-6 pr-10 pt-5 rounded-3xl relative mb-5'>
			<article className='text-orange text-2xl  mb-8'>
				<h2 className='inline text-white underline'>All</h2> Achievements
			</article>
			<article className='flex flex-col justify-between w-full p-3'>
				{achievements.length
					? achievements.map((achievement: Achievement) => (
							<GameAchievementCard
								key={`${achievement.name}-${achievement.id}`}
								title={achievement.name}
								description={achievement.description}
								percent={achievement.percent}
								image={achievement.image}
							/>
					  ))
					: ''}
			</article>
		</section>
	)
}
