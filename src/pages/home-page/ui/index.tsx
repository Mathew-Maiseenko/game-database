import { WelcomeMessage } from '@/widgets/welcome-message'
import { UsersGamesList } from '@/entities/user/ui/users-games-list'
import { PopularGamesList } from '@/entities/game/popular-game-list'

export function HomePage() {
	return (
		<>
			<WelcomeMessage />
			<PopularGamesList />
			<UsersGamesList withButton={true} />
		</>
	)
}
