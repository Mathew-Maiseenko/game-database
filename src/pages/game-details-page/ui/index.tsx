import { RecommendedGameList } from '@/entities/game/recommended-game-list'
import { GameDetailsMain } from '@/widgets/game-details-main'

export function GameDetailsPage() {
	return (
		<>
			<GameDetailsMain />
			<RecommendedGameList />
		</>
	)
}
