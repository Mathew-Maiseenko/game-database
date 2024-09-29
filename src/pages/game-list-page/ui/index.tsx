import { GameFiltration } from '@/features/filtration'
import { FilteredGamesList } from '@/widgets/filtered-games-list'

export function GameListPage() {
	return (
		<>
			<GameFiltration />
			<FilteredGamesList />
		</>
	)
}
